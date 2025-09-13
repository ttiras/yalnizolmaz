import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-session";
import { runAsUser } from "@/lib/nhost-server-helper";
import ProfilePage from "@/components/ProfilePage";

type UserProfile = {
  user_id: string;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  created_at?: string;
  updated_at?: string;
};

export default async function Profile() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login?next=/profil");
  }

  try {
    // Get user profile data from public.user_profiles table
    const { data: profileData, error: profileError } = await runAsUser(async (nhost) => {
      return await nhost.graphql.request(
        `
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
        {
          userId: session.user!.id,
        },
      );
    });

    if (profileError) {
      console.error("Error fetching user profile:", profileError);
    }

    const profile = profileData
      ? ((profileData as { user_profiles?: unknown[] })
          ?.user_profiles?.[0] as UserProfile | null) || null
      : null;

    return <ProfilePage user={session.user} profile={profile} />;
  } catch (error) {
    console.error("Error in profile page:", error);
    return <ProfilePage user={session.user} profile={null} />;
  }
}
