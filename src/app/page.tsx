import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export default function Home() {
  const posts = getAllPosts();
  const items = posts.map((p) => ({
    slug: p.slug,
    title: p.data.title,
    description: p.data.description,
    date: p.data.date,
    tags: p.data.tags || [],
    coverImage: p.data.coverImage,
  }));

  const featured = items[0];
  const latest = items.slice(1, 7);

  return (
    <main className="relative">
      {/* Hero */}
      <section
        className="relative overflow-hidden border-b"
        style={{
          borderColor: "var(--border)",
          background: "linear-gradient(to bottom, var(--background), var(--card))",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center md:px-8 md:py-28">
          <h1
            className="mb-4 text-4xl font-bold tracking-tight md:text-6xl"
            style={{ color: "var(--foreground)" }}
          >
            Yalnız Olmaz
          </h1>
          <p
            className="mx-auto max-w-2xl text-lg md:text-xl"
            style={{ color: "var(--muted-foreground)" }}
          >
            Yalnızlık duygusunu anlamak, dönüştürmek ve bağ kurmak için sakin, pratik içerikler.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/blog"
              className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--accent)",
                color: "var(--accent-contrast)",
              }}
            >
              Bloga Git
            </Link>
            <Link
              href="/blog/yalnizlik-sozleri"
              className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
            >
              Yalnızlık sözleri
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured ? (
        <section className="relative mx-auto max-w-6xl px-6 py-12 md:px-8">
          <Link href={`/blog/${featured.slug}`} className="group grid gap-6 md:grid-cols-2">
            <div
              className="overflow-hidden rounded-2xl border"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
            >
              {featured.coverImage ? (
                featured.coverImage.toLowerCase().endsWith(".mp4") ? (
                  <video
                    src={featured.coverImage}
                    className="aspect-[16/9] w-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.coverImage}
                    alt=""
                    className="aspect-[16/9] w-full object-cover"
                  />
                )
              ) : (
                <div className="aspect-[16/9] w-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700" />
              )}
            </div>
            <div className="self-center">
              <div className="mb-3 flex flex-wrap gap-2">
                {(featured.tags || []).slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border px-2 py-0.5 text-[10px]"
                    style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
              <h2
                className="mb-2 text-2xl font-semibold md:text-3xl"
                style={{ color: "var(--foreground)" }}
              >
                {featured.title}
              </h2>
              <p className="mb-4 max-w-prose" style={{ color: "var(--muted-foreground)" }}>
                {featured.description}
              </p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                {new Date(featured.date).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </Link>
        </section>
      ) : null}

      {/* Latest */}
      <section className="relative mx-auto max-w-6xl px-6 pb-20 md:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold" style={{ color: "var(--foreground)" }}>
            Son Yazılar
          </h3>
          <Link
            href="/blog"
            className="text-sm transition-colors hover:opacity-80"
            style={{ color: "var(--accent)" }}
          >
            Tümünü Gör
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((p) => (
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
                      <img
                        src={p.coverImage}
                        alt=""
                        className="aspect-[16/9] w-full object-cover"
                      />
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
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24 md:px-8">
        <div
          className="overflow-hidden rounded-2xl border p-8 text-center md:p-10"
          style={{
            borderColor: "var(--border)",
            background:
              "linear-gradient(135deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
          }}
        >
          <h3 className="mb-2 text-2xl font-semibold" style={{ color: "var(--foreground)" }}>
            Blogda daha fazlası var
          </h3>
          <p className="mx-auto mb-6 max-w-xl" style={{ color: "var(--muted-foreground)" }}>
            Kısa okuma seansları ve pratik önerilerle yalnızlık duygusunu birlikte dönüştürelim.
          </p>
          <Link
            href="/blog"
            className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--accent)",
              color: "var(--accent-contrast)",
            }}
          >
            Bloga Git
          </Link>
        </div>
      </section>
    </main>
  );
}
