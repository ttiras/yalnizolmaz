import { defineConfig, devices } from "@playwright/test";
import * as path from "node:path";
import * as fs from "node:fs";
import dotenv from "dotenv";

// Load env from .env.local then .env if present for tests and dev server
const root = process.cwd();
const envLocal = path.join(root, ".env.local");
if (fs.existsSync(envLocal)) dotenv.config({ path: envLocal });
const envDefault = path.join(root, ".env");
if (fs.existsSync(envDefault)) dotenv.config({ path: envDefault });

// Optionally load staging env when explicitly requested
const envStaging = path.join(root, ".env.staging");
if (process.env.E2E_ENV === "staging" && fs.existsSync(envStaging)) {
  dotenv.config({ path: envStaging });
}

// Resolve baseURL and whether we should start a local web server
const resolvedBaseURL =
  process.env.E2E_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const isLocalBaseURL = /^https?:\/\/(localhost|127\.0\.0\.1)(:\\d+)?/i.test(resolvedBaseURL);

// Configure Vercel preview protection bypass header when provided
const vercelBypassSecret =
  process.env.VERCEL_PROTECTION_BYPASS || process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

export default defineConfig({
  testDir: "./e2e",
  timeout: 30 * 1000,
  use: {
    baseURL: resolvedBaseURL,
    extraHTTPHeaders: vercelBypassSecret
      ? { "x-vercel-protection-bypass": vercelBypassSecret }
      : undefined,
    trace: "on-first-retry",
  },
  projects: [{ name: "Chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: isLocalBaseURL
    ? {
        command: "pnpm dev",
        port: 3000,
        reuseExistingServer: !process.env.CI,
        env: (() => {
          const forward = [
            "NHOST_BACKEND_URL",
            "NHOST_AUTH_URL",
            "NHOST_GRAPHQL_URL",
            "NHOST_STORAGE_URL",
            "NHOST_SUBDOMAIN",
            "NHOST_REGION",
            "NEXT_PUBLIC_NHOST_BACKEND_URL",
            "NEXT_PUBLIC_NHOST_AUTH_URL",
            "NEXT_PUBLIC_NHOST_GRAPHQL_URL",
            "NEXT_PUBLIC_NHOST_STORAGE_URL",
            "NEXT_PUBLIC_NHOST_SUBDOMAIN",
            "NEXT_PUBLIC_NHOST_REGION",
          ] as const;
          const env: Record<string, string> = {};
          for (const k of forward) {
            const v = process.env[k];
            if (v) env[k] = v;
          }
          return env;
        })(),
      }
    : undefined,
});
