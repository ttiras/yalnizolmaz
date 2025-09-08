"use client";

import { useState } from "react";
import { CheckCircle, LogIn } from "lucide-react";
import MovieSearchInput from "./MovieSearchInput";
import type {
  ContributionFormMovieProps,
  MovieSearchResult,
  ContributionMovie,
} from "@/lib/types/contributions";

export default function ContributionFormMovie({
  onSubmitted,
  loggedIn = false,
}: ContributionFormMovieProps) {
  const [selectedMovie, setSelectedMovie] = useState<MovieSearchResult | null>(null);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleMovieSelect = (movie: MovieSearchResult) => {
    setSelectedMovie(movie);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMovie || !loggedIn) return;

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with real submission later
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create a mock contribution
      const newContribution: ContributionMovie = {
        id: `temp-${Date.now()}`,
        title: selectedMovie.title,
        year: selectedMovie.year,
        posterUrl: selectedMovie.posterUrl,
        sourceUrl: selectedMovie.sourceUrl,
        likeCount: 0,
        createdAt: new Date().toISOString(),
        submittedBy: {
          displayName: "Anonim Kullanıcı",
          avatarUrl: null,
        },
      };

      // Call the callback
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
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Bu film hakkında düşüncelerinizi paylaşın..."
            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={!selectedMovie || isSubmitting}
          className={`w-full rounded-lg px-4 py-2 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
            selectedMovie && !isSubmitting
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "cursor-not-allowed bg-gray-300 text-gray-500"
          } `}
        >
          {isSubmitting ? "Gönderiliyor..." : "Öneriyi Gönder"}
        </button>
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
