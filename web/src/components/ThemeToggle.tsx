"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMounted(true);

    // Get current theme from DOM to avoid hydration mismatch
    const htmlClasses = document.documentElement.classList;
    const currentTheme = htmlClasses.contains("dark") ? "dark" : "light";

    setTheme(currentTheme);
  }, []);

  function apply(next: "light" | "dark") {
    setTheme(next);

    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(next);
    html.setAttribute("data-theme", next);
    html.style.colorScheme = next;

    // Store preference
    localStorage.setItem("theme", next);
  }

  if (!mounted) {
    return (
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-300 bg-transparent dark:border-neutral-700">
        <div className="h-4 w-4 animate-pulse rounded-full bg-neutral-300 dark:bg-neutral-600" />
      </div>
    );
  }

  const opposite = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={theme === "dark" ? "Açık moda geç" : "Koyu moda geç"}
      aria-pressed={theme === "dark"}
      onClick={() => apply(opposite)}
      className="group relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-300 bg-transparent text-sm transition-all duration-200 hover:scale-105 hover:bg-neutral-100 active:scale-95 dark:border-neutral-700 dark:hover:bg-neutral-800"
    >
      <div className="relative overflow-hidden">
        {/* Sun icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`h-4 w-4 transition-all duration-300 ${
            theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
          }`}
        >
          <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
          <path d="M12 2v1a1 1 0 1 0 2 0V2a1 1 0 1 0-2 0ZM12 21v1a1 1 0 1 0 2 0v-1a1 1 0 1 0-2 0ZM22 12h-1a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2ZM3 12H2a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2ZM19.778 4.222l-.707.707a1 1 0 1 0 1.414 1.414l.707-.707a1 1 0 1 0-1.414-1.414ZM4.222 19.778l.707-.707a1 1 0 1 0-1.414-1.414l-.707.707a1 1 0 1 0 1.414 1.414ZM19.778 19.778l-.707-.707a1 1 0 1 0-1.414 1.414l.707.707a1 1 0 1 0 1.414-1.414ZM4.222 4.222l.707.707A1 1 0 1 0 6.343 3.515l-.707-.707a1 1 0 1 0-1.414 1.414Z" />
        </svg>

        {/* Moon icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${
            theme === "light" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
          }`}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" />
        </svg>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 transition-opacity duration-200 group-hover:opacity-10" />
    </button>
  );
}
