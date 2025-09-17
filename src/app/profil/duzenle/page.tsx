import { redirect } from "next/navigation";
import { createNhostClient } from "@/app/lib/nhost/server";
import ProfileEditForm from "@/components/ProfileEditForm";

type UserProfile = {
  user_id: string;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  created_at?: string;
  updated_at?: string;
};

export default async function ProfileEdit() {
  const nhost = await createNhostClient();
  const session = nhost.getUserSession();

  if (!session?.user) {
    redirect("/login?next=/profil/duzenle");
  }

  try {
    const resp = await nhost.graphql.request({
      query: `
        query GetUserProfile($userId: uuid!) {
          user_profiles(where: { user_id: { _eq: $userId } }) {
            user_id
            bio
            location
            website
            created_at
            updated_at
          }
        }
      `,
      variables: {
        userId: session.user!.id,
      },
    });
    const profileData = (resp as unknown as { data?: unknown; error?: unknown }).data;
    const profileError = (resp as unknown as { data?: unknown; error?: unknown }).error;

    if (profileError) {
      console.error("Error fetching user profile:", profileError);
    }

    const profile = profileData
      ? ((profileData as { user_profiles?: unknown[] })
          ?.user_profiles?.[0] as UserProfile | null) || null
      : null;

    return <ProfileEditForm user={session.user} profile={profile} />;
  } catch (error) {
    console.error("Error in profile edit page:", error);
    return <ProfileEditForm user={session.user} profile={null} />;
  }
}
