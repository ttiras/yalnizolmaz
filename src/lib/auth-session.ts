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

export async function updateSessionUser(updatedUser: Partial<SessionUser>): Promise<void> {
  const session = await getSession();
  if (!session?.user) return;

  const updatedSession = {
    ...session,
    user: {
      ...session.user,
      ...updatedUser,
    },
  };

  const jar = await cookies();
  jar.set(SESSION_COOKIE, JSON.stringify(updatedSession), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}
