import AuthForm from "@/components/AuthForm";
import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-session";
import { signIn } from "@/app/actions/auth";

export const metadata: Metadata = {
  title: "Giriş Yap",
  description: "Yalnız Olmaz hesabınıza giriş yapın",
};

export default async function LoginPage({ searchParams }: { searchParams?: { next?: string } }) {
  const s = await getSession();
  if (s) redirect(searchParams?.next ?? "/");

  async function signInAndRedirect(formData: FormData) {
    "use server";
    console.log("[signIn] attempting", { email: String(formData.get("email") || "") });
    const res = await signIn(formData);
    console.log("[signIn] result", res);
    if (!res.ok) return { error: res.message } as const;
    redirect(res.next || "/");
  }

  return (
    <main className="container py-12">
      <Suspense>
        <AuthForm mode="login" action={signInAndRedirect} />
      </Suspense>
    </main>
  );
}
