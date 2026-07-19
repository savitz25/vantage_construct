import { trackEvent } from "@/lib/analytics";

export function trackOutdoorEvent(
  name: string,
  params: Record<string, string | number | boolean | undefined | null> = {},
) {
  trackEvent(name, {
    event_category: "outdoor_studio",
    tool: "outdoor-studio",
    ...params,
  });
}
