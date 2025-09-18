import * as React from "react";

export function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const cls = `rounded-lg border bg-background p-6 shadow-sm ${className}`;
  return <div className={cls} {...props} />;
}

export function CardHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const cls = `mb-4 ${className}`;
  return <div className={cls} {...props} />;
}

export function CardTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const cls = `text-lg font-semibold ${className}`;
  return <h3 className={cls} {...props} />;
}

export function CardDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const cls = `text-sm text-muted-foreground ${className}`;
  return <p className={cls} {...props} />;
}

export function CardContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const cls = `${className}`;
  return <div className={cls} {...props} />;
}
