"use client";

import * as React from "react";

export function useAuth() {
  const [authenticated, setAuthenticated] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [email, setEmail] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/auth/session", { cache: "no-store" });
        const j = await res.json();
        if (!cancelled) {
          setAuthenticated(Boolean(j?.authenticated));
          setEmail(j?.user?.email ?? null);
        }
      } catch {
        if (!cancelled) setAuthenticated(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { authenticated, loading, email } as const;
}
