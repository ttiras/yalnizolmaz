import { contribTypeBySlug } from "@/content/contribConfig";
import SizdenGelenlerSection from "@/components/interactions/sizden-gelenler/SizdenGelenlerSection";
import { createNhostClient } from "@/app/lib/nhost/server";
import { type ContributionMovie } from "@/lib/types/contributions";
import {
  GetPopularContributionsDocument,
  GetRecentContributionsDocument,
  type GetPopularContributionsQuery,
  type GetRecentContributionsQuery,
} from "@/lib/graphql/__generated__/graphql";

async function fetchInitialContributions(slug: string, limit: number = 6) {
  const nhost = await createNhostClient();
  const graphql = nhost.graphql;

  const [popularResp, recentResp] = await Promise.all([
    graphql.request<GetPopularContributionsQuery>({
      query: GetPopularContributionsDocument,
      variables: { slug, limit, offset: 0 },
    }),
    graphql.request<GetRecentContributionsQuery>({
      query: GetRecentContributionsDocument,
      variables: { slug, limit, offset: 0 },
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
    likeCount: Number(c.likes?.aggregate?.count ?? 0),
    createdAt: String(c.created_at),
    submittedBy: c.user
      ? { displayName: c.user.displayName ?? null, avatarUrl: c.user.avatarUrl ?? null }
      : null,
  });

  const popular: ContributionMovie[] = (popularResp.data?.contributions ?? []).map(mapItem);
  const recent: ContributionMovie[] = (recentResp.data?.contributions ?? []).map(mapItem);

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
