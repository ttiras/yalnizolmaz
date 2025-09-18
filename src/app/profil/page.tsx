import { redirect } from "next/navigation";
import { createNhostClient } from "@/app/lib/nhost/server";
import ProfileClient from "@/components/ProfileClient";

export default async function Profile() {
  const nhost = await createNhostClient();
  const session = nhost.getUserSession();

  if (!session?.user) {
    redirect("/login?next=/profil");
  }

  // Render client component using React Query; provide initial user for immediate paint
  return <ProfileClient initialUser={session.user} />;
}
