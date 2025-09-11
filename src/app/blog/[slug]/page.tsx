import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolink from "rehype-autolink-headings";
import { getAllPostSlugs, getPostBySlug, getAllPosts } from "@/lib/mdx";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { SupportCTA } from "@/components/blog/SupportCTA";
import { ReadingProgress } from "@/components/ReadingProgress";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleJsonLd, BreadcrumbJsonLd } from "./jsonld";
import { mdxComponents } from "./mdx-components";
import SizdenGelenlerForPost from "@/components/interactions/sizden-gelenler/SizdenGelenlerForPost";
import CommentsSection from "@/components/interactions/comments/CommentsSection";
import { getSession } from "@/lib/auth-session";
import { getInitialComments } from "@/lib/comments/mockServer";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `${site.siteUrl}/blog/${post.slug}`;
  return {
    title: post.data.title,
    description: post.data.description,
    alternates: { canonical: post.data.canonical ?? url },
    openGraph: {
      title: post.data.title,
      description: post.data.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.data.title,
      description: post.data.description,
    },
  };
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return null;
  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  // Get initial comments for the blog post
  const { totalCount, comments } = await getInitialComments(slug, 5);
  const session = await getSession();
  return (
    <div className="bg-soft min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      {/* Reading Progress Indicator */}
      <ReadingProgress />

      {/* Table of Contents */}
      <TableOfContents />

      {/* Hero Section */}
      <header
        className="relative overflow-hidden border-b"
        style={{
          borderColor: "var(--border)",
          background: "transparent",
        }}
      >
        {/* replace grid.svg with soft gradient glow */}
        <div className="absolute inset-0 opacity-70">
          <div className="absolute -inset-x-20 -top-40 h-72 bg-gradient-to-r from-fuchsia-400/10 via-cyan-400/10 to-amber-400/10 blur-3xl" />
          <div className="absolute -inset-x-20 top-10 h-72 bg-gradient-to-r from-cyan-400/10 via-amber-400/10 to-fuchsia-400/10 blur-3xl" />
        </div>
        <div className="relative container">
          <div className="mx-auto max-w-4xl py-16 md:py-24">
            <ArticleHeader
              title={post.data.title}
              description={post.data.description}
              date={post.data.date}
              readingTimeMinutes={post.readingTimeMinutes}
              coverImage={post.data.coverImage}
              url={`${site.siteUrl}/blog/${post.slug}`}
              tags={post.data.tags || []}
              author={post.data.author}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        <article className="relative">
          <ArticleJsonLd post={post} />
          <BreadcrumbJsonLd post={post} />

          {/* Content Wrapper with Side Decorations */}
          <div className="relative">
            {/* Left Side Decoration */}
            <div className="absolute top-0 left-0 hidden h-full w-64 lg:block">
              <div className="sticky top-32 space-y-8 p-8 opacity-20">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 blur-2xl"></div>
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 blur-2xl"></div>
              </div>
            </div>

            {/* Right Side Decoration */}
            <div className="absolute top-0 right-0 hidden h-full w-64 lg:block">
              <div className="sticky top-32 space-y-8 p-8 opacity-20">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 blur-2xl"></div>
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-emerald-200 to-teal-200 blur-2xl"></div>
              </div>
            </div>

            {/* Main Content Container */}
            <div className="relative container">
              <div className="prose prose-lg prose-neutral dark:prose-invert mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">
                <MDXRemote
                  source={post.content}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [
                        [rehypeSlug],
                        [
                          rehypeAutolink,
                          { behavior: "wrap", test: ["h2", "h3", "h4", "h5", "h6"] },
                        ],
                      ],
                    },
                  }}
                  components={mdxComponents}
                />
              </div>
            </div>
          </div>

          {/* Sizden Gelenler Section - for ALL posts */}
          <div className="relative container">
            <div className="mx-auto max-w-4xl px-6 py-12 md:px-8">
              <SizdenGelenlerForPost slug={slug} />

              {/* Link to full contributions page */}
              <div className="mt-6 text-center">
                <Link
                  href={`/sizden-gelenler/${slug}`}
                  className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:opacity-80"
                  style={{ borderColor: "var(--border)", color: "var(--accent)" }}
                >
                  Tüm katkıları görüntüle
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="relative container">
            <div className="mx-auto max-w-4xl px-6 py-12 md:px-8">
              <CommentsSection
                slug={slug}
                totalCount={totalCount}
                initialComments={comments}
                loggedIn={Boolean(session)}
              />
            </div>
          </div>

          {/* Enhanced Navigation */}
          <nav className="relative mt-16 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
              }}
            ></div>
            <div className="relative mx-auto max-w-5xl px-6 py-12 md:px-8">
              <h3
                className="mb-8 text-center text-sm font-medium tracking-wider uppercase"
                style={{ color: "var(--muted-foreground)" }}
              >
                Diğer Yazılar
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                {prev ? (
                  <a
                    className="group relative overflow-hidden rounded-xl border p-6 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-xl"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "var(--card)",
                    }}
                    href={`/blog/${prev.slug}`}
                  >
                    <div
                      className="absolute top-1/2 -left-2 -translate-y-1/2 text-6xl font-bold"
                      style={{ color: "var(--muted)" }}
                    >
                      ←
                    </div>
                    <div className="relative">
                      <div
                        className="mb-1 text-xs font-medium tracking-wider uppercase"
                        style={{ color: "var(--accent)" }}
                      >
                        Önceki Yazı
                      </div>
                      <div
                        className="font-serif text-lg font-medium transition-colors"
                        style={{ color: "var(--foreground)" }}
                      >
                        {prev.data.title}
                      </div>
                    </div>
                  </a>
                ) : (
                  <div />
                )}
                {next ? (
                  <a
                    className="group relative overflow-hidden rounded-xl border p-6 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-xl md:text-right"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "var(--card)",
                    }}
                    href={`/blog/${next.slug}`}
                  >
                    <div
                      className="absolute top-1/2 -right-2 -translate-y-1/2 text-6xl font-bold"
                      style={{ color: "var(--muted)" }}
                    >
                      →
                    </div>
                    <div className="relative">
                      <div
                        className="mb-1 text-xs font-medium tracking-wider uppercase"
                        style={{ color: "var(--accent)" }}
                      >
                        Sonraki Yazı
                      </div>
                      <div
                        className="font-serif text-lg font-medium transition-colors"
                        style={{ color: "var(--foreground)" }}
                      >
                        {next.data.title}
                      </div>
                    </div>
                  </a>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </nav>

          {/* Enhanced Support CTA */}
          <div className="relative mt-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900"></div>
            <div
              className="absolute inset-0 bg-center opacity-10"
              style={{
                background: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            ></div>
            <div className="relative mx-auto max-w-4xl px-6 py-16 text-center md:px-8 md:py-20">
              <div className="mx-auto max-w-2xl">
                <SupportCTA />
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
