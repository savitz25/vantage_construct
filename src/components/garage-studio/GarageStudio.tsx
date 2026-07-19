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
import { trackGarageEvent } from "@/lib/garage-studio/analytics";
import {
  amenities,
  baySizes,
  baths,
  doorStyles,
  exteriors,
  finishTiers,
  livingAbove,
} from "@/lib/garage-studio/options";
import { calculateGarageEstimate, formatRange, formatUsd } from "@/lib/garage-studio/pricing";
import {
  garagePresets,
  presetRangeLabel,
  type GaragePreset,
} from "@/lib/garage-studio/presets";
import { garagePurposes, getPurpose } from "@/lib/garage-studio/purposes";
import type {
  AmenityId,
  BaySizeId,
  BathId,
  DoorStyleId,
  ExteriorId,
  FinishTier,
  GaragePurposeId,
  GarageSelections,
  LivingAboveId,
} from "@/lib/garage-studio/types";
import { estimateDisclaimer, financingDisclaimer } from "@/lib/transformations/disclaimers";
import { GarageScene } from "./GarageScene";

const defaultPurpose = garagePurposes[0];
const initial: GarageSelections = {
  purposeId: defaultPurpose.id,
  ...defaultPurpose.defaults,
};

function selectionsMatchPreset(sel: GarageSelections, preset: GaragePreset): boolean {
  const p = preset.selections;
  if (
    sel.purposeId !== p.purposeId ||
    sel.bays !== p.bays ||
    sel.door !== p.door ||
    sel.exterior !== p.exterior ||
    sel.livingAbove !== p.livingAbove ||
    sel.bath !== p.bath ||
    sel.finish !== p.finish
  ) {
    return false;
  }
  if (sel.amenities.length !== p.amenities.length) return false;
  return p.amenities.every((a) => sel.amenities.includes(a));
}

export function GarageStudio() {
  const [step, setStep] = useState<"purpose" | "customize">("purpose");
  const [sel, setSel] = useState<GarageSelections>(initial);
  const [viewMode, setViewMode] = useState<"photo" | "configurator">("photo");
  const [showMore, setShowMore] = useState(false);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  useEffect(() => {
    trackGarageEvent("tool_started");
  }, []);

  const estimate = useMemo(() => calculateGarageEstimate(sel), [sel]);
  const purpose = getPurpose(sel.purposeId);

  function applyPreset(preset: GaragePreset) {
    setSel({ ...preset.selections, amenities: [...preset.selections.amenities] });
    setActivePresetId(preset.id);
    trackGarageEvent("preset_selected", { preset: preset.id });
    setViewMode("photo");
    setStep("customize");
  }

  function pickPurpose(id: GaragePurposeId) {
    const p = getPurpose(id);
    setSel({ purposeId: id, ...p.defaults });
    setActivePresetId(null);
    trackGarageEvent("purpose_selected", { purpose: id });
    setViewMode("photo");
    setStep("customize");
  }

  function patch<K extends keyof GarageSelections>(key: K, value: GarageSelections[K]) {
    setActivePresetId(null);
    setSel((prev) => {
      const next = { ...prev, [key]: value };
      const nextEst = calculateGarageEstimate(next);
      trackGarageEvent("feature_changed", { feature: key, value: String(value) });
      trackGarageEvent("estimate_updated", {
        mid: nextEst.mid,
        low: nextEst.low,
        high: nextEst.high,
      });
      return next;
    });
    if (key !== "purposeId") setViewMode("configurator");
  }

  function toggleAmenity(id: AmenityId) {
    setActivePresetId(null);
    setSel((prev) => {
      const on = prev.amenities.includes(id);
      const amenitiesNext = on
        ? prev.amenities.filter((a) => a !== id)
        : [...prev.amenities, id];
      const next = { ...prev, amenities: amenitiesNext };
      const nextEst = calculateGarageEstimate(next);
      trackGarageEvent("feature_changed", {
        feature: "amenity",
        value: id,
        enabled: !on,
      });
      trackGarageEvent("estimate_updated", {
        mid: nextEst.mid,
        low: nextEst.low,
        high: nextEst.high,
      });
      return next;
    });
    setViewMode("configurator");
  }

  const matchedPreset =
    garagePresets.find((p) => activePresetId === p.id || selectionsMatchPreset(sel, p)) ?? null;

  const summaryPayload = {
    ...sel,
    purposeName: purpose.name,
    lifestyleName: purpose.lifestyleName,
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
            onClick={() => setStep("purpose")}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              step === "purpose"
                ? "border-gold bg-gold/10 text-gold-deep"
                : "border-border text-text-muted hover:border-gold/40"
            }`}
          >
            1 · What to create
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
            2 · Configure building
          </button>
          <span className="ml-auto text-xs text-text-dim">
            {garagePurposes.length} building types · live estimate
          </span>
        </div>

        {step === "purpose" ? (
          <div>
            {/* Suggested starter packages */}
            <div className="mb-10">
              <p className="eyebrow">Suggested starting points</p>
              <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
                Start from a curated package
              </h2>
              <p className="mt-2 max-w-2xl text-text-muted">
                One-click combinations with size, doors, living space, and amenities pre-set. You
                can fine-tune everything after.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {garagePresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className="card card-hover group overflow-hidden p-0 text-left transition"
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
              Or choose a building type
            </h2>
            <p className="mt-2 max-w-2xl text-text-muted">
              Browse all purposes — then refine size, living space above, doors, and exterior with
              live visuals and a planning estimate.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {garagePurposes.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => pickPurpose(p.id)}
                  className={`card card-hover group overflow-hidden p-0 text-left transition ${
                    sel.purposeId === p.id ? "ring-2 ring-gold" : ""
                  }`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-bg-soft">
                    <SmartImage
                      src={p.heroImage}
                      alt={`${p.name} luxury accessory building`}
                      fill
                      className="transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <span className="absolute bottom-2 left-2 right-2 font-display text-lg text-white drop-shadow sm:text-xl">
                      {p.name}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-[0.65rem] uppercase tracking-[0.12em] text-gold-deep">
                      {p.lifestyleName}
                    </p>
                    <p className="mt-1 text-xs text-text-muted line-clamp-2 sm:text-sm">{p.tagline}</p>
                    <span className="mt-2 inline-block text-xs text-gold-deep sm:text-sm">
                      Select this type →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="studio-workspace-grid">
            <div className="studio-model-column">
              <div className="studio-model-sticky space-y-3">
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
                  Live building preview
                </button>
              </div>

              {viewMode === "photo" ? (
                <div className="studio-model-stage relative">
                  <div className="absolute inset-0">
                    <SmartImage
                      src={purpose.heroImage}
                      alt={`${purpose.name} luxury building`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 70vw"
                    />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-white/92 px-2.5 py-1 text-xs font-medium text-ivory shadow-sm backdrop-blur">
                      {purpose.lifestyleName}
                    </span>
                    <span className="rounded-full bg-white/85 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.12em] text-text-dim shadow-sm backdrop-blur">
                      Inspiration photo
                    </span>
                  </div>
                </div>
              ) : (
                <div className="studio-model-stage">
                  <GarageScene selections={sel} compact />
                </div>
              )}

              <p className="text-sm text-text-muted">
                {purpose.description}{" "}
                {viewMode === "photo" ? (
                  <button
                    type="button"
                    className="text-gold-deep hover:underline"
                    onClick={() => setViewMode("configurator")}
                  >
                    Switch to live building preview →
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
                  Explore other types
                </p>
                <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                  {garagePurposes.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => pickPurpose(p.id)}
                      className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border transition sm:h-16 sm:w-28 ${
                        p.id === sel.purposeId
                          ? "border-gold ring-1 ring-gold"
                          : "border-border opacity-90 hover:opacity-100"
                      }`}
                      title={p.name}
                    >
                      <SmartImage src={p.heroImage} alt={p.name} fill sizes="112px" />
                      <span className="absolute inset-x-0 bottom-0 bg-black/55 px-1 py-0.5 text-[0.55rem] text-white">
                        {p.name.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            </div>
            <aside className="studio-sidebar" aria-label="Planning estimate and options">
            <div className="studio-sidebar-scroll space-y-2">
              <div className="studio-estimate-card">
                <p className="studio-estimate-label">
                  Planning investment
                </p>
                <p className="studio-estimate-range">
                  {formatRange(estimate.low, estimate.high)}
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  Mid ~{formatUsd(estimate.mid)} · ~{formatUsd(estimate.monthly)}/mo illustrative
                </p>
                <ul className="mt-3 max-h-32 space-y-1 overflow-y-auto text-xs text-text-muted">
                  {estimate.breakdown.map((b) => (
                    <li key={b.label} className="flex justify-between gap-3">
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
                      {matchedPreset ? "Starter package" : "Primary purpose"}
                    </p>
                    <p className="font-display text-lg text-ivory">
                      {matchedPreset?.name ?? purpose.name}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-gold-deep hover:underline"
                    onClick={() => setStep("purpose")}
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* Quick switch packages while customizing */}
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
                  Switch package
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {garagePresets.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${
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

              {/* Highest-impact toggles first */}
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-gold-deep">
                Highest impact
              </p>

              <FeatureGroup label="Size / number of bays">
                {baySizes.map((b) => (
                  <Chip
                    key={b.id}
                    active={sel.bays === b.id}
                    onClick={() => patch("bays", b.id as BaySizeId)}
                  >
                    {b.label}
                  </Chip>
                ))}
              </FeatureGroup>

              <FeatureGroup label="Living space above">
                {livingAbove.map((l) => (
                  <Chip
                    key={l.id}
                    active={sel.livingAbove === l.id}
                    onClick={() => patch("livingAbove", l.id as LivingAboveId)}
                  >
                    {l.label}
                  </Chip>
                ))}
              </FeatureGroup>

              <FeatureGroup label="Garage door style">
                {doorStyles.map((d) => (
                  <Chip
                    key={d.id}
                    active={sel.door === d.id}
                    onClick={() => patch("door", d.id as DoorStyleId)}
                    swatch={d.color}
                  >
                    {d.label}
                  </Chip>
                ))}
              </FeatureGroup>

              <FeatureGroup label="Exterior style">
                {exteriors.map((e) => (
                  <Chip
                    key={e.id}
                    active={sel.exterior === e.id}
                    onClick={() => patch("exterior", e.id as ExteriorId)}
                    swatch={e.body}
                  >
                    {e.label}
                  </Chip>
                ))}
              </FeatureGroup>

              <button
                type="button"
                className="text-sm text-gold-deep hover:underline"
                onClick={() => setShowMore((v) => !v)}
              >
                {showMore ? "Hide secondary options ↑" : "Show bathroom, amenities & finish →"}
              </button>

              {showMore ? (
                <>
                  <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
                    Secondary options
                  </p>

                  <FeatureGroup label="Bathroom">
                    {baths.map((b) => (
                      <Chip
                        key={b.id}
                        active={sel.bath === b.id}
                        onClick={() => patch("bath", b.id as BathId)}
                      >
                        {b.label}
                      </Chip>
                    ))}
                  </FeatureGroup>

                  <FeatureGroup label="Amenities (toggle any)">
                    {amenities.map((a) => (
                      <Chip
                        key={a.id}
                        active={sel.amenities.includes(a.id)}
                        onClick={() => toggleAmenity(a.id as AmenityId)}
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
                tool="garage-studio"
                title="Unlock your Garage Vision Summary"
                description="Building type, all toggles, planning range, and next-step checklist — emailed to you."
                summaryPayload={summaryPayload}
              />

              <div className="flex flex-wrap gap-2 pt-1">
                <Link href="/start" className="btn btn-primary !px-4 !py-2.5 text-xs">
                  Schedule a consultation
                </Link>
                <Link href="/transformations/garages" className="btn btn-secondary !px-4 !py-2.5 text-xs">
                  Learn how we build them
                </Link>
              </div>
            </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

function FeatureGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="studio-control-group">
      <p className="studio-control-label">{label}</p>
      <div className="studio-control-chips">{children}</div>
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
      className={`studio-chip ${active ? "studio-chip-active" : ""}`}
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
