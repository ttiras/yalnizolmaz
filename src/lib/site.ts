export type SiteConfig = {
  siteUrl: string;
  siteName: string;
  description: string;
};

export const site: SiteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  siteName: "yalnizolmaz",
  description: "Thoughts on software, startups, and beyond.",
};
