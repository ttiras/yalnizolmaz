import { NextRequest, NextResponse } from "next/server";
import { createNhostClient } from "@/app/lib/nhost/server";
import { generateItemSlug } from "@/lib/contribConfig";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, title, note, year, externalId, posterUrl, sourceUrl, blogSlug } = body;

    // Validate required fields
    if (!type || !title || !note || !blogSlug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate contribution type
    const validTypes = ["film", "book", "music", "poem", "quote"];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: "Invalid contribution type" }, { status: 400 });
    }

    // Get user session from cookies
    const nhost = await createNhostClient();
    const session = nhost.getUserSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Generate slug for the contribution
    // const slug = generateItemSlug(title, year);

    // Insert contribution into database
    const resp = await nhost.graphql.request({
      query: `
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
            user {
              id
              displayName
              avatarUrl
            }
          }
        }
      `,
      variables: {
        object: {
          type,
          title,
          note,
          year: year || null,
          external_id: externalId || null,
          poster_url: posterUrl || null,
          source_url: sourceUrl || null,
          blog_slug: blogSlug,
          submitted_by: session.user.id,
          status: "published",
        },
      },
    });

    const result = resp as unknown as {
      data?: {
        insert_contributions_one?: {
          id: string;
          title: string;
          note: string;
          year: number | null;
          type: string;
          external_id: string | null;
          poster_url: string | null;
          source_url: string | null;
          blog_slug: string;
          submitted_by: string;
          status: string;
          created_at: string;
          user: {
            id: string;
            displayName: string | null;
            avatarUrl: string | null;
          };
        };
      };
      error?: unknown;
    };

    if (result.error) {
      console.error("GraphQL error:", result.error);
      return NextResponse.json({ error: "Failed to create contribution" }, { status: 500 });
    }

    if (!result.data?.insert_contributions_one) {
      return NextResponse.json({ error: "Failed to create contribution" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      contribution: result.data.insert_contributions_one,
    });
  } catch (error) {
    console.error("Contribution creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
