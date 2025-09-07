import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ws-eu.amazon-adsystem.com",
        port: "",
        pathname: "/widgets/q",
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images-eu.ssl-images-amazon.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/wikipedia/**",
      },
      {
        protocol: "https",
        hostname: "imdb.com",
        port: "",
        pathname: "/imdb/**",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Accept-Ranges",
            value: "bytes",
          },
          {
            key: "Content-Type",
            value: "video/mp4",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["@/components/OptimizedVideo"],
  },
};

export default nextConfig;
