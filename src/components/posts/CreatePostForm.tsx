"use client";

import { useState } from "react";
import { useInsertPostMutation } from "@/lib/graphql/__generated__/graphql";
import { useQueryClient } from "@tanstack/react-query";

export default function CreatePostForm() {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const qc = useQueryClient();

  const { mutateAsync: insertPost } = useInsertPostMutation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);
    try {
      const resp = await insertPost({
        object: {
          content: content.trim(),
        },
      });
      if (!resp?.insert_posts_one?.id) throw new Error("Gönderi oluşturulamadı");
      setContent("");
      // Invalidate latest posts query if used
      qc.invalidateQueries({ queryKey: ["GetLatestPosts"] });
    } catch (err) {
      console.error("Post create failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <textarea
        className="w-full rounded border p-2"
        placeholder="Ne düşünüyorsun?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={submitting}
      />
      <div>
        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className={`rounded px-4 py-2 ${
            submitting || !content.trim() ? "bg-gray-300" : "bg-blue-600 text-white"
          }`}
        >
          {submitting ? "Gönderiliyor…" : "Gönder"}
        </button>
      </div>
    </form>
  );
}
