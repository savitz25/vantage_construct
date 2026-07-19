"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { ToolLeadGate } from "@/components/transformations/ToolLeadGate";
import { trackSuiteEvent } from "@/lib/primary-suite/analytics";
import {
  bathLayouts,
  bathSurfaces,
  bedWalls,
  ceilings,
  closetIslands,
  closetMillwork,
  closets,
  finishTiers,
  outdoorAccess,
  showers,
  sittingAreas,
  suiteAmenities,
  tubs,
  vanities,
} from "@/lib/primary-suite/options";
import { calculateSuiteEstimate, formatRange, formatUsd } from "@/lib/primary-suite/pricing";
import { presetRangeLabel, suitePresets, type SuitePreset } from "@/lib/primary-suite/presets";
import { getVision, suiteVisions } from "@/lib/primary-suite/visions";
import type {
  BathLayoutId,
  BathSurfaceId,
  BedWallId,
  CeilingId,
  ClosetConfigId,
  ClosetIslandId,
  ClosetMillworkId,
  FinishTier,
  OutdoorAccessId,
  ShowerId,
  SittingAreaId,
  SuiteAmenityId,
  SuiteSelections,
  SuiteVisionId,
  TubId,
  VanityId,
} from "@/lib/primary-suite/types";
import { estimateDisclaimer, financingDisclaimer } from "@/lib/transformations/disclaimers";
import { SuiteScene } from "./SuiteScene";

const defaultVision = suiteVisions[0];
const initial: SuiteSelections = {
  visionId: defaultVision.id,
  ...defaultVision.defaults,
};

type ZoneTab = "bedroom" | "bath" | "closet";

function matchPreset(sel: SuiteSelections, preset: SuitePreset): boolean {
  const p = preset.selections;
  const keys: (keyof SuiteSelections)[] = [
    "visionId",
    "bedWall",
    "sitting",
    "ceiling",
    "outdoorAccess",
    "bathLayout",
    "tub",
    "shower",
    "vanity",
    "bathSurface",
    "closet",
    "closetIsland",
    "closetMillwork",
    "finish",
  ];
  for (const k of keys) {
    if (sel[k] !== p[k]) return false;
  }
  if (sel.amenities.length !== p.amenities.length) return false;
  return p.amenities.every((a) => sel.amenities.includes(a));
}

export function PrimarySuiteStudio() {
  const [step, setStep] = useState<"vision" | "customize">("vision");
  const [sel, setSel] = useState<SuiteSelections>(initial);
  const [viewMode, setViewMode] = useState<"photo" | "configurator">("photo");
  const [zone, setZone] = useState<ZoneTab>("bath");
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  useEffect(() => {
    trackSuiteEvent("tool_started");
  }, []);

  const estimate = useMemo(() => calculateSuiteEstimate(sel), [sel]);
  const vision = getVision(sel.visionId);

  function applyPreset(preset: SuitePreset) {
    setSel({
      ...preset.selections,
      amenities: [...preset.selections.amenities],
    });
    setActivePresetId(preset.id);
    trackSuiteEvent("preset_selected", { preset: preset.id });
    setViewMode("photo");
    setStep("customize");
  }

  function pickVision(id: SuiteVisionId) {
    const v = getVision(id);
    setSel({ visionId: id, ...v.defaults });
    setActivePresetId(null);
    trackSuiteEvent("vision_selected", { vision: id });
    setViewMode("photo");
    setStep("customize");
  }

  function patch<K extends keyof SuiteSelections>(key: K, value: SuiteSelections[K]) {
    setActivePresetId(null);
    setSel((prev) => {
      const next = { ...prev, [key]: value };
      const nextEst = calculateSuiteEstimate(next);
      trackSuiteEvent("feature_changed", { feature: key, value: String(value) });
      trackSuiteEvent("estimate_updated", {
        mid: nextEst.mid,
        low: nextEst.low,
        high: nextEst.high,
      });
      return next;
    });
    setViewMode("configurator");
  }

  function toggleAmenity(id: SuiteAmenityId) {
    setActivePresetId(null);
    setSel((prev) => {
      const on = prev.amenities.includes(id);
      const amenities = on
        ? prev.amenities.filter((a) => a !== id)
        : [...prev.amenities, id];
      const next = { ...prev, amenities };
      const nextEst = calculateSuiteEstimate(next);
      trackSuiteEvent("feature_changed", { feature: "amenity", value: id, enabled: !on });
      trackSuiteEvent("estimate_updated", {
        mid: nextEst.mid,
        low: nextEst.low,
        high: nextEst.high,
      });
      return next;
    });
    setViewMode("configurator");
  }

  const matchedPreset =
    suitePresets.find((p) => activePresetId === p.id || matchPreset(sel, p)) ?? null;

  const summaryPayload = {
    ...sel,
    visionName: vision.name,
    lifestyleName: vision.lifestyleName,
    presetId: matchedPreset?.id ?? activePresetId,
    presetName: matchedPreset?.name,
    estimate,
  };

  return (
    <div id="tool" className="section scroll-mt-28 !py-8 sm:!py-10">
      <div className="container-wide">
        <div className="mb-6 flex flex-wrap items-center gap-3">
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
            2 · Design the suite
          </button>
          <span className="ml-auto text-xs text-text-dim">
            {suiteVisions.length} suite visions · live estimate
          </span>
        </div>

        {step === "vision" ? (
          <div>
            <div className="mb-10">
              <p className="eyebrow">Suggested starting points</p>
              <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
                Start from a curated suite package
              </h2>
              <p className="mt-2 max-w-2xl text-text-muted">
                One-click combinations for spa, minimal, estate dressing, and resort terraces.
                Fine-tune bedroom, bath, and closet after.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {suitePresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className="card card-hover group overflow-hidden p-0 text-left"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-bg-soft">
                      <SmartImage
                        src={preset.heroImage}
                        alt={preset.name}
                        fill
                        className="transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                      <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[0.65rem] font-medium text-gold-deep">
                        {preset.badge}
                      </span>
                      <span className="absolute bottom-2 left-2 right-2 font-display text-xl text-white drop-shadow">
                        {preset.name}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-text-muted">{preset.tagline}</p>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {preset.highlights.map((h) => (
                          <li
                            key={h}
                            className="rounded-full border border-border bg-bg-elevated px-2 py-0.5 text-[0.65rem] text-text-dim"
                          >
                            {h}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 text-sm font-medium text-gold-deep">
                        From {presetRangeLabel(preset)}
                      </p>
                      <span className="mt-1 inline-block text-xs text-gold-deep">
                        Start with this package →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <h2 className="font-display text-3xl text-ivory sm:text-4xl">
              Or choose your suite vision
            </h2>
            <p className="mt-2 max-w-2xl text-text-muted">
              Spa, modern minimal, classic elegant, warm organic, moody, resort, or traditional luxury.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {suiteVisions.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => pickVision(v.id)}
                  className={`card card-hover group overflow-hidden p-0 text-left ${
                    sel.visionId === v.id ? "ring-2 ring-gold" : ""
                  }`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-bg-soft">
                    <SmartImage
                      src={v.heroImage}
                      alt={v.name}
                      fill
                      className="transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <span className="absolute bottom-2 left-2 right-2 font-display text-lg text-white drop-shadow">
                      {v.name}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-[0.65rem] uppercase tracking-[0.12em] text-gold-deep">
                      {v.lifestyleName}
                    </p>
                    <p className="mt-1 text-xs text-text-muted line-clamp-2">{v.tagline}</p>
                    <span className="mt-2 inline-block text-xs text-gold-deep">Select →</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
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
                  Live suite preview
                </button>
              </div>

              {viewMode === "photo" ? (
                <div className="relative mx-auto h-[min(260px,36vh)] w-full max-w-xl overflow-hidden rounded-xl border border-border shadow-[0_12px_40px_rgba(40,30,15,0.1)] sm:h-[min(300px,38vh)]">
                  <div className="absolute inset-0">
                    <SmartImage
                      src={vision.heroImage}
                      alt={vision.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 560px"
                    />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 flex flex-wrap justify-between gap-2">
                    <span className="rounded-full bg-white/92 px-2.5 py-1 text-xs font-medium text-ivory shadow-sm">
                      {vision.lifestyleName}
                    </span>
                    <span className="rounded-full bg-white/85 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.12em] text-text-dim">
                      Inspiration photo
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mx-auto w-full max-w-xl">
                  <SuiteScene selections={sel} compact zone={zone === "bath" ? "bath" : zone === "closet" ? "closet" : "all"} />
                </div>
              )}

              <p className="text-sm text-text-muted">{vision.description}</p>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
                  Explore other visions
                </p>
                <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                  {suiteVisions.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => pickVision(v.id)}
                      className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border sm:h-16 sm:w-28 ${
                        v.id === sel.visionId ? "border-gold ring-1 ring-gold" : "border-border"
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
            </div>

            <div className="space-y-4">
              <div className="card p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-text-dim">
                  Planning investment
                </p>
                <p className="mt-1 font-display text-3xl text-ivory">
                  {formatRange(estimate.low, estimate.high)}
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  Mid ~{formatUsd(estimate.mid)} · ~{formatUsd(estimate.monthly)}/mo illustrative
                </p>
                <ul className="mt-3 max-h-32 space-y-1 overflow-y-auto text-xs text-text-muted">
                  {estimate.breakdown.map((b) => (
                    <li key={b.label} className="flex justify-between gap-2">
                      <span className="line-clamp-1">{b.label}</span>
                      <span className="shrink-0 text-gold-deep">{formatUsd(b.amount)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[0.65rem] text-text-dim">
                  *{estimateDisclaimer} {financingDisclaimer}
                </p>
              </div>

              <div className="card p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs text-text-dim">
                      {matchedPreset ? "Starter package" : "Vision"}
                    </p>
                    <p className="font-display text-lg text-ivory">
                      {matchedPreset?.name ?? vision.name}
                    </p>
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

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">Switch package</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {suitePresets.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className={`rounded-full border px-3 py-1.5 text-xs ${
                        matchedPreset?.id === preset.id
                          ? "border-gold bg-gold/10 text-gold-deep"
                          : "border-border text-text-muted hover:border-gold/40"
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zone tabs */}
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ["bath", "Bathroom"],
                    ["bedroom", "Bedroom"],
                    ["closet", "Closet"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setZone(id)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                      zone === id
                        ? "border-gold bg-gold/10 text-gold-deep"
                        : "border-border text-text-muted"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {zone === "bath" ? (
                <>
                  <p className="text-xs text-text-dim">Highest emotional impact zone</p>
                  <FeatureGroup label="Bath layout">
                    {bathLayouts.map((b) => (
                      <Chip
                        key={b.id}
                        active={sel.bathLayout === b.id}
                        onClick={() => patch("bathLayout", b.id as BathLayoutId)}
                      >
                        {b.label}
                      </Chip>
                    ))}
                  </FeatureGroup>
                  <FeatureGroup label="Tub">
                    {tubs.map((t) => (
                      <Chip
                        key={t.id}
                        active={sel.tub === t.id}
                        onClick={() => patch("tub", t.id as TubId)}
                      >
                        {t.label}
                      </Chip>
                    ))}
                  </FeatureGroup>
                  <FeatureGroup label="Shower">
                    {showers.map((s) => (
                      <Chip
                        key={s.id}
                        active={sel.shower === s.id}
                        onClick={() => patch("shower", s.id as ShowerId)}
                      >
                        {s.label}
                      </Chip>
                    ))}
                  </FeatureGroup>
                  <FeatureGroup label="Vanity">
                    {vanities.map((v) => (
                      <Chip
                        key={v.id}
                        active={sel.vanity === v.id}
                        onClick={() => patch("vanity", v.id as VanityId)}
                      >
                        {v.label}
                      </Chip>
                    ))}
                  </FeatureGroup>
                  <FeatureGroup label="Surfaces">
                    {bathSurfaces.map((b) => (
                      <Chip
                        key={b.id}
                        active={sel.bathSurface === b.id}
                        onClick={() => patch("bathSurface", b.id as BathSurfaceId)}
                        swatch={b.color}
                      >
                        {b.label}
                      </Chip>
                    ))}
                  </FeatureGroup>
                </>
              ) : null}

              {zone === "bedroom" ? (
                <>
                  <FeatureGroup label="Bed wall">
                    {bedWalls.map((b) => (
                      <Chip
                        key={b.id}
                        active={sel.bedWall === b.id}
                        onClick={() => patch("bedWall", b.id as BedWallId)}
                      >
                        {b.label}
                      </Chip>
                    ))}
                  </FeatureGroup>
                  <FeatureGroup label="Sitting / fireplace">
                    {sittingAreas.map((s) => (
                      <Chip
                        key={s.id}
                        active={sel.sitting === s.id}
                        onClick={() => patch("sitting", s.id as SittingAreaId)}
                      >
                        {s.label}
                      </Chip>
                    ))}
                  </FeatureGroup>
                  <FeatureGroup label="Ceiling">
                    {ceilings.map((c) => (
                      <Chip
                        key={c.id}
                        active={sel.ceiling === c.id}
                        onClick={() => patch("ceiling", c.id as CeilingId)}
                      >
                        {c.label}
                      </Chip>
                    ))}
                  </FeatureGroup>
                  <FeatureGroup label="Private outdoor">
                    {outdoorAccess.map((o) => (
                      <Chip
                        key={o.id}
                        active={sel.outdoorAccess === o.id}
                        onClick={() => patch("outdoorAccess", o.id as OutdoorAccessId)}
                      >
                        {o.label}
                      </Chip>
                    ))}
                  </FeatureGroup>
                </>
              ) : null}

              {zone === "closet" ? (
                <>
                  <FeatureGroup label="Closet configuration">
                    {closets.map((c) => (
                      <Chip
                        key={c.id}
                        active={sel.closet === c.id}
                        onClick={() => patch("closet", c.id as ClosetConfigId)}
                      >
                        {c.label}
                      </Chip>
                    ))}
                  </FeatureGroup>
                  <FeatureGroup label="Island">
                    {closetIslands.map((c) => (
                      <Chip
                        key={c.id}
                        active={sel.closetIsland === c.id}
                        onClick={() => patch("closetIsland", c.id as ClosetIslandId)}
                      >
                        {c.label}
                      </Chip>
                    ))}
                  </FeatureGroup>
                  <FeatureGroup label="Millwork level">
                    {closetMillwork.map((c) => (
                      <Chip
                        key={c.id}
                        active={sel.closetMillwork === c.id}
                        onClick={() => patch("closetMillwork", c.id as ClosetMillworkId)}
                      >
                        {c.label}
                      </Chip>
                    ))}
                  </FeatureGroup>
                </>
              ) : null}

              <FeatureGroup label="Suite amenities">
                {suiteAmenities.map((a) => (
                  <Chip
                    key={a.id}
                    active={sel.amenities.includes(a.id)}
                    onClick={() => toggleAmenity(a.id as SuiteAmenityId)}
                  >
                    {a.label}
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
                tool="primary-suite-studio"
                title="Unlock your Primary Suite Vision Summary"
                description="Bedroom, bath, closet selections, planning range, and next-step checklist — emailed to you."
                summaryPayload={summaryPayload}
              />

              <div className="flex flex-wrap gap-3">
                <Link href="/start" className="btn btn-primary">
                  Schedule a consultation
                </Link>
                <Link href="/transformations/primary-suite" className="btn btn-secondary">
                  Learn how we build primary suites
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
    <div className="card p-4">
      <p className="text-sm font-medium text-ivory">{label}</p>
      <div className="mt-2.5 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  swatch,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  swatch?: string;
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
      {swatch ? (
        <span
          className="h-3 w-3 shrink-0 rounded-full border border-black/10"
          style={{ background: swatch }}
          aria-hidden
        />
      ) : null}
      {children}
    </button>
  );
}
