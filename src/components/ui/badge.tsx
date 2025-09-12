import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

  const variants: Record<string, string> = {
    default: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
    destructive: "border-transparent bg-red-600 text-white hover:bg-red-700",
    outline: "text-foreground border-neutral-300 dark:border-neutral-700",
  };

  const cls = `${base} ${variants[variant]} ${className}`;
  return <div className={cls} {...props} />;
}
