import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-session";
import { runAsUser } from "@/lib/nhost-server-helper";
import ProfileEditForm from "@/components/ProfileEditForm";

export default async function ProfileEdit() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login?next=/profil/duzenle");
  }

  try {
    const { data: profileData, error: profileError } = await runAsUser(async (nhost: unknown) => {
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

    const profile = (profileData as { user_profiles?: unknown[] })?.user_profiles?.[0] || null;

    return <ProfileEditForm user={session.user} profile={profile} />;
  } catch (error) {
    console.error("Error in profile edit page:", error);
    return <ProfileEditForm user={session.user} profile={null} />;
  }
}
