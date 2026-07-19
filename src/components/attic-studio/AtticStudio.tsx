"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
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

  function pickVision(id: AtticVisionId) {
    const v = getVision(id);
    setSel({ visionId: id, ...v.defaults });
    trackAtticEvent("vision_selected", { vision: id });
    setViewMode("photo");
    setStep("customize");
  }

  function patch<K extends keyof AtticSelections>(key: K, value: AtticSelections[K]) {
    setSel((prev) => ({ ...prev, [key]: value }));
    trackAtticEvent("feature_changed", { feature: key, value: String(value) });
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
          <span className="ml-auto text-xs text-text-dim">
            {atticVisions.length} upper-level visions · live estimate
          </span>
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
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode("photo")}
                  className={`rounded-full border px-3 py-1.5 text-xs ${
                    viewMode === "photo"
                      ? "border-gold bg-gold/10 text-gold-deep"
                      : "border-border text-text-muted"
                  }`}
                >
                  Style photography
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("configurator")}
                  className={`rounded-full border px-3 py-1.5 text-xs ${
                    viewMode === "configurator"
                      ? "border-gold bg-gold/10 text-gold-deep"
                      : "border-border text-text-muted"
                  }`}
                >
                  Live structure preview
                </button>
              </div>

              {viewMode === "photo" ? (
                <div className="relative overflow-hidden rounded-2xl border border-border shadow-[0_20px_60px_rgba(40,30,15,0.12)]">
                  <div className="relative aspect-[16/10] w-full">
                    <SmartImage
                      src={vision.heroImage}
                      alt={`${vision.name} luxury attic`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-white/92 px-3 py-1.5 text-sm font-medium text-ivory shadow-sm backdrop-blur">
                      {vision.lifestyleName}
                    </span>
                    <span className="rounded-full bg-white/85 px-3 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-text-dim shadow-sm backdrop-blur">
                      Inspiration photo
                    </span>
                  </div>
                </div>
              ) : (
                <AtticScene selections={sel} />
              )}

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
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {atticVisions.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => pickVision(v.id)}
                      className={`relative h-20 w-32 shrink-0 overflow-hidden rounded-lg border transition ${
                        v.id === sel.visionId
                          ? "border-gold ring-1 ring-gold"
                          : "border-border opacity-90 hover:opacity-100"
                      }`}
                      title={v.name}
                    >
                      <SmartImage src={v.heroImage} alt={v.name} fill sizes="128px" />
                      <span className="absolute inset-x-0 bottom-0 bg-black/55 px-1 py-0.5 text-[0.6rem] text-white">
                        {v.name.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="card p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-text-dim">
                  Planning investment
                </p>
                <p className="mt-1 font-display text-3xl text-ivory sm:text-4xl">
                  {formatRange(estimate.low, estimate.high)}
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  Mid ~{formatUsd(estimate.mid)} · ~{formatUsd(estimate.monthly)}/mo illustrative
                </p>
                <ul className="mt-4 max-h-36 space-y-1 overflow-y-auto text-xs text-text-muted">
                  {estimate.breakdown.map((b) => (
                    <li key={b.label} className="flex justify-between gap-3">
                      <span>{b.label}</span>
                      <span className="shrink-0 text-gold-deep">{formatUsd(b.amount)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[0.65rem] text-text-dim">
                  *{estimateDisclaimer} {financingDisclaimer}
                </p>
              </div>

              <div className="card p-5">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs text-text-dim">Vision</p>
                    <p className="font-display text-xl text-ivory">{vision.name}</p>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-gold-deep hover:underline"
                    onClick={() => setStep("vision")}
                  >
                    Change
                  </button>
                </div>
              </div>

              <FeatureGroup label="Dormers & roof light">
                {dormerOptions.map((d) => (
                  <Chip
                    key={d.id}
                    active={sel.dormer === d.id}
                    onClick={() => patch("dormer", d.id as DormerOption)}
                  >
                    {d.label}
                  </Chip>
                ))}
              </FeatureGroup>

              <FeatureGroup label="Bathroom">
                {bathOptions.map((b) => (
                  <Chip
                    key={b.id}
                    active={sel.bath === b.id}
                    onClick={() => patch("bath", b.id as BathOption)}
                  >
                    {b.label}
                  </Chip>
                ))}
              </FeatureGroup>

              <FeatureGroup label="Storage & built-ins">
                {storageOptions.map((s) => (
                  <Chip
                    key={s.id}
                    active={sel.storage === s.id}
                    onClick={() => patch("storage", s.id as StorageOption)}
                  >
                    {s.label}
                  </Chip>
                ))}
              </FeatureGroup>

              <FeatureGroup label="Skylights">
                {skylightOptions.map((s) => (
                  <Chip
                    key={s.id}
                    active={sel.skylights === s.id}
                    onClick={() => patch("skylights", s.id as SkylightOption)}
                  >
                    {s.label}
                  </Chip>
                ))}
              </FeatureGroup>

              <FeatureGroup label="Ceiling treatment">
                {ceilingOptions.map((c) => (
                  <Chip
                    key={c.id}
                    active={sel.ceiling === c.id}
                    onClick={() => patch("ceiling", c.id as CeilingOption)}
                  >
                    {c.label}
                  </Chip>
                ))}
              </FeatureGroup>

              <FeatureGroup label="Finish level">
                {finishTiers.map((f) => (
                  <Chip
                    key={f.id}
                    active={sel.finish === f.id}
                    onClick={() => patch("finish", f.id as FinishTier)}
                  >
                    {f.label}
                  </Chip>
                ))}
              </FeatureGroup>

              <ToolLeadGate
                tool="attic-studio"
                title="Unlock your Attic Vision Summary"
                description="Selections, planning range, and a feasibility checklist for structure, stairs, and egress — emailed to you."
                summaryPayload={summaryPayload}
              />

              <div className="flex flex-wrap gap-3">
                <Link href="/start" className="btn btn-primary">
                  Schedule a consultation
                </Link>
                <Link href="/transformations/attics" className="btn btn-secondary">
                  Learn how we build upper levels
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FeatureGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="card p-5">
      <p className="text-sm font-medium text-ivory">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition ${
        active
          ? "border-gold bg-gold/10 text-gold-deep"
          : "border-border text-text-muted hover:border-gold/40"
      }`}
    >
      {children}
    </button>
  );
}
