"use client";

import Image, { type ImageProps, type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

type Props = Omit<ImageProps, "src"> & {
  src: string | StaticImageData;
  fallbackSrc?: string;
};

function normalizeSrc(src: string | StaticImageData) {
  return typeof src === "string" ? src : src.src;
}

export default function ImageWithFallback({
  src,
  fallbackSrc = "https://placehold.co/500x750?text=Sem+Capa",
  alt,
  ...props
}: Props) {
  const normalized = normalizeSrc(src);
  const [imgSrc, setImgSrc] = useState(normalized);

  // ✅ quando muda de página/filme, atualiza a imagem corretamente
  useEffect(() => {
    setImgSrc(normalized);
  }, [normalized]);

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

