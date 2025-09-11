"use client";

import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import CommentComposer from "./CommentComposer";
import { AuthGate } from "@/components/AuthGate";
import LoadMoreButton from "./LoadMoreButton";
import { initializeClientComments } from "@/lib/comments/mockClient";
import type { CommentsSectionProps, BlogComment } from "@/lib/types/comments";

export default function CommentsClient({
  slug,
  totalCount,
  initialComments,
  loggedIn = false,
}: CommentsSectionProps) {
  const [comments, setComments] = useState(initialComments);
  const [loadedIds, setLoadedIds] = useState(initialComments.map((c) => c.id));

  // Initialize client comments when component mounts
  useEffect(() => {
    initializeClientComments(initialComments);
  }, [initialComments]);

  const handleNewComment = (newComment: BlogComment) => {
    setComments((prev) => [newComment, ...prev]);
    setLoadedIds((prev) => [newComment.id, ...prev]);
  };

  const handleLoadMore = (moreComments: BlogComment[]) => {
    setComments((prev) => [...prev, ...moreComments]);
    setLoadedIds((prev) => [...prev, ...moreComments.map((c) => c.id)]);
  };

  return (
    <>
      {/* Comments List */}
      <div className="mb-8">
        {comments.length > 0 ? (
          <CommentList comments={comments} loggedIn={loggedIn} />
        ) : (
          <div className="py-12 text-center">
            <div className="mb-4 text-gray-400">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">Henüz yorum yok</h3>
            <p className="text-gray-500">İlk yorumu siz yapın!</p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {totalCount > comments.length && (
        <div className="mb-8">
          <LoadMoreButton slug={slug} alreadyLoadedIds={loadedIds} onLoaded={handleLoadMore} />
        </div>
      )}

      {/* Comment Composer */}
      <div className="rounded-2xl bg-gray-50 p-6">
        {loggedIn ? (
          <CommentComposer slug={slug} onSubmitted={handleNewComment} />
        ) : (
          <AuthGate mode="inline">
            <CommentComposer slug={slug} onSubmitted={handleNewComment} />
          </AuthGate>
        )}
      </div>
    </>
  );
}
