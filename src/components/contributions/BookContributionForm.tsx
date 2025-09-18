"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/app/lib/nhost/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Calendar, Star, ExternalLink, Loader2, User } from "lucide-react";
import { AuthGate } from "@/components/AuthGate";
import { useDebounce } from "@/lib/hooks/use-debounce";

interface BookSearchResult {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  year: number | null;
  description: string;
  pageCount: number;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  imageUrl: string | null;
  previewUrl: string;
  infoUrl: string;
  isbn: string;
  language: string;
}

interface BookContributionFormProps {
  blogSlug: string;
  onSubmitted?: (contribution: { id: string; title: string; type: string }) => void;
}

export default function BookContributionForm({ blogSlug, onSubmitted }: BookContributionFormProps) {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BookSearchResult[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookSearchResult | null>(null);
  const [note, setNote] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const searchBooks = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(`/api/arama/kitap?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Search failed");
      }

      setSearchResults(data.books || []);
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
      searchBooks(debouncedSearchQuery);
    } else {
      setSearchResults([]);
    }
  });

  const handleBookSelect = (book: BookSearchResult) => {
    setSelectedBook(book);
    setSearchQuery(book.title);
    setSearchResults([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedBook || !note.trim()) {
      setError("Lütfen bir kitap seçin ve düşüncelerinizi yazın");
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
          type: "book",
          title: selectedBook.title,
          note: note.trim(),
          year: selectedBook.year,
          externalId: selectedBook.id,
          posterUrl: selectedBook.imageUrl,
          sourceUrl: selectedBook.infoUrl,
          blogSlug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Katkı eklenirken hata oluştu");
      }

      // Reset form
      setSelectedBook(null);
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
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Kitap Önerisi Ekle
        </CardTitle>
        <CardDescription>
          Beğendiğiniz bir kitabı arayın ve neden önerdiğinizi açıklayın.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Book Search */}
          <div className="space-y-2">
            <label htmlFor="book-search" className="text-sm font-medium">
              Kitap Ara
            </label>
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="book-search"
                type="text"
                placeholder="Kitap adını veya yazarını yazın..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              {isSearching && (
                <Loader2 className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin text-gray-400" />
              )}
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="max-h-60 overflow-y-auto rounded-lg border bg-white dark:bg-gray-800">
                {searchResults.map((book) => (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => handleBookSelect(book)}
                    className="w-full border-b p-3 text-left last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="flex gap-3">
                      {book.imageUrl && (
                        <img
                          src={book.imageUrl}
                          alt={book.title}
                          className="h-16 w-12 rounded object-cover"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-sm font-medium">{book.title}</h4>
                        {book.authors.length > 0 && (
                          <p className="flex items-center gap-1 truncate text-xs text-gray-500">
                            <User className="h-3 w-3" />
                            {book.authors.join(", ")}
                          </p>
                        )}
                        <div className="mt-1 flex items-center gap-2">
                          {book.year && (
                            <Badge variant="secondary" className="text-xs">
                              <Calendar className="mr-1 h-3 w-3" />
                              {book.year}
                            </Badge>
                          )}
                          {book.averageRating > 0 && (
                            <Badge variant="outline" className="text-xs">
                              <Star className="mr-1 h-3 w-3" />
                              {book.averageRating.toFixed(1)}
                            </Badge>
                          )}
                          {book.pageCount > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {book.pageCount} sayfa
                            </Badge>
                          )}
                        </div>
                        {book.categories.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {book.categories.slice(0, 2).map((category) => (
                              <Badge key={category} variant="secondary" className="text-xs">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Book */}
          {selectedBook && (
            <div className="rounded-lg border bg-gray-50 p-4 dark:bg-gray-800">
              <div className="flex gap-3">
                {selectedBook.imageUrl && (
                  <img
                    src={selectedBook.imageUrl}
                    alt={selectedBook.title}
                    className="h-20 w-16 rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-medium">{selectedBook.title}</h3>
                  {selectedBook.authors.length > 0 && (
                    <p className="flex items-center gap-1 text-sm text-gray-500">
                      <User className="h-3 w-3" />
                      {selectedBook.authors.join(", ")}
                    </p>
                  )}
                  <div className="mt-1 flex items-center gap-2">
                    {selectedBook.year && (
                      <Badge variant="secondary" className="text-xs">
                        <Calendar className="mr-1 h-3 w-3" />
                        {selectedBook.year}
                      </Badge>
                    )}
                    {selectedBook.averageRating > 0 && (
                      <Badge variant="outline" className="text-xs">
                        <Star className="mr-1 h-3 w-3" />
                        {selectedBook.averageRating.toFixed(1)}
                      </Badge>
                    )}
                    {selectedBook.pageCount > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {selectedBook.pageCount} sayfa
                      </Badge>
                    )}
                  </div>
                  {selectedBook.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                      {selectedBook.description}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(selectedBook.infoUrl, "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Note Input */}
          <div className="space-y-2">
            <label htmlFor="note" className="text-sm font-medium">
              Neden bu kitabı öneriyorsunuz?
            </label>
            <Textarea
              id="note"
              placeholder="Bu kitabı neden beğendiğinizi, size nasıl hissettirdiğini ve neden önerdiğinizi yazın..."
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
            disabled={!selectedBook || !note.trim() || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Ekleniyor...
              </>
            ) : (
              "Kitap Önerisini Ekle"
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
