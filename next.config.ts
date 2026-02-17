import type { NextConfig } from "next";

const repo = "studio"; // <-- nome do repositório

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  // ✅ MUITO IMPORTANTE para GitHub Pages (project page)
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "image.tmdb.org" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;
