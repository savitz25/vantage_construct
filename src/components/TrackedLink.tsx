"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { trackEvent, trackServiceToolCta } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & {
  eventName?: string;
  eventParams?: Record<string, string | number | boolean | undefined | null>;
  /** When set, fires service_tool_cta_click */
  serviceTool?: { service: string; ctaLabel: string };
};

export function TrackedLink({
  eventName,
  eventParams,
  serviceTool,
  onClick,
  children,
  ...rest
}: Props) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (serviceTool) {
      const href = typeof rest.href === "string" ? rest.href : String(rest.href);
      trackServiceToolCta(serviceTool.service, href, serviceTool.ctaLabel);
    }
    if (eventName) {
      trackEvent(eventName, eventParams);
    }
    onClick?.(e);
  }

  return (
    <Link {...rest} onClick={handleClick}>
      {children}
    </Link>
  );
}
