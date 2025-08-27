import { render } from "@testing-library/react";
import { ArticleJsonLd, BreadcrumbJsonLd } from "./jsonld";
import type { BlogPost } from "@/lib/mdx";

const fakePost: BlogPost = {
  slug: "test",
  content: "# Hello",
  readingTimeMinutes: 3,
  data: {
    title: "Test",
    description: "Desc",
    date: "2024-01-01",
    coverImage: "/cover.jpg",
  },
};

describe("JSON-LD components", () => {
  test("ArticleJsonLd outputs a script tag with ld+json", () => {
    const { container } = render(<ArticleJsonLd post={fakePost} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();
    expect(script!.textContent).toContain('"@type":"Article"');
  });

  test("BreadcrumbJsonLd outputs a script tag with ld+json", () => {
    const { container } = render(<BreadcrumbJsonLd post={fakePost} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();
    expect(script!.textContent).toContain('"@type":"BreadcrumbList"');
  });
});
