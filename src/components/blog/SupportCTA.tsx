import Link from "next/link";

export function SupportCTA() {
  return (
    <section className="mt-10 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
      <h2 className="mb-1 text-lg font-medium">You’re not alone</h2>
      <p className="mb-3 text-neutral-600 dark:text-neutral-400">
        If today feels heavy, that’s okay. Take the next small step that feels gentle.
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          className="rounded-md bg-neutral-900 px-3 py-1.5 text-white dark:bg-neutral-100 dark:text-black"
          href="/blog"
        >
          Read another gentle article
        </Link>
        <a
          className="rounded-md border border-neutral-300 px-3 py-1.5 dark:border-neutral-700"
          href="#breath"
        >
          60‑second breathing break
        </a>
        <Link
          className="rounded-md border border-neutral-300 px-3 py-1.5 dark:border-neutral-700"
          href="/support"
        >
          Talk to someone
        </Link>
      </div>
    </section>
  );
}
