import SizdenGelenlerClient from "./SizdenGelenlerClient";
import type { ContributionMovie, SizdenGelenlerProps } from "@/lib/types/contributions";

// JSON-LD helper function
function generateJsonLd(contributions: ContributionMovie[]) {
  const itemListElement = contributions.slice(0, 10).map((contribution, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Movie",
      name: contribution.title,
      url: contribution.sourceUrl || undefined,
      datePublished: contribution.year?.toString(),
      image: contribution.posterUrl || undefined,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: itemListElement,
  };
}

export default function SizdenGelenlerSection({
  slug,
  typeSlug,
  initialPopular,
  initialNew = [],
  loggedIn = false,
  showForm = true,
  emptyStateText = "Henüz bir öneri yok. İlk öneriyi siz yapın!",
}: SizdenGelenlerProps) {
  // Generate JSON-LD for SEO (only when there are items)
  const jsonLd = initialPopular.length > 0 ? generateJsonLd(initialPopular) : null;

  return (
    <>
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <section
        id="sizden-gelenler"
        className="mt-16 border-t border-gray-200 pt-8"
        data-slug={slug}
      >
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Sizden Gelenler</h2>
            <p className="leading-relaxed text-gray-600">
              {typeSlug === "film"
                ? "Okuyucularımızın paylaştığı film önerilerini keşfedin. Beğendiğiniz filmleri beğenebilir, kendi önerilerinizi ekleyebilirsiniz."
                : "Topluluk önerilerini keşfedin ve beğendiğiniz içerikleri beğenebilirsiniz."}
            </p>
          </div>

          {/* Client-side interactive content */}
          <SizdenGelenlerClient
            initialContributions={initialPopular}
            loggedIn={loggedIn}
            showForm={showForm}
            emptyStateText={emptyStateText}
            slug={slug}
          />
        </div>
      </section>
    </>
  );
}
