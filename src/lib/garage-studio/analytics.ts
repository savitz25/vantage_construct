import { trackEvent } from "@/lib/analytics";

export function trackGarageEvent(
  name: string,
  params: Record<string, string | number | boolean | undefined | null> = {},
) {
  trackEvent(name, {
    event_category: "garage_studio",
    tool: "garage-studio",
    ...params,
  });
}
