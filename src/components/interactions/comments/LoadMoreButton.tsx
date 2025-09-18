"use client";

import { useState } from "react";
import { fetchMoreComments } from "@/lib/comments/mockClient";
import type { LoadMoreButtonProps } from "@/lib/types/comments";
import { Button } from "@/components/ui/button";

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
    <Button onClick={handleLoadMore} disabled={isLoading} variant="outline" className="w-full">
      {isLoading ? "Yükleniyor..." : "Daha fazla yorum"}
    </Button>
  );
}
