export type ContribTypeSlug = "film" | "none";

export const contribTypeBySlug = (slug: string): ContribTypeSlug => {
  // Extend this as we add new contribution types per post
  if (slug === "yalnizlar-icin-film-onerileri") return "film";
  return "none";
};
