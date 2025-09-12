import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-session";
import { runAsUser } from "@/lib/nhost-server-helper";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({ message: "Oturum açmanız gerekiyor" }, { status: 401 });
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
    const { data: existingProfile } = await runAsUser(async (nhost: unknown) => {
      return await nhost.graphql.request(
        `
        query GetUserProfile($userId: uuid!) {
          user_profiles(where: { user_id: { _eq: $userId } }) {
            user_id
          }
        }
      `,
        {
          userId: session.user!.id,
        },
      );
    });

    const profileExists =
      (existingProfile as { user_profiles?: unknown[] })?.user_profiles?.length > 0;

    if (profileExists) {
      // Update existing profile
      const { data, error } = await runAsUser(async (nhost: unknown) => {
        return await nhost.graphql.request(
          `
          mutation UpdateUserProfile($userId: uuid!, $updates: user_profiles_set_input!) {
            update_user_profiles(
              where: { user_id: { _eq: $userId } }
              _set: $updates
            ) {
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
        `,
          {
            userId: session.user!.id,
            updates: {
              bio: bio?.trim() || null,
              location: location?.trim() || null,
              website: website?.trim() || null,
            },
          },
        );
      });

      if (error) {
        console.error("Error updating user profile:", error);
        return NextResponse.json(
          { message: "Profil güncellenirken bir hata oluştu" },
          { status: 500 },
        );
      }

      return NextResponse.json({
        message: "Profil başarıyla güncellendi",
        profile: (data as { update_user_profiles?: { returning?: unknown[] } })
          ?.update_user_profiles?.returning?.[0],
      });
    } else {
      // Create new profile
      const { data, error } = await runAsUser(async (nhost: unknown) => {
        return await nhost.graphql.request(
          `
          mutation InsertUserProfile($profile: user_profiles_insert_input!) {
            insert_user_profiles_one(object: $profile) {
              user_id
              bio
              location
              website
              created_at
              updated_at
            }
          }
        `,
          {
            profile: {
              bio: bio?.trim() || null,
              location: location?.trim() || null,
              website: website?.trim() || null,
            },
          },
        );
      });

      if (error) {
        console.error("Error creating user profile:", error);
        return NextResponse.json(
          { message: "Profil oluşturulurken bir hata oluştu" },
          { status: 500 },
        );
      }

      return NextResponse.json({
        message: "Profil başarıyla oluşturuldu",
        profile: (data as { insert_user_profiles_one?: unknown })?.insert_user_profiles_one,
      });
    }
  } catch (error) {
    console.error("Unexpected error in profile update:", error);
    return NextResponse.json({ message: "Beklenmeyen bir hata oluştu" }, { status: 500 });
  }
}
