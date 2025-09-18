import Link from "next/link";
import Image from "next/image";
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

interface RecentContributionsProps {
  contributions: Contribution[];
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

export default function RecentContributions({ contributions }: RecentContributionsProps) {
  if (contributions.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-gray-400">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-medium" style={{ color: "var(--foreground)" }}>
          Henüz katkı yok
        </h3>
        <p style={{ color: "var(--muted-foreground)" }}>
          Topluluktan henüz katkı gelmemiş. İlk katkıyı siz yapın!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {contributions.map((contribution) => {
        const Icon = typeIcons[contribution.type as keyof typeof typeIcons] || FileText;
        const typeLabel = typeLabels[contribution.type as keyof typeof typeLabels] || "Diğer";
        const typeColor =
          typeColors[contribution.type as keyof typeof typeColors] || "from-gray-500 to-gray-600";

        return (
          <Card
            key={contribution.id}
            className="group overflow-hidden transition-all hover:shadow-lg"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
          >
            <CardContent className="p-6">
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-8 w-8 rounded-lg bg-gradient-to-br ${typeColor} flex items-center justify-center`}
                  >
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
                <div
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <Heart className="h-3 w-3" />
                  {contribution.likeCount}
                </div>
              </div>

              {/* Poster */}
              {contribution.posterUrl && (
                <div className="mb-4">
                  <Image
                    src={contribution.posterUrl}
                    alt={contribution.title}
                    width={400}
                    height={128}
                    className="h-32 w-full rounded-lg object-cover"
                  />
                </div>
              )}

              {/* Title */}
              <h3
                className="mb-2 line-clamp-2 text-lg font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                {contribution.title}
                {contribution.year && ` (${contribution.year})`}
              </h3>

              {/* Note */}
              <p className="mb-4 line-clamp-3 text-sm" style={{ color: "var(--muted-foreground)" }}>
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
                    className="text-sm text-gray-500 transition-colors hover:text-gray-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
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
