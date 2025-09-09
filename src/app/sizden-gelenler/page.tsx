import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { contribTypeBySlug } from "@/lib/contribConfig";

export const metadata = {
  title: "Sizden Gelenler | yalnizolmaz",
  description: "Yalnızlık teması etrafında topluluktan gelen öneriler, deneyimler ve paylaşımlar.",
};

export default function ContributionsPage() {
  const posts = getAllPosts();

  // Filter posts that have contributions enabled
  const contribPosts = posts.filter((post) => {
    const contribType = contribTypeBySlug(post.slug);
    return contribType !== "none";
  });

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
            Sizden Gelenler
          </h1>
          <p className="max-w-2xl text-lg md:text-xl" style={{ color: "var(--muted-foreground)" }}>
            Topluluktan gelen öneriler, deneyimler ve paylaşımlar. Yalnızlık teması etrafında bir
            araya gelen hikayeler.
          </p>
        </div>
      </section>

      {/* Contributions by Category */}
      <section className="relative mx-auto max-w-6xl px-6 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contribPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/sizden-gelenler/${post.slug}`}
              className="group overflow-hidden rounded-2xl border transition-all hover:shadow-xl"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
            >
              <div className="p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  {(post.data.tags || []).slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-2 py-0.5 text-[10px]"
                      style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <h3 className="mb-2 text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                  {post.data.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                  {post.data.description}
                </p>
                <div
                  className="mt-4 flex items-center text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <span>Topluluk katkıları →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
