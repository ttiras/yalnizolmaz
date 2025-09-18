"use client";

import { useState } from "react";
import { CheckCircle, LogIn } from "lucide-react";
import MovieSearchInput from "./MovieSearchInput";
import type {
  ContributionFormMovieProps,
  MovieSearchResult,
  ContributionMovie,
} from "@/lib/types/contributions";
import { useAuth } from "@/app/lib/nhost/AuthProvider";
import { useInsertContributionMovieMutation } from "@/lib/graphql/__generated__/graphql";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContributionFormMovie({
  onSubmitted,
  loggedIn = false,
  slug,
}: ContributionFormMovieProps) {
  const [selectedMovie, setSelectedMovie] = useState<MovieSearchResult | null>(null);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { session, isAuthenticated } = useAuth();
  const { mutateAsync: insertContribution } = useInsertContributionMovieMutation();

  const handleMovieSelect = (movie: MovieSearchResult) => {
    setSelectedMovie(movie);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMovie || !loggedIn || !isAuthenticated || !session) return;

    setIsSubmitting(true);

    try {
      const resp = await insertContribution({
        slug,
        title: selectedMovie.title,
        year: selectedMovie.year ?? null,
        posterUrl: selectedMovie.posterUrl ?? null,
        sourceUrl: selectedMovie.sourceUrl ?? null,
        externalId: selectedMovie.externalId ?? null,
        note: note || null,
      });

      const created = resp.insert_contributions_one;
      if (!created?.id) throw new Error("Öneri gönderilemedi");

      const newContribution: ContributionMovie = {
        id: String(created.id),
        title: String(created.title),
        year: created.year ?? undefined,
        posterUrl: created.poster_url ?? undefined,
        sourceUrl: created.source_url ?? undefined,
        likeCount: 0,
        createdAt: String(created.created_at),
        submittedBy: {
          displayName:
            created.user?.displayName ?? session.user?.displayName ?? session.user?.email ?? null,
          avatarUrl: created.user?.avatarUrl ?? session.user?.avatarUrl ?? null,
        },
      };

      onSubmitted?.(newContribution);

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Reset form
      setSelectedMovie(null);
      setNote("");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!loggedIn) {
    return (
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-center gap-2 text-blue-700">
          <LogIn size={20} />
          <span className="font-medium">Öneri eklemek için giriş yapın</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Film Önerisi Ekle</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="movie-search" className="mb-2 block text-sm font-medium text-gray-700">
            Film Seçin
          </label>
          <MovieSearchInput onSelect={handleMovieSelect} />
          {selectedMovie && (
            <div className="mt-2 rounded-lg bg-gray-50 p-3">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-sm text-gray-700">
                  Seçilen: <strong>{selectedMovie.title}</strong>
                  {selectedMovie.year && ` (${selectedMovie.year})`}
                </span>
              </div>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="note" className="mb-2 block text-sm font-medium text-gray-700">
            Not ekle (isteğe bağlı)
          </label>
          <Textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Bu film hakkında düşüncelerinizi paylaşın..."
            rows={3}
          />
        </div>

        <Button type="submit" disabled={!selectedMovie || isSubmitting} className="w-full">
          {isSubmitting ? "Gönderiliyor..." : "Öneriyi Gönder"}
        </Button>
      </form>

      {showSuccess && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3">
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">Öneriniz başarıyla gönderildi!</span>
          </div>
        </div>
      )}
    </div>
  );
}
