"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import {
  StudioChip,
  StudioControlGroup,
  StudioWorkspace,
} from "@/components/studios/StudioWorkspace";
import { ToolLeadGate } from "@/components/transformations/ToolLeadGate";
import { trackAtticEvent } from "@/lib/attic-studio/analytics";
import {
  bathOptions,
  ceilingOptions,
  dormerOptions,
  finishTiers,
  skylightOptions,
  storageOptions,
} from "@/lib/attic-studio/options";
import { calculateAtticEstimate, formatRange, formatUsd } from "@/lib/attic-studio/pricing";
import { atticVisions, getVision } from "@/lib/attic-studio/visions";
import type {
  AtticSelections,
  AtticVisionId,
  BathOption,
  CeilingOption,
  DormerOption,
  FinishTier,
  SkylightOption,
  StorageOption,
} from "@/lib/attic-studio/types";
import { estimateDisclaimer, financingDisclaimer } from "@/lib/transformations/disclaimers";
import { ToolResetButton } from "@/components/tools/ToolResetButton";
import { AtticScene } from "./AtticScene";

const defaultVision = atticVisions[0];
const initial: AtticSelections = {
  visionId: defaultVision.id,
  ...defaultVision.defaults,
};

export function AtticStudio() {
  const [step, setStep] = useState<"vision" | "customize">("vision");
  const [sel, setSel] = useState<AtticSelections>(initial);
  const [viewMode, setViewMode] = useState<"photo" | "configurator">("photo");

  useEffect(() => {
    trackAtticEvent("tool_started");
  }, []);

  const estimate = useMemo(() => calculateAtticEstimate(sel), [sel]);
  const vision = getVision(sel.visionId);

  function handleReset() {
    setSel({ ...initial });
    setStep("vision");
    setViewMode("photo");
    trackAtticEvent("tool_reset");
  }

  function pickVision(id: AtticVisionId) {
    const v = getVision(id);
    setSel({ visionId: id, ...v.defaults });
    trackAtticEvent("vision_selected", { vision: id });
    setViewMode("photo");
    setStep("customize");
  }

  function patch<K extends keyof AtticSelections>(key: K, value: AtticSelections[K]) {
    setSel((prev) => {
      const next = { ...prev, [key]: value };
      const nextEst = calculateAtticEstimate(next);
      trackAtticEvent("feature_changed", { feature: key, value: String(value) });
      trackAtticEvent("estimate_updated", {
        mid: nextEst.mid,
        low: nextEst.low,
        high: nextEst.high,
      });
      return next;
    });
    if (key !== "visionId") setViewMode("configurator");
  }

  const summaryPayload = {
    ...sel,
    visionName: vision.name,
    lifestyleName: vision.lifestyleName,
    estimate,
  };

  return (
    <div id="tool" className="section scroll-mt-28 pt-6 sm:pt-8">
      <div className="container-wide">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setStep("vision")}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              step === "vision"
                ? "border-gold bg-gold/10 text-gold-deep"
                : "border-border text-text-muted hover:border-gold/40"
            }`}
          >
            1 · Choose vision
          </button>
          <button
            type="button"
            onClick={() => setStep("customize")}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              step === "customize"
                ? "border-gold bg-gold/10 text-gold-deep"
                : "border-border text-text-muted hover:border-gold/40"
            }`}
          >
            2 · Customize features
          </button>
          <div className="ml-auto flex flex-wrap items-center gap-3">
            <span className="text-xs text-text-dim">
              {atticVisions.length} upper-level visions · live estimate
            </span>
            <ToolResetButton onReset={handleReset} />
          </div>
        </div>

        {step === "vision" ? (
          <div>
            <h2 className="font-display text-3xl text-ivory sm:text-4xl">
              What could your upper level become?
            </h2>
            <p className="mt-2 max-w-2xl text-text-muted">
              Six private retreats under the roof. Pick a vision — then shape dormers, baths, light,
              and finishes with a North Jersey planning estimate.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {atticVisions.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => pickVision(v.id)}
                  className={`card card-hover group overflow-hidden p-0 text-left transition ${
                    sel.visionId === v.id ? "ring-2 ring-gold" : ""
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-bg-soft">
                    <SmartImage
                      src={v.heroImage}
                      alt={`${v.name} attic conversion inspiration`}
                      fill
                      className="transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <span className="absolute bottom-3 left-3 right-3 font-display text-xl text-white drop-shadow">
                      {v.name}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-gold-deep">
                      {v.lifestyleName}
                    </p>
                    <p className="mt-1 text-sm text-text-muted line-clamp-2">{v.tagline}</p>
                    <span className="mt-3 inline-block text-sm text-gold-deep">
                      Select this vision →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <StudioWorkspace
            mobileEstimateBar={
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-text-dim">
                    Planning investment
                  </p>
                  <p className="font-display text-xl text-ivory">
                    {formatRange(estimate.low, estimate.high)}
                  </p>
                </div>
                <a href="#attic-controls" className="text-xs font-semibold text-gold-deep">
                  Options ↓
                </a>
              </div>
            }
            model={
              <div className="relative h-full w-full">
                <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setViewMode("photo")}
                    className={`rounded-full border px-3 py-1 text-[0.65rem] font-medium backdrop-blur transition ${
                      viewMode === "photo"
                        ? "border-gold bg-white/95 text-gold-deep"
                        : "border-white/40 bg-black/35 text-white"
                    }`}
                  >
                    Style photo
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("configurator")}
                    className={`rounded-full border px-3 py-1 text-[0.65rem] font-medium backdrop-blur transition ${
                      viewMode === "configurator"
                        ? "border-gold bg-white/95 text-gold-deep"
                        : "border-white/40 bg-black/35 text-white"
                    }`}
                  >
                    Live structure
                  </button>
                </div>
                {viewMode === "photo" ? (
                  <>
                    <SmartImage
                      src={vision.heroImage}
                      alt={`${vision.name} luxury attic`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 70vw"
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full bg-white/92 px-3 py-1 text-xs font-medium text-ivory shadow-sm backdrop-blur">
                        {vision.lifestyleName}
                      </span>
                      <span className="rounded-full bg-white/85 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.12em] text-text-dim shadow-sm backdrop-blur">
                        Inspiration photo
                      </span>
                    </div>
                  </>
                ) : (
                  <AtticScene selections={sel} compact />
                )}
              </div>
            }
            modelFooter={
              <>
                <p className="text-sm text-text-muted">
                  {vision.description}{" "}
                  {viewMode === "photo" ? (
                    <button
                      type="button"
                      className="text-gold-deep hover:underline"
                      onClick={() => setViewMode("configurator")}
                    >
                      Switch to live structure preview →
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-gold-deep hover:underline"
                      onClick={() => setViewMode("photo")}
                    >
                      View style photography →
                    </button>
                  )}
                </p>
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
                    Explore other visions
                  </p>
                  <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                    {atticVisions.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => pickVision(v.id)}
                        className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border transition sm:h-16 sm:w-28 ${
                          v.id === sel.visionId
                            ? "border-gold ring-1 ring-gold"
                            : "border-border opacity-90 hover:opacity-100"
                        }`}
                        title={v.name}
                      >
                        <SmartImage src={v.heroImage} alt={v.name} fill sizes="112px" />
                        <span className="absolute inset-x-0 bottom-0 bg-black/55 px-1 py-0.5 text-[0.55rem] text-white">
                          {v.name.split(" ")[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            }
            estimate={
              <>
                <p className="studio-estimate-label">Planning investment</p>
                <p className="studio-estimate-range">
                  {formatRange(estimate.low, estimate.high)}
                </p>
                <p className="studio-estimate-meta">
                  Mid ~{formatUsd(estimate.mid)} · ~{formatUsd(estimate.monthly)}/mo illustrative
                </p>
                <ul className="studio-estimate-breakdown space-y-1">
                  {estimate.breakdown.map((b) => (
                    <li key={b.label} className="flex justify-between gap-2">
                      <span className="truncate">{b.label}</span>
                      <span className="shrink-0 text-gold-deep">{formatUsd(b.amount)}</span>
                    </li>
                  ))}
                </ul>
                <p className="studio-estimate-disclaimer">
                  *{estimateDisclaimer} {financingDisclaimer}
                </p>
              </>
            }
            controls={
              <div id="attic-controls" className="scroll-mt-36 space-y-2">
                <div className="studio-control-group flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.12em] text-text-dim">Vision</p>
                    <p className="font-display text-lg text-ivory">{vision.name}</p>
                  </div>
                  <button
                    type="button"
                    className="text-xs font-semibold text-gold-deep hover:underline"
                    onClick={() => setStep("vision")}
                  >
                    Change
                  </button>
                </div>

                <StudioControlGroup label="Dormers & roof light">
                  {dormerOptions.map((d) => (
                    <StudioChip
                      key={d.id}
                      active={sel.dormer === d.id}
                      onClick={() => patch("dormer", d.id as DormerOption)}
                    >
                      {d.label}
                    </StudioChip>
                  ))}
                </StudioControlGroup>

                <StudioControlGroup label="Bathroom">
                  {bathOptions.map((b) => (
                    <StudioChip
                      key={b.id}
                      active={sel.bath === b.id}
                      onClick={() => patch("bath", b.id as BathOption)}
                    >
                      {b.label}
                    </StudioChip>
                  ))}
                </StudioControlGroup>

                <StudioControlGroup label="Storage & built-ins">
                  {storageOptions.map((s) => (
                    <StudioChip
                      key={s.id}
                      active={sel.storage === s.id}
                      onClick={() => patch("storage", s.id as StorageOption)}
                    >
                      {s.label}
                    </StudioChip>
                  ))}
                </StudioControlGroup>

                <StudioControlGroup label="Skylights">
                  {skylightOptions.map((s) => (
                    <StudioChip
                      key={s.id}
                      active={sel.skylights === s.id}
                      onClick={() => patch("skylights", s.id as SkylightOption)}
                    >
                      {s.label}
                    </StudioChip>
                  ))}
                </StudioControlGroup>

                <StudioControlGroup label="Ceiling treatment">
                  {ceilingOptions.map((c) => (
                    <StudioChip
                      key={c.id}
                      active={sel.ceiling === c.id}
                      onClick={() => patch("ceiling", c.id as CeilingOption)}
                    >
                      {c.label}
                    </StudioChip>
                  ))}
                </StudioControlGroup>

                <StudioControlGroup label="Finish level">
                  {finishTiers.map((f) => (
                    <StudioChip
                      key={f.id}
                      active={sel.finish === f.id}
                      onClick={() => patch("finish", f.id as FinishTier)}
                    >
                      {f.label}
                    </StudioChip>
                  ))}
                </StudioControlGroup>

                <ToolLeadGate
                  tool="attic-studio"
                  title="Unlock your Attic Vision Summary"
                  description="Selections, planning range, and a feasibility checklist for structure, stairs, and egress — emailed to you."
                  summaryPayload={summaryPayload}
                />

                <div className="flex flex-wrap gap-2 pt-1">
                  <Link href="/start" className="btn btn-primary !px-4 !py-2.5 text-xs">
                    Schedule a consultation
                  </Link>
                  <Link
                    href="/transformations/attics"
                    className="btn btn-secondary !px-4 !py-2.5 text-xs"
                  >
                    How we build upper levels
                  </Link>
                </div>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
}
