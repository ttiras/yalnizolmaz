"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createNhostClient } from "@/lib/nhost";
import { signOut as signOutServer } from "@/app/actions/auth";

type SignOutButtonProps = {
  children?: React.ReactNode;
};

export function SignOutButton({ children }: SignOutButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

  async function handleClick() {
    try {
      // Best-effort: clear any client-side session (localStorage, broadcast, etc.)
      const nhost = createNhostClient();
      try {
        await nhost.auth.signOut({ all: true });
      } catch {
        // ignore; we still clear the server cookie below
      }
      try {
        // Proactively clear any nhost-* keys from storage in case SDK keys changed
        if (typeof window !== "undefined") {
          for (const k of Object.keys(localStorage)) {
            if (k.toLowerCase().startsWith("nhost")) localStorage.removeItem(k);
          }
          for (const k of Object.keys(sessionStorage)) {
            if (k.toLowerCase().startsWith("nhost")) sessionStorage.removeItem(k);
          }
        }
      } catch {}
      await signOutServer();
    } finally {
      // Stay on the same page and refresh the data/UI
      startTransition(() => router.refresh());
    }
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleClick} disabled={pending}>
      {children ?? (pending ? "Çıkılıyor..." : "Çıkış")}
    </Button>
  );
}
