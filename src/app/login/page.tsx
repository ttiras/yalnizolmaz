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
    const email = String(formData.get("email") || "");
    console.log("[Login Page] signIn attempting for:", email);

    try {
      const res = await signIn(formData);
      console.log("[Login Page] signIn result:", {
        ok: res.ok,
        message: res.ok ? undefined : res.message,
        next: res.ok ? res.next : undefined,
      });

      if (!res.ok) {
        console.error("[Login Page] signIn failed:", res.message);
        throw new Error(res.message || "Giriş başarısız");
      }

      console.log("[Login Page] Redirecting to:", res.next);
      redirect(res.next);
    } catch (error) {
      console.error("[Login Page] Error in signInAndRedirect:", error);
      throw error;
    }
  }

  return (
    <main className="container py-12">
      <Suspense>
        <AuthForm mode="login" action={signInAndRedirect} />
      </Suspense>
    </main>
  );
}
