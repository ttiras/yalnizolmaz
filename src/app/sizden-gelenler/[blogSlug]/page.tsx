import Link from "next/link";
import { notFound } from "next/navigation";
import { contribTypeBySlug } from "@/lib/contribConfig";
import { createNhostClient } from "@/app/lib/nhost/server";

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

  // Fetch contributions via GraphQL (server-side)
  const nhost = await createNhostClient();
  const resp = await nhost.graphql.request({
    query: `
      query GetContributionsByBlog($slug: String!) {
        contributions(where: { blog_slug: { _eq: $slug } }, order_by: { created_at: desc }) {
          id
          slug: external_id
          title
          year
          note
          created_at
          contribution_likes_aggregate { aggregate { count } }
          user: user { id displayName avatarUrl }
        }
      }
    `,
    variables: { slug: blogSlug },
  });

  const data = (
    resp as unknown as {
      data?: {
        contributions: Array<{
          id: string;
          slug: string | null;
          title: string;
          year?: number | null;
          note: string;
          created_at: string;
          contribution_likes_aggregate: { aggregate?: { count?: number | null } | null };
          user?: {
            id: string;
            displayName?: string | null;
            avatarUrl?: string | null;
          } | null;
        }>;
      };
      error?: unknown;
    }
  ).data;

  if (!data) {
    notFound();
  }

  const contributions = data.contributions.map((c) => ({
    id: c.id,
    slug: c.slug || c.id,
    title: c.title,
    year: c.year ?? undefined,
    note: c.note,
    likeCount: c.contribution_likes_aggregate.aggregate?.count ?? 0,
    createdAt: c.created_at,
    submittedBy: {
      displayName: c.user?.displayName || "Anonim",
      avatarUrl: c.user?.avatarUrl ?? null,
    },
  }));

  return (
    <main className="relative">
      {/* Hero */}
      <section
        className="relative overflow-hidden border-b"
        style={{
          borderColor: "var(--border)",
          background: "linear-gradient(to bottom, var(--background), var(--card))",
        }}
      >
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
          <div className="mb-4">
            <Link
              href={`/blog/${blogSlug}`}
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              ← Blog yazısına dön
            </Link>
          </div>
          <h1
            className="heading-serif mb-4 text-4xl font-bold tracking-tight md:text-5xl"
            style={{ color: "var(--foreground)" }}
          >
            Sizden Gelenler
          </h1>
          <h2 className="mb-4 text-2xl font-semibold" style={{ color: "var(--muted-foreground)" }}>
            {blogSlug}
          </h2>
          <p className="max-w-2xl text-lg" style={{ color: "var(--muted-foreground)" }}>
            Topluluktan gelen öneriler ve deneyimler.
          </p>
        </div>
      </section>

      {/* Contributions Grid */}
      <section className="relative mx-auto max-w-6xl px-6 py-12 md:px-8">
        {contributions.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contributions.map((contribution) => (
              <Link
                key={contribution.id}
                href={`/sizden-gelenler/${blogSlug}/${contribution.slug}`}
                className="group overflow-hidden rounded-2xl border transition-all hover:shadow-xl"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
              >
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
                    <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                      {contribution.submittedBy?.displayName || "Anonim"}
                    </span>
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {formatDate(contribution.createdAt)}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                    {contribution.title}
                    {contribution.year && ` (${contribution.year})`}
                  </h3>
                  <p
                    className="mb-3 line-clamp-2 text-sm"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {contribution.note}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {contribution.likeCount} beğeni
                    </span>
                    <span className="text-xs" style={{ color: "var(--accent)" }}>
                      Detayları gör →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
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
              Henüz katkı yok
            </h3>
            <p style={{ color: "var(--muted-foreground)" }}>
              Bu konuda henüz topluluk katkısı bulunmuyor. İlk katkıyı siz yapın!
            </p>
          </div>
        )}
      </section>
    </main>
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
