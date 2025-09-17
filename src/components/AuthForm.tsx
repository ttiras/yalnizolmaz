"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn, signUp } from "@/app/actions/auth";
import { createCsrfToken } from "@/lib/security/csrf";

type AuthFormProps = {
  mode: "login" | "signup";
  action?: (formData: FormData) => Promise<void>;
};

export default function AuthForm({ mode, action }: AuthFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string>("");
  const [csrfToken, setCsrfToken] = React.useState<string>("");
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Ask server to set a fresh CSRF cookie and return the token
        const res = await fetch("/api/guvenlik/belirteci", { cache: "no-store" });
        if (!cancelled && res.ok) {
          const data = (await res.json()) as { token?: string };
          setCsrfToken(data.token || "");
        }
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const search = useSearchParams();
  const hasError = (search?.get("error") ?? "") !== "";
  const [authenticated, setAuthenticated] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/session", { cache: "no-store" });
        if (!cancelled && res.ok) {
          const data = (await res.json()) as { authenticated?: boolean };
          setAuthenticated(Boolean(data.authenticated));
        }
      } catch {
        if (!cancelled) setAuthenticated(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function validate() {
    const nextErr: { email?: string; password?: string } = {};
    if (!email) {
      nextErr.email = "E-posta gerekli";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      nextErr.email = "Geçerli bir e-posta adresi girin";
    }
    if (!password) {
      nextErr.password = "Şifre gerekli";
    } else if (password.length < 9) {
      nextErr.password = "Şifre en az 9 karakter olmalı";
    }
    setErrors(nextErr);
    return Object.keys(nextErr).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const fd = new FormData();
      fd.set("email", email);
      fd.set("password", password);
      fd.set("_csrf", csrfToken);
      // Only forward an explicit ?next=... value. Never default to the login page itself.
      const qsNext = search?.get("next") ?? null;
      let next: string | null = qsNext && typeof qsNext === "string" ? qsNext : null;
      if (!next && mode === "signup") {
        try {
          const origin = window.location.origin;
          const ref = document.referrer;
          if (ref && ref.startsWith(origin)) {
            const u = new URL(ref);
            const path = `${u.pathname}${u.search || ""}${u.hash || ""}`;
            if (
              path &&
              path !== "/login" &&
              !path.startsWith("/login?") &&
              path !== "/signup" &&
              !path.startsWith("/signup?")
            ) {
              next = path;
            }
          }
        } catch {}
      }
      if (next) fd.set("next", next);
      const res = mode === "login" ? await signIn(fd) : await signUp(fd);
      if (!res.ok) {
        if (mode === "signup") {
          setSubmitError(res.message || "Kayıt başarısız");
        } else {
          toast.error(res.message || "İşlem başarısız");
        }
        return;
      }
      // Navigate using the server-computed safe next path
      window.location.assign(res.next || "/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>{mode === "login" ? "Giriş Yap" : "Kayıt Ol"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          {...(action
            ? {
                action: action,
                onSubmit: (e) => {
                  if (!validate()) e.preventDefault();
                },
              }
            : { onSubmit })}
          className="space-y-4"
          noValidate
        >
          <input type="hidden" name="next" value={search?.get("next") ?? ""} />
          <input type="hidden" name="_csrf" value={csrfToken} />
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              E-posta
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={errors.email || null}
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Şifre
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={errors.password || null}
            />
            <p className="mt-1 text-xs text-neutral-500">En az 9 karakter</p>
          </div>
          <SubmitButton clientSubmitting={submitting} />
          {mode === "signup" && submitError ? (
            <div
              role="alert"
              className="-mt-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {submitError}
            </div>
          ) : null}
          {mode === "login" && hasError && authenticated === false ? (
            <div
              role="alert"
              className="-mt-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              Hatalı e-posta veya şifre
            </div>
          ) : null}
          <div className="text-center text-sm text-neutral-500">Sosyal ile giriş (yakında)</div>
          <div className="text-center">
            {mode === "login" ? (
              <Link href="/signup" className="text-blue-600 hover:underline">
                Kayıt ol
              </Link>
            ) : (
              <Link href="/login" className="text-blue-600 hover:underline">
                Giriş yap
              </Link>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function SubmitButton({ clientSubmitting }: { clientSubmitting: boolean }) {
  const { pending } = useFormStatus();
  const isBusy = pending || clientSubmitting;
  return (
    <Button type="submit" disabled={isBusy} className="w-full">
      {isBusy ? "Gönderiliyor..." : "E-posta ile devam et"}
    </Button>
  );
}
