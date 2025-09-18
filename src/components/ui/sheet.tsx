"use client";

import * as React from "react";

type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "left" | "right" | "top" | "bottom";
  children?: React.ReactNode;
  className?: string;
};

export function Sheet({
  open,
  onOpenChange,
  side = "right",
  children,
  className = "",
}: SheetProps) {
  if (!open) return null;

  const basePanel = "fixed z-50 bg-background border shadow-lg transition-transform duration-200";

  const sideClass: Record<string, string> = {
    right: "top-0 right-0 h-full w-80 rounded-l-2xl",
    left: "top-0 left-0 h-full w-80 rounded-r-2xl",
    top: "inset-x-0 top-0 w-full rounded-b-2xl",
    bottom: "inset-x-0 bottom-0 w-full rounded-t-2xl",
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={() => onOpenChange(false)}
        aria-hidden
      />
      <div className={`${basePanel} ${sideClass[side]} ${className}`}>{children}</div>
    </>
  );
}

export default Sheet;
