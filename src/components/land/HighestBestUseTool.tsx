"use client";

import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { company } from "@/lib/company";
import {
  estimateLotPotential,
  estimateValueBand,
  formatUsdShort,
  multiLotDisclaimer,
} from "@/lib/land/multi-lot-content";

const towns = [
  ...company.focusTowns,
  "Westfield",
  "Other North Jersey",
] as const;

/**
 * Conceptual Highest & Best Use / lot-yield estimator for multi-lot conversations.
 * Not an appraisal or entitlement study.
 */
export function HighestBestUseTool() {
  const [acres, setAcres] = useState(5);
  const [town, setTown] = useState<string>(company.focusTowns[0]);
  const [condition, setCondition] = useState<"vacant" | "improved">("vacant");
  const [utilities, setUtilities] = useState<"full" | "partial" | "none">("partial");

  useEffect(() => {
    trackEvent("multi_lot_tool_started", { event_category: "multi_lot" });
  }, []);

  const result = useMemo(() => {
    const lots = estimateLotPotential(acres, utilities);
    const value = estimateValueBand(lots.low, lots.high, condition);
    return { lots, value };
  }, [acres, utilities, condition]);

  // Simple visual: show N lot rectangles inside a parcel shape
  const visualLots = Math.min(12, Math.max(1, Math.round((result.lots.low + result.lots.high) / 2)));

  function onAcres(v: number) {
    setAcres(v);
    trackEvent("multi_lot_acres_change", { event_category: "multi_lot", acres: v });
  }

  return (
    <div id="highest-best-use" className="scroll-mt-28">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        {/* Visual parcel */}
        <div className="card overflow-hidden p-0">
          <div className="border-b border-border bg-bg-elevated px-5 py-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
              Interactive · Conceptual lot yield
            </p>
            <p className="mt-1 text-sm text-text-muted">
              Adjust acreage and site inputs. The diagram is a teaching tool — real yield is decided
              by ordinance and engineering, not a slider.
            </p>
          </div>
          <div className="bg-[#ebe4d6] p-6 sm:p-8">
            <div
              className="relative mx-auto aspect-[5/4] max-w-md overflow-hidden rounded-xl border-2 border-[#8f6a28]/40 bg-[#d8cfc0]"
              aria-hidden
            >
              <div className="absolute inset-3 grid gap-1.5"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(4, visualLots)}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: visualLots }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-md border border-emerald-800/30 bg-emerald-700/25 shadow-sm transition"
                    style={{ minHeight: "2.5rem" }}
                  />
                ))}
              </div>
              <p className="absolute bottom-2 left-0 right-0 text-center text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#5a534a]">
                ~{visualLots} conceptual lots illustrated
              </p>
            </div>
            <p className="mt-4 text-center text-xs text-text-dim">
              {acres} acres · {town} · {condition} · utilities: {utilities}
            </p>
          </div>
        </div>

        {/* Controls + outputs */}
        <div className="space-y-5">
          <div className="card space-y-5 p-6">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-ivory">Approximate acreage</span>
                <span className="text-gold-deep">{acres} acres</span>
              </div>
              <input
                type="range"
                min={1}
                max={25}
                step={0.5}
                value={acres}
                onChange={(e) => onAcres(Number(e.target.value))}
                className="mt-2 w-full accent-[#b8893d]"
              />
            </div>

            <div>
              <label className="label">Town / market</label>
              <select
                className="input"
                value={town}
                onChange={(e) => {
                  setTown(e.target.value);
                  trackEvent("multi_lot_town_change", {
                    event_category: "multi_lot",
                    town: e.target.value,
                  });
                }}
              >
                {towns.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="label">Current condition</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(
                  [
                    ["vacant", "Vacant / raw"],
                    ["improved", "Improved / existing structures"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setCondition(id)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition ${
                      condition === id
                        ? "border-gold bg-gold/15 text-gold-deep"
                        : "border-border text-text-muted"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="label">Utilities</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(
                  [
                    ["full", "Sewer + public water"],
                    ["partial", "Partial / mixed"],
                    ["none", "Septic / well / limited"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setUtilities(id);
                      trackEvent("multi_lot_utilities_change", {
                        event_category: "multi_lot",
                        utilities: id,
                      });
                    }}
                    className={`rounded-full border px-3 py-1.5 text-xs transition ${
                      utilities === id
                        ? "border-gold bg-gold/15 text-gold-deep"
                        : "border-border text-text-muted"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card border-gold/30 bg-gold/5 p-6">
            <p className="studio-estimate-label">Conceptual lot potential</p>
            <p className="studio-estimate-range">
              {result.lots.low} – {result.lots.high} lots
            </p>
            <p className="mt-3 studio-estimate-label">Illustrative development value band</p>
            <p className="mt-1 font-display text-2xl text-ivory sm:text-3xl">
              {formatUsdShort(result.value.low)} – {formatUsdShort(result.value.high)}
            </p>
            <p className="mt-3 text-xs text-text-muted">
              Order-of-magnitude land-side discussion range only — not home sale prices, not a
              residual appraisal, and not a promise. Constraints often reduce yield below the top of
              the band.
            </p>
            <a href="#confidential-assessment" className="btn btn-primary mt-5">
              Request a confidential assessment
            </a>
          </div>

          <p className="text-[0.65rem] leading-relaxed text-text-dim">*{multiLotDisclaimer}</p>
        </div>
      </div>
    </div>
  );
}
