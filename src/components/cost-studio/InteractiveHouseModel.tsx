"use client";

import { SmartImage } from "@/components/SmartImage";
import type { CostSelections } from "@/lib/cost-studio/types";
import { styleMedia } from "@/lib/plan-media";

/**
 * Living visual model of the user's home vision.
 * Layered 2D composition that reacts to style, roof, garage, basement, and add-ons.
 * Designed to feel premium and playful without needing a full 3D engine.
 */
export function InteractiveHouseModel({
  selections,
  className = "",
}: {
  selections: CostSelections;
  className?: string;
}) {
  const styleKey = selections.style ?? "modern-farmhouse";
  const base = styleMedia[styleKey]?.image ?? styleMedia["modern-farmhouse"].image;
  const has = (id: string) => selections.addons.includes(id as never);

  const roofTint =
    selections.roof === "standing-seam"
      ? "from-slate-600/35 via-transparent to-transparent"
      : selections.roof === "slate"
        ? "from-stone-800/40 via-transparent to-transparent"
        : "from-amber-900/15 via-transparent to-transparent";

  return (
    <div className={`card flex h-full flex-col overflow-hidden ${className}`}>
      <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-2.5">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
            Live vision model
          </p>
          <p className="text-xs text-text-muted">Add-ons appear as you choose</p>
        </div>
        <span className="rounded-full border border-border px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-text-dim">
          Interactive
        </span>
      </div>

      <div className="relative h-full min-h-[280px] flex-1 aspect-auto bg-gradient-to-b from-[#dfe8f0] via-[#f4efe6] to-[#c9b79a]">
        {/* Soft sky + ground */}
        <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#9a8b72] to-[#c9b79a]" />

        {/* Base house photo */}
        <div className="absolute inset-[8%_10%_18%_10%] overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/10">
          <SmartImage
            src={base}
            alt={`${styleMedia[styleKey]?.alt ?? "Custom home"} base model`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="transition duration-500"
            priority
          />
          {/* Roof character wash */}
          <div className={`pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b ${roofTint}`} />
        </div>

        {/* Garage wing */}
        {(selections.garage === "three" || selections.garage === "collector") && (
          <div className="absolute bottom-[20%] right-[4%] w-[28%] animate-in fade-in duration-500">
            <div className="rounded-lg border border-white/50 bg-gradient-to-br from-[#e8d9c1] to-[#cbb592] p-2 shadow-xl">
              <div className="flex h-16 items-end justify-center gap-1 rounded-md bg-[#8d7660]/80 sm:h-20">
                <div className="h-10 w-[38%] rounded-t-sm bg-[#6f5b4a] sm:h-12" />
                {selections.garage === "collector" ? (
                  <div className="h-10 w-[38%] rounded-t-sm bg-[#6f5b4a] sm:h-12" />
                ) : null}
              </div>
              <p className="mt-1 text-center text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[#5c4a3a]">
                {selections.garage === "collector" ? "Collector garage" : "3-car garage"}
              </p>
            </div>
          </div>
        )}

        {/* Porch badge */}
        {has("porch") && (
          <LayerChip className="left-[12%] bottom-[22%]" label="Expanded porch" tone="warm" />
        )}

        {/* Outdoor living */}
        {has("outdoor-living") && (
          <div className="absolute bottom-[16%] left-[6%] w-[30%]">
            <div className="rounded-lg border border-amber-200/60 bg-[#2b241c]/85 p-2 text-center shadow-xl backdrop-blur">
              <div className="mx-auto mb-1 h-2 w-10 rounded-full bg-orange-400/80" />
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-amber-100">
                Outdoor kitchen
              </p>
            </div>
          </div>
        )}

        {/* Pool */}
        {has("pool") && (
          <div className="absolute bottom-[8%] left-[34%] w-[32%]">
            <div className="h-10 rounded-2xl border border-sky-200/50 bg-gradient-to-br from-sky-300/90 to-cyan-600/80 shadow-inner sm:h-12" />
            <p className="mt-1 text-center text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-sky-900/80">
              Resort pool
            </p>
          </div>
        )}

        {/* ADU cottage */}
        {has("adu") && (
          <div className="absolute bottom-[18%] left-[2%] w-[22%]">
            <div className="overflow-hidden rounded-lg border border-white/60 shadow-xl">
              <div className="relative aspect-[4/3]">
                <SmartImage
                  src="/media/plans/93ca5236-hpg-872-frontv2-768x411.webp"
                  alt="ADU guest cottage elevation"
                  fill
                  sizes="160px"
                />
              </div>
              <p className="bg-white/90 px-1 py-0.5 text-center text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-gold-deep">
                ADU / guest
              </p>
            </div>
          </div>
        )}

        {/* Sunroom */}
        {has("sunroom") && (
          <LayerChip className="right-[18%] top-[28%]" label="Sunroom" tone="glass" />
        )}

        {/* Basement callout */}
        {selections.basement && selections.basement !== "none" && (
          <div className="absolute bottom-[4%] right-[8%] rounded-full border border-white/70 bg-white/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold-deep shadow">
            {selections.basement === "walkout"
              ? "Walk-out basement"
              : selections.basement === "finished"
                ? "Finished basement"
                : "Full basement"}
          </div>
        )}

        {/* Smart / generator badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {has("smart-home") && <LayerChip label="Smart home" tone="tech" />}
          {has("generator") && <LayerChip label="Generator" tone="tech" />}
          {has("wine-cellar") && <LayerChip label="Wine cellar" tone="warm" />}
          {selections.lotPath === "knockdown" && (
            <LayerChip label="Knockdown path" tone="warm" />
          )}
        </div>
      </div>
    </div>
  );
}

function LayerChip({
  label,
  className = "",
  tone = "warm",
}: {
  label: string;
  className?: string;
  tone?: "warm" | "glass" | "tech";
}) {
  const tones = {
    warm: "border-amber-200/70 bg-[#2b241c]/85 text-amber-50",
    glass: "border-sky-100/70 bg-white/80 text-sky-950",
    tech: "border-emerald-200/60 bg-emerald-950/80 text-emerald-50",
  };
  return (
    <div
      className={`rounded-full border px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] shadow-lg backdrop-blur ${tones[tone]} ${className}`}
    >
      {label}
    </div>
  );
}
