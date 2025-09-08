"use client";

import { useState } from "react";
import { fetchMoreComments } from "@/lib/comments/mockClient";
import type { LoadMoreButtonProps } from "@/lib/types/comments";

export default function LoadMoreButton({ slug, alreadyLoadedIds, onLoaded }: LoadMoreButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    setIsLoading(true);

    try {
      // Get the last loaded comment ID
      const afterId = alreadyLoadedIds[alreadyLoadedIds.length - 1];

      // Fetch more comments
      const moreComments = await fetchMoreComments(slug, afterId, 10);

      // Call the callback to add them to the list
      onLoaded(moreComments);
    } catch (error) {
      console.error("Failed to load more comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLoadMore}
      disabled={isLoading}
      className={`w-full rounded-lg px-4 py-3 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
        isLoading
          ? "cursor-not-allowed bg-gray-100 text-gray-400"
          : "border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
      } `}
    >
      {isLoading ? "Yükleniyor..." : "Daha fazla yorum"}
    </button>
  );
}
