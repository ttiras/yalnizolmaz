# Auth Roadmap (Phased, Secure, RSC-first) - Enhanced Version

This plan operationalizes the authentication improvements for our Next.js 15 (App Router) + Nhost stack. It maintains a Server Components first approach, uses Route Handlers for secrets, follows Turkish API route naming, and implements **on-demand token refresh** for optimal performance.

## Core Principles

- **Server-only secrets** (Route Handlers or server actions). No client secrets.
- **Cookie auth** (httpOnly) with **on-demand refresh** - no background jobs
- **Turkish API paths**: `/api/<turkish-word>/<action>`
- **Preserve `next` param** across all redirects
- **Defense-in-depth**: rate limiting, CSRF, security headers, audit logs
- **Lazy evaluation**: Tokens refresh ONLY when users make requests

### Core Utilities & Types (to add early)

```ts
// src/lib/auth/types.ts
export interface SessionUser {
  id: string;
  email?: string;
  displayName?: string;
  avatarUrl?: string | null;
}

export interface SessionData {
  accessToken: string;
  accessTokenExpiresIn?: number;
  refreshToken?: string;
  user?: SessionUser;
}

export type MinimalSession = SessionData;
```

```ts
// src/lib/auth/tokens.ts (supporting utilities referenced in this plan)
import { cookies } from "next/headers";

export function getServerAuthApiBase(): string {
  // Prefer explicit URL when available (local dev or custom deployments)
  if (process.env.NHOST_AUTH_URL) return process.env.NHOST_AUTH_URL;
  const sub = process.env.NHOST_SUBDOMAIN;
  const region = process.env.NHOST_REGION;
  if (!sub) throw new Error("NHOST_SUBDOMAIN missing for auth base");
  if (!region && process.env.NODE_ENV !== "production") {
    return `https://${sub}.auth.local.nhost.run/v1`;
  }
  if (!region) throw new Error("NHOST_REGION required in production for auth base");
  return `https://${sub}.auth.${region}.nhost.run/v1`;
}

export function normalizeSession(data: any): MinimalSession | null {
  if (!data) return null;
  const accessToken = data.access_token ?? data.accessToken;
  if (!accessToken) return null;
  return {
    accessToken,
    accessTokenExpiresIn: data.access_token_expires_in ?? data.accessTokenExpiresIn ?? 900,
    refreshToken: data.refresh_token ?? data.refreshToken,
    user: data.user
      ? {
          id: data.user.id,
          email: data.user.email,
          displayName: data.user.displayName,
          avatarUrl: data.user.avatarUrl,
        }
      : undefined,
  };
}

// Optional: simple refresh lock to avoid stampede on concurrent requests
let refreshPromise: Promise<MinimalSession | null> | null = null;
export async function refreshWithLock(
  doRefresh: () => Promise<MinimalSession | null>,
): Promise<MinimalSession | null> {
  if (refreshPromise) return refreshPromise;
  refreshPromise = doRefresh();
  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}
```

```ts
// src/lib/auth/session.ts (add alongside existing helpers)
export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete("nhostSession");
  jar.delete("nhostSessionTime");
}
```

---

## Phase 1 — Critical Security

### 1.1 Token Expiration Validation with Timestamp Tracking

- Add precise timestamp tracking for accurate expiry calculation:
  - Edit `src/app/actions/auth.ts` → when setting cookies, store TWO cookies:
    - `nhostSession`: Main session data (existing)
    - `nhostSessionTime`: Timestamp cookie with `Date.now()` (new)
    - Both cookies must have same `maxAge`, `httpOnly`, `secure`, `sameSite` settings
  - **Why two cookies**: Avoids relying on cookie creation time which can be unreliable across different environments
- Edit `src/lib/auth-session.ts`:

  ```typescript
  function isTokenExpired(session: SessionData, timestampMs: string): boolean {
    if (!session.accessTokenExpiresIn || !timestampMs) return false;
    const elapsedSeconds = (Date.now() - parseInt(timestampMs)) / 1000;
    return elapsedSeconds >= session.accessTokenExpiresIn;
  }

  function isTokenExpiringSoon(session: SessionData, timestampMs: string): boolean {
    if (!session.accessTokenExpiresIn || !timestampMs) return false;
    const elapsedSeconds = (Date.now() - parseInt(timestampMs)) / 1000;
    return elapsedSeconds > session.accessTokenExpiresIn - 60; // 60s buffer
  }
  ```

- Acceptance criteria:
  - Expired sessions return `null` from `getSession()`
  - `/api/auth/session` returns `authenticated: false` for expired tokens
  - Test: Set token with 1-minute expiry, verify rejection after 61 seconds

### 1.2 Token Refresh Mechanism (ON-DEMAND ONLY)

- **CRITICAL**: Implement lazy refresh that ONLY executes when user makes a request
- New: `src/lib/auth/tokens.ts`

  ```typescript
  // IMPORTANT: This is NOT a background service
  // These functions are ONLY called from getSession()

  export async function refreshAccessToken(refreshToken: string): Promise<MinimalSession | null> {
    if (!refreshToken) return null;

    try {
      const authBase = getServerAuthApiBase();
      const response = await fetch(`${authBase}/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
        cache: "no-store", // Never cache token refresh
      });

      if (!response.ok) {
        console.error("[Auth] Token refresh failed:", response.status);
        return null;
      }

      const data = await response.json();
      return normalizeSession(data);
    } catch (error) {
      console.error("[Auth] Token refresh error:", error);
      return null;
    }
  }
  ```

- Edit `src/lib/auth-session.ts` - **MOST IMPORTANT CHANGE**:

  ```typescript
  export async function getSession(): Promise<SessionData | null> {
    const jar = await cookies();
    const sessionCookie = jar.get(SESSION_COOKIE)?.value;
    const timestampCookie = jar.get(SESSION_TIMESTAMP)?.value;

    if (!sessionCookie) return null;

    try {
      const session = JSON.parse(sessionCookie);

      // ⚠️ CRITICAL: This code ONLY runs when getSession() is called
      // which happens ONLY when a user makes a request (page load, API call, etc.)
      // There are NO background timers, NO intervals, NO cron jobs
      // Inactive users = ZERO server resources used

      if (!timestampCookie) {
        // Migration case: old sessions without timestamp
        await setSessionCookie(session); // Add timestamp
        return session;
      }

      // Check if token is expired
      if (isTokenExpired(session, timestampCookie)) {
        await clearSessionCookie();
        return null;
      }

      // Check if token needs refresh (within 60 seconds of expiry)
      if (isTokenExpiringSoon(session, timestampCookie)) {
        console.log("[Auth] User active and token expiring, refreshing...");

        const refreshed = await refreshAccessToken(session.refreshToken);
        if (refreshed) {
          await setSessionCookie(refreshed); // Resets timestamp
          return refreshed;
        }

        // Refresh failed (refresh token might be expired)
        await clearSessionCookie();
        return null;
      }

      return session; // Token still valid, no refresh needed
    } catch (error) {
      console.error("[Auth] Session parse error:", error);
      return null;
    }
  }
  ```

- **Cookie Settings**:

  ```typescript
  export async function setSessionCookie(session: SessionData): Promise<void> {
    const jar = await cookies();
    const maxAge = 30 * 24 * 60 * 60; // 30 days (match refresh token lifetime)

    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge,
    };

    jar.set(SESSION_COOKIE, JSON.stringify(session), cookieOptions);
    jar.set(SESSION_TIMESTAMP, Date.now().toString(), cookieOptions);
  }
  ```

- Optional: `src/app/api/oturum/yenile/route.ts` (POST)
  - Manual refresh endpoint for testing or future "Keep me logged in" button
  - Still requires active user action to trigger

- **Performance Expectations**:
  - 10,000 total sessions, 1,000 active users = ~1,000 refreshes/hour (not 40,000!)
  - Inactive browser tabs = ZERO refreshes
  - Closed browsers = ZERO refreshes
- Acceptance criteria:
  - NO refresh occurs for inactive users
  - Refresh ONLY during active requests when token near expiry
  - Test: Close browser for 20 minutes → no server activity
  - Test: Return after 20 minutes → automatic refresh on first request
  - Monitor: Refresh rate should be ≤4 per hour per ACTIVE user

### 1.3 Rate Limiting (Production-Ready from Start)

- New: `src/lib/security/rate-limit.ts`

  **Important Decision**: Since this is serverless/edge, skip in-memory and go straight to distributed storage:

  ```typescript
  // Option 1: Vercel KV (if on Vercel)
  import { kv } from "@vercel/kv";

  // Option 2: Upstash Redis (works everywhere)
  import { Redis } from "@upstash/redis";

  export async function rateLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
    const identifier = `rate_limit:${key}`;
    const now = Date.now();
    const window = Math.floor(now / windowMs);
    const windowKey = `${identifier}:${window}`;

    const current = await kv.incr(windowKey);

    if (current === 1) {
      await kv.expire(windowKey, Math.ceil(windowMs / 1000));
    }

    return current <= limit;
  }
  ```

- Apply rate limiting with exponential backoff:

  ```typescript
  // In auth actions
  const ip = headers().get("x-forwarded-for") || "unknown";
  const limitKey = `signin:${ip}`;

  if (!(await rateLimit(limitKey, 5, 60000))) {
    // 5 attempts per minute
    return { ok: false, message: "Çok fazla deneme. Lütfen bekleyin." };
  }
  ```

- Acceptance criteria:
  - 6th login attempt within 1 minute returns 429
  - Different IPs have independent limits
  - Rate limit data persists across serverless invocations

---

## Phase 2 — Architecture & CSRF (Day 3–4)

### 2.1 Centralized Auth Middleware

- New: `middleware.ts`

  ```typescript
  import { NextResponse } from "next/server";
  import type { NextRequest } from "next/server";

  // Simple session check without importing server-only modules
  function hasValidSession(request: NextRequest): boolean {
    const session = request.cookies.get("nhostSession");
    const timestamp = request.cookies.get("nhostSessionTime");

    if (!session?.value || !timestamp?.value) return false;

    try {
      const sessionData = JSON.parse(session.value);
      const elapsed = (Date.now() - parseInt(timestamp.value)) / 1000;
      const expiresIn = sessionData.accessTokenExpiresIn || 900;
      return elapsed < expiresIn; // Don't check "expiring soon" in middleware
    } catch {
      return false;
    }
  }

  export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define route types
    const publicRoutes = ["/", "/hakkinda", "/iletisim"];
    const guestOnlyRoutes = ["/login", "/signup", "/kayit", "/giris"];
    const authRequiredRoutes = ["/profil", "/mesajlar", "/ayarlar"];
    const authRequiredApiRoutes = ["/api/kullanici", "/api/mesaj"];

    const isPublic = publicRoutes.some((r) => path === r);
    const isGuestOnly = guestOnlyRoutes.some((r) => path.startsWith(r));
    const isAuthRequired = authRequiredRoutes.some((r) => path.startsWith(r));
    const isAuthApi = authRequiredApiRoutes.some((r) => path.startsWith(r));

    const hasSession = hasValidSession(request);

    // Redirect logic with next param preservation
    if (!hasSession && (isAuthRequired || isAuthApi)) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    if (hasSession && isGuestOnly) {
      const next = request.nextUrl.searchParams.get("next");
      const url = request.nextUrl.clone();
      url.pathname = next || "/";
      url.searchParams.delete("next");
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
  };
  ```

- Acceptance criteria:
  - Unauthenticated users redirected from `/profil` to `/login?next=/profil`
  - Authenticated users redirected from `/login` to `/` or `next` param
  - Public routes accessible to all

### 2.2 Session Management Module

- Consolidate all session logic in `src/lib/auth/session.ts`:

  ```typescript
  // Move all session-related functions here
  export { getSession, setSessionCookie, clearSessionCookie };

  // Add new utilities
  export async function rotateSession(): Promise<SessionData | null> {
    const session = await getSession();
    if (!session?.refreshToken) return null;

    // Force refresh even if not expired (for sensitive operations)
    const refreshed = await refreshAccessToken(session.refreshToken);
    if (refreshed) {
      await setSessionCookie(refreshed);
    }
    return refreshed;
  }

  export async function invalidateAllSessions(userId: string): Promise<void> {
    // Call Nhost to revoke all refresh tokens for user
    // Implementation depends on Nhost admin SDK
  }
  ```

### 2.3 CSRF Protection

- **Consider**: Next.js Server Actions have built-in CSRF protection. Evaluate if custom implementation is needed.

- If implementing custom CSRF:

  ```typescript
  // src/lib/security/csrf.ts
  import { randomBytes } from "crypto";

  export function generateToken(): string {
    return randomBytes(32).toString("hex");
  }

  export async function createCsrfToken(): Promise<string> {
    const token = generateToken();
    const jar = await cookies();

    jar.set("csrfToken", token, {
      httpOnly: true,
      sameSite: "strict", // Strict for CSRF
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour
    });

    return token;
  }

  export async function verifyCsrfToken(token: string): Promise<boolean> {
    const jar = await cookies();
    const storedToken = jar.get("csrfToken")?.value;
    return storedToken === token && !!token;
  }
  ```

- Apply to sensitive actions:
  ```typescript
  // In forms
  export async function sensitiveAction(formData: FormData) {
    const csrfToken = formData.get("_csrf") as string;
    if (!(await verifyCsrfToken(csrfToken))) {
      return { error: "Invalid request" };
    }
    // ... rest of action
  }
  ```

---

## Phase 3 — Subscriptions

### 3.1 Subscription Token Exchange

- New: `/api/abonelik/belirteci/route.ts` (GET not POST - it's idempotent)

  ```typescript
  import { NextResponse } from "next/server";
  import { getSession } from "@/lib/auth/session";
  import { SignJWT } from "jose";

  export async function GET() {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Create short-lived token for WebSocket
    const secret = new TextEncoder().encode(process.env.SUBSCRIPTION_TOKEN_SECRET!);

    const token = await new SignJWT({
      sub: session.user?.id,
      email: session.user?.email,
      // Hasura claims
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": session.user?.id,
      },
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("5m") // Short-lived for security
      .sign(secret);

    return NextResponse.json({
      token,
      expiresIn: 300, // 5 minutes
    });
  }
  ```

  Environment:
  - `SUBSCRIPTION_TOKEN_SECRET`: MUST match Hasura JWT secret used for verifying client JWTs. Coordinate with Nhost/Hasura configuration so claims are accepted.

### 3.2 Subscription Provider (Client-Side Exception)

- **NOTE: WebSockets are the ONLY exception to on-demand refresh pattern**
- Client must actively refresh tokens for persistent connections

- New: `src/lib/subscriptions/provider.tsx`

  ```typescript
  "use client";

  import { createContext, useContext, useEffect, useRef, useCallback } from "react";
  import { Client, cacheExchange, fetchExchange, subscriptionExchange } from "urql";
  import { createClient as createWSClient } from "graphql-ws";

  export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
    const wsClientRef = useRef<any>(null);
    const refreshTimeoutRef = useRef<NodeJS.Timeout>();

    const initializeWebSocket = useCallback(async () => {
      try {
        // Get token from our exchange endpoint
        const res = await fetch("/api/abonelik/belirteci");
        if (!res.ok) throw new Error("Failed to get subscription token");

        const { token, expiresIn } = await res.json();

        // Close existing connection
        if (wsClientRef.current) {
          wsClientRef.current.dispose();
        }

        // Create new WebSocket client
        const wsUrl = process.env
          .NEXT_PUBLIC_NHOST_GRAPHQL_URL!.replace(/^https:/, "wss:")
          .replace(/^http:/, "ws:");

        wsClientRef.current = createWSClient({
          url: wsUrl,
          connectionParams: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        // Schedule refresh ONLY while connected
        // Refresh at 80% of token lifetime (4 minutes for 5-minute tokens)
        const refreshIn = expiresIn * 0.8 * 1000;

        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = setTimeout(() => {
          if (wsClientRef.current) {
            // Only if still connected
            console.log("[Subscriptions] Refreshing WebSocket token...");
            initializeWebSocket();
          }
        }, refreshIn);
      } catch (error) {
        console.error("[Subscriptions] Failed to initialize:", error);
      }
    }, []);

    useEffect(() => {
      initializeWebSocket();

      // Cleanup when component unmounts
      return () => {
        clearTimeout(refreshTimeoutRef.current);
        if (wsClientRef.current) {
          wsClientRef.current.dispose();
        }
      };
    }, [initializeWebSocket]);

    // ... rest of provider implementation
  }
  ```

- Acceptance criteria:
  - WebSocket connects with token from exchange endpoint
  - Connection refreshes before token expires
  - No refresh occurs after component unmounts
  - Test: Leave subscription page open for 10+ minutes, verify it stays connected

---

## Phase 4 — Security Hardening

### 4.1 Security Headers

- Configure in `next.config.js` for static headers:

  ```javascript
  const securityHeaders = [
    {
      key: "X-DNS-Prefetch-Control",
      value: "on",
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
    {
      key: "X-Frame-Options",
      value: "SAMEORIGIN",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "Referrer-Policy",
      value: "origin-when-cross-origin",
    },
    {
      key: "Content-Security-Policy",
      value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
    },
  ];
  ```

- CSP configuration (adjust for your needs):
  ```javascript
  const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.nhost.run;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: *.nhost.run;
    font-src 'self';
    connect-src 'self' *.nhost.run wss://*.nhost.run;
  `;
  ```

### 4.2 Audit Logging

- New: `src/lib/audit/logger.ts`

  ```typescript
  interface AuditEvent {
    type: "signin" | "signout" | "signup" | "token_refresh" | "failed_auth";
    userId?: string;
    email?: string;
    ip?: string;
    userAgent?: string;
    metadata?: Record<string, any>;
  }

  export async function logAuditEvent(event: AuditEvent): Promise<void> {
    // In development: console log
    if (process.env.NODE_ENV === "development") {
      console.log("[Audit]", event);
      return;
    }

    // In production: Send to Nhost database or monitoring service
    try {
      // Example: Insert into auth_logs table via Nhost
      await nhost.graphql.request(INSERT_AUDIT_LOG, {
        event_type: event.type,
        user_id: event.userId,
        metadata: event.metadata,
      });
    } catch (error) {
      console.error("[Audit] Failed to log event:", error);
    }
  }
  ```

### 4.3 Session Security Enhancements

- Add device fingerprinting and session management:

  ```typescript
  // src/lib/auth/device.ts
  export function getDeviceFingerprint(headers: Headers): string {
    const ua = headers.get("user-agent") || "";
    const lang = headers.get("accept-language") || "";
    const encoding = headers.get("accept-encoding") || "";

    // Simple fingerprint - consider using fingerprintjs for production
    return Buffer.from(`${ua}|${lang}|${encoding}`).toString("base64");
  }

  // Store fingerprint in session and validate on each request
  export async function validateDeviceFingerprint(
    session: SessionData,
    currentFingerprint: string,
  ): Promise<boolean> {
    // Implement based on your security requirements
    return session.deviceFingerprint === currentFingerprint;
  }
  ```

---

## Phase 5 — Tests & Monitoring

### 5.1 Unit Tests

```typescript
// src/lib/auth/__tests__/session.test.ts
describe("Session Management", () => {
  test("expired token returns null", async () => {
    const expiredSession = {
      accessToken: "expired",
      accessTokenExpiresIn: 1, // 1 second
      createdAtMs: Date.now() - 2000, // 2 seconds ago
    };
    // Mock cookies, verify getSession returns null
  });

  test("token refreshes when expiring soon", async () => {
    // Mock session with 30 seconds remaining
    // Verify refresh is called
  });

  test("no refresh for valid tokens", async () => {
    // Mock session with 10 minutes remaining
    // Verify no refresh occurs
  });
});
```

### 5.2 E2E Tests

```typescript
// e2e/auth.spec.ts
test("auth flow with refresh", async ({ page }) => {
  // 1. Login
  await page.goto("/login");
  await page.fill('[name="email"]', "test@example.com");
  await page.fill('[name="password"]', "password");
  await page.click('[type="submit"]');

  // 2. Verify cookie is set
  const cookies = await page.context().cookies();
  expect(cookies.find((c) => c.name === "nhostSession")).toBeDefined();

  // 3. Wait for near-expiry and navigate
  // Mock time or use test token with short expiry
  await page.waitForTimeout(14 * 60 * 1000); // 14 minutes
  await page.goto("/profil");

  // 4. Verify token was refreshed (check new timestamp cookie)
  const newCookies = await page.context().cookies();
  const timestamp = newCookies.find((c) => c.name === "nhostSessionTime");
  expect(parseInt(timestamp.value)).toBeGreaterThan(Date.now() - 60000);
});
```

### 5.3 Performance Monitoring

- Track these metrics to verify on-demand pattern:

  ```typescript
  // src/lib/monitoring/metrics.ts
  export async function trackMetrics() {
    // Log to your monitoring service (e.g., Vercel Analytics, DataDog)
    track("auth.refresh", {
      timestamp: Date.now(),
      userId: session?.user?.id,
      reason: "token_expiring", // or 'manual_refresh'
    });
  }

  // Key metrics to monitor:
  // - Refresh rate per active user (target: ≤4/hour)
  // - Total refreshes vs total sessions (should be <10%)
  // - Failed refresh attempts (target: <0.1%)
  // - Average time between refreshes per user
  // - Sessions without any refresh (inactive users)
  ```

---

## Unanswered Questions — My Answers

### Hasura Configuration

- Hasura must accept the same JWT secret used for subscription tokens. Ensure:
  - Hasura JWT config’s secret equals `SUBSCRIPTION_TOKEN_SECRET` in env.
  - Claims path matches (`https://hasura.io/jwt/claims`).
  - Allowed/default roles include `user` and match your Hasura permissions.

### Refresh Token Rotation

- Nhost may return a new `refresh_token` on refresh. In `getSession()` post-refresh:
  ```ts
  const refreshed = await refreshAccessToken(session.refreshToken);
  if (refreshed) {
    const finalSession = {
      ...refreshed,
      refreshToken: refreshed.refreshToken || session.refreshToken,
    };
    await setSessionCookie(finalSession);
  }
  ```

### Dev vs Prod URLs

- `getServerAuthApiBase()`:
  - Use `NHOST_AUTH_URL` if set (local/self-hosted flexibility).
  - Otherwise, construct from `NHOST_SUBDOMAIN` and `NHOST_REGION`.
  - In dev, if no region, default to `https://${sub}.auth.local.nhost.run/v1`.

### Middleware Routes Config

- Move route lists to `src/lib/auth/routes.ts` and import in `middleware.ts` for central control.

### Concurrency on Refresh

- Use `refreshWithLock` to avoid refresh storms across concurrent requests for the same user in a single process.
  - For full distributed locking, consider a short-lived KV-based lock if needed later.

### TypeScript Types

- Use `src/lib/auth/types.ts` and unify `SessionData`/`MinimalSession` across code.

---

## Phase-by-Phase Thoughts & Alternatives

### Phase 1

- Two-cookie approach (session + timestamp) simplifies middleware checks without heavy JSON parsing; alternatively, embed timestamp into session JSON to reduce cookie count—but increases middleware parse cost.
- REST for refresh keeps parity with our signup/signin REST usage; the SDK is acceptable too if we disable any implicit background behavior.

### Phase 2

- Middleware at edge is ideal for cheap checks; we purposely avoid refresh decisions in middleware to keep it fast and deterministic.
- CSRF: rely on Server Actions CSRF where possible; implement custom CSRF only for non-Server Action routes that mutate state.

### Phase 3

- WebSockets: Only active connections should refresh; provider schedules refresh at ~80% TTL and tears down timers when unmounted.

### Phase 4

- Security headers: start with conservative CSP and iterate as we encounter blocked resources.
- Audit logging: begin with console/dev; wire to Hasura/Nhost table later with role-based constraints.

### Phase 5

- E2E: prefer cookie-based auth assertions over UI selectors to avoid flakiness.

## Critical Questions for Senior Dev

### 1. **Nhost SDK Usage Clarification**

The plan mentions `nhost-js auth.refreshSession()`. Please clarify:

- Are we creating a full Nhost client instance server-side?
- If yes, ensure it doesn't have auto-refresh enabled
- Consider using direct API calls instead to avoid SDK overhead

### 2. **Cookie Storage Strategy**

For the timestamp tracking:

- Should we use separate cookie or encode in session cookie?
- How do we handle migration of existing sessions without timestamps?

### 3. **Rate Limiting Storage**

The in-memory approach won't work with serverless. Should we:

- Start with Vercel KV/Upstash Redis immediately?
- Use edge-compatible solutions from day one?
- What's our Redis instance budget?

### 4. **CSRF Implementation**

Next.js Server Actions have built-in CSRF protection. Should we:

- Rely on Next.js built-in protection?
- Implement custom CSRF for non-Server Action endpoints?
- Use double-submit cookie pattern or synchronizer token?

### 5. **Session Rotation Strategy**

For sensitive operations (password change, payment):

- Should we rotate refresh tokens too?
- How do we handle concurrent requests during rotation?
- Do we need to invalidate old tokens immediately?

### 6. **Monitoring Infrastructure**

What's our current setup for:

- Error tracking (Sentry, Rollbar)?
- Performance monitoring (Vercel Analytics, DataDog)?
- Log aggregation (CloudWatch, LogDNA)?

---

## Migration Checklist

- [ ] Back up current auth implementation
- [ ] Deploy Phase 1 to staging
- [ ] Test with subset of internal users
- [ ] Monitor refresh rates and performance
- [ ] Deploy Phase 1 to production with feature flag
- [ ] Gradually roll out to all users
- [ ] Continue with subsequent phases

## Success Metrics

| Metric                 | Target                   | Measurement                             |
| ---------------------- | ------------------------ | --------------------------------------- |
| Token refresh failures | <0.1%                    | Failed refresh / Total refresh attempts |
| Unnecessary refreshes  | <5%                      | Refreshes when >5min remaining / Total  |
| Auth-related errors    | <0.01%                   | Auth errors / Total requests            |
| Session duration       | >7 days avg              | Average time before re-login required   |
| Server resource usage  | Linear with active users | Refresh rate vs active users            |
| Time to auth check     | <10ms                    | getSession() execution time             |

## Risk Matrix

| Risk                             | Probability | Impact | Mitigation                                      |
| -------------------------------- | ----------- | ------ | ----------------------------------------------- |
| Refresh token expires during use | Low         | High   | Graceful fallback to login with next param      |
| Rate limiting too aggressive     | Medium      | Medium | Whitelist IPs, adjustable thresholds            |
| Cookie size exceeds limit        | Low         | High   | Monitor cookie size, compress if needed         |
| WebSocket token refresh fails    | Medium      | Low    | Automatic reconnection with exponential backoff |
| Performance regression           | Low         | Medium | Comprehensive monitoring, gradual rollout       |

---

## Final Notes

1. **On-Demand Refresh is Critical**: The entire system depends on lazy evaluation. No background jobs, no timers, no cron tasks for token refresh.

2. **WebSockets are the Exception**: Only active WebSocket connections need periodic refresh while connected.

3. **Monitoring Proves Success**: Track refresh rates to verify the on-demand pattern is working.

4. **Security First**: Every phase improves security. Don't skip Phase 1.

5. **Test in Production**: Use feature flags to test with real traffic patterns.

This enhanced plan maintains your senior dev's excellent structure while clarifying the critical on-demand refresh pattern and adding specific implementation details for production readiness.
