"use client";

import Image, { type ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

const ImageWithFallback = (props: ImageWithFallbackProps) => {
  const { src, fallbackSrc = 'https://placehold.co/500x750/182334/98a1b3?text=Sem+Capa', ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
           setImgSrc(fallbackSrc);
        }
      }}
    />
  );
};

export default ImageWithFallback;
