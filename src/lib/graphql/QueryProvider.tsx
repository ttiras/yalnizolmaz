"use client";

import { type ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/react-query";

interface QueryProviderProps {
  children: ReactNode;
}

let singletonClient: QueryClient | null = null;

export function QueryProvider({ children }: QueryProviderProps) {
  // Reuse one client across fast refreshes
  if (!singletonClient) {
    singletonClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 10_000,
          refetchOnWindowFocus: true,
          retry: 1,
        },
      },
    });
  }

  return (
    <QueryClientProvider client={singletonClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
