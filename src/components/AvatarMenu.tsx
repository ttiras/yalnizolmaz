"use client";

import * as React from "react";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";
import { SignOutButton } from "@/components/SignOutButton";

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
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 focus-visible:outline-none dark:focus-visible:ring-slate-500"
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
      </button>
      {open && (
        <div
          role="menu"
          aria-label="Kullanıcı menüsü"
          className="absolute right-0 z-50 mt-2 w-52 origin-top-right rounded-xl border p-2 shadow-lg"
          style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
        >
          <Link
            role="menuitem"
            href="/profil"
            className="block rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100/70 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 dark:text-slate-200 dark:hover:bg-slate-800/70 dark:hover:text-white"
            onClick={() => setOpen(false)}
          >
            Profil
          </Link>
          <Link
            role="menuitem"
            href="/profil"
            className="block rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100/70 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 dark:text-slate-200 dark:hover:bg-slate-800/70 dark:hover:text-white"
            onClick={() => setOpen(false)}
          >
            Ayarlar
          </Link>
          <div className="my-1 h-px bg-neutral-200 dark:bg-slate-700" />
          <div className="px-1 py-1">
            <SignOutButton>Çıkış</SignOutButton>
          </div>
        </div>
      )}
    </div>
  );
}
