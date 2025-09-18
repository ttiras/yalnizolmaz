"use client";

import * as React from "react";

export function ScrollArea({
  className = "",
  style,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`overflow-auto [scrollbar-width:thin] ${className}`} style={style}>
      {children}
    </div>
  );
}

export default ScrollArea;
