import AuthForm from "@/components/AuthForm";
import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createNhostClient } from "@/app/lib/nhost/server";
import { createCsrfToken } from "@/lib/security/csrf";
import { signIn } from "@/app/actions/auth";

export const metadata: Metadata = {
  title: "Giriş Yap",
  description: "Yalnız Olmaz hesabınıza giriş yapın",
};

export default async function LoginPage({ searchParams }: { searchParams?: { next?: string } }) {
  const nhost = await createNhostClient();
  const s = nhost.getUserSession();
  if (s) redirect(searchParams?.next ?? "/");

  async function signInAndRedirect(formData: FormData) {
    "use server";
    const email = String(formData.get("email") || "");
    console.log("[Login Page] signIn attempting for:", email);
    const res = await signIn(formData);
    console.log("[Login Page] signIn result ok?", res.ok);

    if (!res.ok) {
      console.error("[Login Page] signIn failed:", res.message);
      // Preserve original next (if any) and carry an error flag, avoid throwing a runtime error page
      const originalNext = String(formData.get("next") || "");
      const qs = new URLSearchParams();
      if (originalNext) qs.set("next", originalNext);
      qs.set("error", "1");
      redirect(`/login${qs.toString() ? `?${qs.toString()}` : ""}`);
    }

    console.log("[Login Page] Redirecting to:", res.next);
    // Note: redirect throws NEXT_REDIRECT by design; don't wrap in try/catch
    redirect(res.next);
  }

  return (
    <main className="container py-12">
      <Suspense>
        <AuthForm mode="login" action={signInAndRedirect} />
      </Suspense>
    </main>
  );
}
