import type { NextConfig } from "next";

const repo = "studio"; // <-- nome do repositório no GitHub

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

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
