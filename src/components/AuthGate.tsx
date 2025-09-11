"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/use-auth";

type AuthGateProps = {
  mode?: "modal" | "inline";
  children: React.ReactNode;
};

export function AuthGate({ mode = "modal", children }: AuthGateProps) {
  const { authenticated, loading } = useAuth();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const search = useSearchParams();

  if (!loading && authenticated) return <>{children}</>;

  const next =
    typeof window !== "undefined"
      ? window.location.pathname + window.location.search + window.location.hash
      : search?.toString() || "/";
  const href = `/login?next=${encodeURIComponent(next)}`;

  if (mode === "inline") {
    return (
      <div className="flex items-center justify-between rounded-md border p-3">
        <div className="text-sm">Bu işlemi yapmak için giriş yapmalısınız.</div>
        <Button onClick={() => router.push(href)}>Giriş Yap</Button>
      </div>
    );
  }

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Giriş yapmanız gerekiyor
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Devam etmek için giriş yapın"
        description="Hesabınız yoksa hızlıca kayıt olabilirsiniz."
      >
        <div className="mt-2 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Kapat
          </Button>
          <Button onClick={() => router.push(href)}>Girişe Git</Button>
        </div>
      </Dialog>
    </>
  );
}
