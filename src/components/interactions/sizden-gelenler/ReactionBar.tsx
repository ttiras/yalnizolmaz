"use client";

import { useEffect, useMemo, useState } from "react";
import { Heart, Handshake, ThumbsUp, Sparkles, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/lib/nhost/AuthProvider";
import {
  useGetContributionReactionsQuery,
  useAddContributionReactionMutation,
  useRemoveContributionReactionMutation,
  type Reaction_Types_Enum,
} from "@/lib/graphql/__generated__/graphql";

type ReactionType = "heart" | "hug" | "metoo" | "hope" | "thanks";

export type ReactionCounts = Partial<Record<ReactionType, number>>;

export interface ReactionBarProps {
  targetId: string;
  initialCounts?: ReactionCounts;
  initialUserReactions?: ReactionType[];
  onToggle?: (type: ReactionType, active: boolean) => void;
  size?: "sm" | "md";
}

const REACTIONS: Array<{
  type: ReactionType;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: string;
  color: string;
}> = [
  { type: "heart", icon: Heart, label: "Sevgi", color: "text-red-500" },
  { type: "hug", icon: Handshake, label: "Sarılma", color: "text-amber-600" },
  { type: "metoo", icon: ThumbsUp, label: "Ben de", color: "text-sky-600" },
  { type: "hope", icon: Sparkles, label: "Umut", color: "text-emerald-600" },
  { type: "thanks", icon: HandHeart, label: "Teşekkür", color: "text-pink-600" },
];

export default function ReactionBar({
  targetId,
  initialCounts,
  initialUserReactions,
  onToggle,
  size = "sm",
}: ReactionBarProps) {
  const { isAuthenticated, session } = useAuth();
  const userId = session?.user?.id || null;

  const { data } = useGetContributionReactionsQuery({ id: targetId });
  const { mutateAsync: addReaction } = useAddContributionReactionMutation();
  const { mutateAsync: removeReaction } = useRemoveContributionReactionMutation();

  const [counts, setCounts] = useState<ReactionCounts>({
    heart: initialCounts?.heart ?? 0,
    hug: initialCounts?.hug ?? 0,
    metoo: initialCounts?.metoo ?? 0,
    hope: initialCounts?.hope ?? 0,
    thanks: initialCounts?.thanks ?? 0,
  });
  const [active, setActive] = useState<Record<ReactionType, boolean>>({
    heart: Boolean(initialUserReactions?.includes("heart")),
    hug: Boolean(initialUserReactions?.includes("hug")),
    metoo: Boolean(initialUserReactions?.includes("metoo")),
    hope: Boolean(initialUserReactions?.includes("hope")),
    thanks: Boolean(initialUserReactions?.includes("thanks")),
  });

  const btnSize = useMemo(() => (size === "sm" ? "sm" : "md"), [size]);

  // Sync from server when loaded
  useEffect(() => {
    const rows = data?.contribution_reactions ?? [];
    if (!rows) return;

    const nextCounts: ReactionCounts = { heart: 0, hug: 0, metoo: 0, hope: 0, thanks: 0 };
    const nextActive: Record<ReactionType, boolean> = {
      heart: false,
      hug: false,
      metoo: false,
      hope: false,
      thanks: false,
    };

    for (const r of rows as Array<{ user_id: string; type: Reaction_Types_Enum }>) {
      const t = r.type as unknown as ReactionType;
      nextCounts[t] = (nextCounts[t] ?? 0) + 1;
      if (userId && r.user_id === userId) {
        nextActive[t] = true;
      }
    }

    setCounts(nextCounts);
    setActive(nextActive);
  }, [data, userId]);

  const toggle = async (type: ReactionType) => {
    if (!isAuthenticated) return;

    const next = !active[type];
    setActive((prev) => ({ ...prev, [type]: next }));
    setCounts((prev) => ({ ...prev, [type]: Math.max(0, (prev[type] ?? 0) + (next ? 1 : -1)) }));
    onToggle?.(type, next);

    try {
      if (next) {
        await addReaction({ id: targetId, type: type as unknown as Reaction_Types_Enum });
      } else if (userId) {
        await removeReaction({
          id: targetId,
          userId,
          type: type as unknown as Reaction_Types_Enum,
        });
      }
    } catch {
      // Revert on failure
      setActive((prev) => ({ ...prev, [type]: !next }));
      setCounts((prev) => ({ ...prev, [type]: Math.max(0, (prev[type] ?? 0) + (next ? -1 : 1)) }));
    }
  };

  return (
    <div className="flex items-center gap-2">
      {REACTIONS.map(({ type, icon: Icon, label, color }) => (
        <Button
          key={type}
          variant={active[type] ? "destructive" : "outline"}
          size={btnSize}
          className={`${active[type] ? color : "text-gray-600"}`}
          aria-pressed={active[type]}
          disabled={!isAuthenticated}
          onClick={() => toggle(type)}
        >
          <Icon size={16} className={active[type] ? "fill-current" : ""} />
          <span className="font-medium">{counts[type] ?? 0}</span>
        </Button>
      ))}
    </div>
  );
}
