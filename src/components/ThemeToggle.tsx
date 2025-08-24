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
      aria-label="Toggle theme"
      onClick={() => apply(opposite)}
      className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm dark:border-neutral-700"
    >
      {theme === "dark" ? "Light" : "Dark"} mode
    </button>
  );
}
