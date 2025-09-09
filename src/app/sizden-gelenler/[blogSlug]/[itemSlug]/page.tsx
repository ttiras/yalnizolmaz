import Link from "next/link";
import { getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { contribTypeBySlug } from "@/lib/contribConfig";

type Params = { params: Promise<{ blogSlug: string; itemSlug: string }> };

export async function generateMetadata({ params }: Params) {
  const { blogSlug, itemSlug } = await params;
  const post = getPostBySlug(blogSlug);
  if (!post) return {};

  const contribution = await getContributionBySlug(blogSlug, itemSlug);
  if (!contribution) return {};

  return {
    title: `${contribution.title} - Sizden Gelenler | yalnizolmaz`,
    description: `${contribution.note} ${post.data.title} hakkında topluluk katkısı.`,
  };
}

export default async function IndividualContribution({ params }: Params) {
  const { blogSlug, itemSlug } = await params;
  const post = getPostBySlug(blogSlug);

  if (!post) {
    notFound();
  }

  const contribType = contribTypeBySlug(blogSlug);
  if (contribType === "none") {
    notFound();
  }

  const contribution = await getContributionBySlug(blogSlug, itemSlug);
  if (!contribution) {
    notFound();
  }

  const comments = await getCommentsForContribution(contribution.id);

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
        <div className="relative mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-20">
          <div className="mb-4 flex items-center gap-2 text-sm">
            <Link
              href={`/sizden-gelenler/${blogSlug}`}
              className="font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              ← Tüm katkılar
            </Link>
            <span style={{ color: "var(--muted-foreground)" }}>•</span>
            <Link
              href={`/blog/${blogSlug}`}
              className="font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              Blog yazısı
            </Link>
          </div>

          <h1
            className="heading-serif mb-4 text-4xl font-bold tracking-tight md:text-5xl"
            style={{ color: "var(--foreground)" }}
          >
            {contribution.title}
            {contribution.year && ` (${contribution.year})`}
          </h1>

          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
              <div>
                <div className="font-medium" style={{ color: "var(--foreground)" }}>
                  {contribution.submittedBy?.displayName || "Anonim"}
                </div>
                <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                  {formatDate(contribution.createdAt)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 rounded-lg border px-3 py-1 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {contribution.likeCount}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative mx-auto max-w-4xl px-6 py-12 md:px-8">
        <div
          className="rounded-2xl border p-8"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
        >
          <h2 className="mb-4 text-xl font-semibold" style={{ color: "var(--foreground)" }}>
            Katkı Notu
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: "var(--foreground)" }}>
            {contribution.note}
          </p>
        </div>

        {/* External Links */}
        {contribution.sourceUrl && (
          <div className="mt-6">
            <a
              href={contribution.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
              style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              IMDb&apos;de Görüntüle
            </a>
          </div>
        )}
      </section>

      {/* Comments Section */}
      <section className="relative mx-auto max-w-4xl px-6 pb-20 md:px-8">
        <h3 className="mb-6 text-xl font-semibold" style={{ color: "var(--foreground)" }}>
          Yorumlar ({comments.length})
        </h3>

        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-lg border p-4"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-green-400 to-blue-400"></div>
                  <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {comment.displayName}
                  </span>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p style={{ color: "var(--foreground)" }}>{comment.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p style={{ color: "var(--muted-foreground)" }}>
              Henüz yorum yok. İlk yorumu siz yapın!
            </p>
          </div>
        )}

        {/* Add Comment Form */}
        <div
          className="mt-8 rounded-lg border p-6"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
        >
          <h4 className="mb-4 font-medium" style={{ color: "var(--foreground)" }}>
            Yorum Ekle
          </h4>
          <textarea
            className="w-full rounded-lg border p-3 text-sm"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--background)" }}
            rows={3}
            placeholder="Düşüncelerinizi paylaşın..."
          />
          <button className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            Yorum Gönder
          </button>
        </div>
      </section>
    </main>
  );
}

// Helper functions
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function getContributionBySlug(blogSlug: string, itemSlug: string) {
  // Mock data - replace with real API call
  const contributions: Record<
    string,
    Record<
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
        sourceUrl?: string;
      }
    >
  > = {
    "yalnizlar-icin-film-onerileri": {
      "anayurt-oteli-1987": {
        id: "1",
        slug: "anayurt-oteli-1987",
        title: "Anayurt Oteli",
        year: 1987,
        note: "Bu film yalnızlığı çok güzel anlatıyor. Ömer Kavur'un en iyi filmi bence. Sessizliğin ağırlığını hissettiren sahneler var. Özellikle son sahne çok etkileyici.",
        likeCount: 15,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        submittedBy: { displayName: "Ahmet123", avatarUrl: null },
        sourceUrl: "https://www.imdb.com/title/tt0092558/",
      },
      "uzak-2002": {
        id: "2",
        slug: "uzak-2002",
        title: "Uzak",
        year: 2002,
        note: "Sessizliğin ağırlığını hissettiren bir başyapıt. Nuri Bilge Ceylan'ın ustalığı. Yalnızlık temasını bu kadar güzel işleyen başka film yok.",
        likeCount: 23,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        submittedBy: { displayName: "Ayşe456", avatarUrl: null },
        sourceUrl: "https://www.imdb.com/title/tt0346094/",
      },
    },
    "yalnizken-iyi-gelen-kitaplar": {
      "saatleri-ayarlama-enstitusu": {
        id: "3",
        slug: "saatleri-ayarlama-enstitusu",
        title: "Saatleri Ayarlama Enstitüsü",
        year: 1961,
        note: "Ahmet Hamdi Tanpınar'ın yalnızlık temasını en güzel işlediği eser. Mutlaka okunmalı. Zaman ve yalnızlık üzerine derin düşünceler.",
        likeCount: 18,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        submittedBy: { displayName: "Mehmet789", avatarUrl: null },
      },
    },
    "yalnizlik-sozleri": {
      "ozdemir-asaf-yalnizlik": {
        id: "4",
        slug: "ozdemir-asaf-yalnizlik",
        title: "Özdemir Asaf - Yalnızlık",
        note: "Yalnızlık paylaşılmaz, paylaşıldığında yalnızlık olmaz. Bu söz çok etkileyici. Yalnızlığın doğasını çok güzel açıklıyor.",
        likeCount: 31,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        submittedBy: { displayName: "Zeynep321", avatarUrl: null },
      },
    },
  };

  return contributions[blogSlug]?.[itemSlug] || null;
}

async function getCommentsForContribution(contributionId: string) {
  // Mock data - replace with real API call
  const comments: Record<
    string,
    {
      id: string;
      displayName: string;
      content: string;
      createdAt: string;
    }[]
  > = {
    "1": [
      {
        id: "1",
        displayName: "Ayşe456",
        content:
          "Harika seçim! Ben de çok beğenmiştim bu filmi. Özellikle son sahne çok etkileyici.",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "2",
        displayName: "Mehmet789",
        content:
          "Ömer Kavur'un en iyi filmi bence. Yalnızlık temasını bu kadar güzel işleyen başka film yok.",
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
    ],
    "2": [
      {
        id: "3",
        displayName: "Ahmet123",
        content:
          "Nuri Bilge Ceylan'ın ustalığı gerçekten etkileyici. Bu filmi izlerken çok düşündüm.",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
    ],
  };

  return comments[contributionId] || [];
}
