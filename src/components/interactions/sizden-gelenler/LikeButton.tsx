"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  contributionId: string;
  initialLiked?: boolean;
  initialCount: number;
  onToggle?: (nextLiked: boolean) => void;
}

export default function LikeButton({
  initialLiked = false,
  initialCount,
  onToggle,
}: Omit<LikeButtonProps, "contributionId">) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const handleToggle = () => {
    const nextLiked = !liked;
    const nextCount = nextLiked ? count + 1 : count - 1;

    // Optimistic update
    setLiked(nextLiked);
    setCount(nextCount);

    // Call the callback for future backend integration
    onToggle?.(nextLiked);
  };

  return (
    <button
      onClick={handleToggle}
      aria-pressed={liked}
      className={`flex items-center gap-1 rounded-full px-2 py-1 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
        liked
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "text-gray-500 hover:bg-red-50 hover:text-red-500"
      } `}
    >
      <Heart size={16} className={liked ? "fill-current" : ""} />
      <span className="font-medium">{count}</span>
    </button>
  );
}
