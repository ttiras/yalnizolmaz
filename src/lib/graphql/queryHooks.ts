"use client";

import { useCallback } from "react";
import { useAuth } from "@/app/lib/nhost/AuthProvider";

// Authenticated fetcher compatible with GraphQL Code Generator react-query plugin
// Always use object signature for nhost.graphql.request to match SDK expectations
export const useAuthenticatedFetcher = <TData, TVariables>(
  document: string | { query: string; variables?: TVariables },
) => {
  const { nhost } = useAuth();

  return useCallback(
    async (variables?: TVariables): Promise<TData> => {
      const query = typeof document === "string" ? document : document.query;
      const docVars = typeof document === "object" ? document.variables : undefined;
      const mergedVars = (variables ?? docVars) as Record<string, unknown> | undefined;

      // Use SDK – it attaches the token automatically (CookieStorage + client session)
      const resp = await nhost.graphql.request<TData>({
        query,
        variables: mergedVars as Record<string, unknown> | undefined,
      });

      const anyResp = resp as unknown as {
        data?: TData;
        error?: unknown;
        body?: { data?: TData; errors?: unknown };
      };

      if (anyResp.body?.data) return anyResp.body.data as TData;
      if (anyResp.data) return anyResp.data as TData;
      if (anyResp.error || anyResp.body?.errors) {
        throw new Error(`GraphQL error: ${JSON.stringify(anyResp.error ?? anyResp.body?.errors)}`);
      }

      throw new Error("Response does not contain data");
    },
    [nhost, document],
  );
};
