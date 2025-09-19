"use client";

import { Heart } from "lucide-react";
import ContributionForm from "./ContributionForm";

interface FloatingActionButtonProps {
  blogSlug: string;
  contribType: "film" | "book" | "music" | "poem" | "quote";
}

export default function FloatingActionButton({ blogSlug, contribType }: FloatingActionButtonProps) {
  const handleSubmitted = () => {
    // Optionally refresh the page or update the list
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      {/* Visual Header - No Functionality */}
      <div className="flex items-center justify-center">
        <div className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-300 bg-white/80 px-4 py-2 text-gray-600">
          <Heart className="h-4 w-4 text-red-500" />
          <span className="text-sm font-medium">Sen de Öneride Bulun</span>
        </div>
      </div>

      {/* Always Visible Form */}
      <div className="rounded-lg bg-gray-50 p-6 dark:bg-slate-800/50">
        <ContributionForm
          blogSlug={blogSlug}
          contributionType={contribType}
          onSubmitted={handleSubmitted}
          showAllTypes={false}
        />
      </div>
    </div>
  );
}
