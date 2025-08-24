import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  return (
    <header className="bg-background/70 sticky top-0 z-40 w-full border-b border-neutral-200 backdrop-blur-md dark:border-neutral-800">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          Yalnız Olmaz
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
