export type Contribution = {
  id: string;
  title: string;
  year?: number;
  note: string;
  type: string;
  posterUrl?: string | null;
  sourceUrl?: string | null;
  likeCount: number;
  createdAt: string;
  submittedBy: {
    displayName: string;
    avatarUrl?: string | null;
  };
};

export type ContributionMovie = Contribution;

export type SizdenGelenlerProps = {
  slug: string; // blog slug, e.g., "yalnizlar-icin-film-onerileri"
  typeSlug: "film" | "none";
  initialPopular: ContributionMovie[]; // top 5–10
  initialNew?: ContributionMovie[]; // optional; used by the "Yeni" tab
  loggedIn?: boolean;
  showForm?: boolean; // NEW
  emptyStateText?: string; // NEW
};

export type ContributionFormMovieProps = {
  onSubmitted?: (created: ContributionMovie) => void;
  loggedIn?: boolean;
  slug: string;
};

export type MovieSearchResult = {
  title: string;
  year?: number;
  posterUrl?: string | null;
  sourceUrl?: string | null;
  externalId?: string;
};
