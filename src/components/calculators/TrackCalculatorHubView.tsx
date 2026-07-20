"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function TrackCalculatorHubView() {
  useEffect(() => {
    trackEvent("calculator_hub_view", {
      event_category: "calculators",
      page_path: "/calculators",
    });
  }, []);
  return null;
}
