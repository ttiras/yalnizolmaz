import * as React from "react";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => {
    const cls = `flex min-h-[80px] w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-background px-3 py-2 text-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`;
    return <textarea ref={ref} className={cls} {...props} />;
  },
);
Textarea.displayName = "Textarea";
