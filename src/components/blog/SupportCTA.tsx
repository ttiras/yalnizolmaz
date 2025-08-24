import Link from "next/link";

export function SupportCTA() {
  return (
    <section className="card mt-10 p-4">
      <h2 className="mb-1 text-lg font-medium">You’re not alone</h2>
      <p className="mb-3 text-neutral-600 dark:text-neutral-400">
        If today feels heavy, that’s okay. Take the next small step that feels gentle.
      </p>
      <div className="flex flex-wrap gap-2">
        <Link className="btn btn-primary" href="/blog">
          Read another gentle article
        </Link>
        <a className="btn" href="#breath">
          60‑second breathing break
        </a>
        <Link className="btn" href="/support">
          Talk to someone
        </Link>
      </div>
    </section>
  );
}
