import "server-only";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";

const CSRF_COOKIE = "csrfToken";

export function generateToken(): string {
  return randomBytes(32).toString("hex");
}

export async function createCsrfToken(): Promise<string> {
  const token = generateToken();
  const jar = await cookies();
  jar.set(CSRF_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });
  return token;
}

export async function verifyCsrfToken(token: string | null | undefined): Promise<boolean> {
  if (!token) return false;
  const jar = await cookies();
  const stored = jar.get(CSRF_COOKIE)?.value;
  return Boolean(stored && token && stored === token);
}
