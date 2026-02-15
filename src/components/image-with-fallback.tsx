"use client";

import Image, { type ImageProps } from "next/image";
import { useMemo, useState } from "react";

type Props = ImageProps & {
  fallbackSrc?: string;
};

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "https://placehold.co/500x750?text=Sem+Capa",
  ...props
}: Props) {
  const initial = useMemo(() => src, [src]);
  const [currentSrc, setCurrentSrc] = useState<ImageProps["src"]>(initial);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => setCurrentSrc(fallbackSrc)}
    />
  );
}
