"use client";

import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import type { CommentComposerProps, BlogComment } from "@/lib/types/comments";
import {
  useInsertBlogCommentMutation,
  useInsertContributionCommentMutation,
} from "@/lib/graphql/__generated__/graphql";
import { useAuth } from "@/app/lib/nhost/AuthProvider";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Props = CommentComposerProps & { loggedIn?: boolean };

export default function CommentComposer({ slug, parentId, onSubmitted, loggedIn = false }: Props) {
  const { isAuthenticated, session } = useAuth();
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  // CSRF token is not required for GraphQL mutations in this flow

  const { mutateAsync: insertBlogComment } = useInsertBlogCommentMutation();
  const { mutateAsync: insertContributionComment } = useInsertContributionCommentMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!body.trim()) return;
    if (!isAuthenticated || !session) return;

    setIsSubmitting(true);

    try {
      let createdId: string | null = null;
      if (slug.startsWith("contrib:")) {
        const [, , contributionIdOrExt] = slug.split(":");
        // For contribution comments we store by contribution_id (uuid)
        const resp = await insertContributionComment({
          object: {
            contribution_id: contributionIdOrExt as string,
            body: body.trim(),
          },
        });
        createdId = resp?.insert_contribution_comments_one?.id ?? null;
      } else {
        const resp = await insertBlogComment({
          object: {
            blog_slug: slug,
            body: body.trim(),
            ...(parentId ? { parent_id: parentId } : {}),
          },
        });
        createdId = resp?.insert_blog_comments_one?.id ?? null;
      }

      const created = createdId ? { id: createdId } : null;
      if (!created?.id) throw new Error("Yorum gönderilemedi");

      const userSafe = session?.user;
      const newComment: BlogComment = {
        id: String(created.id),
        slug,
        body: body.trim(),
        createdAt: new Date().toISOString(),
        parentId: parentId ?? null,
        author: {
          id: String(userSafe?.id || ""),
          displayName: String(userSafe?.displayName || userSafe?.email || ""),
          avatarUrl: userSafe?.avatarUrl ?? null,
        },
        likeCount: 0,
      };

      onSubmitted?.(newComment);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      setBody("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auth gating is handled by parent (CommentsClient/AuthGate). Always render the form here.

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label htmlFor="comment-body" className="mb-2">
          {parentId ? "Yanıtla" : "Yorumunuz"}
        </Label>
        <Textarea
          id="comment-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={parentId ? "Yanıtınızı yazın..." : "Düşüncelerinizi paylaşın..."}
          maxLength={800}
          disabled={isSubmitting}
        />
        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs text-gray-500">{body.length}/800 karakter</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button type="submit" disabled={!body.trim() || isSubmitting} className="gap-2">
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
              <span>Gönderiliyor...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>{parentId ? "Yanıtla" : "Yorum Gönder"}</span>
            </>
          )}
        </Button>
      </div>

      {showSuccess && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3">
          <div className="flex items-center gap-2 text-green-700">
            <MessageSquare size={16} />
            <span className="text-sm font-medium">Yorumunuz başarıyla gönderildi!</span>
          </div>
        </div>
      )}
    </form>
  );
}
