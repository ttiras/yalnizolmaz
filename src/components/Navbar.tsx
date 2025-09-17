import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { createNhostClient } from "@/app/lib/nhost/server";
import MobileNav from "@/components/MobileNav";
import AvatarMenu from "@/components/AvatarMenu";

export async function Navbar() {
  const nhost = await createNhostClient();
  const session = nhost.getUserSession();
  const user = session?.user;
  const authenticated = Boolean(session);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/60 bg-gradient-to-b from-white/80 to-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:border-neutral-800/60 dark:from-neutral-950/70 dark:to-neutral-950/40">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-full px-2 py-1 font-semibold tracking-tight transition-colors hover:bg-neutral-100/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-neutral-800/60"
          >
            Yalnız Olmaz
          </Link>
        </div>
        <nav className="hidden items-center gap-1 sm:flex">
          <Link
            href="/blog"
            className="group relative rounded-full px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:bg-neutral-100/70 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-300 dark:hover:bg-neutral-800/60 dark:hover:text-white"
          >
            Blog
            <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-neutral-400/60 transition-transform duration-300 group-hover:scale-x-100 dark:bg-slate-400/70" />
          </Link>
          <Link
            href="/sizden-gelenler"
            className="group relative rounded-full px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:bg-neutral-100/70 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-300 dark:hover:bg-neutral-800/60 dark:hover:text-white"
          >
            Sizden Gelenler
            <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-neutral-400/60 transition-transform duration-300 group-hover:scale-x-100 dark:bg-slate-400/70" />
          </Link>
          <div className="mx-1 h-6 w-px" style={{ backgroundColor: "var(--border)" }} />
          <ThemeToggle />
          {authenticated ? (
            <div className="ml-1 flex items-center gap-3">
              <AvatarMenu
                avatarUrl={user?.avatarUrl}
                displayName={user?.displayName}
                email={user?.email}
              />
            </div>
          ) : (
            <div className="ml-1 flex items-center gap-1">
              <Link
                href="/login"
                className="rounded-full px-3 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-neutral-100/70 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-300 dark:hover:bg-neutral-800/60 dark:hover:text-white"
              >
                Giriş
              </Link>
              <Link
                href="/signup"
                className="rounded-full px-3 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-neutral-100/70 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-300 dark:hover:bg-neutral-800/60 dark:hover:text-white"
              >
                Kayıt
              </Link>
            </div>
          )}
        </nav>
        <div className="relative flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <MobileNav authenticated={authenticated} />
        </div>
      </div>
    </header>
  );
}
