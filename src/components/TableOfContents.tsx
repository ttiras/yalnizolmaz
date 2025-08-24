"use client";

import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // Generate TOC from headings (only h2)
    const headings = document.querySelectorAll("article h2");
    const tocItems: TocItem[] = [];

    headings.forEach((heading) => {
      // If no ID exists, create one from the text
      if (!heading.id) {
        const text = heading.textContent || "";
        heading.id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "") // Remove special chars
          .replace(/\s+/g, "-") // Replace spaces with dashes
          .replace(/ş/g, "s")
          .replace(/ğ/g, "g")
          .replace(/ü/g, "u")
          .replace(/ı/g, "i")
          .replace(/ö/g, "o")
          .replace(/ç/g, "c");
      }

      tocItems.push({
        id: heading.id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.charAt(1)),
      });
    });

    setToc(tocItems);

    // Show TOC after a delay
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Track active section on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -60% 0%" },
    );

    const headings = document.querySelectorAll("article h2");
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [toc]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (toc.length === 0) return null;

  return (
    <>
      {/* Mobile TOC Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105 lg:hidden"
        style={{ backgroundColor: "var(--accent)", color: "var(--accent-contrast)" }}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 10h16M4 14h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Mobile TOC Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        >
          <div
            className="absolute right-6 bottom-20 left-6 mx-auto max-w-sm rounded-xl border p-4 shadow-xl backdrop-blur-sm"
            style={{
              maxHeight: "60vh",
              borderColor: "var(--border)",
              backgroundColor: "var(--card)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="mb-3 flex items-center gap-2 text-sm font-bold"
              style={{ color: "var(--foreground)" }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              İçindekiler
            </div>
            <nav
              className="toc-scroll space-y-1 overflow-y-auto pr-2"
              style={{ maxHeight: "calc(60vh - 80px)" }}
            >
              {toc.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileOpen(false);
                  }}
                  className="block w-full text-left text-sm font-medium transition-all duration-200"
                  style={{
                    color: activeId === item.id ? "var(--accent)" : "var(--muted-foreground)",
                  }}
                >
                  <div
                    className="rounded-md px-2 py-1.5 transition-colors hover:opacity-80"
                    style={{
                      backgroundColor: activeId === item.id ? "var(--muted)" : "transparent",
                    }}
                  >
                    {item.text}
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop TOC Sidebar */}
      <div
        className={`fixed top-1/2 right-6 z-40 -translate-y-1/2 transition-all duration-500 ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        } hidden lg:block`}
        style={{ maxHeight: "80vh" }}
      >
        <div
          className="flex h-full max-w-xs flex-col rounded-xl border p-4 shadow-lg backdrop-blur-sm"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--card)",
          }}
        >
          {/* Header */}
          <div
            className="mb-3 flex items-center gap-2 text-sm font-bold"
            style={{ color: "var(--foreground)" }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            İçindekiler
          </div>

          {/* TOC Items */}
          <nav
            className="toc-scroll flex-1 space-y-1 overflow-y-auto pr-2"
            style={{ maxHeight: "calc(80vh - 120px)" }}
          >
            {toc.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-sm font-medium transition-all duration-200"
                style={{
                  color: activeId === item.id ? "var(--accent)" : "var(--muted-foreground)",
                }}
              >
                <div
                  className="rounded-md px-2 py-1.5 transition-colors hover:opacity-80"
                  style={{ backgroundColor: activeId === item.id ? "var(--muted)" : "transparent" }}
                >
                  {item.text}
                </div>
              </button>
            ))}
          </nav>

          {/* Progress Indicator */}
          <div className="mt-4 border-t pt-3" style={{ borderColor: "var(--border)" }}>
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: "var(--muted-foreground)" }}
            >
              <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: "var(--muted)" }}>
                <div
                  className="bg-accent h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      100,
                      ((toc.findIndex((item) => item.id === activeId) + 1) / toc.length) * 100,
                    )}%`,
                    backgroundColor: "var(--accent)",
                  }}
                />
              </div>
              <span>
                {Math.max(1, toc.findIndex((item) => item.id === activeId) + 1)}/{toc.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
