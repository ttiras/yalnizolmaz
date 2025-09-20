import Link from "next/link";
import { notFound } from "next/navigation";
import { contribTypeBySlug, getContributionTypeLabel } from "@/lib/contribConfig";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Calendar,
  User,
  ExternalLink,
  ArrowUpDown,
  Filter,
  MessageCircle,
  Users,
  Handshake,
  ThumbsUp,
  Sparkles,
  HandHeart,
} from "lucide-react";
import Image from "next/image";
import FloatingActionButton from "@/components/contributions/FloatingActionButton";
import ExternalLinkButton from "@/components/ExternalLinkButton";

type Params = { params: Promise<{ blogSlug: string }> };

export async function generateMetadata({ params }: Params) {
  const { blogSlug } = await params;
  return {
    title: `Sizden Gelenler - ${blogSlug} | yalnizolmaz`,
    description: `Topluluktan gelen öneriler ve deneyimler (${blogSlug}).`,
  };
}

export default async function ContributionsByBlogSlug({ params }: Params) {
  const { blogSlug } = await params;

  const contribType = contribTypeBySlug(blogSlug);
  if (contribType === "none") {
    notFound();
  }

  // Fetch contributions via anonymous GraphQL (server-side)
  // Use the anonymous endpoint for reading contributions
  const graphqlUrl =
    process.env.NEXT_PUBLIC_NHOST_GRAPHQL_URL ||
    (process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN
      ? `https://${process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN}.nhost.run/v1/graphql`
      : null);

  let contributions: Array<{
    id: string;
    external_id: string | null;
    title: string;
    year?: number | null;
    note: string;
    poster_url?: string | null;
    source_url?: string | null;
    created_at: string;
    user?: {
      id: string;
      displayName?: string | null;
      avatarUrl?: string | null;
    } | null;
    contribution_comments_aggregate: {
      aggregate: {
        count: number;
      };
    };
    contribution_comments: Array<{
      id: string;
      body: string;
      created_at: string;
      user: {
        id: string;
        displayName?: string | null;
        avatarUrl?: string | null;
      };
    }>;
  }> = [];

  if (graphqlUrl) {
    try {
      const resp = await fetch(graphqlUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query GetContributionsByBlog($slug: String!) {
            contributions(where: { blog_slug: { _eq: $slug } }, order_by: { created_at: desc }) {
              id
              external_id
              title
              year
              note
              poster_url
              source_url
              created_at
              user { 
                id 
                displayName 
                avatarUrl 
              }
              reactions_heart: contribution_reactions_aggregate(where: { type: { _eq: heart } }) { aggregate { count } }
              reactions_hug: contribution_reactions_aggregate(where: { type: { _eq: hug } }) { aggregate { count } }
              reactions_metoo: contribution_reactions_aggregate(where: { type: { _eq: metoo } }) { aggregate { count } }
              reactions_hope: contribution_reactions_aggregate(where: { type: { _eq: hope } }) { aggregate { count } }
              reactions_thanks: contribution_reactions_aggregate(where: { type: { _eq: thanks } }) { aggregate { count } }
              contribution_comments_aggregate {
                aggregate {
                  count
                }
              }
              contribution_comments(limit: 1, order_by: { created_at: desc }) {
                id
                body
                created_at
                user {
                  id
                  displayName
                  avatarUrl
                }
              }
            }
          }
        `,
          variables: { slug: blogSlug },
        }),
      });

      if (!resp.ok) {
        console.error("GraphQL fetch failed:", resp.status, resp.statusText);
        // Continue with empty contributions array
      } else {
        const result = await resp.json();

        if (result.errors) {
          console.error("GraphQL errors:", result.errors);
          // Continue with empty contributions array
        } else if (result.data?.contributions) {
          contributions = result.data.contributions;
        }
      }
    } catch (error) {
      console.error("Error fetching contributions:", error);
      // Continue with empty contributions array
    }
  } else {
    console.warn("No GraphQL URL configured, skipping contributions fetch");
  }

  const mappedContributions = contributions.map(
    (c: {
      id: string;
      external_id: string | null;
      title: string;
      year?: number | null;
      note: string;
      poster_url?: string | null;
      source_url?: string | null;
      created_at: string;
      user?: {
        id: string;
        displayName?: string | null;
        avatarUrl?: string | null;
      } | null;
      reactions_heart?: { aggregate?: { count?: number } };
      reactions_hug?: { aggregate?: { count?: number } };
      reactions_metoo?: { aggregate?: { count?: number } };
      reactions_hope?: { aggregate?: { count?: number } };
      reactions_thanks?: { aggregate?: { count?: number } };
      contribution_comments_aggregate: {
        aggregate: {
          count: number;
        };
      };
      contribution_comments: Array<{
        id: string;
        body: string;
        created_at: string;
        user: {
          id: string;
          displayName?: string | null;
          avatarUrl?: string | null;
        };
      }>;
    }) => ({
      id: c.id,
      slug: c.external_id || c.id,
      title: c.title,
      year: c.year ?? undefined,
      note: c.note,
      posterUrl: c.poster_url ?? null,
      sourceUrl: c.source_url ?? null,
      likeCount: c.reactions_heart?.aggregate?.count ?? 0,
      reactions: {
        heart: c.reactions_heart?.aggregate?.count ?? 0,
        hug: c.reactions_hug?.aggregate?.count ?? 0,
        metoo: c.reactions_metoo?.aggregate?.count ?? 0,
        hope: c.reactions_hope?.aggregate?.count ?? 0,
        thanks: c.reactions_thanks?.aggregate?.count ?? 0,
      },
      commentCount: c.contribution_comments_aggregate.aggregate.count,
      lastComment: c.contribution_comments[0]
        ? {
            body: c.contribution_comments[0].body,
            createdAt: c.contribution_comments[0].created_at,
            author: {
              displayName: c.contribution_comments[0].user.displayName || "Anonim",
              avatarUrl: c.contribution_comments[0].user.avatarUrl ?? null,
            },
          }
        : null,
      createdAt: c.created_at,
      submittedBy: {
        displayName: c.user?.displayName || "Anonim",
        avatarUrl: c.user?.avatarUrl ?? null,
      },
    }),
  );

  return (
    <ErrorBoundary>
      <main className="relative min-h-screen">
        {/* Empathetic Community Header */}
        <section className="relative overflow-hidden border-b bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/30">
          {/* Gentle wave pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJ3YXZlIiB4PSIwIiB5PSIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNMzAgNDVjLTguMjg0IDAtMTUtNi43MTYtMTUtMTVzNi43MTYtMTUgMTUtMTUgMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTV6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoNTksMTMwLDI0NiwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCN3YXZlKSIvPgo8L3N2Zz4=')] opacity-30" />

          <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 md:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Link
                  href={`/blog/${blogSlug}`}
                  className="inline-flex w-fit items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-gray-600 backdrop-blur-sm transition-all duration-300 hover:bg-white/60 hover:text-gray-900 hover:shadow-md dark:text-gray-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Blog yazısına dön
                </Link>
                <div className="hidden h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent sm:block dark:via-gray-600" />
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="relative flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-2xl shadow-xl sm:h-16 sm:w-16 sm:text-3xl">
                      {getTypeIcon(contribType)}
                    </div>
                    {/* Gentle glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-xl" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-xl leading-tight font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">
                      Sizlerden Gelen {getContributionTypeLabel(contribType)} Önerileri
                    </h1>
                    <p className="mt-1 text-xs text-gray-600 sm:text-sm dark:text-gray-300">
                      {mappedContributions.length} kişi paylaştı • Son öneri:{" "}
                      {formatDate(mappedContributions[0]?.createdAt || new Date().toISOString())}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contributions Section */}
        <section className="bg-white dark:bg-slate-900">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:px-8">
            {/* Community Controls */}
            {mappedContributions.length > 0 && (
              <div className="mb-10 flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-6 dark:from-slate-800/50 dark:to-blue-950/30">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 border-blue-200 bg-white/80 text-blue-700 backdrop-blur-sm transition-all duration-300 hover:border-blue-300 hover:bg-blue-100 dark:border-blue-600 dark:bg-slate-700/80 dark:text-blue-300 dark:hover:border-blue-500 dark:hover:bg-blue-900/30"
                  >
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filtrele</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 border-purple-200 bg-white/80 text-purple-700 backdrop-blur-sm transition-all duration-300 hover:border-purple-300 hover:bg-purple-100 dark:border-purple-600 dark:bg-slate-700/80 dark:text-purple-300 dark:hover:border-purple-500 dark:hover:bg-purple-900/30"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="hidden sm:inline">Sırala</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 border-indigo-200 bg-white/80 text-indigo-700 backdrop-blur-sm transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-100 dark:border-indigo-600 dark:bg-slate-700/80 dark:text-indigo-300 dark:hover:border-indigo-500 dark:hover:bg-indigo-900/30"
                  >
                    <Users className="h-4 w-4" />
                    <span className="hidden sm:inline">Topluluk</span>
                  </Button>
                </div>
                <div className="flex items-center justify-between gap-3 text-sm font-semibold text-gray-700 sm:justify-end dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-md"></div>
                    <span className="text-gray-600 dark:text-gray-400">Topluluk</span>
                  </div>
                  <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 text-xs font-bold text-white shadow-md sm:px-4 sm:text-sm">
                    {mappedContributions.length} Öneri
                  </div>
                </div>
              </div>
            )}

            {/* Contributions List - Ekşi Sözlük Style */}
            {mappedContributions.length > 0 ? (
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-800">
                {mappedContributions.map((contribution) => (
                  <HorizontalContributionCard
                    key={contribution.id}
                    contribution={contribution}
                    blogSlug={blogSlug}
                    contribType={contribType}
                  />
                ))}

                {/* Öner Button - Right Below Load More */}
                <div className="mt-6 text-center">
                  <FloatingActionButton
                    blogSlug={blogSlug}
                    contribType={contribType as "film" | "book" | "music" | "poem" | "quote"}
                  />
                </div>
              </div>
            ) : (
              <EmptyState contribType={contribType} />
            )}
          </div>
        </section>
      </main>
    </ErrorBoundary>
  );
}

// Helper functions for type icons and colors
function getTypeIcon(type: string) {
  switch (type) {
    case "film":
      return "🎬";
    case "book":
      return "📚";
    case "music":
      return "🎵";
    case "poem":
      return "📝";
    case "quote":
      return "💭";
    default:
      return "✨";
  }
}

// Horizontal Contribution Card Component
function HorizontalContributionCard({
  contribution,
  blogSlug,
  contribType,
}: {
  contribution: {
    id: string;
    slug: string;
    title: string;
    year?: number;
    note: string;
    posterUrl: string | null;
    sourceUrl: string | null;
    likeCount: number;
    reactions?: {
      heart?: number;
      hug?: number;
      metoo?: number;
      hope?: number;
      thanks?: number;
    };
    commentCount: number;
    lastComment: {
      body: string;
      createdAt: string;
      author: {
        displayName: string;
        avatarUrl: string | null;
      };
    } | null;
    createdAt: string;
    submittedBy: {
      displayName: string;
      avatarUrl: string | null;
    };
  };
  blogSlug: string;
  contribType: string;
}) {
  return (
    <Link
      href={`/sizden-gelenler/${blogSlug}/${contribution.slug}`}
      className="group block cursor-pointer"
    >
      <article className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-slate-800">
        <div className="flex gap-6 p-6">
          {/* Poster */}
          <div className="flex-shrink-0">
            {contribution.posterUrl ? (
              <Image
                src={contribution.posterUrl}
                alt={`${contribution.title} afişi`}
                width={100}
                height={150}
                className="rounded-lg object-cover"
                sizes="(max-width: 640px) 100px, 100px"
              />
            ) : (
              <div className="flex h-37 w-25 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
                <div className="text-2xl opacity-60">{getTypeIcon(contribType)}</div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            {/* Header with User Info */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex-1">
                {/* Title and Year */}
                <div className="mb-2">
                  <h3 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
                    {contribution.title}
                  </h3>
                  {contribution.year && (
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={14} />
                      <span>{contribution.year}</span>
                    </div>
                  )}
                </div>

                {/* Source Link */}
                {contribution.sourceUrl && (
                  <div className="mb-3">
                    <ExternalLinkButton href={contribution.sourceUrl}>
                      <ExternalLink size={14} />
                      <span>IMDb&apos;de Görüntüle</span>
                    </ExternalLinkButton>
                  </div>
                )}
              </div>

              {/* User Avatar and Info */}
              <div className="ml-4 flex items-center gap-3">
                {contribution.submittedBy.avatarUrl ? (
                  <Image
                    src={contribution.submittedBy.avatarUrl}
                    alt={`${contribution.submittedBy.displayName} avatar`}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                    <User size={20} className="text-white" />
                  </div>
                )}
                <div className="text-right">
                  {contribution.submittedBy.displayName && (
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {contribution.submittedBy.displayName}
                    </div>
                  )}
                  <time dateTime={contribution.createdAt} className="text-xs text-gray-400">
                    {new Date(contribution.createdAt).toLocaleDateString("tr-TR")}
                  </time>
                </div>
              </div>
            </div>

            {/* User's Note */}
            <div className="mb-4">
              <p
                className="text-sm leading-relaxed text-gray-600 dark:text-gray-300"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {contribution.note}
              </p>
            </div>

            {/* Interaction Icons */}
            <div className="flex items-center justify-end gap-4">
              <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
                <span className="inline-flex items-center gap-1">
                  <Heart className="h-4 w-4 text-red-500" />
                  {contribution.reactions?.heart ?? 0}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Handshake className="h-4 w-4 text-amber-600" />
                  {contribution.reactions?.hug ?? 0}
                </span>
                <span className="inline-flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4 text-sky-600" />
                  {contribution.reactions?.metoo ?? 0}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-emerald-600" />
                  {contribution.reactions?.hope ?? 0}
                </span>
                <span className="inline-flex items-center gap-1">
                  <HandHeart className="h-4 w-4 text-pink-600" />
                  {contribution.reactions?.thanks ?? 0}
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-400 transition-colors duration-200 hover:text-gray-600">
                <MessageCircle className="h-5 w-5" />
                <span className="text-xs">{contribution.commentCount}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

// Empty State Component
function EmptyState({ contribType }: { contribType: string }) {
  const getEmptyStateContent = (type: string) => {
    switch (type) {
      case "film":
        return {
          icon: "🎬",
          title: "Henüz film önerisi yok",
          description:
            "Bu konuda henüz film önerisi bulunmuyor. İlk öneriyi siz yapın ve topluluğa katkıda bulunun!",
          action: "İlk film önerisini yap",
        };
      case "book":
        return {
          icon: "📚",
          title: "Henüz kitap önerisi yok",
          description: "Bu konuda henüz kitap önerisi bulunmuyor. Favori kitabınızı paylaşın!",
          action: "İlk kitap önerisini yap",
        };
      case "music":
        return {
          icon: "🎵",
          title: "Henüz müzik önerisi yok",
          description: "Bu konuda henüz müzik önerisi bulunmuyor. En sevdiğiniz şarkıyı paylaşın!",
          action: "İlk müzik önerisini yap",
        };
      case "poem":
        return {
          icon: "📝",
          title: "Henüz şiir paylaşımı yok",
          description: "Bu konuda henüz şiir paylaşımı bulunmuyor. En sevdiğiniz şiiri paylaşın!",
          action: "İlk şiiri paylaş",
        };
      case "quote":
        return {
          icon: "💭",
          title: "Henüz söz paylaşımı yok",
          description: "Bu konuda henüz söz paylaşımı bulunmuyor. Anlamlı bir söz paylaşın!",
          action: "İlk sözü paylaş",
        };
      default:
        return {
          icon: "✨",
          title: "Henüz katkı yok",
          description: "Bu konuda henüz topluluk katkısı bulunmuyor. İlk katkıyı siz yapın!",
          action: "İlk katkıyı yap",
        };
    }
  };

  const content = getEmptyStateContent(contribType);

  return (
    <div className="py-24 text-center">
      <div className="mx-auto mb-10 flex h-40 w-40 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 text-8xl shadow-2xl dark:from-blue-500 dark:via-indigo-600 dark:to-purple-600">
        {content.icon}
      </div>
      <h3 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        {content.title}
      </h3>
      <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
        {content.description}
      </p>
      <Button
        size="lg"
        className="gap-3 bg-gradient-to-r from-blue-500 to-purple-500 px-12 py-4 font-semibold text-white shadow-xl transition-all duration-500 hover:scale-105 hover:from-blue-600 hover:to-purple-600 hover:shadow-2xl"
      >
        <Heart className="h-6 w-6" />
        {content.action}
      </Button>
    </div>
  );
}

// Helper functions
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 24) {
    return `${diffInHours} saat önce`;
  } else if (diffInHours < 48) {
    return "1 gün önce";
  } else {
    return `${Math.floor(diffInHours / 24)} gün önce`;
  }
}
