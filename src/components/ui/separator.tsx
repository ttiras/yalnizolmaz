import * as React from "react";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className = "", orientation = "horizontal", ...props }, ref) => {
    const cls = `shrink-0 bg-neutral-200 dark:bg-neutral-700 ${
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]"
    } ${className}`;
    return <div ref={ref} className={cls} {...props} />;
  },
);
Separator.displayName = "Separator";
