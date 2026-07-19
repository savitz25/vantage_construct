"use client";

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
 * Reliable card/image renderer for Design Studio & plan catalogs.
 *
 * Uses native <img> (not next/image optimizer) so local public assets always
 * render, with graceful SVG fallback if a source fails. Never leaves a broken
 * icon — fallback image always paints into the reserved aspect-ratio box.
 */
export function SmartImage({
  src,
  alt,
  fallbackSrc = IMAGE_FALLBACK,
  className = "",
  fill = false,
  sizes,
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

  const fitClass =
    objectFit === "contain" ? "object-contain" : "object-cover";

  if (fill) {
    return (
      <>
        {/* Soft base layer so the box is never empty beige while loading */}
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-[#f3ebe0] via-[#e8dcc8] to-[#d4c2a6]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          sizes={sizes}
          onError={handleError}
          className={`absolute inset-0 h-full w-full ${fitClass} ${className}`}
          style={style}
          data-image-fallback={errored ? "true" : "false"}
        />
      </>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      width={typeof width === "number" ? width : undefined}
      height={typeof height === "number" ? height : undefined}
      sizes={sizes}
      onError={handleError}
      className={`${fitClass} ${className}`}
      style={{ width: "100%", height: "auto", ...style }}
      data-image-fallback={errored ? "true" : "false"}
    />
  );
}
