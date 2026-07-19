"use client";

import { useEffect } from "react";
import { styleMedia } from "@/lib/plan-media";

/** Preload the first style card heroes so Architectural Style never flashes empty. */
export function ImagePreload({ hrefs }: { hrefs?: string[] }) {
  useEffect(() => {
    const urls =
      hrefs ??
      Object.values(styleMedia)
        .slice(0, 3)
        .map((m) => m.image)
        .filter(Boolean);

    const links: HTMLLinkElement[] = [];
    for (const href of urls) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = href;
      document.head.appendChild(link);
      links.push(link);
    }
    return () => {
      for (const link of links) link.remove();
    };
  }, [hrefs]);

  return null;
}
