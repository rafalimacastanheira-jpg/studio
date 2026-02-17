import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  // ✅ ESSENCIAL para GitHub Pages quando o repo é /studio
  basePath: isProd ? "/studio" : "",
  assetPrefix: isProd ? "/studio/" : "",

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "image.tmdb.org" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;
