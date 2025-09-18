"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet } from "@/components/ui/sheet";

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
    // Track active section based on scroll position
    const headings = Array.from(document.querySelectorAll("article h2"));
    if (headings.length === 0) return;

    const OFFSET = 120; // px from top to consider a section active

    const onScroll = () => {
      let activeIndex = 0;
      for (let i = 0; i < headings.length; i++) {
        const rect = headings[i].getBoundingClientRect();
        if (rect.top - OFFSET <= 0) {
          activeIndex = i;
        } else {
          break;
        }
      }
      const id = headings[activeIndex]?.id;
      if (id) setActiveId(id);
    };

    window.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll as EventListener);
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
      <Button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed right-6 bottom-6 z-50 h-12 w-12 rounded-full p-0 shadow-lg transition-transform duration-300 hover:scale-105 lg:hidden"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 10h16M4 14h16M4 18h16"}
          />
        </svg>
      </Button>

      {/* Mobile TOC Sheet */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen} side="bottom">
        <Card className="m-4 mx-auto max-w-sm">
          <CardContent className="p-4">
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
            <ScrollArea style={{ maxHeight: "60vh" }} className="space-y-1 pr-2">
              {toc.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileOpen(false);
                  }}
                  variant="ghost"
                  size="sm"
                  className="block w-full justify-start px-2 py-1.5 text-sm font-medium"
                  style={{
                    color: activeId === item.id ? "var(--accent)" : "var(--muted-foreground)",
                    backgroundColor: activeId === item.id ? "var(--muted)" : "transparent",
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </Sheet>

      {/* Desktop TOC Sidebar */}
      <div
        className={`fixed top-1/2 right-6 z-40 -translate-y-1/2 transition-all duration-500 ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        } hidden lg:block`}
        style={{ maxHeight: "80vh" }}
      >
        <Card className="flex h-full max-w-xs flex-col">
          <CardContent className="p-4">
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
            <ScrollArea className="flex-1 pr-2" style={{ maxHeight: "calc(80vh - 120px)" }}>
              <nav className="space-y-1">
                {toc.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    variant="ghost"
                    size="sm"
                    className="block w-full justify-start px-2 py-1.5 text-sm font-medium"
                    style={{
                      color: activeId === item.id ? "var(--accent)" : "var(--muted-foreground)",
                      backgroundColor: activeId === item.id ? "var(--muted)" : "transparent",
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </nav>
            </ScrollArea>

            {/* Progress Indicator */}
            <div className="mt-4 border-t pt-3" style={{ borderColor: "var(--border)" }}>
              <div
                className="flex items-center gap-2 text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                <div
                  className="h-1 flex-1 rounded-full"
                  style={{ backgroundColor: "var(--muted)" }}
                >
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
          </CardContent>
        </Card>
      </div>
    </>
  );
}
