"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { type Session } from "@nhost/nhost-js/auth";
import { createClient, type NhostClient } from "@nhost/nhost-js";
import { CookieStorage } from "@nhost/nhost-js/session";

interface AuthContextType {
  user: Session["user"] | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  nhost: NhostClient;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Session["user"] | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const lastRefreshTokenIdRef = useRef<string | null>(null);
  const router = useRouter();

  const nhost = useMemo(
    () =>
      createClient({
        // In the browser, only NEXT_PUBLIC_* envs are available.
        region: process.env.NEXT_PUBLIC_NHOST_REGION || process.env["NHOST_REGION"] || "local",
        subdomain:
          process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || process.env["NHOST_SUBDOMAIN"] || "local",
        storage: new CookieStorage({
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        }),
      }),
    [],
  );

  const reloadSession = useCallback(
    (currentRefreshTokenId: string | null) => {
      if (currentRefreshTokenId !== lastRefreshTokenIdRef.current) {
        lastRefreshTokenIdRef.current = currentRefreshTokenId;
        const currentSession = nhost.getUserSession();
        setUser(currentSession?.user || null);
        setSession(currentSession);
        setIsAuthenticated(!!currentSession);
        router.refresh();
      }
    },
    [nhost, router],
  );

  useEffect(() => {
    setIsLoading(true);
    const currentSession = nhost.getUserSession();
    setUser(currentSession?.user || null);
    setSession(currentSession);
    setIsAuthenticated(!!currentSession);
    lastRefreshTokenIdRef.current = currentSession?.refreshTokenId ?? null;
    setIsLoading(false);

    const unsubscribe = nhost.sessionStorage.onChange((s) => {
      reloadSession(s?.refreshTokenId ?? null);
    });
    return unsubscribe;
  }, [nhost, reloadSession]);

  useEffect(() => {
    const checkSessionOnFocus = () => {
      reloadSession(nhost.getUserSession()?.refreshTokenId ?? null);
    };
    const onVisChange = () => {
      if (!document.hidden) checkSessionOnFocus();
    };
    document.addEventListener("visibilitychange", onVisChange);
    window.addEventListener("focus", checkSessionOnFocus);
    return () => {
      document.removeEventListener("visibilitychange", onVisChange);
      window.removeEventListener("focus", checkSessionOnFocus);
    };
  }, [nhost, reloadSession]);

  const value: AuthContextType = {
    user,
    session,
    isAuthenticated,
    isLoading,
    nhost,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
