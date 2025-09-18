"use client";

import { useState } from "react";
import { useInsertPostMutation } from "@/lib/graphql/__generated__/graphql";
import { useQueryClient } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
      <Textarea
        placeholder="Ne düşünüyorsun?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={submitting}
      />
      <div>
        <Button type="submit" disabled={submitting || !content.trim()} className="w-full sm:w-auto">
          {submitting ? "Gönderiliyor…" : "Gönder"}
        </Button>
      </div>
    </form>
  );
}
