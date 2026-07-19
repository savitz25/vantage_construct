type Params = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackCostEvent(name: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const payload = { event_category: "cost_studio", ...params };
  try {
    window.gtag?.("event", name, payload);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...payload });
  } catch {
    /* analytics must never break UX */
  }
}
