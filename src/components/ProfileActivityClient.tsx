"use client";

import Link from "next/link";
import { useAuth } from "@/app/lib/nhost/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthenticatedFetcher } from "@/lib/graphql/queryHooks";
import { useQuery } from "@tanstack/react-query";
import {
  GetUserRecentActivityDocument,
  type GetUserRecentActivityQuery,
  type GetUserRecentActivityQueryVariables,
} from "@/lib/graphql/__generated__/graphql";

export default function ProfileActivityClient() {
  const { user } = useAuth();
  const userId = user?.id ?? "";
  const fetcher = useAuthenticatedFetcher<
    GetUserRecentActivityQuery,
    GetUserRecentActivityQueryVariables
  >(GetUserRecentActivityDocument);
  const { data } = useQuery({
    queryKey: ["GetUserRecentActivity", { userId }],
    queryFn: () => fetcher({ userId, limit: 5 }),
    enabled: Boolean(userId),
    staleTime: 10_000,
  });

  const posts = data?.posts ?? [];
  const postComments = data?.post_comments ?? [];
  const blogComments = data?.blog_comments ?? [];

  if (!userId) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Son Aktiviteler</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {posts.length === 0 && postComments.length === 0 && blogComments.length === 0 ? (
          <div className="text-muted-foreground py-8 text-center">
            <p>Henüz aktivite bulunmuyor.</p>
            <p className="mt-2 text-sm">Yazı yazmaya başladığınızda burada görünecek.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.length > 0 && (
              <div>
                <div className="mb-2 text-sm font-medium">Yazılar</div>
                <ul className="list-disc space-y-1 pl-5">
                  {posts.map((p) => (
                    <li key={p.id} className="text-sm">
                      <span className="text-muted-foreground mr-2">
                        {new Date(p.created_at).toLocaleDateString("tr-TR")}
                      </span>
                      <span className="line-clamp-1 align-middle">{p.content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {postComments.length > 0 && (
              <div>
                <div className="mb-2 text-sm font-medium">Yazı Yorumları</div>
                <ul className="list-disc space-y-1 pl-5">
                  {postComments.map((c) => (
                    <li key={c.id} className="text-sm">
                      <span className="text-muted-foreground mr-2">
                        {new Date(c.created_at).toLocaleDateString("tr-TR")}
                      </span>
                      <span className="line-clamp-1 align-middle">{c.content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {blogComments.length > 0 && (
              <div>
                <div className="mb-2 text-sm font-medium">Blog Yorumları</div>
                <ul className="list-disc space-y-1 pl-5">
                  {blogComments.map((c) => (
                    <li key={c.id} className="text-sm">
                      <span className="text-muted-foreground mr-2">
                        {new Date(c.created_at).toLocaleDateString("tr-TR")}
                      </span>
                      <Link href={`/blog/${c.blog_slug}`} className="underline underline-offset-2">
                        {c.blog_slug}
                      </Link>
                      <span className="mx-1">—</span>
                      <span className="line-clamp-1 align-middle">{c.body}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
