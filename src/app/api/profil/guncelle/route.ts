import { NextRequest, NextResponse } from "next/server";
import { createNhostClient } from "@/app/lib/nhost/server";

export async function POST(request: NextRequest) {
  try {
    const nhost = await createNhostClient();
    const session = nhost.getUserSession();

    if (!session?.user) {
      return NextResponse.json({ message: "Oturum açmanız gerekiyor" }, { status: 401 });
    }

    // Ensure we have a fresh access token for API (middleware doesn't run for /api/*)
    const refreshed = await nhost.refreshSession(60).catch(() => null);
    const activeSession = refreshed ?? nhost.getUserSession();
    if (!activeSession?.user) {
      return NextResponse.json({ message: "Oturum süresi doldu" }, { status: 401 });
    }

    const body = await request.json();
    const { bio, location, website } = body;

    // Validate input

    if (bio && bio.length > 500) {
      return NextResponse.json(
        { message: "Biyografi 500 karakterden uzun olamaz" },
        { status: 400 },
      );
    }

    if (location && location.length > 100) {
      return NextResponse.json({ message: "Konum 100 karakterden uzun olamaz" }, { status: 400 });
    }

    if (website && website.length > 200) {
      return NextResponse.json(
        { message: "Website URL'si 200 karakterden uzun olamaz" },
        { status: 400 },
      );
    }

    // Validate website URL format if provided
    if (website && website.trim()) {
      try {
        const url = website.startsWith("http") ? website : `https://${website}`;
        new URL(url);
      } catch {
        return NextResponse.json({ message: "Geçerli bir website URL'si girin" }, { status: 400 });
      }
    }

    // Check if profile exists
    const existingQuery = /* GraphQL */ `
      query GetUserProfile($userId: uuid!) {
        user_profiles(where: { user_id: { _eq: $userId } }) {
          user_id
        }
      }
    `;
    const existingResp = await nhost.graphql.request({
      query: existingQuery,
      variables: { userId: activeSession.user!.id },
    });
    const anyExisting = existingResp as unknown as {
      data?: { user_profiles?: unknown[] };
      error?: unknown;
      body?: { data?: { user_profiles?: unknown[] }; errors?: unknown };
    };
    if (anyExisting.error || anyExisting.body?.errors) {
      console.error(
        "Error checking existing profile:",
        anyExisting.error || anyExisting.body?.errors,
      );
      return NextResponse.json(
        { message: "Profil sorgulanırken bir hata oluştu" },
        { status: 500 },
      );
    }
    const existingData = anyExisting.body?.data ?? anyExisting.data;
    const profileExists = Boolean(
      existingData?.user_profiles && existingData.user_profiles.length > 0,
    );

    if (profileExists) {
      // Update existing profile
      const updateMutation = /* GraphQL */ `
        mutation UpdateUserProfile($userId: uuid!, $updates: user_profiles_set_input!) {
          update_user_profiles(where: { user_id: { _eq: $userId } }, _set: $updates) {
            affected_rows
            returning {
              user_id
              bio
              location
              website
              created_at
              updated_at
            }
          }
        }
      `;
      const updateResp = await nhost.graphql.request({
        query: updateMutation,
        variables: {
          userId: activeSession.user!.id,
          updates: {
            bio: bio?.trim() || null,
            location: location?.trim() || null,
            website: website?.trim() || null,
          },
        },
      });
      const anyUpdate = updateResp as unknown as {
        data?: { update_user_profiles?: { returning?: unknown[] } };
        error?: unknown;
        body?: { data?: { update_user_profiles?: { returning?: unknown[] } }; errors?: unknown };
      };
      if (anyUpdate.error || anyUpdate.body?.errors) {
        console.error("Error updating user profile:", anyUpdate.error || anyUpdate.body?.errors);
        return NextResponse.json(
          { message: "Profil güncellenirken bir hata oluştu" },
          { status: 500 },
        );
      }
      const data = anyUpdate.body?.data ?? anyUpdate.data;
      return NextResponse.json({
        message: "Profil başarıyla güncellendi",
        profile: data?.update_user_profiles?.returning?.[0] ?? null,
      });
    } else {
      // Create new profile
      const insertMutation = /* GraphQL */ `
        mutation InsertUserProfile($profile: user_profiles_insert_input!) {
          insert_user_profiles_one(object: $profile) {
            bio
            location
            website
          }
        }
      `;
      const insertResp = await nhost.graphql.request({
        query: insertMutation,
        variables: {
          profile: {
            bio: bio?.trim() || null,
            location: location?.trim() || null,
            website: website?.trim() || null,
          },
        },
      });
      const anyInsert = insertResp as unknown as {
        data?: { insert_user_profiles_one?: unknown };
        error?: unknown;
        body?: { data?: { insert_user_profiles_one?: unknown }; errors?: unknown };
      };

      if (anyInsert.error || anyInsert.body?.errors) {
        console.error("Error creating user profile:", anyInsert.error || anyInsert.body?.errors);
        return NextResponse.json(
          { message: "Profil oluşturulurken bir hata oluştu" },
          { status: 500 },
        );
      }
      const data = anyInsert.body?.data ?? anyInsert.data;
      return NextResponse.json({
        message: "Profil başarıyla oluşturuldu",
        profile: data?.insert_user_profiles_one ?? null,
      });
    }
  } catch (error) {
    console.error("Unexpected error in profile update:", error);
    return NextResponse.json({ message: "Beklenmeyen bir hata oluştu" }, { status: 500 });
  }
}
