"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn, signUp } from "@/app/actions/auth";

type AuthFormProps = {
  mode: "login" | "signup";
  action?: (formData: FormData) => Promise<{ error?: string }>;
};

export default function AuthForm({ mode, action }: AuthFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = React.useState(false);
  const search = useSearchParams();

  function validate() {
    const nextErr: { email?: string; password?: string } = {};
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      nextErr.email = "Geçerli bir e-posta girin";
    if (!password || password.length < 9) nextErr.password = "En az 9 karakter olmalı";
    setErrors(nextErr);
    return Object.keys(nextErr).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.set("email", email);
      fd.set("password", password);
      // Only forward an explicit ?next=... value. Never default to the login page itself.
      const qsNext = search?.get("next") ?? null;
      const next = qsNext && typeof qsNext === "string" ? qsNext : null;
      if (next) fd.set("next", next);
      const res = mode === "login" ? await signIn(fd) : await signUp(fd);
      if (!res.ok) {
        toast.error(res.message || "İşlem başarısız");
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
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Gönderiliyor..." : "E-posta ile devam et"}
          </Button>
          <div className="text-center text-sm text-neutral-500">Sosyal ile giriş (yakında)</div>
        </form>
      </CardContent>
    </Card>
  );
}
