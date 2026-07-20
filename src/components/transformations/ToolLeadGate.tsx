"use client";

import { StudioLeadCapture } from "@/components/studios/StudioLeadCapture";

/**
 * Back-compat wrapper for older Studio tools.
 * Prefer StudioLeadCapture directly for new work.
 */
export function ToolLeadGate({
  tool,
  title,
  description,
  summaryPayload,
  estimateLabel,
  summaryLines,
  benefits,
  serviceHref,
  serviceLabel,
}: {
  tool: string;
  title: string;
  description: string;
  summaryPayload: Record<string, unknown>;
  estimateLabel?: string;
  summaryLines?: string[];
  benefits?: string[];
  serviceHref?: string;
  serviceLabel?: string;
}) {
  const est =
    estimateLabel ??
    (typeof summaryPayload.estimateLabel === "string"
      ? summaryPayload.estimateLabel
      : "Your planning range");

  return (
    <StudioLeadCapture
      tool={tool}
      productName={title}
      estimateLabel={est}
      summaryLines={
        summaryLines ??
        (Array.isArray(summaryPayload.summaryLines)
          ? (summaryPayload.summaryLines as string[])
          : [description])
      }
      selections={summaryPayload}
      estimate={
        summaryPayload.estimate && typeof summaryPayload.estimate === "object"
          ? (summaryPayload.estimate as {
              low?: number;
              mid?: number;
              high?: number;
              label?: string;
            })
          : { label: est }
      }
      benefits={
        benefits ?? [
          "Personalized Vision Summary by email",
          "Selections + planning range for consultation",
          "Follow-up tagged by Studio type — no generic spam",
        ]
      }
      serviceHref={serviceHref}
      serviceLabel={serviceLabel}
    />
  );
}
