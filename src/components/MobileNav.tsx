"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/SignOutButton";

type MobileNavProps = {
  authenticated: boolean;
};

export default function MobileNav({ authenticated }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onRoute() {
      setOpen(false);
    }
    window.addEventListener("hashchange", onRoute);
    return () => window.removeEventListener("hashchange", onRoute);
  }, []);

  return (
    <div className="sm:hidden">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9 w-9 p-0"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        onClick={() => setOpen((v) => !v)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          {open ? (
            <path d="M18 6 6 18M6 6l12 12" />
          ) : (
            <>
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </>
          )}
        </svg>
      </Button>
      {open && (
        <div
          id="mobile-menu"
          className="absolute right-0 mt-3 w-56 origin-top-right rounded-xl border p-2 shadow-lg"
          style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
        >
          <Link
            href="/blog"
            className="block px-1 py-2 text-sm hover:underline dark:text-neutral-300"
          >
            Blog
          </Link>
          <Link
            href="/sizden-gelenler"
            className="block px-1 py-2 text-sm hover:underline dark:text-neutral-300"
          >
            Sizden Gelenler
          </Link>
          {authenticated ? (
            <>
              <Link href="/profil" className="block px-1 py-2 text-sm hover:underline">
                Profil
              </Link>
              <div className="px-1 py-2">
                <SignOutButton>Çıkış</SignOutButton>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="block px-1 py-2 text-sm hover:underline">
                Giriş
              </Link>
              <Link href="/signup" className="block px-1 py-2 text-sm hover:underline">
                Kayıt
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
