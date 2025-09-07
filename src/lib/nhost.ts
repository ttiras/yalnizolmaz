import { NhostClient } from "@nhost/nhost-js";

// Prefer explicit backendUrl for local/self-hosted; otherwise use Nhost Cloud subdomain+region
const backendUrl = process.env.NEXT_PUBLIC_NHOST_BACKEND_URL;
const subdomain = process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN;
const region = process.env.NEXT_PUBLIC_NHOST_REGION;

function createNhostClient() {
  if (backendUrl && backendUrl.trim().length > 0) {
    return new NhostClient({ backendUrl });
  }

  if (subdomain && region) {
    return new NhostClient({ subdomain, region });
  }

  const isDev = process.env.NODE_ENV !== "production";
  const localFallback = "http://localhost:1337";

  if (isDev) {
    // Fallback to local Nhost default port in development if nothing is configured
    return new NhostClient({ backendUrl: localFallback });
  }

  // As a last resort, throw in production to surface misconfiguration early
  throw new Error(
    "Nhost configuration missing. Set NEXT_PUBLIC_NHOST_BACKEND_URL or NEXT_PUBLIC_NHOST_SUBDOMAIN and NEXT_PUBLIC_NHOST_REGION.",
  );
}

export const nhost = createNhostClient();
