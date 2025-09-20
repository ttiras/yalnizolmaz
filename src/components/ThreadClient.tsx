"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/app/lib/nhost/AuthProvider";
import { useAuthenticatedFetcher } from "@/lib/graphql/queryHooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetMessagesThreadDocument,
  type GetMessagesThreadQuery,
  type GetMessagesThreadQueryVariables,
  InsertMessageDocument,
  type InsertMessageMutation,
  type InsertMessageMutationVariables,
  UpsertTypingDocument,
  type UpsertTypingMutation,
  type UpsertTypingMutationVariables,
  useUpdateLastSeenMutation,
} from "@/lib/graphql/__generated__/graphql";
import {
  ThreadMessagesSubscription,
  subscribeGraphql,
  TypingSubscription,
  PresenceSubscription,
} from "@/lib/graphql/subscriptions";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ThreadClient({ otherId }: { otherId: string }) {
  const { user, session } = useAuth();
  const userId = user?.id ?? "";
  const [body, setBody] = useState("");
  const [peerTyping, setPeerTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const qc = useQueryClient();

  const fetchThread = useAuthenticatedFetcher<
    GetMessagesThreadQuery,
    GetMessagesThreadQueryVariables
  >(GetMessagesThreadDocument);

  const { data, isFetching } = useQuery({
    queryKey: ["GetMessagesThread", { userId, otherId }],
    queryFn: () => fetchThread({ userId, otherId, limit: 50, offset: 0 }),
    enabled: Boolean(userId && otherId),
    staleTime: 5_000,
  });

  const sendFetcher = useAuthenticatedFetcher<
    InsertMessageMutation,
    InsertMessageMutationVariables
  >(InsertMessageDocument);

  const { mutateAsync: send, isPending } = useMutation({
    mutationKey: ["InsertMessage"],
    mutationFn: (vars: InsertMessageMutationVariables) => sendFetcher(vars),
    onSuccess: async () => {
      setBody("");
      await qc.invalidateQueries({ queryKey: ["GetMessagesThread", { userId, otherId }] });
    },
  });

  // Live updates via GraphQL subscription
  useEffect(() => {
    if (!userId || !otherId) return;
    const token = session?.accessToken ?? null;
    const unsubscribe = subscribeGraphql<GetMessagesThreadQuery>(
      {
        query: ThreadMessagesSubscription,
        variables: { userId, otherId, limit: 50, offset: 0 },
        token,
      },
      {
        next: (payload) => {
          const incoming = payload.data?.messages as GetMessagesThreadQuery["messages"] | undefined;
          if (!incoming) return;
          qc.setQueryData<GetMessagesThreadQuery>(
            ["GetMessagesThread", { userId, otherId }],
            () => ({ messages: incoming }) as GetMessagesThreadQuery,
          );
        },
      },
    );
    return () => unsubscribe();
  }, [userId, otherId, session?.accessToken, qc]);

  // Subscribe to typing state of the other user
  useEffect(() => {
    if (!userId || !otherId) return;
    const token = session?.accessToken ?? null;
    const unsubscribe = subscribeGraphql<{
      message_typing: Array<{ is_typing: boolean; updated_at: string }>;
    }>(
      {
        query: TypingSubscription,
        variables: { userId, otherId },
        token,
      },
      {
        next: (payload) => {
          const arr = payload.data?.message_typing as
            | Array<{ is_typing: boolean; updated_at: string }>
            | undefined;
          const latest = (arr && arr[0]) || undefined;
          setPeerTyping(Boolean(latest?.is_typing));
        },
      },
    );
    return () => unsubscribe();
  }, [userId, otherId, session?.accessToken]);

  // Subscribe to presence changes of the other user
  useEffect(() => {
    if (!otherId) return;
    const token = session?.accessToken ?? null;
    const unsubscribe = subscribeGraphql<{ users: Array<{ id: string; lastSeen: string | null }> }>(
      {
        query: PresenceSubscription,
        variables: { userId: otherId },
        token,
      },
      {
        next: (payload) => {
          const u = payload.data?.users?.[0];
          if (!u) return;
          const ONLINE_WINDOW_MS = 300_000; // 5 minutes
          const parseTimestamptz = (s: string): number => {
            const t = Date.parse(s);
            if (Number.isFinite(t)) return t as number;
            // Trim microseconds (e.g., .123456 -> .123)
            const trimmed = s.replace(/\.(\d{3})\d+/, ".$1");
            return Date.parse(trimmed);
          };
          const ts = u.lastSeen ? parseTimestamptz(u.lastSeen) : NaN;
          const online = Number.isFinite(ts) && Date.now() - ts < ONLINE_WINDOW_MS;
          setIsOnline(!!online);
        },
      },
    );
    return () => unsubscribe();
  }, [otherId, session?.accessToken]);

  // Debounced self typing updates
  const upsertTyping = useAuthenticatedFetcher<UpsertTypingMutation, UpsertTypingMutationVariables>(
    UpsertTypingDocument,
  );

  const sendTyping = useMemo(() => {
    let lastSent = 0;
    return async (isTyping: boolean) => {
      const now = Date.now();
      if (isTyping && now - lastSent < 500) return; // throttle
      lastSent = now;
      try {
        await upsertTyping({ recipient_id: otherId, is_typing: isTyping });
      } catch {
        // ignore
      }
    };
  }, [otherId, upsertTyping]);

  // Seed a row for this pair so subscription has something to stream
  useEffect(() => {
    if (!userId || !otherId) return;
    void upsertTyping({ recipient_id: otherId, is_typing: false }).catch(() => {});
    // run once per otherId
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherId, userId]);

  useEffect(() => {
    if (!otherId) return;
    if (body.length > 0) {
      void sendTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => void sendTyping(false), 2000);
    } else {
      void sendTyping(false);
    }
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [body, otherId, sendTyping]);

  const [isOnline, setIsOnline] = useState(false);
  const updateLastSeen = useUpdateLastSeenMutation({ onError: () => {} });
  const lastHeartbeatRef = useRef<number>(0);

  // Heartbeat to keep our own lastSeen fresh while viewing the thread
  useEffect(() => {
    if (!userId) return;
    const MIN_GAP_MS = 55_000; // ~55s safeguard

    const tick = () => {
      const now = Date.now();
      if (document.visibilityState !== "visible" || !navigator.onLine) return;
      if (now - (lastHeartbeatRef.current || 0) < MIN_GAP_MS) return;
      lastHeartbeatRef.current = now;
      updateLastSeen.mutate({ userId, lastSeen: new Date().toISOString() });
    };

    const id = setInterval(tick, 30_000); // check twice a minute, send at most ~1/min
    const onVis = () => tick();
    document.addEventListener("visibilitychange", onVis);
    // initial gentle kick after short delay
    const startId = setTimeout(tick, 5_000);

    return () => {
      clearInterval(id);
      clearTimeout(startId);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [userId]);

  const handleSend = async () => {
    if (!body.trim()) return;
    await send({ body: body.trim(), recipient_id: otherId });
  };

  const messages = data?.messages ?? [];
  const format = (d: string) => new Date(d).toLocaleString("tr-TR");
  const last = messages[messages.length - 1];
  const other = last ? (last.sender_id === userId ? last.receiver : last.sender) : undefined;

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div>
        <h2 className="text-xl font-semibold">
          gelen kutusu » @{other?.displayName || "kullanıcı"}
        </h2>
        {(() => {
          const onlineDisplay = isOnline || peerTyping;
          return (
            <div className="mt-1 flex h-4 items-center gap-2 text-xs">
              <span
                className={cn(
                  "inline-block h-2 w-2 rounded-full",
                  onlineDisplay ? "bg-emerald-500" : "bg-red-500",
                )}
                aria-label={onlineDisplay ? "çevrimiçi" : "çevrimdışı"}
                title={onlineDisplay ? "çevrimiçi" : "çevrimdışı"}
              />
              <span className="text-muted-foreground">
                {onlineDisplay ? "çevrimiçi" : "çevrimdışı"}
              </span>
              {peerTyping && <span>yazıyor…</span>}
            </div>
          );
        })()}
      </div>

      <div className="space-y-4">
        {messages.length === 0 && (
          <div className="text-muted-foreground text-sm">Henüz mesaj yok.</div>
        )}
        {messages.map((m) => {
          const mine = m.sender_id === userId;
          return (
            <div key={m.id} className={cn("flex", mine ? "justify-end" : "justify-start")}>
              <div className="max-w-[85%]">
                <div
                  className={cn(
                    "rounded-md px-3 py-2 text-sm shadow-sm",
                    mine ? "bg-primary/10" : "bg-muted/60",
                  )}
                >
                  <div>{m.body}</div>
                  <div
                    className={cn(
                      "text-muted-foreground mt-1 text-[11px]",
                      mine ? "text-right" : "text-left",
                    )}
                  >
                    {format(m.created_at)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {isFetching && <div className="text-muted-foreground text-xs">Yükleniyor…</div>}
      </div>

      <div className="space-y-2">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Mesajınızı yazın…"
          className="min-h-[100px] w-full"
        />
        <div className="flex items-center justify-between">
          <Link
            href="/profil?tab=messages"
            className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm"
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Mesajlara dön
          </Link>
          <Button onClick={handleSend} disabled={!body.trim() || isPending}>
            Gönder
          </Button>
        </div>
      </div>
    </div>
  );
}
