import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createNhostClient } from "@/app/lib/nhost/server";
import { generateItemSlug } from "@/lib/contribConfig";
import { getRateLimiter, rateLimitKeyFromHeaders, applyRateLimitHeaders } from "@/lib/rate-limit";
import { verifyCsrfToken } from "@/lib/security/csrf";
import { headers as nextHeaders } from "next/headers";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    // Simple rate limit per IP + blog/type to avoid abuse
    const limiter = getRateLimiter();
    const preBodyUnknown = await request
      .clone()
      .json()
      .catch(() => ({}) as unknown);
    const preBody = (
      typeof preBodyUnknown === "object" && preBodyUnknown !== null
        ? (preBodyUnknown as Record<string, unknown>)
        : {}
    ) as Record<string, unknown>;
    const rlKeyExtra = `katki:${String(preBody.blogSlug ?? "?")}:${String(preBody.type ?? "?")}`;
    const rl = await limiter.allow(rateLimitKeyFromHeaders(request.headers, rlKeyExtra));
    if (!rl.ok) {
      const resp = NextResponse.json({ error: "Çok fazla istek" }, { status: 429 });
      return applyRateLimitHeaders(resp, rl);
    }

    const body = (
      Object.keys(preBody).length ? preBody : ((await request.json()) as Record<string, unknown>)
    ) as {
      type?: string;
      title?: string;
      note?: string;
      year?: number | null;
      externalId?: string | number | null;
      posterUrl?: string | null;
      sourceUrl?: string | null;
      blogSlug?: string;
      _csrf?: string | null;
    };
    const { type, title, note, year, externalId, posterUrl, sourceUrl, blogSlug, _csrf } = body;

    // CSRF verification
    const csrfOk = await verifyCsrfToken(_csrf);
    if (!csrfOk) {
      return NextResponse.json({ error: "Geçersiz istek" }, { status: 403 });
    }

    // Validate required fields
    if (!type || !title || !note || !blogSlug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate contribution type against enum values in Hasura
    const validTypes = ["film", "book", "music", "poem", "quote"] as const;
    if (!validTypes.includes(type as (typeof validTypes)[number])) {
      return NextResponse.json({ error: "Invalid contribution type" }, { status: 400 });
    }

    // Get user session from cookies
    const nhost = await createNhostClient();
    // Proactively refresh if expiring soon; this also fixes the case where middleware refreshed
    // but the route handler still sees the old request cookie for the current request.
    try {
      await nhost.refreshSession(60);
    } catch {}
    const session = nhost.getUserSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Generate slug for the contribution
    // const slug = generateItemSlug(title, year);

    // Insert contribution via explicit Hasura fetch with Authorization header
    const graphqlUrl = getServerGraphqlUrl();
    const mutation = `
      mutation InsertContribution($object: contributions_insert_input!) {
        insert_contributions_one(object: $object) {
          id
          title
          year
          note
          type
          external_id
          poster_url
          source_url
          blog_slug
          created_at
          user { id displayName avatarUrl }
        }
      }
    `;
    const variables = {
      object: {
        type,
        title,
        note,
        year: year || null,
        external_id: externalId || null,
        poster_url: posterUrl || null,
        source_url: sourceUrl || null,
        blog_slug: blogSlug,
        status: "published",
      },
    } as const;

    const gqlResp = await fetch(graphqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({ query: mutation, variables }),
    });
    const gqlJson = (await gqlResp.json()) as {
      data?: { insert_contributions_one?: Record<string, unknown> };
      errors?: unknown;
    };
    if (!gqlResp.ok || gqlJson.errors) {
      const err = Array.isArray((gqlJson as { errors?: unknown[] }).errors)
        ? ((gqlJson as { errors: unknown[] }).errors[0] as {
            extensions?: { code?: string };
            message?: string;
          })
        : null;
      const code = err?.extensions?.code as string | undefined;
      const message = (err?.message as string | undefined) || String(gqlResp.statusText);

      // Handle unique constraint conflicts gracefully: find the existing row and return 409
      if (code === "constraint-violation" || /duplicate key|unique/i.test(message)) {
        try {
          const findQuery = `
            query FindExisting($ext: String!, $slug: String!, $type: contribution_types_enum!) {
              contributions(where: { external_id: { _eq: $ext }, blog_slug: { _eq: $slug }, type: { _eq: $type } }, limit: 1) {
                id
                external_id
                blog_slug
                type
                title
                created_at
              }
            }
          `;
          const findResp = await fetch(graphqlUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.accessToken}`,
            },
            body: JSON.stringify({
              query: findQuery,
              variables: { ext: String(externalId ?? ""), slug: blogSlug, type },
            }),
          });
          const found = (await findResp.json()) as {
            data?: { contributions?: Array<{ id: string; external_id: string | null }> };
          };
          const existing = found.data?.contributions?.[0] ?? null;
          if (existing) {
            return NextResponse.json(
              {
                error: "already_exists",
                existing,
              },
              { status: 409 },
            );
          }
        } catch {}
      }

      console.error("GraphQL error:", gqlJson.errors || gqlResp.statusText);
      return NextResponse.json({ error: "Failed to create contribution" }, { status: 500 });
    }
    if (!gqlJson.data?.insert_contributions_one) {
      return NextResponse.json({ error: "Failed to create contribution" }, { status: 500 });
    }
    // Revalidate the sizden-gelenler page for this blog so it shows the new item immediately
    try {
      revalidatePath(`/sizden-gelenler/${blogSlug}`);
    } catch {}

    return NextResponse.json({
      success: true,
      contribution: gqlJson.data.insert_contributions_one,
    });
  } catch (error) {
    console.error("Contribution creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function getServerGraphqlUrl(): string {
  // Prefer explicit Hasura host when available
  const sub = process.env.NHOST_SUBDOMAIN || process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || "local";
  const region = process.env.NHOST_REGION || process.env.NEXT_PUBLIC_NHOST_REGION || "local";
  if (sub === "local" || region === "local") {
    return "https://local.hasura.local.nhost.run/v1/graphql";
  }
  return `https://${sub}.hasura.${region}.nhost.run/v1/graphql`;
}
