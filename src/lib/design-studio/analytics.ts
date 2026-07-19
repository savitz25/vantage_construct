type EventParams = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackStudioEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    event_category: "design_studio",
    ...params,
  };

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, payload);
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...payload });
  } catch {
    // Analytics must never break UX
  }

  if (process.env.NODE_ENV === "development") {
    // Helpful during local QA
    console.info("[design_studio]", name, payload);
  }
}
