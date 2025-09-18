"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/app/lib/nhost/AuthProvider";
import { useAuthenticatedFetcher } from "@/lib/graphql/queryHooks";
import { useQuery } from "@tanstack/react-query";
import {
  GetPostsByUserDocument,
  type GetPostsByUserQuery,
  type GetPostsByUserQueryVariables,
  GetPostCommentsByUserDocument,
  type GetPostCommentsByUserQuery,
  type GetPostCommentsByUserQueryVariables,
  GetBlogCommentsByUserDocument,
  type GetBlogCommentsByUserQuery,
  type GetBlogCommentsByUserQueryVariables,
  GetRecentMessagesDocument,
  type GetRecentMessagesQuery,
  type GetRecentMessagesQueryVariables,
  GetLikedCommentsByUserDocument,
  type GetLikedCommentsByUserQuery,
  type GetLikedCommentsByUserQueryVariables,
  GetBookmarksByUserDocument,
  type GetBookmarksByUserQuery,
  type GetBookmarksByUserQueryVariables,
} from "@/lib/graphql/__generated__/graphql";

export default function ProfileTabs() {
  const { user } = useAuth();
  const userId = user?.id ?? "";
  const [tab, setTab] = useState<"posts" | "comments" | "liked" | "bookmarks">("posts");
  const [commentKind, setCommentKind] = useState<"post" | "blog">("blog");

  const fetchPosts = useAuthenticatedFetcher<GetPostsByUserQuery, GetPostsByUserQueryVariables>(
    GetPostsByUserDocument,
  );
  const fetchPostComments = useAuthenticatedFetcher<
    GetPostCommentsByUserQuery,
    GetPostCommentsByUserQueryVariables
  >(GetPostCommentsByUserDocument);
  const fetchBlogComments = useAuthenticatedFetcher<
    GetBlogCommentsByUserQuery,
    GetBlogCommentsByUserQueryVariables
  >(GetBlogCommentsByUserDocument);
  const fetchRecentMessages = useAuthenticatedFetcher<
    GetRecentMessagesQuery,
    GetRecentMessagesQueryVariables
  >(GetRecentMessagesDocument);
  const fetchLiked = useAuthenticatedFetcher<
    GetLikedCommentsByUserQuery,
    GetLikedCommentsByUserQueryVariables
  >(GetLikedCommentsByUserDocument);
  const fetchBookmarks = useAuthenticatedFetcher<
    GetBookmarksByUserQuery,
    GetBookmarksByUserQueryVariables
  >(GetBookmarksByUserDocument);

  const { data: posts } = useQuery({
    queryKey: ["GetPostsByUser", { userId }],
    queryFn: () => fetchPosts({ userId, limit: 10, offset: 0 }),
    enabled: Boolean(userId && tab === "posts"),
    staleTime: 10_000,
  });

  const { data: postComments } = useQuery({
    queryKey: ["GetPostCommentsByUser", { userId }],
    queryFn: () => fetchPostComments({ userId, limit: 10, offset: 0 }),
    enabled: Boolean(userId && tab === "comments" && commentKind === "post"),
    staleTime: 10_000,
  });

  const { data: blogComments } = useQuery({
    queryKey: ["GetBlogCommentsByUser", { userId }],
    queryFn: () => fetchBlogComments({ userId, limit: 10, offset: 0 }),
    enabled: Boolean(userId && tab === "comments" && commentKind === "blog"),
    staleTime: 10_000,
  });

  const { data: messages } = useQuery({
    queryKey: ["GetRecentMessages", { userId }],
    queryFn: () => fetchRecentMessages({ userId, limit: 20, offset: 0 }),
    enabled: false,
    staleTime: 10_000,
  });
  const { data: liked } = useQuery({
    queryKey: ["GetLikedCommentsByUser", { userId }],
    queryFn: () => fetchLiked({ userId, limit: 10, offset: 0 }),
    enabled: Boolean(userId && tab === "liked"),
    staleTime: 10_000,
  });
  const { data: bookmarks } = useQuery({
    queryKey: ["GetBookmarksByUser", { userId }],
    queryFn: () => fetchBookmarks({ userId, limit: 10, offset: 0 }),
    enabled: Boolean(userId && tab === "bookmarks"),
    staleTime: 10_000,
  });

  const groupedMessages = useMemo(() => {
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
      const existing = map.get(otherId);
      if (!existing) {
        map.set(otherId, {
          otherId,
          otherName,
          lastBody: m.body,
          lastAt: m.created_at,
          count: 1,
        });
      } else {
        existing.count += 1;
        if (m.created_at > existing.lastAt) {
          existing.lastAt = m.created_at;
          existing.lastBody = m.body;
        }
      }
    }
    return Array.from(map.values()).sort((a, b) => (a.lastAt < b.lastAt ? 1 : -1));
  }, [messages, userId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">İçeriklerim</CardTitle>
        <div className="mt-2 flex flex-wrap gap-2">
          <Button
            variant={tab === "posts" ? "default" : "outline"}
            size="sm"
            onClick={() => setTab("posts")}
          >
            Yazılar
          </Button>
          <Button
            variant={tab === "comments" ? "default" : "outline"}
            size="sm"
            onClick={() => setTab("comments")}
          >
            Yorumlar
          </Button>
          <Button
            variant={tab === "liked" ? "default" : "outline"}
            size="sm"
            onClick={() => setTab("liked")}
          >
            Beğenilen Yorumlar
          </Button>
          <Button
            variant={tab === "bookmarks" ? "default" : "outline"}
            size="sm"
            onClick={() => setTab("bookmarks")}
          >
            Yer İmleri
          </Button>
        </div>
        {tab === "comments" && (
          <div className="mt-3 flex gap-2">
            <Button
              variant={commentKind === "blog" ? "default" : "outline"}
              size="sm"
              onClick={() => setCommentKind("blog")}
            >
              Blog
            </Button>
            <Button
              variant={commentKind === "post" ? "default" : "outline"}
              size="sm"
              onClick={() => setCommentKind("post")}
            >
              Yazı
            </Button>
          </div>
        )}
        {/* no inbox/sent toggles anymore; unified list below */}
      </CardHeader>
      <CardContent>
        {tab === "posts" && (
          <ul className="space-y-3">
            {(posts?.posts ?? []).map((p) => (
              <li key={p.id} className="rounded-md border p-3">
                <div className="text-muted-foreground mb-1 text-xs">
                  {new Date(p.created_at).toLocaleString("tr-TR")}
                </div>
                <div className="line-clamp-2 text-sm">{p.content}</div>
              </li>
            ))}
            {(posts?.posts?.length ?? 0) === 0 && (
              <div className="text-muted-foreground text-sm">Henüz yazınız yok.</div>
            )}
          </ul>
        )}

        {tab === "comments" && commentKind === "blog" && (
          <ul className="space-y-3">
            {(blogComments?.blog_comments ?? []).map((c) => (
              <li key={c.id} className="rounded-md border p-3">
                <div className="text-muted-foreground mb-1 text-xs">
                  {new Date(c.created_at).toLocaleString("tr-TR")}
                </div>
                <div className="mb-1 text-xs">
                  Blog: <span className="underline">{c.blog_slug}</span>
                </div>
                <div className="line-clamp-2 text-sm">{c.body}</div>
              </li>
            ))}
            {(blogComments?.blog_comments?.length ?? 0) === 0 && (
              <div className="text-muted-foreground text-sm">Henüz blog yorumunuz yok.</div>
            )}
          </ul>
        )}

        {tab === "comments" && commentKind === "post" && (
          <ul className="space-y-3">
            {(postComments?.post_comments ?? []).map((c) => (
              <li key={c.id} className="rounded-md border p-3">
                <div className="text-muted-foreground mb-1 text-xs">
                  {new Date(c.created_at).toLocaleString("tr-TR")}
                </div>
                <div className="mb-1 text-xs">Yazı ID: {c.post_id}</div>
                <div className="line-clamp-2 text-sm">{c.content}</div>
              </li>
            ))}
            {(postComments?.post_comments?.length ?? 0) === 0 && (
              <div className="text-muted-foreground text-sm">Henüz yazı yorumunuz yok.</div>
            )}
          </ul>
        )}

        {tab === "liked" && (
          <ul className="space-y-3">
            {(liked?.comment_likes ?? []).map((l) => (
              <li key={`${l.comment_id}`} className="rounded-md border p-3 text-sm">
                Beğenilen yorum ID: {l.comment_id}
              </li>
            ))}
            {(liked?.comment_likes?.length ?? 0) === 0 && (
              <div className="text-muted-foreground text-sm">Henüz beğenilen yorum yok.</div>
            )}
          </ul>
        )}

        {tab === "bookmarks" && (
          <ul className="space-y-3">
            {(bookmarks?.post_bookmarks ?? []).map((b) => (
              <li key={`${b.post_id}`} className="rounded-md border p-3 text-sm">
                Yer imi yazı ID: {b.post_id}
              </li>
            ))}
            {(bookmarks?.post_bookmarks?.length ?? 0) === 0 && (
              <div className="text-muted-foreground text-sm">Henüz yer imi yok.</div>
            )}
          </ul>
        )}

        {false && (
          <ul className="divide-y">
            {groupedMessages.length === 0 ? (
              <div className="text-muted-foreground p-3 text-sm">Mesaj bulunmuyor.</div>
            ) : (
              groupedMessages.map((g) => (
                <li key={g.otherId} className="cursor-pointer transition-colors hover:bg-gray-100">
                  <Link href={`/mesajlar/${g.otherId}`} className="block w-full px-3 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate font-medium">{g.otherName}</div>
                        <div className="text-muted-foreground line-clamp-2 text-sm">
                          {g.lastBody}
                        </div>
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
        )}
      </CardContent>
    </Card>
  );
}
