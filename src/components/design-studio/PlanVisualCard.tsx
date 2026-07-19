"use client";

import Image from "next/image";
import type { HomePlan } from "@/lib/plans";
import { formatPrice } from "@/lib/plans";
import { getPlanMedia, planImageAlt } from "@/lib/plan-media";

type Props = {
  plan: HomePlan;
  selected: boolean;
  onSelect: () => void;
  onOpenDetails: () => void;
  priority?: boolean;
};

export function PlanVisualCard({
  plan,
  selected,
  onSelect,
  onOpenDetails,
  priority = false,
}: Props) {
  const media = getPlanMedia(plan.slug);
  const hero = media?.hero;
  const hover = media?.hover;
  const alt = planImageAlt(plan.name, plan.sqft, plan.style, "Front elevation");

  return (
    <div
      className={`card group relative flex h-full flex-col overflow-hidden transition duration-300 motion-reduce:transition-none ${
        selected ? "border-gold ring-2 ring-gold/35 shadow-[0_18px_50px_rgba(184,137,61,0.18)]" : ""
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className="relative block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-bg-elevated">
          {hero ? (
            <>
              <Image
                src={hero}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-cover transition duration-500 motion-reduce:transition-none ${
                  hover ? "group-hover:opacity-0" : "group-hover:scale-[1.03]"
                }`}
                priority={priority}
              />
              {hover ? (
                <Image
                  src={hover}
                  alt={planImageAlt(plan.name, plan.sqft, plan.style, "Alternate elevation")}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-0 transition duration-500 group-hover:opacity-100 motion-reduce:transition-none"
                />
              ) : null}
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0e6d4] to-[#d2bf9a]" />
          )}

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[0.7rem] font-medium text-gold-deep shadow-sm backdrop-blur">
              {plan.style}
            </span>
            {media?.representative ? (
              <span className="rounded-full bg-black/55 px-2.5 py-1 text-[0.65rem] text-white backdrop-blur">
                Representative elevation
              </span>
            ) : null}
          </div>

          <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.7rem] font-semibold text-ivory shadow-sm backdrop-blur">
            From {formatPrice(plan.priceFrom)}
          </div>

          <div
            className={`absolute bottom-3 right-3 flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
              selected
                ? "border-gold bg-gold text-white"
                : "border-white/80 bg-white/80 text-transparent"
            }`}
            aria-hidden
          >
            ✓
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-display text-2xl text-ivory transition group-hover:text-gold-deep">
            {plan.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-gold-deep">
            {plan.sqft.toLocaleString()} sq ft · {plan.beds} bed · {plan.baths} bath
          </p>
          <p className="mt-2 line-clamp-2 text-sm text-text-muted">{plan.summary}</p>
        </div>
      </button>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border px-5 py-3">
        <button
          type="button"
          onClick={onOpenDetails}
          className="text-sm font-medium text-gold-deep underline-offset-4 hover:underline"
        >
          View design details
        </button>
        {media?.floorPlan ? (
          <span className="text-xs uppercase tracking-[0.12em] text-text-dim">Floor plan available</span>
        ) : plan.pdfUrl ? (
          <span className="text-xs uppercase tracking-[0.12em] text-text-dim">PDF plans</span>
        ) : null}
      </div>
    </div>
  );
}
