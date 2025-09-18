"use client";

import { useState } from "react";
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
} from "@/lib/graphql/__generated__/graphql";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ThreadClient({ otherId }: { otherId: string }) {
  const { user } = useAuth();
  const userId = user?.id ?? "";
  const [body, setBody] = useState("");
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
