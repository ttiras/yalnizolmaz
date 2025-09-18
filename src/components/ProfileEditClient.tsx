"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/nhost/AuthProvider";
import ProfileEditForm from "@/components/ProfileEditForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GetUserProfileDocument,
  type GetUserProfileQuery,
  type GetUserProfileQueryVariables,
} from "@/lib/graphql/__generated__/graphql";
import { useAuthenticatedFetcher } from "@/lib/graphql/queryHooks";
import { useQuery } from "@tanstack/react-query";

export default function ProfileEditClient() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login?next=/profil/duzenle");
      } else {
        setReady(true);
      }
    }
  }, [isLoading, isAuthenticated, router]);

  const userId = user?.id ?? "";
  const fetcher = useAuthenticatedFetcher<GetUserProfileQuery, GetUserProfileQueryVariables>(
    GetUserProfileDocument,
  );
  const { data, isFetching } = useQuery({
    queryKey: ["GetUserProfile", { userId }],
    queryFn: () => fetcher({ userId }),
    enabled: Boolean(userId && ready),
    staleTime: 10_000,
  });

  const profile = data?.user_profiles?.[0]
    ? {
        user_id: data.user_profiles[0].user_id,
        bio: data.user_profiles[0].bio ?? null,
        location: data.user_profiles[0].location ?? null,
        website: data.user_profiles[0].website ?? null,
        created_at: data.user_profiles[0].created_at,
        updated_at: data.user_profiles[0].updated_at,
      }
    : null;

  const sessionUser = useMemo(
    () =>
      user
        ? {
            id: user.id,
            email: user.email ?? null,
            displayName: user.displayName ?? null,
            avatarUrl: user.avatarUrl ?? null,
          }
        : null,
    [user],
  );

  if (isLoading || !ready || isFetching) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Profil Düzenle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!sessionUser) return null;
  return <ProfileEditForm user={sessionUser} profile={profile} />;
}
