import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolink from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { getAllPostSlugs, getPostBySlug } from "@/lib/mdx";
import type { Metadata } from "next";
import { site } from "@/lib/site";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
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

export default function BlogPost({ params }: Params) {
  const post = getPostBySlug(params.slug);
  if (!post) return null;
  return (
    <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl p-6">
      <header className="mb-6">
        <h1 className="mb-2 text-3xl font-semibold">{post.data.title}</h1>
        <p className="text-sm text-neutral-500">
          {new Date(post.data.date).toDateString()} • {post.readingTimeMinutes} min read
        </p>
      </header>
      <MDXRemote
        source={post.content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypeSlug], [rehypeAutolink, { behavior: "wrap" }]],
          },
        }}
      />
    </article>
  );
}
