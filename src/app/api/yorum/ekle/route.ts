import "server-only";
import { NextRequest } from "next/server";
import { createNhostClient } from "@/app/lib/nhost/server";
import { getRateLimiter, rateLimitKeyFromHeaders, applyRateLimitHeaders } from "@/lib/rate-limit";
import { verifyCsrfToken } from "@/lib/security/csrf";

export async function POST(req: NextRequest) {
  try {
    // Rate limit by IP + slug to avoid comment spam
    const limiter = getRateLimiter();
    const preBodyUnknown = await req
      .clone()
      .json()
      .catch(() => ({}) as unknown);
    const preBody = (
      typeof preBodyUnknown === "object" && preBodyUnknown !== null
        ? (preBodyUnknown as Record<string, unknown>)
        : {}
    ) as Record<string, unknown>;
    const slugForKey = typeof preBody.slug === "string" ? (preBody.slug as string) : "unknown";
    const rl = await limiter.allow(rateLimitKeyFromHeaders(req.headers, `yorum:${slugForKey}`));
    if (!rl.ok) {
      const resp = new Response(JSON.stringify({ error: "Çok fazla istek" }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
      return applyRateLimitHeaders(resp, rl);
    }

    const { slug, body, parentId, _csrf } = (
      Object.keys(preBody).length ? preBody : ((await req.json()) as Record<string, unknown>)
    ) as {
      slug?: string;
      body?: string;
      parentId?: string | null;
      _csrf?: string;
    };
    console.log("[yorum/ekle] incoming", {
      hasSlug: Boolean(slug),
      bodyLen: body?.length,
      parentId: parentId ?? null,
    });
    // Log selected request headers for debugging (avoid full cookie/token)
    try {
      const cookie = req.headers.get("cookie") || "";
      const contentType = req.headers.get("content-type") || "";
      console.log("[yorum/ekle] req headers", {
        cookiePrefix: cookie ? cookie.slice(0, 64) + (cookie.length > 64 ? "…" : "") : null,
        contentType,
      });
    } catch {}

    // CSRF check for this mutating API
    const csrfOk = await verifyCsrfToken(_csrf);
    if (!csrfOk) {
      return new Response(JSON.stringify({ error: "Geçersiz istek" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!slug || !body || !body.trim()) {
      return new Response(JSON.stringify({ error: "Eksik alanlar" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Debug: log whether we have a session and token prefix
    const nhostForDebug = await createNhostClient();
    const debugSession = nhostForDebug.getUserSession();
    console.log("[yorum/ekle] session?", {
      hasSession: Boolean(debugSession),
      hasUser: Boolean(debugSession?.user?.id),
      tokenPrefix: debugSession?.accessToken ? String(debugSession.accessToken).slice(0, 12) : null,
      tokenTtl: debugSession?.accessTokenExpiresIn ?? null,
    });

    // Use Nhost SDK server client for authenticated GraphQL requests
    const nhost = await createNhostClient();

    const mutation = /* GraphQL */ `
      mutation InsertBlogComment($object: blog_comments_insert_input!) {
        insert_blog_comments_one(object: $object) {
          id
          body
          blog_slug
          parent_id
          created_at
        }
      }
    `;

    const variables = {
      object: {
        blog_slug: slug,
        body: body.trim(),
        ...(parentId ? { parent_id: parentId } : {}),
      },
    };

    const resp = await nhost.graphql.request({ query: mutation, variables });
    const created = (
      resp as unknown as {
        data?: {
          insert_blog_comments_one?: {
            id: string;
            body: string;
            blog_slug: string;
            parent_id: string | null;
            created_at: string;
          };
        };
        error?: unknown;
      }
    ).data?.insert_blog_comments_one;
    const gqlError = (resp as unknown as { error?: unknown }).error;
    console.log("[yorum/ekle] graphql result", {
      hasData: Boolean(created),
      hasError: Boolean(gqlError),
    });
    if (gqlError) {
      try {
        console.error("[yorum/ekle] graphql error", JSON.stringify(gqlError));
      } catch {
        console.error("[yorum/ekle] graphql error (string)", String(gqlError));
      }
      return new Response(JSON.stringify({ error: "Yorum gönderilemedi" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!created) {
      return new Response(JSON.stringify({ error: "Yorum oluşturulamadı" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Map API response to frontend shape, using session user for author fields
    const nhostForMap = await createNhostClient();
    const session = nhostForMap.getUserSession();
    const responsePayload = {
      id: String(created.id),
      slug: String(created.blog_slug),
      body: String(created.body),
      createdAt: String(created.created_at),
      parentId: created.parent_id ? String(created.parent_id) : null,
      author: {
        id: String(session?.user?.id ?? ""),
        displayName: String(session?.user?.displayName ?? session?.user?.email ?? ""),
        avatarUrl: session?.user?.avatarUrl ?? null,
      },
      likeCount: 0,
    };

    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[yorum/ekle] unexpected error", err);
    return new Response(JSON.stringify({ error: "Beklenmeyen bir hata" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
