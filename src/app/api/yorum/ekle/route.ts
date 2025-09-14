import "server-only";
import { NextRequest } from "next/server";
import { createAuthenticatedNhostClient } from "@/lib/nhost-server-helper";
import { getSession } from "@/lib/auth-session";

export async function POST(req: NextRequest) {
  try {
    const { slug, body, parentId } = (await req.json()) as {
      slug?: string;
      body?: string;
      parentId?: string | null;
    };
    console.log("[yorum/ekle] incoming", {
      hasSlug: Boolean(slug),
      bodyLen: body?.length,
      parentId: parentId ?? null,
    });

    if (!slug || !body || !body.trim()) {
      return new Response(JSON.stringify({ error: "Eksik alanlar" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Ensure user is authenticated and get an nhost client primed with access token
    const nhost = await createAuthenticatedNhostClient();

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

    const { data, error } = await nhost.graphql.request(mutation, variables);
    console.log("[yorum/ekle] graphql result", {
      hasData: Boolean(data?.insert_blog_comments_one),
      hasError: Boolean(error),
    });
    if (error) {
      return new Response(JSON.stringify({ error: String(error) }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const created = data?.insert_blog_comments_one;
    if (!created) {
      return new Response(JSON.stringify({ error: "Yorum oluşturulamadı" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Map API response to frontend shape, using session user for author fields
    const session = await getSession();
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
