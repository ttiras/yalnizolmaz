import { describe, it, expect } from "vitest";
import { getAllPostSlugs, getPostBySlug, getAllPosts } from "./mdx";

describe("mdx lib", () => {
  it("returns slugs for all posts", () => {
    const slugs = getAllPostSlugs();
    expect(Array.isArray(slugs)).toBe(true);
    expect(slugs.length).toBeGreaterThan(0);
  });

  it("fetches a post by slug with frontmatter and content", () => {
    const slugs = getAllPostSlugs();
    const post = getPostBySlug(slugs[0]!);
    expect(post).toBeTruthy();
    expect(post!.slug).toBe(slugs[0]);
    expect(typeof post!.content).toBe("string");
    expect(post!.data.title).toBeTruthy();
  });

  it("returns posts sorted by date desc and filters drafts", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    const times = posts.map((p) => new Date(p.data.date).getTime());
    const sorted = [...times].sort((a, b) => b - a);
    expect(times).toEqual(sorted);
  });
});
