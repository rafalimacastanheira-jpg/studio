"use client";

import Image from "next/image";
import type { ImageProps } from "next/image";
import { useEffect, useState } from "react";

type Props = Omit<ImageProps, "src"> & {
  src: string | { src: string };
  fallbackSrc?: string;
};

export default function ImageWithFallback({
  src,
  fallbackSrc = "https://placehold.co/500x750?text=Sem+Capa",
  alt,
  ...props
}: Props) {
  const normalizedSrc = typeof src === "string" ? src : src.src;

  const [imgSrc, setImgSrc] = useState<string>(normalizedSrc);

  // ✅ quando src mudar (hidratação/navegação), atualiza
  useEffect(() => {
    setImgSrc(normalizedSrc);
  }, [normalizedSrc]);

  return (
    <Image
      {...props}
      alt={alt}
      src={imgSrc}
      unoptimized
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}

