import { NhostClient } from "@nhost/nhost-js";

// Prefer explicit backendUrl for local/self-hosted; otherwise use Nhost Cloud subdomain+region
const backendUrl = process.env.NEXT_PUBLIC_NHOST_BACKEND_URL;
const subdomain = process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN;
const region = process.env.NEXT_PUBLIC_NHOST_REGION;

function createNhostClient() {
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
  const localFallback = "http://localhost:1337";

  if (isDev) {
    // Fallback to local Nhost default port in development if nothing is configured
    return new NhostClient({
      authUrl: `${localFallback}/v1/auth`,
      storageUrl: `${localFallback}/v1/storage`,
      graphqlUrl: `${localFallback}/v1/graphql`,
      functionsUrl: `${localFallback}/v1/functions`,
    });
  }

  // As a last resort, throw in production to surface misconfiguration early
  throw new Error(
    "Nhost configuration missing. Set NEXT_PUBLIC_NHOST_BACKEND_URL or NEXT_PUBLIC_NHOST_SUBDOMAIN and NEXT_PUBLIC_NHOST_REGION.",
  );
}

export const nhost = createNhostClient();
