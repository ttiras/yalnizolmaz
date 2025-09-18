import { redirect } from "next/navigation";
import { createNhostClient } from "@/app/lib/nhost/server";
import ProfileEditClient from "@/components/ProfileEditClient";

export default async function ProfileEdit() {
  const nhost = await createNhostClient();
  const session = nhost.getUserSession();

  if (!session?.user) {
    redirect("/login?next=/profil/duzenle");
  }

  // Client-side edit to leverage SDK auto-refresh and avoid stale JWT during data fetch
  return <ProfileEditClient />;
}
