import { render, screen } from "@testing-library/react";
import { ArticleHeader } from "./ArticleHeader";

describe("ArticleHeader", () => {
  const baseProps = {
    title: "Test Başlık",
    description: "Açıklama",
    date: "2024-01-01",
    readingTimeMinutes: 5,
    url: "https://example.com/blog/test",
    tags: ["yalnizlik", "psikoloji"],
    author: "Yazar Adı",
  } as const;

  test("renders with image cover and shows tags/author/share", () => {
    render(<ArticleHeader {...baseProps} coverImage="/images/cover.jpg" />);

    expect(screen.getByRole("heading", { name: baseProps.title })).toBeInTheDocument();
    expect(screen.getByText(baseProps.description)).toBeInTheDocument();
    expect(screen.getByText(`#${baseProps.tags[0]}`)).toBeInTheDocument();
    expect(screen.getByText(baseProps.author!)).toBeInTheDocument();
    // Share label
    expect(screen.getByText("Paylaş")).toBeInTheDocument();
    // Image present (allowed as plain img in component)
    const img = document.querySelector("img");
    expect(img).toBeTruthy();
    expect(img).toHaveAttribute("src", "/images/cover.jpg");
  });

  test("renders with video cover when mp4 provided", () => {
    render(<ArticleHeader {...baseProps} coverImage="/videos/cover.mp4" />);
    // JSDOM doesn't know role video; query by tag
    const byTag = document.querySelector("video");
    expect(byTag).toBeTruthy();
    expect(byTag).toHaveAttribute("src", "/videos/cover.mp4");
  });
});
