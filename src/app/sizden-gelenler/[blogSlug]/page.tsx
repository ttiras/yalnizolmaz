import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { contribTypeBySlug } from "@/lib/contribConfig";

type Params = { params: Promise<{ blogSlug: string }> };

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts
    .filter((post) => contribTypeBySlug(post.slug) !== "none")
    .map((post) => ({ blogSlug: post.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { blogSlug } = await params;
  const post = getPostBySlug(blogSlug);
  if (!post) return {};

  return {
    title: `Sizden Gelenler - ${post.data.title} | yalnizolmaz`,
    description: `${post.data.description} Topluluktan gelen öneriler ve deneyimler.`,
  };
}

export default async function ContributionsByBlogSlug({ params }: Params) {
  const { blogSlug } = await params;
  const post = getPostBySlug(blogSlug);

  if (!post) {
    notFound();
  }

  const contribType = contribTypeBySlug(blogSlug);
  if (contribType === "none") {
    notFound();
  }

  // Get mock contributions for this blog post
  const contributions = await getContributionsForBlog(blogSlug);

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
            {post.data.title}
          </h2>
          <p className="max-w-2xl text-lg" style={{ color: "var(--muted-foreground)" }}>
            {post.data.description}
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

async function getContributionsForBlog(blogSlug: string) {
  // Mock data - replace with real API call
  const mockContributions: Record<
    string,
    {
      id: string;
      slug: string;
      title: string;
      year?: number;
      note: string;
      likeCount: number;
      createdAt: string;
      submittedBy: { displayName: string; avatarUrl: string | null };
    }[]
  > = {
    "yalnizlar-icin-film-onerileri": [
      {
        id: "1",
        slug: "anayurt-oteli-1987",
        title: "Anayurt Oteli",
        year: 1987,
        note: "Bu film yalnızlığı çok güzel anlatıyor. Ömer Kavur'un en iyi filmi bence.",
        likeCount: 15,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        submittedBy: { displayName: "Ahmet123", avatarUrl: null },
      },
      {
        id: "2",
        slug: "uzak-2002",
        title: "Uzak",
        year: 2002,
        note: "Sessizliğin ağırlığını hissettiren bir başyapıt. Nuri Bilge Ceylan'ın ustalığı.",
        likeCount: 23,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        submittedBy: { displayName: "Ayşe456", avatarUrl: null },
      },
    ],
    "yalnizken-iyi-gelen-kitaplar": [
      {
        id: "3",
        slug: "saatleri-ayarlama-enstitusu",
        title: "Saatleri Ayarlama Enstitüsü",
        year: 1961,
        note: "Ahmet Hamdi Tanpınar'ın yalnızlık temasını en güzel işlediği eser. Mutlaka okunmalı.",
        likeCount: 18,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        submittedBy: { displayName: "Mehmet789", avatarUrl: null },
      },
    ],
    "yalnizlik-sozleri": [
      {
        id: "4",
        slug: "ozdemir-asaf-yalnizlik",
        title: "Özdemir Asaf - Yalnızlık",
        note: "Yalnızlık paylaşılmaz, paylaşıldığında yalnızlık olmaz. Bu söz çok etkileyici.",
        likeCount: 31,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        submittedBy: { displayName: "Zeynep321", avatarUrl: null },
      },
    ],
  };

  return mockContributions[blogSlug] || [];
}
