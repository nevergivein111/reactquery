"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function SafeImage({
  src,
  alt,
  width,
  height,
  fallback = "/images/screen.jpg",
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);

  // Update imgSrc when src prop changes
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleError = () => {
    console.warn(`Image failed to load: ${src} → using fallback`);
    setImgSrc(fallback);
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
      unoptimized
    />
  );
}
