"use client";

import { useState } from "react";
import { AuthGate } from "@/components/AuthGate";
import { useAuth } from "@/app/lib/nhost/AuthProvider";
import {
  useLikeContributionMutation,
  useUnlikeContributionMutation,
} from "@/lib/graphql/__generated__/graphql";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LikeButtonProps {
  contributionId: string;
  initialLiked?: boolean;
  initialCount: number;
  onToggle?: (nextLiked: boolean) => void;
}

export default function LikeButton({
  contributionId,
  initialLiked = false,
  initialCount,
  onToggle,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const { isAuthenticated: loggedIn, session } = useAuth();
  const { mutateAsync: like } = useLikeContributionMutation();
  const { mutateAsync: unlike } = useUnlikeContributionMutation();

  const handleToggle = async () => {
    const nextLiked = !liked;
    const nextCount = nextLiked ? count + 1 : count - 1;

    // Optimistic update
    setLiked(nextLiked);
    setCount(nextCount);

    try {
      if (nextLiked) {
        await like({ id: contributionId });
      } else if (session?.user?.id) {
        await unlike({ id: contributionId, userId: session.user.id });
      }
    } catch {
      // Revert on failure
      setLiked(liked);
      setCount(count);
    } finally {
      onToggle?.(nextLiked);
    }
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
