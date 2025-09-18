"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/app/lib/nhost/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Film, Calendar, Star, ExternalLink, Loader2 } from "lucide-react";
import { AuthGate } from "@/components/AuthGate";
import { useDebounce } from "@/lib/hooks/use-debounce";

interface MovieSearchResult {
  id: number;
  title: string;
  originalTitle: string;
  year: number | null;
  overview: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  rating: number;
  voteCount: number;
  sourceUrl: string;
  imdbId: string | null;
}

interface MovieContributionFormProps {
  blogSlug: string;
  onSubmitted?: (contribution: any) => void;
}

export default function MovieContributionForm({ blogSlug, onSubmitted }: MovieContributionFormProps) {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MovieSearchResult[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieSearchResult | null>(null);
  const [note, setNote] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const searchMovies = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(`/api/arama/film?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Search failed");
      }

      setSearchResults(data.movies || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Arama sırasında hata oluştu");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Trigger search when debounced query changes
  useState(() => {
    if (debouncedSearchQuery) {
      searchMovies(debouncedSearchQuery);
    } else {
      setSearchResults([]);
    }
  });

  const handleMovieSelect = (movie: MovieSearchResult) => {
    setSelectedMovie(movie);
    setSearchQuery(movie.title);
    setSearchResults([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMovie || !note.trim()) {
      setError("Lütfen bir film seçin ve düşüncelerinizi yazın");
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
          type: "film",
          title: selectedMovie.title,
          note: note.trim(),
          year: selectedMovie.year,
          externalId: selectedMovie.id.toString(),
          posterUrl: selectedMovie.posterUrl,
          sourceUrl: selectedMovie.sourceUrl,
          blogSlug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Katkı eklenirken hata oluştu");
      }

      // Reset form
      setSelectedMovie(null);
      setSearchQuery("");
      setNote("");
      setSearchResults([]);

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
          <Film className="h-5 w-5" />
          Film Önerisi Ekle
        </CardTitle>
        <CardDescription>
          Beğendiğiniz bir filmi arayın ve neden önerdiğinizi açıklayın.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Movie Search */}
          <div className="space-y-2">
            <label htmlFor="movie-search" className="text-sm font-medium">
              Film Ara
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="movie-search"
                type="text"
                placeholder="Film adını yazın..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              {isSearching && (
                <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-gray-400" />
              )}
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="max-h-60 overflow-y-auto border rounded-lg bg-white dark:bg-gray-800">
                {searchResults.map((movie) => (
                  <button
                    key={movie.id}
                    type="button"
                    onClick={() => handleMovieSelect(movie)}
                    className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b last:border-b-0"
                  >
                    <div className="flex gap-3">
                      {movie.posterUrl && (
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{movie.title}</h4>
                        {movie.originalTitle !== movie.title && (
                          <p className="text-xs text-gray-500 truncate">{movie.originalTitle}</p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          {movie.year && (
                            <Badge variant="secondary" className="text-xs">
                              <Calendar className="h-3 w-3 mr-1" />
                              {movie.year}
                            </Badge>
                          )}
                          {movie.rating > 0 && (
                            <Badge variant="outline" className="text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              {movie.rating.toFixed(1)}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Movie */}
          {selectedMovie && (
            <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="flex gap-3">
                {selectedMovie.posterUrl && (
                  <img
                    src={selectedMovie.posterUrl}
                    alt={selectedMovie.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-medium">{selectedMovie.title}</h3>
                  {selectedMovie.originalTitle !== selectedMovie.title && (
                    <p className="text-sm text-gray-500">{selectedMovie.originalTitle}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    {selectedMovie.year && (
                      <Badge variant="secondary" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {selectedMovie.year}
                      </Badge>
                    )}
                    {selectedMovie.rating > 0 && (
                      <Badge variant="outline" className="text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        {selectedMovie.rating.toFixed(1)}
                      </Badge>
                    )}
                  </div>
                  {selectedMovie.overview && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {selectedMovie.overview}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(selectedMovie.sourceUrl, "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Note Input */}
          <div className="space-y-2">
            <label htmlFor="note" className="text-sm font-medium">
              Neden bu filmi öneriyorsunuz?
            </label>
            <Textarea
              id="note"
              placeholder="Bu filmi neden beğendiğinizi, size nasıl hissettirdiğini ve neden önerdiğinizi yazın..."
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
            <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!selectedMovie || !note.trim() || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Ekleniyor...
              </>
            ) : (
              "Film Önerisini Ekle"
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
