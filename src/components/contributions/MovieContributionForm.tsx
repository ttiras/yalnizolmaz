"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/nhost/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Film, Calendar, Star, ExternalLink, Loader2 } from "lucide-react";
import Image from "next/image";
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
  onSubmitted?: (contribution: { id: string; title: string; type: string }) => void;
}

export default function MovieContributionForm({
  blogSlug,
  onSubmitted,
}: MovieContributionFormProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MovieSearchResult[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieSearchResult | null>(null);
  const [note, setNote] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState("");
  const [conflict, setConflict] = useState<{ id: string; external_id?: string | null } | null>(
    null,
  );
  const [showResults, setShowResults] = useState(false);

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

  // Load CSRF token and trigger search when query changes
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/guvenlik/belirteci", { cache: "no-store" });
        if (!cancelled && res.ok) {
          const data = (await res.json()) as { token?: string };
          setCsrfToken(data.token || "");
        }
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery) {
      searchMovies(debouncedSearchQuery);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery, searchMovies]);

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
          _csrf: csrfToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409 && data?.error === "already_exists" && data?.existing) {
          setConflict(data.existing);
          throw new Error("Bu içerik zaten eklenmiş");
        }
        throw new Error(data.error || "Katkı eklenirken hata oluştu");
      }

      // Reset form
      setSelectedMovie(null);
      setSearchQuery("");
      setNote("");
      setSearchResults([]);
      setConflict(null);

      onSubmitted?.(data.contribution);
      // Refresh the RSC page so the new contribution appears immediately
      router.refresh();
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
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="movie-search"
                type="text"
                placeholder="Film adını yazın..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(Boolean(searchResults.length))}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setShowResults(false);
                }}
                className="pl-10"
              />
              {isSearching && (
                <Loader2 className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin text-gray-400" />
              )}
            </div>

            {/* Search Results */}
            {showResults && searchResults.length > 0 && (
              <div className="max-h-60 overflow-y-auto rounded-lg border bg-white dark:bg-gray-800">
                {searchResults.map((movie) => (
                  <button
                    key={movie.id}
                    type="button"
                    onClick={() => {
                      handleMovieSelect(movie);
                      setShowResults(false);
                    }}
                    className="w-full border-b p-3 text-left last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="flex gap-3">
                      {movie.posterUrl && (
                        <Image
                          src={movie.posterUrl}
                          alt={movie.title}
                          width={48}
                          height={64}
                          className="h-16 w-12 rounded object-cover"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-sm font-medium">{movie.title}</h4>
                        {movie.originalTitle !== movie.title && (
                          <p className="truncate text-xs text-gray-500">{movie.originalTitle}</p>
                        )}
                        <div className="mt-1 flex items-center gap-2">
                          {movie.year && (
                            <Badge variant="secondary" className="text-xs">
                              <Calendar className="mr-1 h-3 w-3" />
                              {movie.year}
                            </Badge>
                          )}
                          {movie.rating > 0 && (
                            <Badge variant="outline" className="text-xs">
                              <Star className="mr-1 h-3 w-3" />
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
            <div className="rounded-lg border bg-gray-50 p-4 dark:bg-gray-800">
              <div className="flex gap-3">
                {selectedMovie.posterUrl && (
                  <Image
                    src={selectedMovie.posterUrl}
                    alt={selectedMovie.title}
                    width={64}
                    height={80}
                    className="h-20 w-16 rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-medium">{selectedMovie.title}</h3>
                  {selectedMovie.originalTitle !== selectedMovie.title && (
                    <p className="text-sm text-gray-500">{selectedMovie.originalTitle}</p>
                  )}
                  <div className="mt-1 flex items-center gap-2">
                    {selectedMovie.year && (
                      <Badge variant="secondary" className="text-xs">
                        <Calendar className="mr-1 h-3 w-3" />
                        {selectedMovie.year}
                      </Badge>
                    )}
                    {selectedMovie.rating > 0 && (
                      <Badge variant="outline" className="text-xs">
                        <Star className="mr-1 h-3 w-3" />
                        {selectedMovie.rating.toFixed(1)}
                      </Badge>
                    )}
                  </div>
                  {selectedMovie.overview && (
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
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
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20">
              {error}
            </div>
          )}

          {conflict && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-900/20">
              Bu film zaten önerilmiş. 
              <a
                className="underline"
                href={`/sizden-gelenler/${blogSlug}/${conflict.external_id || conflict.id}`}
              >
                mevcut katkıyı görüntüleyin
              </a>
              
              veya başka bir film seçin.
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!selectedMovie || !note.trim() || !csrfToken || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
    return <AuthGate mode="inline">{formContent}</AuthGate>;
  }

  return formContent;
}
