"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Heart, Plus } from "lucide-react";
import ContributionForm from "./ContributionForm";

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  blogSlug: string;
  contributionType: "film" | "book" | "music" | "poem" | "quote";
  onSubmitted?: (contribution: { id: string; title: string; type: string }) => void;
}

export default function ContributionModal({
  isOpen,
  onClose,
  blogSlug,
  contributionType,
  onSubmitted,
}: ContributionModalProps) {
  const handleSubmitted = (contribution: { id: string; title: string; type: string }) => {
    onSubmitted?.(contribution);
    onClose();
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={onClose}
      title="Paylaşım Yap"
      description="Deneyimini paylaş, başkalarına ilham ver"
    >
      <div className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              <Heart className="h-5 w-5" />
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <ContributionForm
            blogSlug={blogSlug}
            contributionType={contributionType}
            onSubmitted={handleSubmitted}
            showAllTypes={false}
          />
        </div>
      </div>
    </Dialog>
  );
}
