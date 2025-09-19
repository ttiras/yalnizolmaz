import { notFound } from "next/navigation";
import { contribTypeBySlug } from "@/lib/contribConfig";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface Params {
  params: Promise<{ blogSlug: string; itemSlug: string }>;
}

export async function generateMetadata({ params }: Params) {
  const { blogSlug, itemSlug } = await params;
  return {
    title: `Katkı Detayı - ${itemSlug} | yalnizolmaz`,
    description: `Topluluk katkısı detayları: ${itemSlug}`,
  };
}

export default async function ContributionDetailPage({ params }: Params) {
  const { blogSlug } = await params;

  const contribType = contribTypeBySlug(blogSlug);
  if (contribType === "none") {
    notFound();
  }

  // For now, return a placeholder since we don't have the individual contribution data yet
  // This prevents 404 errors when users click on contribution links
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
              href={`/sizden-gelenler/${blogSlug}`}
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              ← Geri dön
            </Link>
          </div>
          <h1
            className="heading-serif mb-4 text-4xl font-bold tracking-tight md:text-5xl"
            style={{ color: "var(--foreground)" }}
          >
            Katkı Detayı
          </h1>
          <p className="max-w-2xl text-lg" style={{ color: "var(--muted-foreground)" }}>
            Bu katkı detay sayfası yakında eklenecek.
          </p>
        </div>
      </section>

      {/* Placeholder Content */}
      <section className="relative mx-auto max-w-4xl px-6 py-12 md:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Katkı Detayları</CardTitle>
            <CardDescription>
              Bu katkının detayları henüz yüklenemedi. Lütfen daha sonra tekrar deneyin.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-8 text-center">
              <p className="text-muted-foreground mb-4">Katkı detay sayfası geliştiriliyor...</p>
              <Link
                href={`/sizden-gelenler/${blogSlug}`}
                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Geri Dön
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
