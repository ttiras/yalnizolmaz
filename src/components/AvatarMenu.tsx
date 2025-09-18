"use client";

import * as React from "react";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";
import { SignOutButton } from "@/components/SignOutButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type AvatarMenuProps = {
  avatarUrl?: string | null;
  displayName?: string | null;
  email?: string | null;
};

export default function AvatarMenu({ avatarUrl, displayName, email }: AvatarMenuProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9 w-9 rounded-full p-0"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <UserAvatar
          src={avatarUrl ?? undefined}
          name={displayName ?? null}
          email={email ?? null}
          size={28}
        />
      </Button>
      {open && (
        <Card
          role="menu"
          aria-label="Kullanıcı menüsü"
          className="absolute right-0 z-50 mt-2 w-56 origin-top-right"
        >
          <CardContent className="p-2">
            <Button asChild variant="ghost" size="sm" className="w-full justify-start">
              <Link role="menuitem" href="/profil" onClick={() => setOpen(false)}>
                Profil
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="w-full justify-start">
              <Link role="menuitem" href="/profil" onClick={() => setOpen(false)}>
                Ayarlar
              </Link>
            </Button>
            <Separator className="my-2" />
            <div className="px-1 py-1">
              <SignOutButton>Çıkış</SignOutButton>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
