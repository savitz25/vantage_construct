"use client";

import { useEffect } from "react";
import { trackToolLanderView } from "@/lib/analytics";

/** Fires once on mount — use on tool lander pages. */
export function TrackToolLanderView({ tool, path }: { tool: string; path: string }) {
  useEffect(() => {
    trackToolLanderView(tool, path);
  }, [tool, path]);

  return null;
}
