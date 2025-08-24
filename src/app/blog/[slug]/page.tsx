import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolink from "rehype-autolink-headings";
import { getAllPostSlugs, getPostBySlug, getAllPosts } from "@/lib/mdx";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { SupportCTA } from "@/components/blog/SupportCTA";
import { ArticleJsonLd, BreadcrumbJsonLd } from "./jsonld";

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
    <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl p-6">
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd post={post} />
      <ArticleHeader
        title={post.data.title}
        description={post.data.description}
        date={post.data.date}
        readingTimeMinutes={post.readingTimeMinutes}
        coverImage={post.data.coverImage}
      />
      <MDXRemote
        source={post.content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypeSlug], [rehypeAutolink, { behavior: "wrap" }]],
          },
        }}
      />
      <hr className="my-8" />
      <nav className="flex items-center justify-between text-sm">
        {prev ? (
          <a className="hover:underline" href={`/blog/${prev.slug}`}>
            ← {prev.data.title}
          </a>
        ) : (
          <span />
        )}
        {next ? (
          <a className="hover:underline" href={`/blog/${next.slug}`}>
            {next.data.title} →
          </a>
        ) : (
          <span />
        )}
      </nav>
      <SupportCTA />
    </article>
  );
}
