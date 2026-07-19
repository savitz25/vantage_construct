"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
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

export function GarageStudio() {
  const [step, setStep] = useState<"purpose" | "customize">("purpose");
  const [sel, setSel] = useState<GarageSelections>(initial);
  const [viewMode, setViewMode] = useState<"photo" | "configurator">("photo");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    trackGarageEvent("tool_started");
  }, []);

  const estimate = useMemo(() => calculateGarageEstimate(sel), [sel]);
  const purpose = getPurpose(sel.purposeId);

  function pickPurpose(id: GaragePurposeId) {
    const p = getPurpose(id);
    setSel({ purposeId: id, ...p.defaults });
    trackGarageEvent("purpose_selected", { purpose: id });
    setViewMode("photo");
    setStep("customize");
  }

  function patch<K extends keyof GarageSelections>(key: K, value: GarageSelections[K]) {
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

  const summaryPayload = {
    ...sel,
    purposeName: purpose.name,
    lifestyleName: purpose.lifestyleName,
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
            <h2 className="font-display text-3xl text-ivory sm:text-4xl">
              What do you want to create?
            </h2>
            <p className="mt-2 max-w-2xl text-text-muted">
              Start with purpose — the highest-impact choice. Then refine size, living space above,
              doors, and exterior with live visuals and a planning estimate.
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
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start">
            <div className="space-y-4">
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
                <div className="relative mx-auto h-[min(260px,36vh)] w-full max-w-xl overflow-hidden rounded-xl border border-border shadow-[0_12px_40px_rgba(40,30,15,0.1)] sm:h-[min(300px,38vh)]">
                  <div className="absolute inset-0">
                    <SmartImage
                      src={purpose.heroImage}
                      alt={`${purpose.name} luxury building`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 560px"
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
                <div className="mx-auto w-full max-w-xl">
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
                    <p className="text-xs text-text-dim">Primary purpose</p>
                    <p className="font-display text-lg text-ivory">{purpose.name}</p>
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

              {/* Highest-impact toggles first */}
              <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
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

              <div className="flex flex-wrap gap-3">
                <Link href="/start" className="btn btn-primary">
                  Schedule a consultation
                </Link>
                <Link href="/transformations/garages" className="btn btn-secondary">
                  Learn how we build them
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
