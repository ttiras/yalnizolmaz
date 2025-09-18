"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

interface ContributionFiltersProps {
  currentType: string;
  currentSearch: string;
  currentSort: string;
}

const contributionTypes = [
  { value: "all", label: "Tümü", count: 0 },
  { value: "film", label: "Film", count: 0 },
  { value: "book", label: "Kitap", count: 0 },
  { value: "music", label: "Müzik", count: 0 },
  { value: "poem", label: "Şiir", count: 0 },
  { value: "quote", label: "Söz", count: 0 },
];

const sortOptions = [
  { value: "newest", label: "En Yeni" },
  { value: "oldest", label: "En Eski" },
  { value: "most_liked", label: "En Çok Beğenilen" },
  { value: "least_liked", label: "En Az Beğenilen" },
  { value: "title_asc", label: "Başlık A-Z" },
  { value: "title_desc", label: "Başlık Z-A" },
];

export default function ContributionFilters({ currentType, currentSearch, currentSort }: ContributionFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentSearch);
  const [showFilters, setShowFilters] = useState(false);

  const updateFilters = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Reset to page 1 when filters change
    params.delete("page");

    router.push(`/sizden-gelenler/tum-katkilar?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search });
  };

  const handleTypeChange = (type: string) => {
    updateFilters({ type });
  };

  const handleSortChange = (sort: string) => {
    updateFilters({ sort });
  };

  const clearFilters = () => {
    setSearch("");
    router.push("/sizden-gelenler/tum-katkilar");
  };

  const hasActiveFilters = currentType !== "all" || currentSearch || currentSort !== "newest";

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Katkıları ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit" variant="default">
          Ara
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtreler
        </Button>
      </form>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
            Aktif filtreler:
          </span>
          {currentType !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Tür: {contributionTypes.find(t => t.value === currentType)?.label}
              <button
                onClick={() => handleTypeChange("all")}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {currentSearch && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Arama: &quot;{currentSearch}&quot;
              <button
                onClick={() => {
                  setSearch("");
                  updateFilters({ search: "" });
                }}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {currentSort !== "newest" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Sıralama: {sortOptions.find(s => s.value === currentSort)?.label}
              <button
                onClick={() => handleSortChange("newest")}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            Tümünü Temizle
          </Button>
        </div>
      )}

      {/* Advanced Filters */}
      {showFilters && (
        <div className="rounded-lg border p-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Katkı Türü</label>
              <Select 
                value={currentType} 
                onChange={(e) => handleTypeChange(e.target.value)}
                placeholder="Katkı türü seçin"
              >
                {contributionTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                    {type.count > 0 && ` (${type.count})`}
                  </option>
                ))}
              </Select>
            </div>

            {/* Sort Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Sıralama</label>
              <Select 
                value={currentSort} 
                onChange={(e) => handleSortChange(e.target.value)}
                placeholder="Sıralama seçin"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
