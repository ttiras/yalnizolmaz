import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";

export const revalidate = 60;

export default function BlogIndex() {
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
  const rest = items.slice(1);

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
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
          <h1
            className="heading-serif mb-4 text-4xl font-bold tracking-tight md:text-5xl"
            style={{ color: "var(--foreground)" }}
          >
            Blog
          </h1>
          <p className="max-w-2xl text-lg md:text-xl" style={{ color: "var(--muted-foreground)" }}>
            Yalnızlık, bağ ve iyileşme üzerine rehberler, deneyimler ve mikro-egzersizler.
          </p>
        </div>
      </section>

      {/* Featured */}
      {featured ? (
        <section className="relative mx-auto max-w-6xl px-6 py-10 md:px-8">
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

      {/* Search + Grid */}
      <section className="relative mx-auto max-w-6xl px-6 pb-20 md:px-8">
        <BlogIndexClient posts={rest} />
      </section>
    </main>
  );
}
