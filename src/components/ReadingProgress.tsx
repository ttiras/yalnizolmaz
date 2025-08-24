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
    <div className="fixed top-0 right-0 left-0 z-50 h-1 bg-gradient-to-r from-purple-200 via-blue-200 to-indigo-200 opacity-20 dark:from-purple-800 dark:via-blue-800 dark:to-indigo-800">
      <div
        className="h-full bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 transition-all duration-300 ease-out dark:from-purple-500 dark:via-blue-500 dark:to-indigo-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
