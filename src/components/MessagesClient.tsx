"use client";

import Link from "next/link";
import { useAuth } from "@/app/lib/nhost/AuthProvider";
import { useAuthenticatedFetcher } from "@/lib/graphql/queryHooks";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  GetRecentMessagesDocument,
  type GetRecentMessagesQuery,
  type GetRecentMessagesQueryVariables,
} from "@/lib/graphql/__generated__/graphql";

export default function MessagesClient() {
  const { user } = useAuth();
  const userId = user?.id ?? "";

  const fetchRecentMessages = useAuthenticatedFetcher<
    GetRecentMessagesQuery,
    GetRecentMessagesQueryVariables
  >(GetRecentMessagesDocument);

  const { data: messages } = useQuery({
    queryKey: ["GetRecentMessages", { userId }],
    queryFn: () => fetchRecentMessages({ userId, limit: 50, offset: 0 }),
    enabled: Boolean(userId),
    staleTime: 10_000,
  });

  const grouped = useMemo(() => {
    const map = new Map<
      string,
      { otherId: string; otherName: string; lastBody: string; lastAt: string; count: number }
    >();
    const arr = messages?.messages ?? [];
    for (const m of arr) {
      const isMine = m.sender_id === userId;
      const otherId = isMine ? (m.recipient_id ?? "") : (m.sender_id ?? "");
      if (!otherId) continue;
      const otherName = (isMine ? m.receiver?.displayName : m.sender?.displayName) ?? otherId;
      const ex = map.get(otherId);
      if (!ex) {
        map.set(otherId, {
          otherId,
          otherName,
          lastBody: m.body,
          lastAt: m.created_at,
          count: 1,
        });
      } else {
        ex.count += 1;
        if (m.created_at > ex.lastAt) {
          ex.lastAt = m.created_at;
          ex.lastBody = m.body;
        }
      }
    }
    return Array.from(map.values()).sort((a, b) => (a.lastAt < b.lastAt ? 1 : -1));
  }, [messages, userId]);

  if (!userId) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-2xl font-semibold">Mesajlar</h1>
      <ul className="divide-y">
        {grouped.length === 0 ? (
          <div className="text-muted-foreground p-3 text-sm">Mesaj bulunmuyor.</div>
        ) : (
          grouped.map((g) => (
            <li key={g.otherId} className="cursor-pointer transition-colors hover:bg-gray-100">
              <Link href={`/mesajlar/${g.otherId}`} className="block w-full px-3 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate font-medium">{g.otherName}</div>
                    <div className="text-muted-foreground line-clamp-2 text-sm">{g.lastBody}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-muted-foreground text-xs whitespace-nowrap">
                      {new Date(g.lastAt).toLocaleString("tr-TR")}
                    </div>
                    <div className="text-muted-foreground text-xs">{g.count}</div>
                  </div>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
