import { trackEvent } from "@/lib/analytics";

export function trackSuiteEvent(
  name: string,
  params: Record<string, string | number | boolean | undefined | null> = {},
) {
  trackEvent(name, {
    event_category: "primary_suite_studio",
    tool: "primary-suite-studio",
    ...params,
  });
}
