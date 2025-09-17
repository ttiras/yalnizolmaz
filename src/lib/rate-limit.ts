import "server-only";

type AllowResult =
  | {
      ok: true;
      remaining: number;
      resetSeconds: number;
    }
  | {
      ok: false;
      retryAfterSeconds: number;
    };

interface RateLimiter {
  allow(key: string): Promise<AllowResult>;
}

const WINDOW_SEC = Number(process.env.RATE_LIMIT_WINDOW || 60);
const MAX_IN_WINDOW = Number(process.env.RATE_LIMIT_MAX || 5);

class MemoryRateLimiter implements RateLimiter {
  private store = new Map<string, { count: number; resetAt: number }>();

  async allow(key: string): Promise<AllowResult> {
    const now = Math.floor(Date.now() / 1000);
    const entry = this.store.get(key);
    if (!entry || entry.resetAt <= now) {
      this.store.set(key, { count: 1, resetAt: now + WINDOW_SEC });
      return { ok: true, remaining: MAX_IN_WINDOW - 1, resetSeconds: WINDOW_SEC };
    }
    if (entry.count < MAX_IN_WINDOW) {
      entry.count += 1;
      return {
        ok: true,
        remaining: MAX_IN_WINDOW - entry.count,
        resetSeconds: entry.resetAt - now,
      };
    }
    return { ok: false, retryAfterSeconds: entry.resetAt - now };
  }
}

export function getRateLimiter(): RateLimiter {
  // Persist across dev HMR using a global reference
  const g = globalThis as unknown as { __rateLimiter?: RateLimiter };
  if (g.__rateLimiter) return g.__rateLimiter;
  // Placeholder for future Upstash/Vercel KV implementation
  // If envs for Upstash are present, swap to a KV-backed limiter here.
  g.__rateLimiter = new MemoryRateLimiter();
  return g.__rateLimiter;
}

export function rateLimitKeyFromHeaders(h: Headers, extra: string = ""): string {
  const ip = h.get("x-real-ip") || h.get("x-forwarded-for") || "unknown";
  return `${ip}|${extra}`;
}

export function applyRateLimitHeaders(resp: Response, result: AllowResult): Response {
  const headers = new Headers(resp.headers);
  headers.set("X-RateLimit-Window", String(WINDOW_SEC));
  headers.set("X-RateLimit-Limit", String(MAX_IN_WINDOW));
  if (result.ok) {
    headers.set("X-RateLimit-Remaining", String(result.remaining));
    headers.set("X-RateLimit-Reset", String(result.resetSeconds));
  } else {
    headers.set("Retry-After", String(result.retryAfterSeconds));
  }
  return new Response(resp.body, { status: resp.status, headers });
}
