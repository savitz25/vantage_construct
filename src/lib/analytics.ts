type Params = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire a GA4 / dataLayer event without breaking UX if analytics is absent. */
export function trackEvent(name: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", name, params);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
  } catch {
    /* never break UX */
  }
}

export function trackNavClick(label: string, href: string, location: "desktop" | "mobile") {
  trackEvent("nav_click", {
    event_category: "navigation",
    link_label: label,
    link_url: href,
    nav_location: location,
  });
}

export function trackToolLanderView(tool: string, path: string) {
  trackEvent("tool_lander_view", {
    event_category: "transformations_studio",
    tool,
    page_path: path,
  });
}

export function trackServiceToolCta(service: string, toolHref: string, ctaLabel: string) {
  trackEvent("service_tool_cta_click", {
    event_category: "transformations_studio",
    service,
    tool_href: toolHref,
    cta_label: ctaLabel,
  });
}
