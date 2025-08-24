"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMounted(true);
    const stored = (localStorage.getItem("theme") as "light" | "dark") || undefined;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (systemDark ? "dark" : "light");
    apply(initial);
  }, []);

  function apply(next: "light" | "dark") {
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  }

  if (!mounted) return null;
  const opposite = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={theme === "dark" ? "Açık moda geç" : "Koyu moda geç"}
      onClick={() => apply(opposite)}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-300 bg-transparent text-sm dark:border-neutral-700"
    >
      {theme === "dark" ? (
        // sun icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-20a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V2Zm10 10a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm14.95 6.364a1 1 0 0 1-1.414 1.415l-.707-.707a1 1 0 1 1 1.414-1.415l.707.707Zm-12.728-12.73a1 1 0 0 1-1.414 0l-.707-.706A1 1 0 0 1 4.22 3.515l.707.707a1 1 0 0 1 0 1.414ZM19.778 4.22a1 1 0 0 1 0 1.414l-.707.707A1 1 0 0 1 17.657 4.93l.707-.707a1 1 0 0 1 1.414 0Zm-12.728 12.728a1 1 0 0 1 0 1.415l-.707.707a1 1 0 1 1-1.414-1.415l.707-.707a1 1 0 0 1 1.414 0Z" />
        </svg>
      ) : (
        // moon icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" />
        </svg>
      )}
    </button>
  );
}
