import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getSession } from "@/lib/auth-session";
import { SignOutButton } from "@/components/SignOutButton";

export async function Navbar() {
  const session = await getSession();
  const userEmail = session?.user?.email;
  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-neutral-200 backdrop-blur-md dark:border-neutral-800"
      style={{ background: "transparent", backgroundColor: "transparent" }}
    >
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          Yalnız Olmaz
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <Link href="/sizden-gelenler" className="hover:underline">
            Sizden Gelenler
          </Link>
          <ThemeToggle />
          {session ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="hidden text-xs text-neutral-600 hover:underline sm:inline"
              >
                {userEmail || "Profil"}
              </Link>
              <SignOutButton />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="hover:underline">
                Giriş
              </Link>
              <Link href="/signup" className="hover:underline">
                Kayıt
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
