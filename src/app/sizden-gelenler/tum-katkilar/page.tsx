import { Suspense } from "react";
import { ContributionGrid } from "@/components/contributions/ContributionGrid";
import ContributionFilters from "@/components/contributions/ContributionFilters";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Tüm Katkılar | Sizden Gelenler | yalnizolmaz",
  description:
    "Topluluktan gelen tüm öneriler, deneyimler ve paylaşımlar. Yalnızlık teması etrafında bir araya gelen hikayeler.",
};

interface SearchParams {
  searchParams: Promise<{
    type?: string;
    search?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function AllContributionsPage({ searchParams }: SearchParams) {
  const params = await searchParams;
  const type = params.type || "all";
  const search = params.search || "";
  const sort = params.sort || "newest";
  const page = parseInt(params.page || "1");

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
              Tüm Katkılar
            </h1>
            <p
              className="mx-auto max-w-3xl text-xl leading-relaxed md:text-2xl"
              style={{ color: "var(--muted-foreground)" }}
            >
              Topluluktan gelen tüm öneriler, deneyimler ve paylaşımlar. Yalnızlık teması etrafında
              bir araya gelen hikayeler.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="relative mx-auto max-w-7xl px-6 py-8 md:px-8">
        <ContributionFilters currentType={type} currentSearch={search} currentSort={sort} />
      </section>

      {/* Contributions Grid */}
      <section className="relative mx-auto max-w-7xl px-6 py-12 md:px-8">
        <Suspense fallback={<ContributionGridSkeleton />}>
          <ContributionGrid type={type} search={search} sort={sort} page={page} />
        </Suspense>
      </section>
    </main>
  );
}

function ContributionGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg border p-6"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
        >
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="mb-4 h-32 w-full rounded-lg" />
          <Skeleton className="mb-2 h-6 w-3/4" />
          <Skeleton className="mb-4 h-4 w-full" />
          <Skeleton className="mb-4 h-4 w-2/3" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
