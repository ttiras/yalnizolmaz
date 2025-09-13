"use server";

import { cookies, headers } from "next/headers";
import { createServerNhostClient, getServerAuthApiBase } from "@/lib/nhost.server";

type SignInResult = { ok: true; next: string } | { ok: false; message: string };

const SESSION_COOKIE = "nhostSession";

async function setSessionCookie(session: unknown) {
  const c = await cookies();
  c.set(SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    // Let Nhost manage refresh; cookie holds a serialized session for server checks
  });
}

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
    const nhost = createServerNhostClient();
    console.log("[Auth Action] Nhost client created successfully");

    const { session, error } = await nhost.auth.signIn({ email, password });
    console.log("[Auth Action] Nhost signIn response:", {
      hasSession: !!session,
      error: error?.message,
    });

    const normalized = normalizeSession(session as unknown);
    if (error || !normalized) {
      console.error("[Auth Action] Sign in failed:", error?.message || "No session returned");
      return { ok: false, message: error?.message || "Giriş başarısız" };
    }

    await setSessionCookie(normalized);
    const h = await headers();
    const next = safeNextFromInput(formData.get("next"), h) || "/";
    console.log("[Auth Action] Sign in successful, next path:", next);
    return { ok: true, next };
  } catch (err) {
    console.error("[Auth Action] Unexpected error in signIn:", err);
    return { ok: false, message: "Beklenmeyen bir hata oluştu" };
  }
}

export async function signUp(formData: FormData): Promise<SignInResult> {
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
    // Call Nhost Auth REST endpoint directly to ensure local dev hits the right domain
    const authBase = getServerAuthApiBase(); // e.g., https://local.auth.local.nhost.run/v1
    const res = await fetch(`${authBase}/signup/email-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    // Compute safe next path up-front (used in both branches)
    const h = await headers();
    const baseNext = safeNextFromInput(formData.get("next"), h) || "/";

    if (!res.ok) {
      let message = "Kayıt başarısız";
      try {
        const data = (await res.json()) as { error?: string; message?: string };
        message = data.message || message;
      } catch {}
      console.error("[Auth Action] Sign up failed (REST):", message, res.status);
      return { ok: false, message };
    }

    // Success but no session in response when email verification is required.
    const url = new URL(`http://local${baseNext.startsWith("/") ? baseNext : "/"}`);
    if (!url.searchParams.has("verify")) url.searchParams.append("verify", "1");
    const nextWithVerify = `${url.pathname}${url.search}${url.hash}`;
    console.log("[Auth Action] Sign up (REST) pending verification, next path:", nextWithVerify);
    return { ok: true, next: nextWithVerify };
  } catch (err) {
    console.error("[Auth Action] Unexpected error in signUp:", err);
    return { ok: false, message: "Beklenmeyen bir hata oluştu" };
  }
}

export async function signOut(): Promise<void> {
  const jar = await cookies();
  // Vercel-safe: only clear our httpOnly cookie; client SDK handles best-effort revocation
  jar.delete(SESSION_COOKIE);
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
