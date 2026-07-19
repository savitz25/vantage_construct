type Params = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackTransformEvent(tool: string, name: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const payload = { event_category: "transformations_studio", tool, ...params };
  try {
    window.gtag?.("event", name, payload);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...payload });
  } catch {
    /* never break UX */
  }
}
