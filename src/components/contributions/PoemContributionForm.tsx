"use client";

import { useState } from "react";
import { useAuth } from "@/app/lib/nhost/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Loader2 } from "lucide-react";
import { AuthGate } from "@/components/AuthGate";

interface PoemContributionFormProps {
  blogSlug: string;
  onSubmitted?: (contribution: { id: string; title: string; type: string }) => void;
}

export default function PoemContributionForm({ blogSlug, onSubmitted }: PoemContributionFormProps) {
  const { isAuthenticated } = useAuth();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [poem, setPoem] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !poem.trim()) {
      setError("Lütfen şiir başlığını ve içeriğini yazın");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/katki/ekle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "poem",
          title: title.trim(),
          note: note.trim() || `Yazar: ${author.trim() || "Bilinmeyen"}\n\n${poem.trim()}`,
          blogSlug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Katkı eklenirken hata oluştu");
      }

      // Reset form
      setTitle("");
      setAuthor("");
      setPoem("");
      setNote("");
      setError(null);

      onSubmitted?.(data.contribution);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Katkı eklenirken hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Şiir Paylaş
        </CardTitle>
        <CardDescription>
          Yalnızlıkla ilgili bir şiiri paylaşın ve düşüncelerinizi yazın.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Poem Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Şiir Başlığı *
            </label>
            <Input
              id="title"
              type="text"
              placeholder="Şiirin başlığını yazın..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <label htmlFor="author" className="text-sm font-medium">
              Şair
            </label>
            <Input
              id="author"
              type="text"
              placeholder="Şairin adını yazın (opsiyonel)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          {/* Poem Content */}
          <div className="space-y-2">
            <label htmlFor="poem" className="text-sm font-medium">
              Şiir İçeriği *
            </label>
            <Textarea
              id="poem"
              placeholder="Şiirin tamamını buraya yazın..."
              value={poem}
              onChange={(e) => setPoem(e.target.value)}
              rows={8}
              className="resize-none font-mono text-sm"
              required
            />
            <p className="text-xs text-gray-500">Şiiri olduğu gibi, satır satır yazın.</p>
          </div>

          {/* Personal Note */}
          <div className="space-y-2">
            <label htmlFor="note" className="text-sm font-medium">
              Neden bu şiiri paylaşıyorsunuz?
            </label>
            <Textarea
              id="note"
              placeholder="Bu şiiri neden beğendiğinizi, size nasıl hissettirdiğini ve neden paylaştığınızı yazın..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              Düşüncelerinizi paylaşarak diğer okuyuculara yardımcı olun.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!title.trim() || !poem.trim() || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Paylaşılıyor...
              </>
            ) : (
              "Şiiri Paylaş"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  if (!isAuthenticated) {
    return <AuthGate mode="inline">{formContent}</AuthGate>;
  }

  return formContent;
}
