import { contribTypeBySlug } from "@/content/contribConfig";
import { getInitialContributions } from "@/lib/contributions/mockServer";
import SizdenGelenlerSection from "@/components/interactions/sizden-gelenler/SizdenGelenlerSection";

export default async function SizdenGelenlerForPost({ slug }: { slug: string }) {
  const typeSlug = contribTypeBySlug(slug); // 'film' | 'none'
  const { popular, recent } = await getInitialContributions(slug, 6);

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
