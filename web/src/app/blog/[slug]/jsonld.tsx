import { site } from "@/lib/site";
import type { BlogPost } from "@/lib/mdx";

export function ArticleJsonLd({ post }: { post: BlogPost }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.data.title,
    description: post.data.description,
    datePublished: post.data.date,
    dateModified: post.data.updated ?? post.data.date,
    mainEntityOfPage: `${site.siteUrl}/blog/${post.slug}`,
    image: post.data.coverImage ? [post.data.coverImage] : undefined,
    inLanguage: "tr-TR",
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function BreadcrumbJsonLd({ post }: { post: BlogPost }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: `${site.siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.data.title,
        item: `${site.siteUrl}/blog/${post.slug}`,
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
