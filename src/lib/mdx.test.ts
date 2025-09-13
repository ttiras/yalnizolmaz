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

    // Check that posts are sorted by date in descending order (newest first)
    for (let i = 0; i < posts.length - 1; i++) {
      const currentDate = new Date(posts[i]!.data.date);
      const nextDate = new Date(posts[i + 1]!.data.date);
      expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
    }

    // Check that no draft posts are included
    const hasDraftPosts = posts.some((p) => p.data.draft === true);
    expect(hasDraftPosts).toBe(false);
  });
});
