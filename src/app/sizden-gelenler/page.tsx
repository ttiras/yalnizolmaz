import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { contribTypeBySlug } from "@/lib/contribConfig";
import { ContributionTypeCard } from "@/components/contributions/ContributionTypeCard";
import { ContributionStats } from "@/components/contributions/ContributionStats";
import RecentContributions from "@/components/contributions/RecentContributions";

export const metadata = {
  title: "Sizden Gelenler | yalnizolmaz",
  description: "Topluluktan gelen öneriler, deneyimler ve paylaşımlar. Yalnızlık teması etrafında bir araya gelen hikayeler.",
};

export default async function ContributionsPage() {
  const posts = getAllPosts();

  // Filter posts that have contributions enabled
  const contribPosts = posts.filter((post) => {
    const contribType = contribTypeBySlug(post.slug);
    return contribType !== "none";
  });

  // Group posts by contribution type
  const postsByType = contribPosts.reduce((acc, post) => {
    const type = contribTypeBySlug(post.slug);
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(post);
    return acc;
  }, {} as Record<string, typeof contribPosts>);

  // For now, use empty contributions to avoid GraphQL errors
  const recentContributions: Contribution[] = [];

  const contributionTypes = [
    {
      type: "film" as const,
      title: "Film Önerileri",
      description: "Yalnızlığı en güzel anlatan filmler",
      icon: "🎬",
      color: "from-red-500 to-pink-500",
      count: postsByType.film?.length || 0,
    },
    {
      type: "book" as const,
      title: "Kitap Önerileri", 
      description: "Yalnızlıkla ilgili en etkileyici kitaplar",
      icon: "📚",
      color: "from-blue-500 to-indigo-500",
      count: postsByType.book?.length || 0,
    },
    {
      type: "music" as const,
      title: "Müzik Önerileri",
      description: "Yalnızlığa eşlik eden şarkılar ve albümler",
      icon: "🎵",
      color: "from-purple-500 to-violet-500",
      count: postsByType.music?.length || 0,
    },
    {
      type: "poem" as const,
      title: "Şiir Paylaşımları",
      description: "Yalnızlığı en güzel anlatan şiirler",
      icon: "📝",
      color: "from-green-500 to-emerald-500",
      count: postsByType.poem?.length || 0,
    },
    {
      type: "quote" as const,
      title: "Yalnızlık Sözleri",
      description: "Yalnızlık hakkında anlamlı sözler",
      icon: "💭",
      color: "from-orange-500 to-amber-500",
      count: postsByType.quote?.length || 0,
    },
  ];

  return (
    <main className="relative">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden border-b"
        style={{
          borderColor: "var(--border)",
          background: "linear-gradient(135deg, var(--background) 0%, var(--card) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-24">
          <div className="text-center">
            <h1
              className="heading-serif mb-6 text-5xl font-bold tracking-tight md:text-6xl"
              style={{ color: "var(--foreground)" }}
            >
              Sizden Gelenler
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed md:text-2xl" style={{ color: "var(--muted-foreground)" }}>
              Yalnızlık teması etrafında bir araya gelen topluluk. Paylaştığınız her film, kitap, 
              şiir ve müzik, birbirimizi daha iyi anlamamıza yardımcı oluyor.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-12 md:px-8">
        <ContributionStats />
      </section>

      {/* Contribution Types Grid */}
      <section className="relative mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="mb-12 text-center">
          <h2
            className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
            style={{ color: "var(--foreground)" }}
          >
            Katkı Türleri
          </h2>
          <p className="mx-auto max-w-2xl text-lg" style={{ color: "var(--muted-foreground)" }}>
            Hangi konuda paylaşım yapmak istiyorsunuz? Aşağıdaki kategorilerden birini seçin ve 
            topluluğa katkıda bulunun.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contributionTypes.map((type) => (
            <ContributionTypeCard
              key={type.type}
              type={type.type}
              title={type.title}
              description={type.description}
              icon={type.icon}
              color={type.color}
              count={type.count}
              href={`/sizden-gelenler/${postsByType[type.type]?.[0]?.slug || '#'}`}
            />
          ))}
        </div>
      </section>

      {/* Recent Contributions */}
      <section className="relative mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="mb-12 text-center">
          <h2
            className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
            style={{ color: "var(--foreground)" }}
          >
            Son Paylaşımlar
          </h2>
          <p className="mx-auto max-w-2xl text-lg" style={{ color: "var(--muted-foreground)" }}>
            Topluluktan en son gelen katkıları keşfedin ve ilham alın.
          </p>
        </div>
        
        <RecentContributions contributions={recentContributions} />
        
        {/* View All Link */}
        <div className="mt-8 text-center">
          <Link
            href="/sizden-gelenler/tum-katkilar"
            className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            Tüm Katkıları Görüntüle
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative mx-auto max-w-4xl px-6 py-16 md:px-8">
        <div
          className="rounded-3xl border p-8 text-center md:p-12"
          style={{ 
            borderColor: "var(--border)", 
            backgroundColor: "var(--card)",
            background: "linear-gradient(135deg, var(--card) 0%, var(--background) 100%)"
          }}
        >
          <h3
            className="mb-4 text-2xl font-bold tracking-tight md:text-3xl"
            style={{ color: "var(--foreground)" }}
          >
            Siz de Katkıda Bulunun
          </h3>
          <p className="mb-8 text-lg" style={{ color: "var(--muted-foreground)" }}>
            Yalnızlıkla ilgili deneyimlerinizi, önerilerinizi ve düşüncelerinizi paylaşın. 
            Topluluğun bir parçası olun.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Giriş Yap
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
              style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
            >
              Hesap Oluştur
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}