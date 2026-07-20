"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { StudioLeadCapture } from "@/components/studios/StudioLeadCapture";
import {
  StudioChip,
  StudioControlGroup,
  StudioWorkspace,
} from "@/components/studios/StudioWorkspace";
import { trackTransformEvent } from "@/lib/transformations/analytics";
import {
  basementZones,
  calculateBasement,
  formatUsd,
  type BasementZoneId,
  type FinishTier,
} from "@/lib/transformations/basement";
import { estimateDisclaimer, financingDisclaimer } from "@/lib/transformations/disclaimers";
import { ToolResetButton } from "@/components/tools/ToolResetButton";

const DEFAULT_ZONES: BasementZoneId[] = ["guest", "bath"];

export function BasementBuilderTool() {
  const [footprint, setFootprint] = useState(1200);
  const [lowCeiling, setLowCeiling] = useState(false);
  const [zones, setZones] = useState<BasementZoneId[]>(DEFAULT_ZONES);
  const [finish, setFinish] = useState<FinishTier>("premium");

  function handleReset() {
    setFootprint(1200);
    setLowCeiling(false);
    setZones([...DEFAULT_ZONES]);
    setFinish("premium");
    trackTransformEvent("basement-builder", "tool_reset");
  }

  useEffect(() => {
    trackTransformEvent("basement-builder", "tool_started");
  }, []);

  const result = useMemo(
    () => calculateBasement({ footprint, lowCeiling, zones, finish }),
    [footprint, lowCeiling, zones, finish],
  );

  useEffect(() => {
    trackTransformEvent("basement-builder", "estimate_updated", {
      estimate: result.estimate,
      zones: zones.join(","),
      finish,
    });
  }, [result.estimate, zones, finish]);

  function toggle(id: BasementZoneId) {
    setZones((z) => {
      const next = z.includes(id) ? z.filter((x) => x !== id) : [...z, id];
      trackTransformEvent("basement-builder", "feature_changed", {
        feature: "zone",
        value: id,
        on: !z.includes(id),
      });
      return next;
    });
  }

  const zoneLabels = basementZones
    .filter((z) => zones.includes(z.id))
    .map((z) => z.label);

  const estimateLabel = formatUsd(result.estimate);
  const summaryLines = [
    `Footprint: ${footprint.toLocaleString()} sq ft`,
    `Finish: ${finish}`,
    `Zones: ${zoneLabels.join(", ") || "None selected"}`,
    lowCeiling ? "Low ceiling note: dig-out conversation recommended" : "Standard ceiling height assumed",
    `Illustrative value add: ${formatUsd(result.valueAdd)}`,
  ];

  return (
    <div id="tool" className="section scroll-mt-28 !py-8 sm:!py-10">
      <div className="container-wide">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Lower Level Studio</p>
            <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
              Design your private retreat below grade
            </h2>
            <p className="mt-2 text-text-muted">
              Cinema, wellness, guest suite, speakeasy — shape the lower level that unlocks the home
              you already own. Live floor mock + planning range update as you choose.
            </p>
          </div>
          <ToolResetButton onReset={handleReset} className="shrink-0 self-start" />
        </div>

        <StudioWorkspace
          mobileEstimateBar={
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-text-dim">
                  Planning estimate
                </p>
                <p className="font-display text-xl text-ivory">{estimateLabel}</p>
              </div>
              <a href="#basement-controls" className="text-xs font-semibold text-gold-deep">
                Options ↓
              </a>
            </div>
          }
          model={
            <div className="relative flex h-full w-full flex-col bg-[#14110f]">
              <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/92 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-ivory shadow-sm">
                  Live lower-level plan
                </span>
                {result.overCapacity ? (
                  <span className="rounded-full bg-red-600/90 px-3 py-1 text-[0.65rem] font-semibold text-white">
                    Over capacity
                  </span>
                ) : null}
              </div>
              <div className="absolute inset-0 p-4 pt-12 sm:p-6 sm:pt-14">
                <div className="grid h-full grid-cols-6 grid-rows-4 gap-1.5 sm:gap-2">
                  {result.zoneBreakdown.length === 0 ? (
                    <div className="col-span-6 row-span-4 flex items-center justify-center rounded-xl border border-dashed border-white/20 text-sm text-white/45">
                      Select dream zones to compose your lower level
                    </div>
                  ) : (
                    result.zoneBreakdown.map((z) => {
                      const span = Math.max(1, Math.round((z.sqft / Math.max(footprint, 1)) * 24));
                      return (
                        <div
                          key={z.id}
                          className="flex flex-col items-center justify-center rounded-lg p-2 text-center shadow-inner"
                          style={{
                            background: `linear-gradient(145deg, ${z.color}, ${z.color}cc)`,
                            gridColumn: `span ${Math.min(6, Math.max(2, Math.ceil(span / 4)))}`,
                            gridRow: `span ${Math.min(2, Math.max(1, Math.ceil(span / 8)))}`,
                          }}
                        >
                          <span className="text-[0.7rem] font-semibold text-white sm:text-xs">
                            {z.label}
                          </span>
                          <span className="mt-0.5 text-[0.55rem] text-white/80">{z.sqft} sf</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="rounded-lg bg-black/55 px-3 py-2 backdrop-blur-sm">
                  <div className="mb-1 flex justify-between text-[0.65rem] text-white/75">
                    <span>Space programmed</span>
                    <span>
                      {result.usedSqft.toLocaleString()} / {footprint.toLocaleString()} sq ft
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                    <div
                      className={`h-full rounded-full ${result.overCapacity ? "bg-red-400" : "bg-gold-bright"}`}
                      style={{
                        width: `${Math.min(100, (result.usedSqft / footprint) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
          modelFooter={
            <p className="text-sm text-text-muted">
              This is a planning composition — not a final architectural plan. We refine layout,
              moisture strategy, and egress during Design & Discovery.{" "}
              <Link href="/transformations/basements" className="text-gold-deep hover:underline">
                How we build finished basements →
              </Link>
            </p>
          }
          estimate={
            <>
              <p className="studio-estimate-label">Planning investment</p>
              <p className="studio-estimate-range">{estimateLabel}</p>
              <p className="studio-estimate-meta">
                ~{formatUsd(result.monthlyPayment)}/mo illustrative · value add{" "}
                {formatUsd(result.valueAdd)}
              </p>
              {result.digOutNote ? (
                <p className="mt-2 rounded-md border border-amber-600/25 bg-amber-50/90 px-2 py-1.5 text-[0.65rem] text-amber-950">
                  Low ceiling: dig-out or layout tradeoffs may apply on site.
                </p>
              ) : null}
              <ul className="studio-estimate-breakdown space-y-1">
                {result.zoneBreakdown.map((z) => (
                  <li key={z.id} className="flex justify-between gap-2">
                    <span className="truncate">{z.label}</span>
                    <span className="shrink-0 text-gold-deep">{formatUsd(z.cost)}</span>
                  </li>
                ))}
              </ul>
              <p className="studio-estimate-disclaimer">
                *{estimateDisclaimer} {financingDisclaimer}
              </p>
            </>
          }
          controls={
            <div id="basement-controls" className="scroll-mt-36 space-y-2">
              <StudioControlGroup label="Lower-level footprint">
                <div className="w-full space-y-2 px-0.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">Approx. sq ft</span>
                    <span className="font-medium text-ivory">{footprint.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={600}
                    max={2000}
                    step={50}
                    value={footprint}
                    onChange={(e) => {
                      setFootprint(Number(e.target.value));
                      trackTransformEvent("basement-builder", "feature_changed", {
                        feature: "footprint",
                        value: e.target.value,
                      });
                    }}
                    className="w-full accent-[#c4a035]"
                  />
                </div>
              </StudioControlGroup>

              <StudioControlGroup label="Finish level">
                {(["premium", "luxury", "estate"] as FinishTier[]).map((t) => (
                  <StudioChip
                    key={t}
                    active={finish === t}
                    onClick={() => {
                      setFinish(t);
                      trackTransformEvent("basement-builder", "feature_changed", {
                        feature: "finish",
                        value: t,
                      });
                    }}
                  >
                    <span className="capitalize">{t}</span>
                  </StudioChip>
                ))}
              </StudioControlGroup>

              <div className="studio-control-group">
                <label className="flex cursor-pointer items-center gap-2 text-xs text-text-muted">
                  <input
                    type="checkbox"
                    checked={lowCeiling}
                    onChange={(e) => {
                      setLowCeiling(e.target.checked);
                      trackTransformEvent("basement-builder", "feature_changed", {
                        feature: "lowCeiling",
                        value: e.target.checked,
                      });
                    }}
                    className="accent-[#c4a035]"
                  />
                  Low ceilings (dig-out conversation)
                </label>
              </div>

              <StudioControlGroup label="Dream zones">
                {basementZones.map((z) => (
                  <StudioChip
                    key={z.id}
                    active={zones.includes(z.id)}
                    onClick={() => toggle(z.id)}
                    swatch={z.color}
                  >
                    {z.label}
                  </StudioChip>
                ))}
              </StudioControlGroup>

              <StudioLeadCapture
                tool="basement-builder"
                productName="Lower Level Vision Summary"
                estimateLabel={estimateLabel}
                summaryLines={summaryLines}
                selections={{
                  footprint,
                  lowCeiling,
                  zones,
                  finish,
                  zoneLabels,
                  estimate: result.estimate,
                  valueAdd: result.valueAdd,
                }}
                estimate={{
                  mid: result.estimate,
                  label: estimateLabel,
                }}
                pagePath="/finished-basement-cost-nj"
                benefits={[
                  "Zone plan inspiration + footprint checklist",
                  "Moisture-first build notes for North Jersey",
                  "Tagged Basement Studio lead for a tailored follow-up",
                ]}
                serviceHref="/transformations/basements"
                serviceLabel="How we finish basements"
              />

              <div className="flex flex-wrap gap-2 pt-1">
                <Link href="/start" className="btn btn-primary !px-4 !py-2.5 text-xs">
                  Schedule a consultation
                </Link>
                <Link
                  href="/transformations/basements"
                  className="btn btn-secondary !px-4 !py-2.5 text-xs"
                >
                  Lower level lifestyle
                </Link>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
