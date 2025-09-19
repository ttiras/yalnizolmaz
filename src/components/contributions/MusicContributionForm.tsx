"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/nhost/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Search, Music, Calendar, Star, ExternalLink, Loader2, User, Disc } from "lucide-react";
import Image from "next/image";
import { AuthGate } from "@/components/AuthGate";
import { useDebounce } from "@/lib/hooks/use-debounce";

interface MusicSearchResult {
  id: string;
  name: string;
  artists: Array<{ id: string; name: string }>;
  album?: {
    id: string;
    name: string;
    images: Array<{ url: string; width: number; height: number }>;
    releaseDate: string;
  };
  duration?: number;
  popularity: number;
  previewUrl?: string;
  externalUrls: { spotify: string };
  explicit?: boolean;
  trackNumber?: number;
  discNumber?: number;
  albumType?: string;
  genres?: string[];
}

interface MusicContributionFormProps {
  blogSlug: string;
  onSubmitted?: (contribution: { id: string; title: string; type: string }) => void;
}

export default function MusicContributionForm({
  blogSlug,
  onSubmitted,
}: MusicContributionFormProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType] = useState<"track">("track");
  const [searchResults, setSearchResults] = useState<MusicSearchResult[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<MusicSearchResult | null>(null);
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

  const searchMusic = useCallback(async (query: string, type: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(`/api/arama/muzik?q=${encodeURIComponent(query)}&type=${type}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Search failed");
      }

      setSearchResults(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Arama sırasında hata oluştu");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Load CSRF token
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

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedSearchQuery) {
      searchMusic(debouncedSearchQuery, searchType);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery, searchType, searchMusic]);

  const handleMusicSelect = (music: MusicSearchResult) => {
    setSelectedMusic(music);
    setSearchQuery(music.name);
    setSearchResults([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMusic || !note.trim()) {
      setError("Lütfen bir müzik seçin ve düşüncelerinizi yazın");
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
          type: "music",
          title: selectedMusic.name,
          note: note.trim(),
          year: selectedMusic.album?.releaseDate
            ? new Date(selectedMusic.album.releaseDate).getFullYear()
            : null,
          externalId: selectedMusic.id,
          posterUrl: selectedMusic.album?.images?.[0]?.url || null,
          sourceUrl: selectedMusic.externalUrls.spotify,
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
      setSelectedMusic(null);
      setSearchQuery("");
      setNote("");
      setSearchResults([]);
      setConflict(null);

      onSubmitted?.(data.contribution);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Katkı eklenirken hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formContent = (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" />
          Müzik Önerisi Ekle
        </CardTitle>
        <CardDescription>Beğendiğiniz bir şarkıyı arayın ve neden önerdiğinizi açıklayın.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Search Type forced to tracks; selector removed */}

          {/* Music Search */}
          <div className="space-y-2">
            <label htmlFor="music-search" className="text-sm font-medium">
              Müzik Ara
            </label>
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="music-search"
                type="text"
                placeholder="Şarkı, albüm veya sanatçı adını yazın..."
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
                {searchResults.map((music) => (
                  <button
                    key={music.id}
                    type="button"
                    onClick={() => {
                      handleMusicSelect(music);
                      setShowResults(false);
                    }}
                    className="w-full border-b p-3 text-left last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="flex gap-3">
                      {music.album?.images?.[0] && (
                        <Image
                          src={music.album.images[0].url}
                          alt={music.name}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded object-cover"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-sm font-medium">{music.name}</h4>
                        {music.artists.length > 0 && (
                          <p className="flex items-center gap-1 truncate text-xs text-gray-500">
                            <User className="h-3 w-3" />
                            {music.artists.map((artist) => artist.name).join(", ")}
                          </p>
                        )}
                        {music.album && (
                          <p className="flex items-center gap-1 truncate text-xs text-gray-500">
                            <Disc className="h-3 w-3" />
                            {music.album.name}
                          </p>
                        )}
                        <div className="mt-1 flex items-center gap-2">
                          {music.album?.releaseDate && (
                            <Badge variant="secondary" className="text-xs">
                              <Calendar className="mr-1 h-3 w-3" />
                              {new Date(music.album.releaseDate).getFullYear()}
                            </Badge>
                          )}
                          {music.popularity > 0 && (
                            <Badge variant="outline" className="text-xs">
                              <Star className="mr-1 h-3 w-3" />
                              {music.popularity}%
                            </Badge>
                          )}
                          {music.duration && (
                            <Badge variant="outline" className="text-xs">
                              {formatDuration(music.duration)}
                            </Badge>
                          )}
                          {music.explicit && (
                            <Badge variant="destructive" className="text-xs">
                              E
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

          {/* Selected Music */}
          {selectedMusic && (
            <div className="rounded-lg border bg-gray-50 p-4 dark:bg-gray-800">
              <div className="flex gap-3">
                {selectedMusic.album?.images?.[0] && (
                  <Image
                    src={selectedMusic.album.images[0].url}
                    alt={selectedMusic.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-medium">{selectedMusic.name}</h3>
                  {selectedMusic.artists.length > 0 && (
                    <p className="flex items-center gap-1 text-sm text-gray-500">
                      <User className="h-3 w-3" />
                      {selectedMusic.artists.map((artist) => artist.name).join(", ")}
                    </p>
                  )}
                  {selectedMusic.album && (
                    <p className="flex items-center gap-1 text-sm text-gray-500">
                      <Disc className="h-3 w-3" />
                      {selectedMusic.album.name}
                    </p>
                  )}
                  <div className="mt-1 flex items-center gap-2">
                    {selectedMusic.album?.releaseDate && (
                      <Badge variant="secondary" className="text-xs">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(selectedMusic.album.releaseDate).getFullYear()}
                      </Badge>
                    )}
                    {selectedMusic.popularity > 0 && (
                      <Badge variant="outline" className="text-xs">
                        <Star className="mr-1 h-3 w-3" />
                        {selectedMusic.popularity}%
                      </Badge>
                    )}
                    {selectedMusic.duration && (
                      <Badge variant="outline" className="text-xs">
                        {formatDuration(selectedMusic.duration)}
                      </Badge>
                    )}
                    {selectedMusic.explicit && (
                      <Badge variant="destructive" className="text-xs">
                        E
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {selectedMusic.previewUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const audio = new Audio(selectedMusic.previewUrl);
                        audio.play();
                      }}
                    >
                      ▶️
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(selectedMusic.externalUrls.spotify, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Note Input */}
          <div className="space-y-2">
            <label htmlFor="note" className="text-sm font-medium">
              Neden bu müziği öneriyorsunuz?
            </label>
            <Textarea
              id="note"
              placeholder="Bu müziği neden beğendiğinizi, size nasıl hissettirdiğini ve neden önerdiğinizi yazın..."
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
              Bu içerik zaten önerilmiş. 
              <a
                href={`/sizden-gelenler/${blogSlug}/${conflict.external_id || conflict.id}`}
              >
                <span className="underline"> Mevcut katkıyı görüntüleyin</span>
              </a>
              
               <span> veya başka bir arama yapın.</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!selectedMusic || !note.trim() || !csrfToken || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Ekleniyor...
              </>
            ) : (
              "Müzik Önerisini Ekle"
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
