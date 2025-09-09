export type ContribTypeSlug = "film" | "book" | "quote" | "poem" | "music" | "none";

export const contribTypeBySlug = (slug: string): ContribTypeSlug => {
  if (slug === "yalnizlar-icin-film-onerileri") return "film";
  if (slug === "yalnizken-iyi-gelen-kitaplar") return "book";
  if (slug === "yalnizlik-sozleri") return "quote";
  if (slug === "yalnizliga-iyi-gelen-siirler") return "poem";
  if (slug === "yalnizlar-icin-en-iyi-sarkilar") return "music";
  return "none";
};

export const generateItemSlug = (title: string, year?: number): string => {
  const cleanTitle = title
    .toLowerCase()
    .replace(/[şçğüöı]/g, (char) => {
      const map: Record<string, string> = {
        ş: "s",
        ç: "c",
        ğ: "g",
        ü: "u",
        ö: "o",
        ı: "i",
      };
      return map[char] || char;
    })
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

  return year ? `${cleanTitle}-${year}` : cleanTitle;
};

export const getContributionTypeLabel = (type: ContribTypeSlug): string => {
  const labels: Record<ContribTypeSlug, string> = {
    film: "Film",
    book: "Kitap",
    quote: "Söz",
    poem: "Şiir",
    music: "Müzik",
    none: "Diğer",
  };
  return labels[type];
};
