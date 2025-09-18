import { contribTypeBySlug } from "@/content/contribConfig";
import SizdenGelenlerSection from "@/components/interactions/sizden-gelenler/SizdenGelenlerSection";
import { headers } from "next/headers";
import { type ContributionMovie } from "@/lib/types/contributions";
import {
  GetPopularContributionsDocument,
  GetRecentContributionsDocument,
  type GetPopularContributionsQuery,
  type GetRecentContributionsQuery,
} from "@/lib/graphql/__generated__/graphql";

function getHasuraGraphqlUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_NHOST_GRAPHQL_URL;
  if (envUrl) return envUrl;
  const sub = process.env.NHOST_SUBDOMAIN || process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || "local";
  const region = process.env.NHOST_REGION || process.env.NEXT_PUBLIC_NHOST_REGION || "local";
  if (sub === "local" || region === "local")
    return "https://local.hasura.local.nhost.run/v1/graphql";
  return `https://${sub}.hasura.${region}.nhost.run/v1/graphql`;
}

async function anonymousGraphql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const url = getHasuraGraphqlUrl();
  const h = await headers();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Forward trace headers if any; do NOT forward cookies
      "x-forwarded-host": h.get("x-forwarded-host") || "",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  const data = (await res.json()) as { data?: T; errors?: Array<{ message: string }> };
  if (!res.ok || data.errors) {
    throw new Error(data.errors?.map((e) => e.message).join("; ") || `GraphQL ${res.status}`);
  }
  return data.data as T;
}

async function fetchInitialContributions(slug: string, limit: number = 6) {
  const [popularResp, recentResp] = await Promise.all([
    anonymousGraphql<GetPopularContributionsQuery>(GetPopularContributionsDocument, {
      slug,
      limit,
      offset: 0,
    }),
    anonymousGraphql<GetRecentContributionsQuery>(GetRecentContributionsDocument, {
      slug,
      limit,
      offset: 0,
    }),
  ]);

  const mapItem = (
    c: GetPopularContributionsQuery["contributions"][number],
  ): ContributionMovie => ({
    id: String(c.id),
    title: String(c.title),
    year: c.year ?? undefined,
    posterUrl: c.poster_url ?? undefined,
    sourceUrl: c.source_url ?? undefined,
    likeCount: Number(c.likes_list?.length ?? 0),
    createdAt: String(c.created_at),
    submittedBy: c.user
      ? { displayName: c.user.displayName ?? null, avatarUrl: c.user.avatarUrl ?? null }
      : null,
  });

  const popular: ContributionMovie[] = (popularResp?.contributions ?? [])
    .map(mapItem)
    .sort((a, b) => b.likeCount - a.likeCount || b.createdAt.localeCompare(a.createdAt));
  const recent: ContributionMovie[] = (recentResp?.contributions ?? []).map(mapItem);

  return { popular, recent } as const;
}

export default async function SizdenGelenlerForPost({ slug }: { slug: string }) {
  const typeSlug = contribTypeBySlug(slug); // 'film' | 'none'
  const { popular, recent } = await fetchInitialContributions(slug, 6);

  return (
    <SizdenGelenlerSection
      slug={slug}
      typeSlug={typeSlug === "film" ? "film" : "none"}
      initialPopular={popular}
      initialNew={recent}
      loggedIn={false}
      // Option to control the form from parent:
      showForm={typeSlug === "film"}
      emptyStateText={
        typeSlug === "film"
          ? "Henüz bir öneri yok. İlk filmi sen öner!"
          : "Yakında bu yazı için de topluluk önerilerini açacağız."
      }
    />
  );
}
