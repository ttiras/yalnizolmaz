"use client";

import { useState } from "react";
import { useAuth } from "@/app/lib/nhost/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote, Loader2 } from "lucide-react";
import { AuthGate } from "@/components/AuthGate";

interface QuoteContributionFormProps {
  blogSlug: string;
  onSubmitted?: (contribution: any) => void;
}

export default function QuoteContributionForm({ blogSlug, onSubmitted }: QuoteContributionFormProps) {
  const { isAuthenticated } = useAuth();
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quote.trim()) {
      setError("Lütfen sözü yazın");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const title = author.trim() ? `"${quote.trim()}" - ${author.trim()}` : `"${quote.trim()}"`;
      const note = author.trim() ? `Yazar: ${author.trim()}` : "Anonim";

      const response = await fetch("/api/katki/ekle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "quote",
          title,
          note,
          blogSlug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Katkı eklenirken hata oluştu");
      }

      // Reset form
      setQuote("");
      setAuthor("");
      setError(null);

      onSubmitted?.(data.contribution);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Katkı eklenirken hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Quote className="h-5 w-5" />
          Yalnızlık Sözü Paylaş
        </CardTitle>
        <CardDescription>
          Yalnızlıkla ilgili anlamlı bir sözü paylaşın.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quote Content */}
          <div className="space-y-2">
            <label htmlFor="quote" className="text-sm font-medium">
              Söz *
            </label>
            <Textarea
              id="quote"
              placeholder="Yalnızlıkla ilgili anlamlı sözü buraya yazın..."
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              rows={4}
              className="resize-none text-lg"
              required
            />
            <p className="text-xs text-gray-500">
              Sözü tırnak işaretleri olmadan yazın.
            </p>
          </div>

          {/* Author */}
          <div className="space-y-2">
            <label htmlFor="author" className="text-sm font-medium">
              Sözün Sahibi
            </label>
            <Input
              id="author"
              type="text"
              placeholder="Sözün sahibinin adını yazın (opsiyonel)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Eğer sözün sahibi bilinmiyorsa boş bırakabilirsiniz.
            </p>
          </div>

          {/* Preview */}
          {quote.trim() && (
            <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="text-center">
                <blockquote className="text-lg italic text-gray-700 dark:text-gray-300">
                  &quot;{quote.trim()}&quot;
                </blockquote>
                {author.trim() && (
                  <cite className="text-sm text-gray-500 mt-2 block">
                    — {author.trim()}
                  </cite>
                )}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!quote.trim() || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Paylaşılıyor...
              </>
            ) : (
              "Sözü Paylaş"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  if (!isAuthenticated) {
    return (
      <AuthGate mode="inline">
        {formContent}
      </AuthGate>
    );
  }

  return formContent;
}
