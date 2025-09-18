import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Film, BookOpen, Music, FileText, Quote, Heart, ExternalLink } from "lucide-react";

interface Contribution {
  id: string;
  title: string;
  year?: number;
  note: string;
  type: string;
  likeCount: number;
  createdAt: string;
  posterUrl?: string | null;
  sourceUrl?: string | null;
  submittedBy: {
    displayName: string;
    avatarUrl?: string | null;
  };
}

interface ContributionCardProps {
  contribution: Contribution;
}

const typeIcons = {
  film: Film,
  book: BookOpen,
  music: Music,
  poem: FileText,
  quote: Quote,
};

const typeLabels = {
  film: "Film",
  book: "Kitap",
  music: "Müzik",
  poem: "Şiir",
  quote: "Söz",
};

const typeColors = {
  film: "from-red-500 to-pink-500",
  book: "from-blue-500 to-indigo-500",
  music: "from-purple-500 to-violet-500",
  poem: "from-green-500 to-emerald-500",
  quote: "from-orange-500 to-amber-500",
};

export function ContributionCard({ contribution }: ContributionCardProps) {
  const Icon = typeIcons[contribution.type as keyof typeof typeIcons] || FileText;
  const typeLabel = typeLabels[contribution.type as keyof typeof typeLabels] || "Diğer";
  const typeColor = typeColors[contribution.type as keyof typeof typeColors] || "from-gray-500 to-gray-600";

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${typeColor} flex items-center justify-center`}>
              <Icon className="h-4 w-4 text-white" />
            </div>
            <div>
              <Badge variant="secondary" className="text-xs">
                {typeLabel}
              </Badge>
              <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                {formatDate(contribution.createdAt)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
            <Heart className="h-3 w-3" />
            {contribution.likeCount}
          </div>
        </div>

        {/* Poster */}
        {contribution.posterUrl && (
          <div className="mb-4">
            <img
              src={contribution.posterUrl}
              alt={contribution.title}
              className="h-32 w-full object-cover rounded-lg"
            />
          </div>
        )}

        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold line-clamp-2" style={{ color: "var(--foreground)" }}>
          {contribution.title}
          {contribution.year && ` (${contribution.year})`}
        </h3>

        {/* Note */}
        <p
          className="mb-4 line-clamp-3 text-sm"
          style={{ color: "var(--muted-foreground)" }}
        >
          {contribution.note}
        </p>

        {/* Author */}
        <div className="mb-4 flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
          <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            {contribution.submittedBy.displayName}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link
            href={`/sizden-gelenler/${getBlogSlugForType(contribution.type)}/${contribution.id}`}
            className="text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: "var(--accent)" }}
          >
            Detayları gör →
          </Link>
          {contribution.sourceUrl && (
            <a
              href={contribution.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

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

function getBlogSlugForType(type: string): string {
  const typeToSlug: Record<string, string> = {
    film: "yalnizlar-icin-film-onerileri",
    book: "yalnizken-iyi-gelen-kitaplar",
    music: "yalnizlar-icin-en-iyi-sarkilar",
    poem: "yalnizliga-iyi-gelen-siirler",
    quote: "yalnizlik-sozleri",
  };
  return typeToSlug[type] || "sizden-gelenler";
}
