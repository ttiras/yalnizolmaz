"use client";

import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string | null;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, ...props }, ref) => {
    const base =
      "block w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";
    const border = error ? "border-red-500" : "border-neutral-300 dark:border-neutral-700";
    const cls = `${base} ${border} ${className}`;
    return (
      <>
        <input ref={ref} className={cls} aria-invalid={Boolean(error)} {...props} />
        {error ? (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {error}
          </p>
        ) : null}
      </>
    );
  },
);
Input.displayName = "Input";
