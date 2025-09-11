"use client";

import * as React from "react";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export function Dialog({ open, onOpenChange, title, description, children }: DialogProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "dialog-title" : undefined}
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-md rounded-lg border bg-white p-6 shadow-xl dark:bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        {title ? (
          <h2 id="dialog-title" className="mb-2 text-lg font-semibold">
            {title}
          </h2>
        ) : null}
        {description ? <p className="mb-4 text-sm text-neutral-600">{description}</p> : null}
        {children}
      </div>
    </div>
  );
}
