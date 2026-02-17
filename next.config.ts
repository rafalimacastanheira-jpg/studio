import type { NextConfig } from "next";

const repo = "studio"; // <-- nome do teu repositório no GitHub

const nextConfig: NextConfig = {
  output: "export",

  // ✅ para o GitHub Pages em /studio/
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,

  // ✅ imagens remotas (mantém o que já tinhas)
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "image.tmdb.org", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "source.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
