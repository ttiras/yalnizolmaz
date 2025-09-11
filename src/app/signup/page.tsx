import AuthForm from "@/components/AuthForm";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kayıt Ol",
  description: "Yalnız Olmaz'a katılın",
};

export default function SignupPage() {
  return (
    <main className="container py-12">
      <Suspense>
        <AuthForm mode="signup" />
      </Suspense>
    </main>
  );
}
