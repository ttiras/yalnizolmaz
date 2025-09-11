"use client";

import { useRouter } from "next/navigation";

export function useRedirectToLogin() {
  const router = useRouter();
  return function redirectToLoginPreservingLocation() {
    if (typeof window === "undefined") return;
    const target = `${location.pathname}${location.search}${location.hash}`;
    router.push(`/login?next=${encodeURIComponent(target)}`);
  };
}
