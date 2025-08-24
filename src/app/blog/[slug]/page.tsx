import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolink from "rehype-autolink-headings";
import { getAllPostSlugs, getPostBySlug } from "@/lib/mdx";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { SupportCTA } from "@/components/blog/SupportCTA";

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
  return (
    <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl p-6">
      <ArticleHeader
        title={post.data.title}
        description={post.data.description}
        date={post.data.date}
        readingTimeMinutes={post.readingTimeMinutes}
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
      <SupportCTA />
    </article>
  );
}
