"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { trackTransformEvent } from "@/lib/transformations/analytics";
import {
  basementZones,
  calculateBasement,
  formatUsd,
  type BasementZoneId,
  type FinishTier,
} from "@/lib/transformations/basement";
import { estimateDisclaimer, financingDisclaimer } from "@/lib/transformations/disclaimers";
import { ToolLeadGate } from "./ToolLeadGate";

export function BasementBuilderTool() {
  const [footprint, setFootprint] = useState(1200);
  const [lowCeiling, setLowCeiling] = useState(false);
  const [zones, setZones] = useState<BasementZoneId[]>(["guest", "bath"]);
  const [finish, setFinish] = useState<FinishTier>("premium");

  useEffect(() => {
    trackTransformEvent("basement-builder", "tool_started");
  }, []);

  const result = useMemo(
    () => calculateBasement({ footprint, lowCeiling, zones, finish }),
    [footprint, lowCeiling, zones, finish],
  );

  function toggle(id: BasementZoneId) {
    setZones((z) => (z.includes(id) ? z.filter((x) => x !== id) : [...z, id]));
  }

  return (
    <div id="tool" className="section scroll-mt-28 pt-6 sm:pt-8">
      <div className="container-wide grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <div className="card space-y-5 p-6">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-ivory">Basement footprint</span>
                <span className="text-gold-deep">{footprint.toLocaleString()} sq ft</span>
              </div>
              <input
                type="range"
                min={600}
                max={2000}
                step={50}
                value={footprint}
                onChange={(e) => setFootprint(Number(e.target.value))}
                className="mt-2 w-full accent-[#b8893d]"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-text-muted">
              <input
                type="checkbox"
                checked={lowCeiling}
                onChange={(e) => setLowCeiling(e.target.checked)}
              />
              Low ceilings (may need dig-out conversation)
            </label>
            <div>
              <p className="text-sm text-ivory">Finish tier</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["premium", "luxury", "estate"] as FinishTier[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFinish(t)}
                    className={`rounded-full border px-3 py-1.5 text-xs capitalize ${
                      finish === t
                        ? "border-gold bg-gold/10 text-gold-deep"
                        : "border-border text-text-muted"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-ivory">Dream zones (tap to add)</p>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {basementZones.map((z) => {
                const on = zones.includes(z.id);
                return (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => toggle(z.id)}
                    className={`rounded-xl border p-3 text-left text-sm transition ${
                      on ? "border-transparent text-white" : "border-border text-text-muted"
                    }`}
                    style={on ? { background: z.color } : undefined}
                  >
                    {z.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">Live floor mock</p>
            <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-xl border border-border bg-[#1a1714]">
              <div className="absolute inset-3 grid grid-cols-6 grid-rows-4 gap-1">
                {result.zoneBreakdown.length === 0 ? (
                  <div className="col-span-6 row-span-4 flex items-center justify-center text-sm text-white/40">
                    Select zones to fill the basement
                  </div>
                ) : (
                  result.zoneBreakdown.map((z) => {
                    const span = Math.max(1, Math.round((z.sqft / Math.max(footprint, 1)) * 24));
                    return (
                      <div
                        key={z.id}
                        className="flex items-center justify-center rounded-md p-1 text-center text-[0.6rem] font-semibold text-white"
                        style={{
                          background: z.color,
                          gridColumn: `span ${Math.min(6, Math.max(2, Math.ceil(span / 4)))}`,
                          gridRow: `span ${Math.min(2, Math.max(1, Math.ceil(span / 8)))}`,
                        }}
                      >
                        {z.label}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs text-text-dim">
                <span>Space used</span>
                <span>
                  {result.usedSqft} / {footprint} sq ft
                  {result.overCapacity ? " · over capacity" : ""}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-bg-elevated">
                <div
                  className={`h-full rounded-full ${result.overCapacity ? "bg-red-500" : "bg-gold"}`}
                  style={{
                    width: `${Math.min(100, (result.usedSqft / footprint) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-text-dim">Planning estimate</p>
            <p className="font-display text-4xl text-ivory">{formatUsd(result.estimate)}</p>
            <p className="mt-2 text-sm text-text-muted">
              ~{formatUsd(result.monthlyPayment)}/mo illustrative · est. value add{" "}
              {formatUsd(result.valueAdd)}
            </p>
            {result.digOutNote ? (
              <p className="mt-3 rounded-lg border border-amber-600/30 bg-amber-50/80 p-3 text-xs text-amber-950">
                Low ceiling flag: dig-out or layout tradeoffs may apply — we&apos;ll discuss on site.
              </p>
            ) : null}
            <ul className="mt-4 space-y-1 text-xs text-text-muted">
              {result.zoneBreakdown.map((z) => (
                <li key={z.id} className="flex justify-between gap-3">
                  <span>{z.label}</span>
                  <span>{formatUsd(z.cost)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-text-dim">
              *{estimateDisclaimer} {financingDisclaimer}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/start" className="btn btn-primary">
                Schedule a consultation
              </Link>
              <Link href="/transformations/basements" className="btn btn-secondary">
                Learn how we build them
              </Link>
            </div>
          </div>

          <ToolLeadGate
            tool="basement-builder"
            title="Get the Basement Lookbook"
            description="Zone inspiration photos + planning checklist for your footprint."
            summaryPayload={{ footprint, lowCeiling, zones, finish, result }}
          />
        </div>
      </div>
    </div>
  );
}
