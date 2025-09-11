import "server-only";
import { NhostClient } from "@nhost/nhost-js";

export function createServerNhostClient() {
  const subdomain = process.env.NHOST_SUBDOMAIN;
  const region = process.env.NHOST_REGION;
  if (!subdomain) {
    throw new Error("Nhost server config missing. Set NHOST_SUBDOMAIN.");
  }
  // In dev, if region is omitted, construct client with only subdomain
  if (!region && process.env.NODE_ENV !== "production") {
    return new NhostClient({ subdomain });
  }
  if (!region) {
    throw new Error("NHOST_REGION is required in production.");
  }
  return new NhostClient({ subdomain, region });
}

/** For server actions that need to call the Nhost Auth REST API (e.g., /signout) */
export function getServerAuthApiBase(): string {
  const subdomain = process.env.NHOST_SUBDOMAIN;
  const region = process.env.NHOST_REGION;
  if (!subdomain) {
    throw new Error("Nhost server config missing (auth base).");
  }
  // Returns .../v1 (so you can POST /signout, /signin/...)
  if (!region && process.env.NODE_ENV !== "production") {
    return `https://${subdomain}.auth.local.nhost.run/v1`;
  }
  if (!region) {
    throw new Error("NHOST_REGION is required in production.");
  }
  return `https://${subdomain}.auth.${region}.nhost.run/v1`;
}
