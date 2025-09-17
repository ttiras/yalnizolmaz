import { NextRequest, NextResponse } from "next/server";
import { AUTH_ROUTES, pathStartsWithAny } from "./src/lib/auth/routes";
import { handleNhostMiddleware } from "./src/app/lib/nhost/server";

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const res = NextResponse.next();
  const session = await handleNhostMiddleware(req, res);
  const hasValid = Boolean(session) || hasValidSession(req);
  // const nearExpiry = isNearExpiry(req);

  // Public routes: allow always
  const publicRoutes = ["/login", "/signup", "/verify", "/giris", "/kayit"]; // extend as needed
  const isPublic = publicRoutes.some((r) => pathname === r || pathname.startsWith(r + "/"));
  if (isPublic) {
    return res;
  }

  // Guest-only: redirect authenticated users away (legacy behavior)
  if (pathStartsWithAny(pathname, AUTH_ROUTES.guestOnly)) {
    if (hasValid) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return res;
  }

  // Auth-required: redirect to login with next=
  if (pathStartsWithAny(pathname, AUTH_ROUTES.authRequired)) {
    if (!hasValid) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      const next = `${pathname}${search || ""}`;
      url.searchParams.set("next", next);
      return NextResponse.redirect(url);
    }
    return res;
  }

  // Public and other routes pass through
  return res;
}

export const config = {
  // Run on all HTML navigations; exclude Next assets and API routes for efficiency
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};

function hasValidSession(request: NextRequest): boolean {
  const session = request.cookies.get("nhostSession");
  const ts = request.cookies.get("nhostSessionTime");
  if (!session?.value || !ts?.value) return false;
  try {
    const parsed = JSON.parse(session.value) as { accessTokenExpiresIn?: number } | null;
    const start = parseInt(ts.value, 10) || 0;
    const elapsed = Math.floor(Date.now() / 1000) - start;
    const ttl = parsed?.accessTokenExpiresIn ?? 900;
    return elapsed < ttl;
  } catch {
    return false;
  }
}

// Using Nhost SDK to manage session refresh in middleware
