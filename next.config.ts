import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  i18n: {
    locales: ["tr"],
    defaultLocale: "tr",
  },
};

export default nextConfig;
