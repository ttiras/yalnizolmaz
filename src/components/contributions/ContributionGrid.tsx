import { createNhostClient } from "@/app/lib/nhost/server";
import { ContributionCard } from "./ContributionCard";
import { Pagination } from "./Pagination";

interface ContributionGridProps {
  type: string;
  search: string;
  sort: string;
  page: number;
}

const ITEMS_PER_PAGE = 12;

export async function ContributionGrid({ type, search, sort, page }: ContributionGridProps) {
  const nhost = await createNhostClient();

  // Build where clause
  const whereClause: any = { status: { _eq: "published" } };
  
  if (type !== "all") {
    whereClause.type = { _eq: type };
  }
  
  if (search) {
    whereClause._or = [
      { title: { _ilike: `%${search}%` } },
      { note: { _ilike: `%${search}%` } },
    ];
  }

  // Build order clause
  let orderClause: any = { created_at: "desc" };
  
  switch (sort) {
    case "oldest":
      orderClause = { created_at: "asc" };
      break;
    case "most_liked":
      orderClause = { contribution_likes_aggregate: { aggregate: { count: "desc" } } };
      break;
    case "least_liked":
      orderClause = { contribution_likes_aggregate: { aggregate: { count: "asc" } } };
      break;
    case "title_asc":
      orderClause = { title: "asc" };
      break;
    case "title_desc":
      orderClause = { title: "desc" };
      break;
  }

  const offset = (page - 1) * ITEMS_PER_PAGE;

  const resp = await nhost.graphql.request({
    query: `
      query GetContributions(
        $where: contributions_bool_exp!
        $orderBy: [contributions_order_by!]!
        $limit: Int!
        $offset: Int!
      ) {
        contributions(
          where: $where
          order_by: $orderBy
          limit: $limit
          offset: $offset
        ) {
          id
          title
          year
          note
          type
          created_at
          poster_url
          source_url
          contribution_likes_aggregate { aggregate { count } }
          user: user { id displayName avatarUrl }
        }
        contributions_aggregate(where: $where) {
          aggregate { count }
        }
      }
    `,
    variables: {
      where: whereClause,
      orderBy: [orderClause],
      limit: ITEMS_PER_PAGE,
      offset,
    },
  });

  const data = (
    resp as unknown as {
      data?: {
        contributions: Array<{
          id: string;
          title: string;
          year?: number | null;
          note: string;
          type: string;
          created_at: string;
          poster_url?: string | null;
          source_url?: string | null;
          contribution_likes_aggregate: { aggregate?: { count?: number | null } | null };
          user?: {
            id: string;
            displayName?: string | null;
            avatarUrl?: string | null;
          } | null;
        }>;
        contributions_aggregate: {
          aggregate?: { count?: number | null } | null;
        };
      };
      error?: unknown;
    }
  ).data;

  if (!data) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-gray-400">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-medium" style={{ color: "var(--foreground)" }}>
          Bir hata oluştu
        </h3>
        <p style={{ color: "var(--muted-foreground)" }}>
          Katkılar yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.
        </p>
      </div>
    );
  }

  const contributions = data.contributions.map((c) => ({
    id: c.id,
    title: c.title,
    year: c.year ?? undefined,
    note: c.note,
    type: c.type,
    likeCount: c.contribution_likes_aggregate.aggregate?.count ?? 0,
    createdAt: c.created_at,
    posterUrl: c.poster_url,
    sourceUrl: c.source_url,
    submittedBy: {
      displayName: c.user?.displayName || "Anonim",
      avatarUrl: c.user?.avatarUrl ?? null,
    },
  }));

  const totalCount = data.contributions_aggregate.aggregate?.count ?? 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  if (contributions.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-gray-400">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-medium" style={{ color: "var(--foreground)" }}>
          Katkı bulunamadı
        </h3>
        <p style={{ color: "var(--muted-foreground)" }}>
          Arama kriterlerinize uygun katkı bulunamadı. Filtreleri değiştirmeyi deneyin.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          {totalCount} katkıdan {((page - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(page * ITEMS_PER_PAGE, totalCount)} arası gösteriliyor
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contributions.map((contribution) => (
          <ContributionCard key={contribution.id} contribution={contribution} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          baseUrl="/sizden-gelenler/tum-katkilar"
        />
      )}
    </div>
  );
}
