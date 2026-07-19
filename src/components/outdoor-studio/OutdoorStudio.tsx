"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { ToolLeadGate } from "@/components/transformations/ToolLeadGate";
import { trackOutdoorEvent } from "@/lib/outdoor-studio/analytics";
import {
  appliancePackages,
  counters,
  covers,
  finishTiers,
  fireFeatures,
  floorings,
  kitchenConfigs,
  lighting,
  outdoorAmenities,
  styles,
} from "@/lib/outdoor-studio/options";
import { calculateOutdoorEstimate, formatRange, formatUsd } from "@/lib/outdoor-studio/pricing";
import { outdoorPresets, presetRangeLabel, type OutdoorPreset } from "@/lib/outdoor-studio/presets";
import { outdoorVisions, getVision } from "@/lib/outdoor-studio/visions";
import type {
  AppliancePackageId,
  CounterMaterialId,
  CoverStructureId,
  FinishTier,
  FireFeatureId,
  FlooringId,
  KitchenConfigId,
  LightingId,
  OutdoorAmenityId,
  OutdoorSelections,
  OutdoorVisionId,
  StyleId,
} from "@/lib/outdoor-studio/types";
import { estimateDisclaimer, financingDisclaimer } from "@/lib/transformations/disclaimers";
import { OutdoorScene } from "./OutdoorScene";

const defaultVision = outdoorVisions[0];
const initial: OutdoorSelections = {
  visionId: defaultVision.id,
  ...defaultVision.defaults,
};

function matchPreset(sel: OutdoorSelections, preset: OutdoorPreset): boolean {
  const p = preset.selections;
  if (
    sel.visionId !== p.visionId ||
    sel.kitchen !== p.kitchen ||
    sel.appliances !== p.appliances ||
    sel.counter !== p.counter ||
    sel.cover !== p.cover ||
    sel.fire !== p.fire ||
    sel.style !== p.style ||
    sel.flooring !== p.flooring ||
    sel.lighting !== p.lighting ||
    sel.finish !== p.finish
  ) {
    return false;
  }
  if (sel.amenities.length !== p.amenities.length) return false;
  return p.amenities.every((a) => sel.amenities.includes(a));
}

export function OutdoorStudio() {
  const [step, setStep] = useState<"vision" | "customize">("vision");
  const [sel, setSel] = useState<OutdoorSelections>(initial);
  const [viewMode, setViewMode] = useState<"photo" | "configurator">("photo");
  const [showMore, setShowMore] = useState(false);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  useEffect(() => {
    trackOutdoorEvent("tool_started");
  }, []);

  const estimate = useMemo(() => calculateOutdoorEstimate(sel), [sel]);
  const vision = getVision(sel.visionId);
  const hasKitchen = sel.kitchen !== "none";

  function applyPreset(preset: OutdoorPreset) {
    setSel({ ...preset.selections, amenities: [...preset.selections.amenities] });
    setActivePresetId(preset.id);
    trackOutdoorEvent("preset_selected", { preset: preset.id });
    setViewMode("photo");
    setStep("customize");
  }

  function pickVision(id: OutdoorVisionId) {
    const v = getVision(id);
    setSel({ visionId: id, ...v.defaults });
    setActivePresetId(null);
    trackOutdoorEvent("vision_selected", { vision: id });
    setViewMode("photo");
    setStep("customize");
  }

  function patch<K extends keyof OutdoorSelections>(key: K, value: OutdoorSelections[K]) {
    setActivePresetId(null);
    setSel((prev) => {
      const next = { ...prev, [key]: value };
      const nextEst = calculateOutdoorEstimate(next);
      trackOutdoorEvent("feature_changed", { feature: key, value: String(value) });
      if (key === "kitchen" || key === "appliances") {
        trackOutdoorEvent("kitchen_configuration", {
          kitchen: String(next.kitchen),
          appliances: String(next.appliances),
        });
      }
      trackOutdoorEvent("estimate_updated", {
        mid: nextEst.mid,
        low: nextEst.low,
        high: nextEst.high,
      });
      return next;
    });
    if (key !== "visionId") setViewMode("configurator");
  }

  function toggleAmenity(id: OutdoorAmenityId) {
    setActivePresetId(null);
    setSel((prev) => {
      const on = prev.amenities.includes(id);
      const amenitiesNext = on
        ? prev.amenities.filter((a) => a !== id)
        : [...prev.amenities, id];
      const next = { ...prev, amenities: amenitiesNext };
      const nextEst = calculateOutdoorEstimate(next);
      trackOutdoorEvent("feature_changed", { feature: "amenity", value: id, enabled: !on });
      trackOutdoorEvent("estimate_updated", {
        mid: nextEst.mid,
        low: nextEst.low,
        high: nextEst.high,
      });
      return next;
    });
    setViewMode("configurator");
  }

  const matchedPreset =
    outdoorPresets.find((p) => activePresetId === p.id || matchPreset(sel, p)) ?? null;

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
            2 · Build your space
          </button>
          <span className="ml-auto text-xs text-text-dim">
            {outdoorVisions.length} outdoor visions · live estimate
          </span>
        </div>

        {step === "vision" ? (
          <div>
            <div className="mb-10">
              <p className="eyebrow">Suggested starting points</p>
              <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
                Start from a curated outdoor package
              </h2>
              <p className="mt-2 max-w-2xl text-text-muted">
                One-click combinations for kitchens, fire lounges, pavilions, and resort yards. Fine-tune
                everything after.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {outdoorPresets.map((preset) => (
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
              Or choose your outdoor vision
            </h2>
            <p className="mt-2 max-w-2xl text-text-muted">
              Kitchen, fire, lounge, poolside, pavilion — pick a lifestyle direction, then configure.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {outdoorVisions.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => pickVision(v.id)}
                  className={`card card-hover group overflow-hidden p-0 text-left transition ${
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
                  Live space preview
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
                  <OutdoorScene selections={sel} compact />
                </div>
              )}

              <p className="text-sm text-text-muted">
                {vision.description}{" "}
                <button
                  type="button"
                  className="text-gold-deep hover:underline"
                  onClick={() =>
                    setViewMode((m) => (m === "photo" ? "configurator" : "photo"))
                  }
                >
                  {viewMode === "photo"
                    ? "Switch to live space preview →"
                    : "View style photography →"}
                </button>
              </p>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
                  Explore other visions
                </p>
                <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                  {outdoorVisions.map((v) => (
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
                  {outdoorPresets.map((preset) => (
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

              <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">Highest impact</p>

              <FeatureGroup label="Outdoor kitchen">
                {kitchenConfigs.map((k) => (
                  <Chip
                    key={k.id}
                    active={sel.kitchen === k.id}
                    onClick={() => patch("kitchen", k.id as KitchenConfigId)}
                  >
                    {k.label}
                  </Chip>
                ))}
              </FeatureGroup>

              {hasKitchen ? (
                <>
                  <FeatureGroup label="Appliance package">
                    {appliancePackages.map((a) => (
                      <Chip
                        key={a.id}
                        active={sel.appliances === a.id}
                        onClick={() => patch("appliances", a.id as AppliancePackageId)}
                      >
                        {a.label}
                      </Chip>
                    ))}
                  </FeatureGroup>
                  <FeatureGroup label="Countertop">
                    {counters.map((c) => (
                      <Chip
                        key={c.id}
                        active={sel.counter === c.id}
                        onClick={() => patch("counter", c.id as CounterMaterialId)}
                        swatch={c.color}
                      >
                        {c.label}
                      </Chip>
                    ))}
                  </FeatureGroup>
                </>
              ) : null}

              <FeatureGroup label="Structure & cover">
                {covers.map((c) => (
                  <Chip
                    key={c.id}
                    active={sel.cover === c.id}
                    onClick={() => patch("cover", c.id as CoverStructureId)}
                  >
                    {c.label}
                  </Chip>
                ))}
              </FeatureGroup>

              <FeatureGroup label="Fire features">
                {fireFeatures.map((f) => (
                  <Chip
                    key={f.id}
                    active={sel.fire === f.id}
                    onClick={() => patch("fire", f.id as FireFeatureId)}
                  >
                    {f.label}
                  </Chip>
                ))}
              </FeatureGroup>

              <button
                type="button"
                className="text-sm text-gold-deep hover:underline"
                onClick={() => setShowMore((v) => !v)}
              >
                {showMore
                  ? "Hide style, flooring & extras ↑"
                  : "Show style, flooring, lighting & extras →"}
              </button>

              {showMore ? (
                <>
                  <FeatureGroup label="Overall style">
                    {styles.map((s) => (
                      <Chip
                        key={s.id}
                        active={sel.style === s.id}
                        onClick={() => patch("style", s.id as StyleId)}
                      >
                        {s.label}
                      </Chip>
                    ))}
                  </FeatureGroup>
                  <FeatureGroup label="Flooring / hardscape">
                    {floorings.map((f) => (
                      <Chip
                        key={f.id}
                        active={sel.flooring === f.id}
                        onClick={() => patch("flooring", f.id as FlooringId)}
                        swatch={f.color}
                      >
                        {f.label}
                      </Chip>
                    ))}
                  </FeatureGroup>
                  <FeatureGroup label="Lighting">
                    {lighting.map((l) => (
                      <Chip
                        key={l.id}
                        active={sel.lighting === l.id}
                        onClick={() => patch("lighting", l.id as LightingId)}
                      >
                        {l.label}
                      </Chip>
                    ))}
                  </FeatureGroup>
                  <FeatureGroup label="Living zones & extras">
                    {outdoorAmenities.map((a) => (
                      <Chip
                        key={a.id}
                        active={sel.amenities.includes(a.id)}
                        onClick={() => toggleAmenity(a.id as OutdoorAmenityId)}
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
                </>
              ) : null}

              <ToolLeadGate
                tool="outdoor-studio"
                title="Unlock your Outdoor Vision Summary"
                description="Selections, planning range, and inspiration checklist — emailed to you."
                summaryPayload={summaryPayload}
              />

              <div className="flex flex-wrap gap-3">
                <Link href="/start" className="btn btn-primary">
                  Schedule a consultation
                </Link>
                <Link href="/transformations/outdoor-living" className="btn btn-secondary">
                  Learn how we build outdoor living
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
