import { render, screen, act } from "@testing-library/react";
import { TableOfContents } from "./TableOfContents";
import { vi } from "vitest";

describe("TableOfContents", () => {
  test("renders basic TOC for h2 headings", () => {
    vi.useFakeTimers();

    // Seed document with headings inside an article
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <article>
        <h2>Birinci Bölüm</h2>
        <p>...</p>
        <h2>İkinci Bölüm</h2>
      </article>
    `;
    document.body.appendChild(wrapper);

    render(<TableOfContents />);

    // Component shows after 1s delay
    act(() => {
      vi.advanceTimersByTime(1100);
    });

    // Header label
    expect(screen.getAllByText("İçindekiler")[0]).toBeInTheDocument();
    // Item texts
    expect(screen.getAllByText("Birinci Bölüm")[0]).toBeInTheDocument();
    expect(screen.getAllByText("İkinci Bölüm")[0]).toBeInTheDocument();

    vi.useRealTimers();
  });
});
