"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createNhostClient } from "@/app/lib/nhost/server";

export async function revalidateAfterAuthChange(path = "/") {
  revalidatePath(path);
  return { success: true };
}

export async function signOut() {
  const nhost = await createNhostClient();
  const session = nhost.getUserSession();
  if (session) {
    await nhost.auth.signOut({ refreshToken: session.refreshToken });
  }
  revalidatePath("/");
  redirect("/");
}
