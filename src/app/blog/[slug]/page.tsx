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
import { ArticleJsonLd, BreadcrumbJsonLd } from "./jsonld";
import { mdxComponents } from "./mdx-components";

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
  return (
    <div className="bg-soft min-h-screen">
      {/* Reading Progress Indicator */}
      <ReadingProgress />

      {/* Hero Section */}
      <header className="relative overflow-hidden border-b border-slate-200/50 bg-gradient-to-b from-slate-50 to-white dark:border-slate-700/50 dark:from-slate-900 dark:to-slate-800">
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"></div>
        <div className="relative container">
          <div className="mx-auto max-w-4xl py-16 md:py-24">
            <ArticleHeader
              title={post.data.title}
              description={post.data.description}
              date={post.data.date}
              readingTimeMinutes={post.readingTimeMinutes}
              coverImage={post.data.coverImage}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container">
        <div className="mx-auto max-w-4xl">
          <article className="relative">
            <ArticleJsonLd post={post} />
            <BreadcrumbJsonLd post={post} />

            {/* Content Wrapper */}
            <div className="prose prose-lg prose-neutral dark:prose-invert mx-auto max-w-none px-6 py-12 md:px-8 md:py-16">
              <div className="mx-auto max-w-3xl">
                <MDXRemote
                  source={post.content}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [[rehypeSlug], [rehypeAutolink, { behavior: "wrap" }]],
                    },
                  }}
                  components={mdxComponents}
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="border-t border-slate-200/50 bg-white/50 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/50">
              <div className="mx-auto max-w-3xl px-6 py-8 md:px-8">
                <div className="flex items-center justify-between">
                  {prev ? (
                    <a
                      className="group flex items-center gap-3 text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                      href={`/blog/${prev.slug}`}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-colors group-hover:bg-slate-200 dark:bg-slate-700 dark:group-hover:bg-slate-600">
                        ←
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Önceki</div>
                        <div className="font-medium">{prev.data.title}</div>
                      </div>
                    </a>
                  ) : (
                    <div />
                  )}
                  {next ? (
                    <a
                      className="group flex items-center gap-3 text-right text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                      href={`/blog/${next.slug}`}
                    >
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Sonraki</div>
                        <div className="font-medium">{next.data.title}</div>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-colors group-hover:bg-slate-200 dark:bg-slate-700 dark:group-hover:bg-slate-600">
                        →
                      </div>
                    </a>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </nav>

            {/* Support CTA */}
            <div className="border-t border-slate-200/50 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:border-slate-700/50 dark:from-slate-800 dark:to-blue-900/10">
              <div className="mx-auto max-w-3xl px-6 py-12 md:px-8">
                <SupportCTA />
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
