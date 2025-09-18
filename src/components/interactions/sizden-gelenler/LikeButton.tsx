"use client";

import { useState } from "react";
import { AuthGate } from "@/components/AuthGate";
import { useAuth } from "@/lib/use-auth";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const { authenticated: loggedIn } = useAuth();

  const handleToggle = () => {
    const nextLiked = !liked;
    const nextCount = nextLiked ? count + 1 : count - 1;

    // Optimistic update
    setLiked(nextLiked);
    setCount(nextCount);

    // Call the callback for future backend integration
    onToggle?.(nextLiked);
  };

  const button = (
    <Button
      onClick={handleToggle}
      aria-pressed={liked}
      disabled={!loggedIn}
      variant={liked ? "destructive" : "outline"}
      size="sm"
      className={`${liked ? "text-white" : "text-gray-600"}`}
    >
      <Heart size={16} className={liked ? "fill-current" : ""} />
      <span className="font-medium">{count}</span>
    </Button>
  );

  if (loggedIn) return button;
  return <AuthGate mode="inline">{button}</AuthGate>;
}
