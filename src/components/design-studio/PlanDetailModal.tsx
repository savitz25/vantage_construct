"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import type { HomePlan } from "@/lib/plans";
import { formatPrice } from "@/lib/plans";
import { getPlanMedia, planImageAlt } from "@/lib/plan-media";

type Props = {
  plan: HomePlan;
  open: boolean;
  onClose: () => void;
  onSelect: () => void;
};

export function PlanDetailModal({ plan, open, onClose, onSelect }: Props) {
  const titleId = useId();
  const media = getPlanMedia(plan.slug);
  const gallery = media?.gallery?.length
    ? media.gallery
    : media?.hero
      ? [media.hero]
      : [];
  const [active, setActive] = useState(0);
  const [showFloor, setShowFloor] = useState(false);

  useEffect(() => {
    if (!open) return;
    setActive(0);
    setShowFloor(Boolean(media?.floorPlan));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, media?.floorPlan, plan.slug]);

  if (!open) return null;

  const displaySrc =
    showFloor && media?.floorPlan
      ? media.floorPlan
      : gallery[active] || media?.hero || "";

  const displayAlt =
    showFloor && media?.floorPlan
      ? planImageAlt(plan.name, plan.sqft, plan.style, "Floor plan")
      : planImageAlt(plan.name, plan.sqft, plan.style, "Design view");

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="card max-h-[94dvh] w-full max-w-5xl overflow-y-auto rounded-t-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">{plan.style}</p>
            <h2 id={titleId} className="mt-1 font-display text-3xl text-ivory sm:text-4xl">
              {plan.name}
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              {plan.sqft.toLocaleString()} sq ft · {plan.beds} bed · {plan.baths} bath · from{" "}
              {formatPrice(plan.priceFrom)}*
            </p>
          </div>
          <button
            type="button"
            className="rounded-full border border-border px-3 py-1 text-sm text-text-muted hover:border-gold hover:text-gold-deep"
            onClick={onClose}
            aria-label="Close design details"
          >
            Close
          </button>
        </div>

        <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.35fr_0.85fr]">
          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-bg-elevated">
              {displaySrc ? (
                <Image
                  src={displaySrc}
                  alt={displayAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className={`object-contain bg-white ${showFloor ? "p-2" : "object-cover p-0"}`}
                  priority
                />
              ) : null}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] ${
                  !showFloor
                    ? "border-gold bg-gold/10 text-gold-deep"
                    : "border-border text-text-muted"
                }`}
                onClick={() => setShowFloor(false)}
              >
                Elevations
              </button>
              {media?.floorPlan ? (
                <button
                  type="button"
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] ${
                    showFloor
                      ? "border-gold bg-gold/10 text-gold-deep"
                      : "border-border text-text-muted"
                  }`}
                  onClick={() => setShowFloor(true)}
                >
                  Floor plan
                </button>
              ) : null}
              {plan.pdfUrl ? (
                <a
                  href={plan.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-text-muted hover:border-gold hover:text-gold-deep"
                >
                  Open PDF plans
                </a>
              ) : null}
            </div>

            {!showFloor && gallery.length > 1 ? (
              <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
                {gallery.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => {
                      setShowFloor(false);
                      setActive(i);
                    }}
                    className={`relative aspect-[4/3] overflow-hidden rounded-lg border ${
                      active === i ? "border-gold" : "border-border"
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                  </button>
                ))}
              </div>
            ) : null}

            {media?.representative ? (
              <p className="mt-3 text-xs text-text-dim">
                Representative elevation — fully customizable to your lot and preferences.
              </p>
            ) : null}
          </div>

          <div>
            <h3 className="font-display text-2xl text-ivory">Key features</h3>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm text-text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-text-muted">{plan.summary}</p>

            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={() => {
                  onSelect();
                  onClose();
                }}
              >
                Select this plan & continue
              </button>
              <button type="button" className="btn btn-secondary w-full" onClick={onClose}>
                Keep browsing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
