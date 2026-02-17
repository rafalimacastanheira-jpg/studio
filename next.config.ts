const nextConfig = {
  images: {
    
    remotePatterns: [
      { protocol: "https", hostname: "image.tmdb.org" },
      { protocol: "https", hostname: "picsum.photos" }
    ]
  }
};

export default nextConfig;
