"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

export const IMAGE_FALLBACK = "/media/plans/fallback-luxury-home.svg";

type Props = Omit<ImageProps, "src" | "alt" | "onError"> & {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
};

function isLocal(src: string) {
  return src.startsWith("/") || src.startsWith("data:");
}

/**
 * Production image component for design cards.
 * - Prefers local public assets (reliable on Vercel)
 * - Falls back gracefully if a source 404s
 * - Uses native img for remote hosts to avoid optimizer/hotlink failures
 */
export function SmartImage({
  src,
  alt,
  fallbackSrc = IMAGE_FALLBACK,
  className,
  fill,
  sizes,
  priority,
  width,
  height,
  style,
  ...rest
}: Props) {
  const initial = src && String(src).trim() ? String(src) : fallbackSrc;
  const [current, setCurrent] = useState(initial);

  useEffect(() => {
    setCurrent(src && String(src).trim() ? String(src) : fallbackSrc);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (current !== fallbackSrc) setCurrent(fallbackSrc);
  };

  const remote = !isLocal(current);

  if (remote) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={current}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={handleError}
          className={className}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            ...style,
          }}
        />
      );
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={current}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={handleError}
        className={className}
        width={typeof width === "number" ? width : undefined}
        height={typeof height === "number" ? height : undefined}
        style={{ width: "100%", height: "auto", objectFit: "cover", ...style }}
      />
    );
  }

  // SVG fallback or local files
  if (current.endsWith(".svg")) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={current}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={handleError}
          className={className}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            ...style,
          }}
        />
      );
    }
  }

  return (
    <Image
      src={current}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      width={width}
      height={height}
      className={className}
      style={style}
      onError={handleError}
      {...rest}
    />
  );
}
