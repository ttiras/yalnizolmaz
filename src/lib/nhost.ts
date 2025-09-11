import { NhostClient } from "@nhost/nhost-js";

// Factory usable on both server and client. Prefer server-side envs when available.
export function createNhostClient() {
  // Log environment variables for debugging (only in development)
  if (process.env.NODE_ENV !== "production") {
    console.log("[Nhost] Creating client with env:", {
      authUrl: process.env.NHOST_AUTH_URL ? "set" : "not set",
      graphqlUrl: process.env.NHOST_GRAPHQL_URL ? "set" : "not set",
      storageUrl: process.env.NHOST_STORAGE_URL ? "set" : "not set",
      functionsUrl: process.env.NHOST_FUNCTIONS_URL ? "set" : "not set",
      subdomain: process.env.NHOST_SUBDOMAIN ? "set" : "not set",
      region: process.env.NHOST_REGION ? "set" : "not set",
    });
  }

  // Explicit service URLs (preferred when provided)
  const authUrl = process.env.NHOST_AUTH_URL || process.env.NEXT_PUBLIC_NHOST_AUTH_URL;
  const storageUrl = process.env.NHOST_STORAGE_URL || process.env.NEXT_PUBLIC_NHOST_STORAGE_URL;
  const graphqlUrl = process.env.NHOST_GRAPHQL_URL || process.env.NEXT_PUBLIC_NHOST_GRAPHQL_URL;
  const functionsUrl =
    process.env.NHOST_FUNCTIONS_URL || process.env.NEXT_PUBLIC_NHOST_FUNCTIONS_URL;

  if (authUrl && graphqlUrl && storageUrl) {
    return new NhostClient({
      authUrl: authUrl.replace(/\/$/, ""),
      storageUrl: storageUrl.replace(/\/$/, ""),
      graphqlUrl: graphqlUrl.replace(/\/$/, ""),
      functionsUrl: functionsUrl ? functionsUrl.replace(/\/$/, "") : undefined,
    });
  }

  // Subdomain + Region configuration
  const subdomain = process.env.NHOST_SUBDOMAIN || process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN;
  const region = process.env.NHOST_REGION || process.env.NEXT_PUBLIC_NHOST_REGION;

  if (subdomain && region) {
    return new NhostClient({ subdomain, region });
  }

  throw new Error(
    "Nhost configuration missing. Set NHOST_AUTH_URL + NHOST_GRAPHQL_URL + NHOST_STORAGE_URL, or NHOST_SUBDOMAIN + NHOST_REGION",
  );
}

// Lazy-load singleton to avoid build-time initialization
let _nhostInstance: NhostClient | null = null;

export function getNhostClient(): NhostClient {
  if (!_nhostInstance) {
    _nhostInstance = createNhostClient();
  }
  return _nhostInstance;
}

// Export a getter for backward compatibility
export const nhost = {
  get auth() {
    return getNhostClient().auth;
  },
  get storage() {
    return getNhostClient().storage;
  },
  get graphql() {
    return getNhostClient().graphql;
  },
  get functions() {
    return getNhostClient().functions;
  },
};
