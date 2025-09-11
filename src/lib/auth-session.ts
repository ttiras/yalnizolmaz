import { cookies } from "next/headers";

const SESSION_COOKIE = "nhostSession";

export type SessionUser = {
  id: string;
  email?: string | null;
  displayName?: string | null;
  avatarUrl?: string | null;
};

export type SessionData = {
  accessToken: string;
  accessTokenExpiresIn?: number;
  refreshToken?: string;
  user?: SessionUser;
};

export async function getSession(): Promise<SessionData | null> {
  const jar = await cookies();
  const c = jar.get(SESSION_COOKIE)?.value;
  if (!c) return null;
  try {
    const parsed = JSON.parse(c);
    if (
      parsed &&
      typeof parsed === "object" &&
      typeof (parsed as Record<string, unknown>).accessToken === "string"
    ) {
      return parsed as SessionData;
    }
  } catch {}
  return null;
}
