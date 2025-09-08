"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Film } from "lucide-react";
import Image from "next/image";
import type { MovieSearchResult } from "@/lib/types/contributions";

interface MovieSearchInputProps {
  onSelect: (movie: MovieSearchResult) => void;
}

// Mock search function - replace with real API call later
async function searchMovies(query: string): Promise<MovieSearchResult[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!query.trim()) return [];

  // Mock data - replace with real TMDb/IMDb API call
  const mockMovies: MovieSearchResult[] = [
    {
      title: "Her",
      year: 2013,
      posterUrl: "/images/cinema-chair-alone.jpg",
      sourceUrl: "https://www.imdb.com/title/tt1798709/",
      externalId: "tt1798709",
    },
    {
      title: "Lost in Translation",
      year: 2003,
      posterUrl: "/images/feeling_alone.jpg",
      sourceUrl: "https://www.imdb.com/title/tt0335266/",
      externalId: "tt0335266",
    },
    {
      title: "Eternal Sunshine of the Spotless Mind",
      year: 2004,
      posterUrl: "/images/man_thinking.jpg",
      sourceUrl: "https://www.imdb.com/title/tt0338013/",
      externalId: "tt0338013",
    },
    {
      title: "The Perks of Being a Wallflower",
      year: 2012,
      posterUrl: "/images/reading-alone.jpg",
      sourceUrl: "https://www.imdb.com/title/tt1659337/",
      externalId: "tt1659337",
    },
    {
      title: "Manchester by the Sea",
      year: 2016,
      posterUrl: "/images/woman_alone.jpg",
      sourceUrl: "https://www.imdb.com/title/tt4034228/",
      externalId: "tt4034228",
    },
  ];

  return mockMovies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()));
}

export default function MovieSearchInput({ onSelect }: MovieSearchInputProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const searchResults = await searchMovies(query);
        setResults(searchResults);
        setIsOpen(true);
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelect = (movie: MovieSearchResult) => {
    onSelect(movie);
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleBlur = () => {
    // Delay to allow click events to fire
    setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search
          className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
          size={20}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          onBlur={handleBlur}
          placeholder="Film adı yazın…"
          className="w-full rounded-lg border border-gray-200 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {isLoading && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
          role="listbox"
        >
          {results.map((movie, index) => (
            <li
              key={movie.externalId || movie.title}
              className={`flex cursor-pointer items-center gap-3 p-3 transition-colors ${
                index === selectedIndex ? "bg-blue-50" : "hover:bg-gray-50"
              } `}
              onClick={() => handleSelect(movie)}
              role="option"
              aria-selected={index === selectedIndex}
            >
              {movie.posterUrl ? (
                <Image
                  src={movie.posterUrl}
                  alt={`${movie.title} poster`}
                  width={40}
                  height={60}
                  className="flex-shrink-0 rounded object-cover"
                />
              ) : (
                <div className="flex h-15 w-10 flex-shrink-0 items-center justify-center rounded bg-gray-200">
                  <Film size={16} className="text-gray-400" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-gray-900">{movie.title}</div>
                {movie.year && <div className="text-sm text-gray-500">{movie.year}</div>}
              </div>
            </li>
          ))}
        </ul>
      )}

      {isOpen && !isLoading && query && results.length === 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white p-4 text-center text-gray-500 shadow-lg">
          Film bulunamadı
        </div>
      )}
    </div>
  );
}
