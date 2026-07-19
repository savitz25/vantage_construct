import { trackEvent } from "@/lib/analytics";

export function trackKitchenEvent(
  name: string,
  params: Record<string, string | number | boolean | undefined | null> = {},
) {
  trackEvent(name, {
    event_category: "kitchen_studio",
    tool: "kitchen-studio",
    ...params,
  });
}
