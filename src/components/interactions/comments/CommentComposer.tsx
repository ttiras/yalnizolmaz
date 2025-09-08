"use client";

import { useState } from "react";
import { MessageSquare, Send, LogIn } from "lucide-react";
import { postComment } from "@/lib/comments/mockClient";
import type { CommentComposerProps } from "@/lib/types/comments";

export default function CommentComposer({ slug, parentId, onSubmitted }: CommentComposerProps) {
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loggedIn] = useState(false); // Mock logged in state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!body.trim() || !loggedIn) return;

    setIsSubmitting(true);

    try {
      // Submit the comment
      const newComment = await postComment(slug, body.trim(), parentId);

      // Call the callback
      onSubmitted?.(newComment);

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Reset form
      setBody("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!loggedIn) {
    return (
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-center gap-2 text-blue-700">
          <LogIn size={20} />
          <span className="font-medium">Yorum yapmak için giriş yapın</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="comment-body" className="mb-2 block text-sm font-medium text-gray-700">
          {parentId ? "Yanıtla" : "Yorumunuz"}
        </label>
        <textarea
          id="comment-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={parentId ? "Yanıtınızı yazın..." : "Düşüncelerinizi paylaşın..."}
          className="min-h-[96px] w-full resize-none rounded-lg border border-gray-200 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          maxLength={800}
          disabled={isSubmitting}
        />
        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs text-gray-500">{body.length}/800 karakter</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={!body.trim() || isSubmitting}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
            body.trim() && !isSubmitting
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "cursor-not-allowed bg-gray-300 text-gray-500"
          } `}
        >
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
        </button>
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
