import { trackEvent } from "@/lib/analytics";

export function trackAtticEvent(
  name: string,
  params: Record<string, string | number | boolean | undefined | null> = {},
) {
  trackEvent(name, {
    event_category: "attic_studio",
    tool: "attic-studio",
    ...params,
  });
}
