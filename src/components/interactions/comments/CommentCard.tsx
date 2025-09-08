import Image from "next/image";
import { User, MessageSquare, MoreHorizontal, Flag } from "lucide-react";
import HelpfulButton from "./HelpfulButton";
import CommentComposer from "./CommentComposer";
import type { BlogComment } from "@/lib/types/comments";

interface CommentCardProps {
  comment: BlogComment;
  isReply?: boolean;
  loggedIn?: boolean;
}

export default function CommentCard({
  comment,
  isReply = false,
  loggedIn = false,
}: CommentCardProps) {
  const { id, body, author, createdAt, likeCount } = comment;

  return (
    <li
      id={`comment-${id}`}
      className={`${isReply ? "mt-4 ml-8" : ""} ${!isReply ? "mb-6 border-b border-gray-100 pb-6" : ""}`}
    >
      <article className="py-4">
        <div className="flex gap-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {author.avatarUrl ? (
              <Image
                src={author.avatarUrl}
                alt={`${author.displayName} avatar`}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                <User size={20} className="text-white" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            {/* Header with name, date, and menu */}
            <div className="mb-2 flex items-start justify-between">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{author.displayName}</div>
                <time dateTime={createdAt} className="text-xs text-gray-500">
                  {new Date(createdAt).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>

              {/* More options menu */}
              <div className="flex items-center gap-2">
                <button className="rounded-full p-1 transition-colors hover:bg-gray-100">
                  <MoreHorizontal size={16} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="mb-3 text-sm leading-relaxed text-gray-800">{body}</div>

            {/* Actions */}
            <div className="flex items-center gap-6">
              <HelpfulButton
                initialLiked={false}
                initialCount={likeCount}
                onToggle={(liked) => {
                  // Placeholder for future backend integration
                  console.log(`Helpful toggled for ${id}:`, liked);
                }}
              />

              {!isReply && (
                <button className="flex items-center gap-1 text-sm text-gray-500 underline transition-colors hover:text-blue-600">
                  <MessageSquare size={14} />
                  <span>Yanıtla</span>
                </button>
              )}

              <button className="flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-red-600">
                <Flag size={14} />
                <span>Raporla</span>
              </button>
            </div>

            {/* Reply Composer (if logged in and not a reply) */}
            {!isReply && loggedIn && (
              <div className="mt-4 border-t border-gray-100 pt-4">
                <CommentComposer
                  slug={comment.slug}
                  parentId={id}
                  onSubmitted={(newReply) => {
                    // Placeholder for adding reply to the list
                    console.log("New reply submitted:", newReply);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </article>
    </li>
  );
}
