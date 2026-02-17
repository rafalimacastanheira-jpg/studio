"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type Props = ImageProps & {
  fallbackSrc?: string;
};

export default function ImageWithFallback({
  src,
  fallbackSrc = "https://placehold.co/500x750?text=Sem+Capa",
  alt,
  ...props
}: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      
    {...props}
      alt={alt}
      src={imgSrc}
      unoptimized // ✅ força modo estático (GitHub Pages)
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}

