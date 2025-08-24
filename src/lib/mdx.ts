import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO
  updated?: string; // ISO
  slug?: string;
  tags?: string[];
  coverImage?: string;
  draft?: boolean;
  canonical?: string;
};

export type BlogPost = {
  slug: string;
  content: string;
  readingTimeMinutes: number;
  data: BlogFrontmatter;
};

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { content, data } = matter(raw);
  const fm = data as BlogFrontmatter;
  const rt = readingTime(content);
  return {
    slug,
    content,
    readingTimeMinutes: Math.ceil(rt.minutes),
    data: { ...fm, slug },
  };
}

export function getAllPosts(): BlogPost[] {
  return getAllPostSlugs()
    .map((slug) => getPostBySlug(slug)!)
    .filter(Boolean)
    .filter((p) => !p.data.draft)
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1));
}
