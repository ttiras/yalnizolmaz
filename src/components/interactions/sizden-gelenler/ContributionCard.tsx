import Image from "next/image";
import { ExternalLink, Calendar, User } from "lucide-react";
import LikeButton from "./LikeButton";
import type { ContributionMovie } from "@/lib/types/contributions";

interface ContributionCardProps {
  contribution: ContributionMovie;
}

export default function ContributionCard({ contribution }: ContributionCardProps) {
  const { title, year, posterUrl, sourceUrl, likeCount, createdAt, submittedBy } = contribution;

  return (
    <article className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex gap-6 p-6">
        {/* Poster */}
        <div className="flex-shrink-0">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={`${title} film afişi`}
              width={100}
              height={150}
              className="rounded-lg object-cover"
              sizes="(max-width: 640px) 100px, 100px"
            />
          ) : (
            <div className="flex h-37 w-25 items-center justify-center rounded-lg bg-gray-200">
              <span className="text-xs text-gray-400">Afiş Yok</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Header with User Info */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              {/* Title and Year */}
              <div className="mb-2">
                <h3 className="mb-1 text-xl font-semibold text-gray-900">{title}</h3>
                {year && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar size={14} />
                    <span>{year}</span>
                  </div>
                )}
              </div>

              {/* Source Link */}
              {sourceUrl && (
                <div className="mb-3">
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="nofollow noopener"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 transition-colors hover:text-blue-800"
                  >
                    <ExternalLink size={14} />
                    <span>IMDb&apos;de Görüntüle</span>
                  </a>
                </div>
              )}
            </div>

            {/* User Avatar and Info */}
            <div className="ml-4 flex items-center gap-3">
              {submittedBy?.avatarUrl ? (
                <Image
                  src={submittedBy.avatarUrl}
                  alt={`${submittedBy.displayName} avatar`}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                  <User size={20} className="text-white" />
                </div>
              )}
              <div className="text-right">
                {submittedBy?.displayName && (
                  <div className="text-sm font-medium text-gray-900">{submittedBy.displayName}</div>
                )}
                <time dateTime={createdAt} className="text-xs text-gray-400">
                  {new Date(createdAt).toLocaleDateString("tr-TR")}
                </time>
              </div>
            </div>
          </div>

          {/* Like Button */}
          <div className="flex items-center justify-end">
            <LikeButton
              initialLiked={false}
              initialCount={likeCount}
              onToggle={(nextLiked) => {
                // Placeholder for future backend integration
                console.log(`Like toggled for ${contribution.id}:`, nextLiked);
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
