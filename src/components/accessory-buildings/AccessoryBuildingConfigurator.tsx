"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SmartImage } from "@/components/SmartImage";
import { trackEvent } from "@/lib/analytics";
import {
  accessoryConfigPurposes,
  accessoryDisclaimer,
  accessoryFinishOptions,
  accessorySizeOptions,
} from "@/lib/accessory-buildings/content";
import { calculateGarageEstimate, formatRange, formatUsd } from "@/lib/garage-studio/pricing";
import { getPurpose } from "@/lib/garage-studio/purposes";
import type { FinishTier, GaragePurposeId } from "@/lib/garage-studio/types";

/**
 * Lightweight Accessory Building configurator — purpose → size → finish → live range.
 * Shares pricing DNA with Garage Studio for consistent conceptual ranges.
 */
export function AccessoryBuildingConfigurator() {
  const [purposeId, setPurposeId] = useState<GaragePurposeId>("pool-pavilion");
  const [sizeId, setSizeId] = useState<(typeof accessorySizeOptions)[number]["id"]>("standard");
  const [finish, setFinish] = useState<FinishTier>("luxury");

  useEffect(() => {
    trackEvent("accessory_config_started", { event_category: "accessory_buildings" });
  }, []);

  const purpose = getPurpose(purposeId);
  const size = accessorySizeOptions.find((s) => s.id === sizeId) ?? accessorySizeOptions[1];

  const estimate = useMemo(() => {
    return calculateGarageEstimate({
      purposeId,
      bays: size.bayId,
      door: purpose.defaults.door,
      exterior: purpose.defaults.exterior,
      livingAbove: purpose.defaults.livingAbove,
      bath: purpose.defaults.bath,
      amenities: purpose.defaults.amenities,
      finish,
    });
  }, [purposeId, size.bayId, finish, purpose]);

  function onPurpose(id: GaragePurposeId) {
    setPurposeId(id);
    trackEvent("accessory_config_purpose", {
      event_category: "accessory_buildings",
      purpose: id,
    });
  }

  return (
    <div id="configurator" className="scroll-mt-28">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        {/* Visual */}
        <div className="card overflow-hidden p-0">
          <div className="relative aspect-[16/11] min-h-[240px]">
            <SmartImage
              src={purpose.heroImage}
              alt={purpose.description}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                {purpose.lifestyleName}
              </p>
              <p className="mt-1 font-display text-2xl text-white sm:text-3xl">{purpose.name}</p>
              <p className="mt-1 max-w-md text-sm text-white/85">{purpose.tagline}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-5">
          <div className="card space-y-5 p-6 sm:p-7">
            <div>
              <p className="label">1 · What do you want this space for?</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {accessoryConfigPurposes.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onPurpose(p.id as GaragePurposeId)}
                    className={`rounded-full border px-3 py-1.5 text-left text-xs transition ${
                      purposeId === p.id
                        ? "border-gold bg-gold/15 text-gold-deep"
                        : "border-border text-text-muted hover:border-gold/40"
                    }`}
                  >
                    <span className="block font-medium">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="label">2 · Approximate scale</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {accessorySizeOptions.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setSizeId(s.id);
                      trackEvent("accessory_config_size", {
                        event_category: "accessory_buildings",
                        size: s.id,
                      });
                    }}
                    className={`rounded-xl border px-3 py-3 text-left transition ${
                      sizeId === s.id
                        ? "border-gold bg-gold/10"
                        : "border-border hover:border-gold/40"
                    }`}
                  >
                    <span className="block text-sm font-medium text-ivory">{s.label}</span>
                    <span className="mt-0.5 block text-[0.7rem] text-text-dim">{s.blurb}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="label">3 · Finish level</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {accessoryFinishOptions.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setFinish(f.id);
                      trackEvent("accessory_config_finish", {
                        event_category: "accessory_buildings",
                        finish: f.id,
                      });
                    }}
                    className={`rounded-xl border px-3 py-3 text-left transition ${
                      finish === f.id
                        ? "border-gold bg-gold/10"
                        : "border-border hover:border-gold/40"
                    }`}
                  >
                    <span className="block text-sm font-medium text-ivory">{f.label}</span>
                    <span className="mt-0.5 block text-[0.7rem] text-text-dim">{f.blurb}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card border-gold/30 bg-gold/5 p-6">
            <p className="studio-estimate-label">Conceptual investment range</p>
            <p className="studio-estimate-range">
              {formatRange(estimate.low, estimate.high)}
            </p>
            <p className="mt-2 text-xs text-text-muted">
              Mid planning band ~{formatUsd(estimate.mid)} · educational only. Site work, utilities,
              and township rules can move totals.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#concept-review" className="btn btn-primary">
                Request a concept review
              </a>
              <Link
                href={`/accessory-building-cost-nj#tool`}
                className="btn btn-secondary"
                onClick={() =>
                  trackEvent("accessory_config_open_studio", {
                    event_category: "accessory_buildings",
                    purpose: purposeId,
                  })
                }
              >
                Full Garage Studio →
              </Link>
            </div>
          </div>

          <p className="text-[0.65rem] leading-relaxed text-text-dim">*{accessoryDisclaimer}</p>
        </div>
      </div>
    </div>
  );
}
