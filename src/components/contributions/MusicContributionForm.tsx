"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/app/lib/nhost/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Search, Music, Calendar, Star, ExternalLink, Loader2, User, Disc } from "lucide-react";
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
  onSubmitted?: (contribution: any) => void;
}

export default function MusicContributionForm({ blogSlug, onSubmitted }: MusicContributionFormProps) {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"track" | "album" | "artist">("track");
  const [searchResults, setSearchResults] = useState<MusicSearchResult[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<MusicSearchResult | null>(null);
  const [note, setNote] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Trigger search when debounced query changes
  useState(() => {
    if (debouncedSearchQuery) {
      searchMusic(debouncedSearchQuery, searchType);
    } else {
      setSearchResults([]);
    }
  });

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
          year: selectedMusic.album?.releaseDate ? new Date(selectedMusic.album.releaseDate).getFullYear() : null,
          externalId: selectedMusic.id,
          posterUrl: selectedMusic.album?.images?.[0]?.url || null,
          sourceUrl: selectedMusic.externalUrls.spotify,
          blogSlug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Katkı eklenirken hata oluştu");
      }

      // Reset form
      setSelectedMusic(null);
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

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formContent = (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" />
          Müzik Önerisi Ekle
        </CardTitle>
        <CardDescription>
          Beğendiğiniz bir şarkı, albüm veya sanatçıyı arayın ve neden önerdiğinizi açıklayın.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Search Type Selector */}
          <div className="space-y-2">
            <label htmlFor="search-type" className="text-sm font-medium">
              Arama Türü
            </label>
            <Select 
              value={searchType} 
              onChange={(e) => setSearchType(e.target.value as "track" | "album" | "artist")}
              placeholder="Arama türü seçin"
            >
              <option value="track">Şarkı</option>
              <option value="album">Albüm</option>
              <option value="artist">Sanatçı</option>
            </Select>
          </div>

          {/* Music Search */}
          <div className="space-y-2">
            <label htmlFor="music-search" className="text-sm font-medium">
              Müzik Ara
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="music-search"
                type="text"
                placeholder="Şarkı, albüm veya sanatçı adını yazın..."
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
                {searchResults.map((music) => (
                  <button
                    key={music.id}
                    type="button"
                    onClick={() => handleMusicSelect(music)}
                    className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b last:border-b-0"
                  >
                    <div className="flex gap-3">
                      {music.album?.images?.[0] && (
                        <img
                          src={music.album.images[0].url}
                          alt={music.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{music.name}</h4>
                        {music.artists.length > 0 && (
                          <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {music.artists.map(artist => artist.name).join(", ")}
                          </p>
                        )}
                        {music.album && (
                          <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                            <Disc className="h-3 w-3" />
                            {music.album.name}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          {music.album?.releaseDate && (
                            <Badge variant="secondary" className="text-xs">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(music.album.releaseDate).getFullYear()}
                            </Badge>
                          )}
                          {music.popularity > 0 && (
                            <Badge variant="outline" className="text-xs">
                              <Star className="h-3 w-3 mr-1" />
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
            <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="flex gap-3">
                {selectedMusic.album?.images?.[0] && (
                  <img
                    src={selectedMusic.album.images[0].url}
                    alt={selectedMusic.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-medium">{selectedMusic.name}</h3>
                  {selectedMusic.artists.length > 0 && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {selectedMusic.artists.map(artist => artist.name).join(", ")}
                    </p>
                  )}
                  {selectedMusic.album && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Disc className="h-3 w-3" />
                      {selectedMusic.album.name}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    {selectedMusic.album?.releaseDate && (
                      <Badge variant="secondary" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(selectedMusic.album.releaseDate).getFullYear()}
                      </Badge>
                    )}
                    {selectedMusic.popularity > 0 && (
                      <Badge variant="outline" className="text-xs">
                        <Star className="h-3 w-3 mr-1" />
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
            <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!selectedMusic || !note.trim() || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
    return (
      <AuthGate mode="inline">
        {formContent}
      </AuthGate>
    );
  }

  return formContent;
}
