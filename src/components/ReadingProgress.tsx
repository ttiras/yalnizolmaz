"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / scrollHeight) * 100;
      setProgress(Math.min(scrolled, 100));
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress(); // Initial calculation

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1">
      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-200/30 via-cyan-200/30 to-amber-200/30 blur-[2px] dark:from-fuchsia-900/30 dark:via-cyan-900/30 dark:to-amber-900/30" />
      <div className="relative h-full overflow-hidden rounded-full">
        <div
          className="h-full bg-[linear-gradient(90deg,var(--accent)_0%,#22d3ee_50%,#f59e0b_100%)] transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
