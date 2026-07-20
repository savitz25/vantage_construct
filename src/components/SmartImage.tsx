"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const IMAGE_FALLBACK = "/media/plans/fallback-luxury-home.svg";

type Props = {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  /** Fill parent with position:absolute + inset 0 */
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  width?: number | `${number}`;
  height?: number | `${number}`;
  style?: React.CSSProperties;
  objectFit?: "cover" | "contain";
};

/**
 * Brand image renderer with next/image optimization (WebP/AVIF when possible),
 * lazy loading below the fold, and graceful SVG fallback on error.
 */
export function SmartImage({
  src,
  alt,
  fallbackSrc = IMAGE_FALLBACK,
  className = "",
  fill = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  width,
  height,
  style,
  objectFit = "cover",
}: Props) {
  const resolved = src && String(src).trim() ? String(src) : fallbackSrc;
  const [current, setCurrent] = useState(resolved);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setCurrent(src && String(src).trim() ? String(src) : fallbackSrc);
    setErrored(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (current !== fallbackSrc) {
      setErrored(true);
      setCurrent(fallbackSrc);
    }
  };

  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";
  // SVGs and data URLs skip optimizer; local media go through next/image
  const isSvg =
    current.endsWith(".svg") || current.startsWith("data:") || current === fallbackSrc;

  if (fill) {
    return (
      <>
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-[#f3ebe0] via-[#e8dcc8] to-[#d4c2a6]"
        />
        <Image
          src={current}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={priority ? 80 : 72}
          unoptimized={isSvg}
          onError={handleError}
          className={`${fitClass} ${className}`}
          style={style}
          data-image-fallback={errored ? "true" : "false"}
        />
      </>
    );
  }

  const w = typeof width === "number" ? width : Number(width) || 1200;
  const h = typeof height === "number" ? height : Number(height) || 800;

  return (
    <Image
      src={current}
      alt={alt}
      width={w}
      height={h}
      sizes={sizes}
      priority={priority}
      quality={priority ? 80 : 72}
      unoptimized={isSvg}
      onError={handleError}
      className={`${fitClass} ${className}`}
      style={{ width: "100%", height: "auto", ...style }}
      data-image-fallback={errored ? "true" : "false"}
    />
  );
}
