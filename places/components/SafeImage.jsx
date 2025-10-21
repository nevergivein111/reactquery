"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * SafeImage Component
 * Handles broken image URLs gracefully by switching to a fallback image.
 *
 * @param {string} src - Original image URL
 * @param {string} alt - Alt text for accessibility
 * @param {number} width - Image width (required for next/image)
 * @param {number} height - Image height (required for next/image)
 * @param {string} fallback - Optional fallback image (default: /fallback.jpg)
 */
export default function SafeImage({
  src,
  alt,
  width,
  height,
  fallback = "/images/screen.jpg",
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);

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
