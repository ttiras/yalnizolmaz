"use client";

import { useState } from "react";
import { Hand } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HelpfulButtonProps {
  commentId: string;
  initialLiked?: boolean;
  initialCount: number;
  onToggle?: (liked: boolean) => void;
}

export default function HelpfulButton({
  initialLiked = false,
  initialCount,
  onToggle,
}: Omit<HelpfulButtonProps, "commentId">) {
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
    <Button
      onClick={handleToggle}
      aria-pressed={liked}
      variant="ghost"
      size="sm"
      className={liked ? "text-blue-600" : "text-gray-500 hover:text-blue-600"}
    >
      <Hand size={16} className={liked ? "fill-current" : ""} />
      <span className="font-medium">{count}</span>
    </Button>
  );
}
