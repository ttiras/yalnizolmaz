"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type BlogListItem = {
  slug: string;
  title: string;
  description?: string;
  date: string; // ISO
  tags?: string[];
  coverImage?: string;
};

export function BlogIndexClient({ posts }: { posts: BlogListItem[] }) {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const allTags = useMemo(() => {
    const map = new Map<string, number>();
    posts.forEach((p) => {
      (p.tags || []).forEach((t) => map.set(t, (map.get(t) || 0) + 1));
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q));
      const matchesTags = activeTags.size === 0 || (p.tags || []).some((t) => activeTags.has(t));
      return matchesQuery && matchesTags;
    });
  }, [posts, query, activeTags]);

  function toggleTag(t: string) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }

  return (
    <div className="mx-auto w-full">
      {/* Search & Filters */}
      <div
        className="sticky top-16 z-10 mb-8 rounded-xl border backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ara: başlık, etiket, açıklama"
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 md:max-w-md"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--card)",
              color: "var(--foreground)",
            }}
            aria-label="Blogda ara"
          />
          <div className="flex flex-wrap gap-2">
            {allTags.map(([t, count]) => (
              <button
                key={t}
                onClick={() => toggleTag(t)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  activeTags.has(t)
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                }`}
                style={{
                  borderColor: activeTags.has(t) ? undefined : "var(--border)",
                  color: activeTags.has(t) ? undefined : "var(--foreground)",
                }}
                aria-pressed={activeTags.has(t)}
              >
                #{t} <span className="opacity-60">({count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm" style={{ color: "var(--muted-foreground)" }}>
        {filtered.length} sonuç
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <article
            key={p.slug}
            className="group overflow-hidden rounded-2xl border transition-all hover:shadow-xl"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
          >
            <Link href={`/blog/${p.slug}`} className="block">
              <div className="relative">
                {p.coverImage ? (
                  p.coverImage.toLowerCase().endsWith(".mp4") ? (
                    <video
                      src={p.coverImage}
                      className="aspect-[16/9] w-full object-cover"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.coverImage} alt="" className="aspect-[16/9] w-full object-cover" />
                  )
                ) : (
                  <div className="aspect-[16/9] w-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700" />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="p-4">
                <div className="mb-2 flex flex-wrap gap-2">
                  {(p.tags || []).slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border px-2 py-0.5 text-[10px]"
                      style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
                <h3
                  className="mb-1 line-clamp-2 text-base font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  {p.title}
                </h3>
                <p className="line-clamp-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                  {p.description}
                </p>
                <p className="mt-3 text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {new Date(p.date).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
