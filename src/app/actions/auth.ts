"use server";

import { headers } from "next/headers";
import { createNhostClient } from "@/app/lib/nhost/server";
import { verifyCsrfToken } from "@/lib/security/csrf";
import { getRateLimiter, rateLimitKeyFromHeaders } from "@/lib/rate-limit";

type SignInResult = { ok: true; next: string } | { ok: false; message: string };

// Cookies are set/cleared via helpers from auth-session (adds timestamp cookie too)

type MinimalUser = {
  id: string;
  email?: string | null;
  displayName?: string | null;
  avatarUrl?: string | null;
};

type MinimalSession = {
  accessToken: string;
  accessTokenExpiresIn?: number;
  refreshToken?: string;
  user?: MinimalUser;
};

function normalizeSession(input: unknown): MinimalSession | null {
  if (!input || typeof input !== "object") return null;
  const s = input as Record<string, unknown>;
  const userRaw = (s.user ?? (s["user"] as unknown)) as Record<string, unknown> | undefined;
  const accessToken = (s["accessToken"] || s["access_token"]) as string | undefined;
  const accessTokenExpiresIn =
    (s["accessTokenExpiresIn"] as number | undefined) ??
    (s["access_token_expires_in"] as number | undefined);
  const refreshToken =
    (s["refreshToken"] as string | undefined) ?? (s["refresh_token"] as string | undefined);

  if (!accessToken) return null;
  const user: MinimalUser | undefined = userRaw
    ? {
        id: String(userRaw["id"] ?? ""),
        email: (userRaw["email"] as string | null | undefined) ?? null,
        displayName: (userRaw["displayName"] as string | null | undefined) ?? null,
        avatarUrl: (userRaw["avatarUrl"] as string | null | undefined) ?? null,
      }
    : undefined;
  return { accessToken, accessTokenExpiresIn, refreshToken, user };
}

function safeNextFromInput(nextRaw: unknown, h: Headers): string | null {
  const raw = typeof nextRaw === "string" ? nextRaw.trim() : "";
  const tryDecode = (s: string) => {
    try {
      return decodeURIComponent(s);
    } catch {
      return s;
    }
  };
  // Evaluate both raw and decoded candidates
  const candidates = [raw, tryDecode(raw)].filter(Boolean) as string[];
  const disallowPrefixes = ["/login", "/signup"];
  const isBlocked = (p: string) =>
    disallowPrefixes.some(
      (pref) => p === pref || p.startsWith(pref + "?") || p.startsWith(pref + "#"),
    );

  const toPath = (u: URL) => `${u.pathname}${u.search || ""}${u.hash || ""}`;

  try {
    for (const cand of candidates) {
      if (cand.startsWith("/")) {
        const p = cand.replace(/\/{2,}/g, "/");
        return isBlocked(p) ? "/" : p;
      }
    }
    if (raw) {
      // Only accept absolute URLs if they are same-origin.
      const host = h.get("x-forwarded-host") ?? h.get("host") ?? "";
      const proto = h.get("x-forwarded-proto") ?? "https";
      if (host) {
        const allowedOrigin = `${proto}://${host}`;
        const u = new URL(raw);
        if (u.origin === allowedOrigin) {
          const p = toPath(u).replace(/\/{2,}/g, "/");
          return isBlocked(p) ? "/" : p;
        }
      }
    }
  } catch {
    // ignore and continue to fallbacks
  }

  // Fallbacks: look for ?next= in the current URL header (Next 15) or Referer.
  try {
    const cur = h.get("x-current-url");
    if (cur) {
      const u = new URL(cur);
      const n = u.searchParams.get("next");
      const d = n ? tryDecode(n) : null;
      if (d && d.startsWith("/") && !isBlocked(d)) return d;
    }
    const ref = h.get("referer");
    if (ref) {
      const u = new URL(ref);
      const n = u.searchParams.get("next");
      const d = n ? tryDecode(n) : null;
      if (d && d.startsWith("/") && !isBlocked(d)) return d;
    }
  } catch {}

  return null;
}

export async function signIn(formData: FormData): Promise<SignInResult> {
  // CSRF check first
  const csrfToken = formData.get("_csrf") as string | null;
  if (!(await verifyCsrfToken(csrfToken || undefined))) {
    return { ok: false, message: "Geçersiz istek" };
  }
  // Basic rate limiting per IP+email
  try {
    const h = await headers();
    const emailForKey = String(formData.get("email") || "")
      .trim()
      .toLowerCase();
    const key = rateLimitKeyFromHeaders(h, `signin:${emailForKey}`);
    const result = await getRateLimiter().allow(key);
    if (!result.ok) {
      return {
        ok: false,
        message: `Çok fazla istek. ${result.retryAfterSeconds} saniye sonra tekrar dene.`,
      };
    }
  } catch {}
  const email = String(formData.get("email") || "").trim();
  const rawPassword = String(formData.get("password") || "");
  const password =
    process.env.E2E_WITH_AUTH === "1"
      ? rawPassword.replace(/\r?\n/g, "").replace(/\s+$/g, "")
      : rawPassword;

  console.log("[Auth Action] signIn called for email:", email);

  if (!email || !password) {
    console.error("[Auth Action] Missing email or password");
    return { ok: false, message: "E-posta ve şifre gerekli" };
  }

  try {
    const nhost = await createNhostClient();
    const res = await nhost.auth.signInEmailPassword({ email, password });
    if (
      res &&
      typeof res === "object" &&
      "error" in res &&
      (res as { error?: { message?: string } }).error
    ) {
      const message = (res as { error?: { message?: string } }).error?.message || "Giriş başarısız";
      console.error("[Auth Action] Sign in failed (SDK):", message);
      return { ok: false, message };
    }
    const session = nhost.getUserSession();
    if (!session) {
      return { ok: false, message: "Giriş başarısız" };
    }
    const h = await headers();
    const next = safeNextFromInput(formData.get("next"), h) || "/";
    console.log("[Auth Action] Sign in successful (REST), next path:", next);
    return { ok: true, next };
  } catch (err) {
    console.error("[Auth Action] Unexpected error in signIn:", err);
    return { ok: false, message: "Beklenmeyen bir hata oluştu" };
  }
}

export async function signUp(formData: FormData): Promise<SignInResult> {
  // CSRF check first
  const csrfToken = formData.get("_csrf") as string | null;
  if (!(await verifyCsrfToken(csrfToken || undefined))) {
    return { ok: false, message: "Geçersiz istek" };
  }
  // Basic rate limiting per IP+email
  try {
    const h = await headers();
    const emailForKey = String(formData.get("email") || "")
      .trim()
      .toLowerCase();
    const key = rateLimitKeyFromHeaders(h, `signup:${emailForKey}`);
    const result = await getRateLimiter().allow(key);
    if (!result.ok) {
      return {
        ok: false,
        message: `Çok fazla istek. ${result.retryAfterSeconds} saniye sonra tekrar dene.`,
      };
    }
  } catch {}
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  if (!email || !password) {
    console.error("[Auth Action] signUp missing fields", {
      hasEmail: Boolean(email),
      hasPassword: Boolean(password),
    });
    return { ok: false, message: "E-posta ve şifre gerekli" };
  }

  try {
    console.log("[Auth Action] signUp called for email:", email);
    const nhost = await createNhostClient();
    const res = await nhost.auth.signUpEmailPassword({ email, password });

    // Compute safe next path up-front (used in both branches)
    const h = await headers();
    const baseNext = safeNextFromInput(formData.get("next"), h) || "/";

    if (
      res &&
      typeof res === "object" &&
      "error" in res &&
      (res as { error?: { message?: string } }).error
    ) {
      const message = (res as { error?: { message?: string } }).error?.message || "Kayıt başarısız";
      console.error("[Auth Action] Sign up failed (SDK):", message);
      return { ok: false, message };
    }

    // Success but no session in response when email verification is required.
    const session = nhost.getUserSession();
    const url = new URL(`http://local${baseNext.startsWith("/") ? baseNext : "/"}`);
    if (!url.searchParams.has("verify")) url.searchParams.append("verify", "1");
    const nextWithVerify = `${url.pathname}${url.search}${url.hash}`;
    console.log("[Auth Action] Sign up (REST) pending verification, next path:", nextWithVerify);
    if (!session) {
      return { ok: true, next: nextWithVerify };
    }
    const h2 = await headers();
    const next = safeNextFromInput(formData.get("next"), h2) || "/";
    return { ok: true, next };
  } catch (err) {
    console.error("[Auth Action] Unexpected error in signUp:", err);
    return { ok: false, message: "Beklenmeyen bir hata oluştu" };
  }
}

export async function signOut(): Promise<void> {
  const nhost = await createNhostClient();
  const s = nhost.getUserSession();
  if (s) {
    await nhost.auth.signOut({ refreshToken: s.refreshToken });
  }
}

export async function getNextParam(): Promise<string | null> {
  const h = await headers();
  const url = h.get("x-current-url") || "";
  try {
    const originFallback = h.get("origin") || undefined;
    const u = new URL(url, originFallback);
    const next = u.searchParams.get("next");
    return next;
  } catch {
    return null;
  }
}
