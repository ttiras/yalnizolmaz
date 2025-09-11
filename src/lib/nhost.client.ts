"use client";

import { NhostClient } from "@nhost/nhost-js";

export function createBrowserNhostClient(): NhostClient | null {
  const subdomain = process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN;
  const region = process.env.NEXT_PUBLIC_NHOST_REGION;
  if (!subdomain) return null; // Do NOT throw on the client
  // In dev, if region is absent, construct client with only subdomain
  if (!region && process.env.NODE_ENV !== "production") {
    return new NhostClient({ subdomain });
  }
  if (!region) return null;
  return new NhostClient({ subdomain, region });
}

export function hasClientNhostConfig(): boolean {
  const hasSub = Boolean(process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN);
  const hasRegion = Boolean(process.env.NEXT_PUBLIC_NHOST_REGION);
  // In dev, subdomain alone is sufficient (region omitted)
  return process.env.NODE_ENV !== "production" ? hasSub : hasSub && hasRegion;
}
