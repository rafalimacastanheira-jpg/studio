"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

type Props = Omit<ImageProps, "src"> & {
  src: string;                 // <- força string
  fallbackSrc?: string;
};

export default function ImageWithFallback({
  src,
  fallbackSrc = "https://placehold.co/500x750?text=Sem+Capa",
  alt,
  ...props
}: Props) {
  const [imgSrc, setImgSrc] = useState<string>(src);

  // ✅ IMPORTANTÍSSIMO: quando o src mudar, atualiza o state
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

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

