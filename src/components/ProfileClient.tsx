"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfilePage from "@/components/ProfilePage";
import dynamic from "next/dynamic";
const ProfileActivityClient = dynamic(() => import("@/components/ProfileActivityClient"), {
  ssr: false,
});
const ProfileTabs = dynamic(() => import("@/components/ProfileTabs"), { ssr: false });
import { useAuth } from "@/app/lib/nhost/AuthProvider";
import {
  GetUserProfileDocument,
  type GetUserProfileQuery,
  type GetUserProfileQueryVariables,
  GetUserBasicDocument,
  type GetUserBasicQuery,
  type GetUserBasicQueryVariables,
  GetProfileStatsDocument,
  type GetProfileStatsQuery,
  type GetProfileStatsQueryVariables,
} from "@/lib/graphql/__generated__/graphql";
import { useAuthenticatedFetcher } from "@/lib/graphql/queryHooks";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";

type ProfileClientProps = {
  initialUser?: {
    id: string;
    email?: string | null;
    displayName?: string | null;
    avatarUrl?: string | null;
  } | null;
};

export default function ProfileClient({ initialUser }: ProfileClientProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?next=/profil");
    }
  }, [isLoading, isAuthenticated, router]);

  const effectiveUser = user ?? initialUser ?? null;
  const userId = effectiveUser?.id ?? "";

  const fetchProfile = useAuthenticatedFetcher<GetUserProfileQuery, GetUserProfileQueryVariables>(
    GetUserProfileDocument,
  );
  const fetchBasic = useAuthenticatedFetcher<GetUserBasicQuery, GetUserBasicQueryVariables>(
    GetUserBasicDocument,
  );
  const fetchStats = useAuthenticatedFetcher<GetProfileStatsQuery, GetProfileStatsQueryVariables>(
    GetProfileStatsDocument,
  );

  const { data: profileData, isFetching: fetchingProfile } = useQuery({
    queryKey: ["GetUserProfile", { userId }],
    queryFn: () => fetchProfile({ userId }),
    enabled: Boolean(userId),
    staleTime: 10_000,
  });

  const { data: basicData, isFetching: fetchingBasic } = useQuery({
    queryKey: ["GetUserBasic", { userId }],
    queryFn: () => fetchBasic({ userId }),
    enabled: Boolean(userId),
    staleTime: 10_000,
  });

  const { data: statsData, isFetching: fetchingStats } = useQuery({
    queryKey: ["GetProfileStats", { userId }],
    queryFn: () => fetchStats({ userId }),
    enabled: Boolean(userId),
    staleTime: 10_000,
  });

  if (isLoading || !effectiveUser || fetchingProfile || fetchingBasic || fetchingStats) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Card>
          <CardContent className="flex items-center gap-3 py-8">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Profil yükleniyor…</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  const profile = profileData?.user_profiles?.[0]
    ? {
        user_id: profileData.user_profiles[0].user_id,
        bio: profileData.user_profiles[0].bio ?? null,
        location: profileData.user_profiles[0].location ?? null,
        website: profileData.user_profiles[0].website ?? null,
        created_at: profileData.user_profiles[0].created_at,
        updated_at: profileData.user_profiles[0].updated_at,
      }
    : null;

  const mergedUser = (() => {
    const row = basicData?.users?.[0];
    if (!row) return effectiveUser;
    return {
      ...effectiveUser!,
      displayName: row.displayName,
      avatarUrl: row.avatarUrl,
    };
  })();

  const u = statsData?.users?.[0];
  const counts = {
    posts: u?.posts_aggregate?.aggregate?.count ?? 0,
    blogComments: u?.blog_comments_aggregate?.aggregate?.count ?? 0,
    postComments: u?.post_comments_aggregate?.aggregate?.count ?? 0,
    contributions: u?.contributions_aggregate?.aggregate?.count ?? 0,
    likes:
      (u?.post_likes_aggregate?.aggregate?.count ?? 0) +
      (u?.comment_likes_aggregate?.aggregate?.count ?? 0) +
      (u?.contribution_likes_aggregate?.aggregate?.count ?? 0),
    messagesSent: u?.messages_sent_aggregate?.aggregate?.count ?? 0,
    messagesReceived: u?.messages_received_aggregate?.aggregate?.count ?? 0,
  };

  return (
    <>
      <ProfilePage user={mergedUser} profile={profile} counts={counts} />
      <div className="mx-auto mt-6 max-w-4xl space-y-6 px-4">
        <ProfileTabs />
        <ProfileActivityClient />
      </div>
    </>
  );
}
