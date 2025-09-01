import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((p) => ({
    url: `${site.siteUrl}/blog/${p.slug}`,
    lastModified: p.data.updated ?? p.data.date,
    changeFrequency: "weekly" as const,
  }));

  return [
    { url: `${site.siteUrl}/`, lastModified: new Date(), changeFrequency: "weekly" },
    { url: `${site.siteUrl}/blog`, lastModified: new Date(), changeFrequency: "daily" },
    ...posts,
  ];
}
