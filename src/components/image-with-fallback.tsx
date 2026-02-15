"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

type Props = Omit<ImageProps, "src"> & {
  src: string;
  fallbackSrc?: string;
};

export default function ImageWithFallback({
  src,
  fallbackSrc = "https://placehold.co/500x750?text=Sem+Capa",
  alt,
  ...props
}: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);

  // Atualiza quando o src mudar (quando o posterUrl chegar)
  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => setCurrentSrc(fallbackSrc)}
    />
  );
}

