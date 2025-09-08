"use client";

import { useState } from "react";
import ContributionCard from "./ContributionCard";
import ContributionFormMovie from "./ContributionFormMovie";
import type { ContributionMovie } from "@/lib/types/contributions";

interface SizdenGelenlerClientProps {
  initialContributions: ContributionMovie[];
  loggedIn: boolean;
  showForm?: boolean;
  emptyStateText?: string;
}

export default function SizdenGelenlerClient({
  initialContributions,
  loggedIn,
  showForm = true,
  emptyStateText = "Henüz bir öneri yok. İlk öneriyi siz yapın!",
}: SizdenGelenlerClientProps) {
  const [contributions, setContributions] = useState(initialContributions);

  const handleNewContribution = (newContribution: ContributionMovie) => {
    // Add new contribution to the beginning of the list
    setContributions((prev) => [newContribution, ...prev]);
  };

  return (
    <>
      {/* Contributions List */}
      <div className="mb-8">
        {contributions.length > 0 ? (
          <div className="space-y-4">
            {contributions.map((contribution) => (
              <ContributionCard key={contribution.id} contribution={contribution} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="mb-4 text-gray-400">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">Henüz öneri yok</h3>
            <p className="text-gray-500">{emptyStateText}</p>
          </div>
        )}
      </div>

      {/* Contribution Form - only show when showForm is true */}
      {showForm && (
        <div className="rounded-2xl bg-gray-50 p-6">
          <ContributionFormMovie onSubmitted={handleNewContribution} loggedIn={loggedIn} />
        </div>
      )}
    </>
  );
}
