import { NhostClient } from "@nhost/nhost-js";

// Factory usable on both server and client. Prefer server-side envs when available.
export function createNhostClient() {
  // Explicit service URLs (preferred when provided)
  const explicitAuth = process.env.NHOST_AUTH_URL || process.env.NEXT_PUBLIC_NHOST_AUTH_URL;
  const explicitStorage =
    process.env.NHOST_STORAGE_URL || process.env.NEXT_PUBLIC_NHOST_STORAGE_URL;
  const explicitGraphql =
    process.env.NHOST_GRAPHQL_URL || process.env.NEXT_PUBLIC_NHOST_GRAPHQL_URL;
  const explicitFunctions =
    process.env.NHOST_FUNCTIONS_URL || process.env.NEXT_PUBLIC_NHOST_FUNCTIONS_URL;

  if (explicitAuth && explicitGraphql && explicitStorage) {
    return new NhostClient({
      // Trust explicit URLs as complete service roots
      authUrl: explicitAuth.replace(/\/$/, ""),
      storageUrl: explicitStorage.replace(/\/$/, ""),
      graphqlUrl: explicitGraphql.replace(/\/$/, ""),
      functionsUrl: explicitFunctions ? explicitFunctions.replace(/\/$/, "") : undefined,
    });
  }

  // Server-first: prefer non-public envs if present
  const serverBackendUrl = process.env.NHOST_BACKEND_URL;
  const serverSubdomain = process.env.NHOST_SUBDOMAIN;
  const serverRegion = process.env.NHOST_REGION;

  // Client fallback: use public envs
  const publicBackendUrl = process.env.NEXT_PUBLIC_NHOST_BACKEND_URL;
  const publicSubdomain = process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN;
  const publicRegion = process.env.NEXT_PUBLIC_NHOST_REGION;

  const backendUrl = serverBackendUrl || publicBackendUrl;
  const subdomain = serverSubdomain || publicSubdomain;
  const region = serverRegion || publicRegion;

  if (backendUrl && backendUrl.trim().length > 0) {
    const baseUrl = backendUrl.replace(/\/$/, "");
    return new NhostClient({
      authUrl: `${baseUrl}/v1/auth`,
      storageUrl: `${baseUrl}/v1/storage`,
      graphqlUrl: `${baseUrl}/v1/graphql`,
      functionsUrl: `${baseUrl}/v1/functions`,
    });
  }

  if (subdomain && region) {
    return new NhostClient({ subdomain, region });
  }

  const isDev = process.env.NODE_ENV !== "production";
  if (isDev && process.env.NHOST_BACKEND_URL) {
    const baseUrl = process.env.NHOST_BACKEND_URL.replace(/\/$/, "");
    return new NhostClient({
      authUrl: `${baseUrl}/v1/auth`,
      storageUrl: `${baseUrl}/v1/storage`,
      graphqlUrl: `${baseUrl}/v1/graphql`,
      functionsUrl: `${baseUrl}/v1/functions`,
    });
  }

  throw new Error(
    "Nhost configuration missing. Set NHOST_BACKEND_URL or NHOST_SUBDOMAIN+NHOST_REGION (server), or public equivalents for client.",
  );
}

// Default singleton for simple use cases (safe in RSC and client)
export const nhost = createNhostClient();
