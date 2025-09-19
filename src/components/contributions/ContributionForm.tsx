"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, BookOpen, Music, FileText, Quote } from "lucide-react";
import MovieContributionForm from "./MovieContributionForm";
import BookContributionForm from "./BookContributionForm";
import MusicContributionForm from "./MusicContributionForm";
import PoemContributionForm from "./PoemContributionForm";
import QuoteContributionForm from "./QuoteContributionForm";

interface ContributionFormProps {
  blogSlug: string;
  contributionType: "film" | "book" | "music" | "poem" | "quote";
  onSubmitted?: (contribution: { id: string; title: string; type: string }) => void;
  showAllTypes?: boolean; // If true, show tabs for all types. If false, show only the specific type
}

export default function ContributionForm({
  blogSlug,
  contributionType,
  onSubmitted,
  showAllTypes = true,
}: ContributionFormProps) {
  const [activeTab, setActiveTab] = useState(contributionType);

  const contributionTypes = [
    {
      value: "film",
      label: "Film",
      icon: Film,
      description: "Film önerisi ekle",
    },
    {
      value: "book",
      label: "Kitap",
      icon: BookOpen,
      description: "Kitap önerisi ekle",
    },
    {
      value: "music",
      label: "Müzik",
      icon: Music,
      description: "Müzik önerisi ekle",
    },
    {
      value: "poem",
      label: "Şiir",
      icon: FileText,
      description: "Şiir paylaş",
    },
    {
      value: "quote",
      label: "Söz",
      icon: Quote,
      description: "Yalnızlık sözü paylaş",
    },
  ];

  const renderForm = () => {
    switch (activeTab) {
      case "film":
        return <MovieContributionForm blogSlug={blogSlug} onSubmitted={onSubmitted} />;
      case "book":
        return <BookContributionForm blogSlug={blogSlug} onSubmitted={onSubmitted} />;
      case "music":
        return <MusicContributionForm blogSlug={blogSlug} onSubmitted={onSubmitted} />;
      case "poem":
        return <PoemContributionForm blogSlug={blogSlug} onSubmitted={onSubmitted} />;
      case "quote":
        return <QuoteContributionForm blogSlug={blogSlug} onSubmitted={onSubmitted} />;
      default:
        return null;
    }
  };

  // If showAllTypes is false, render only the specific form without tabs
  if (!showAllTypes) {
    // Render only the specific form without outer card/border/duplicate headers
    return <div className="mx-auto w-full max-w-4xl">{renderForm()}</div>;
  }

  // If showAllTypes is true, render the full tabs interface
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as "film" | "book" | "music" | "poem" | "quote")
        }
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-5">
          {contributionTypes.map((type) => {
            const Icon = type.icon;
            return (
              <TabsTrigger
                key={type.value}
                value={type.value}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{type.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {contributionTypes.map((type) => (
          <TabsContent key={type.value} value={type.value} className="mt-6">
            {renderForm()}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
