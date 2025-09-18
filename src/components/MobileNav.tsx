"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/SignOutButton";
import { Card, CardContent } from "@/components/ui/card";

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
        <>
          <div
            className="fixed inset-x-0 top-14 bottom-0 z-40 bg-black/30"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <Card id="mobile-menu" className="absolute right-0 z-50 mt-3 w-56 origin-top-right">
            <CardContent className="p-2">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => setOpen(false)}
              >
                <Link href="/blog">Blog</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => setOpen(false)}
              >
                <Link href="/sizden-gelenler">Sizden Gelenler</Link>
              </Button>
              {authenticated ? (
                <>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/profil">Profil</Link>
                  </Button>
                  <div className="px-1 py-2" onClick={() => setOpen(false)}>
                    <SignOutButton>Çıkış</SignOutButton>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/login">Giriş</Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/signup">Kayıt</Link>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
