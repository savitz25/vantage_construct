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
import { trackKitchenEvent } from "@/lib/kitchen-studio/analytics";
import {
  backsplashes,
  cabinetTones,
  countertops,
  hardwareFinishes,
  islands,
} from "@/lib/kitchen-studio/options";
import { calculateKitchenEstimate, formatRange, formatUsd } from "@/lib/kitchen-studio/pricing";
import { getStyle, kitchenStyles } from "@/lib/kitchen-studio/styles";
import type {
  BacksplashId,
  CabinetToneId,
  CounterId,
  HardwareId,
  IslandId,
  KitchenSelections,
  KitchenStyleId,
} from "@/lib/kitchen-studio/types";
import { estimateDisclaimer, financingDisclaimer } from "@/lib/transformations/disclaimers";
import { KitchenScene } from "./KitchenScene";

const defaultStyle = kitchenStyles[0];

const initial: KitchenSelections = {
  styleId: defaultStyle.id,
  ...defaultStyle.defaults,
};

export function KitchenStudio() {
  const [step, setStep] = useState<"style" | "customize">("style");
  const [sel, setSel] = useState<KitchenSelections>(initial);
  const [viewMode, setViewMode] = useState<"photo" | "configurator">("photo");

  useEffect(() => {
    trackKitchenEvent("tool_started");
  }, []);

  const estimate = useMemo(() => calculateKitchenEstimate(sel), [sel]);
  const style = getStyle(sel.styleId);

  function pickStyle(id: KitchenStyleId) {
    const s = getStyle(id);
    setSel({
      styleId: id,
      ...s.defaults,
    });
    trackKitchenEvent("style_selected", { style: id });
    setViewMode("photo");
    setStep("customize");
  }

  function patch<K extends keyof KitchenSelections>(key: K, value: KitchenSelections[K]) {
    setSel((prev) => ({ ...prev, [key]: value }));
    trackKitchenEvent("feature_changed", { feature: key, value: String(value) });
    if (key !== "styleId") setViewMode("configurator");
  }

  const summaryPayload = {
    ...sel,
    styleName: style.name,
    estimate,
  };

  const estimateBlock = (
    <>
      <p className="studio-estimate-label">Planning investment</p>
      <p className="studio-estimate-range">{formatRange(estimate.low, estimate.high)}</p>
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
  );

  const mobileBar = (
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-text-dim">
          Planning investment
        </p>
        <p className="font-display text-xl text-ivory">
          {formatRange(estimate.low, estimate.high)}
        </p>
      </div>
      <a href="#kitchen-controls" className="text-xs font-semibold text-gold-deep">
        Options ↓
      </a>
    </div>
  );

  return (
    <div id="tool" className="section scroll-mt-28 !py-8 sm:!py-10">
      <div className="container-wide">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setStep("style")}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              step === "style"
                ? "border-gold bg-gold/10 text-gold-deep"
                : "border-border text-text-muted hover:border-gold/40"
            }`}
          >
            1 · Choose style
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
            {kitchenStyles.length} luxury styles · live estimate
          </span>
        </div>

        {step === "style" ? (
          <div>
            <h2 className="font-display text-3xl text-ivory sm:text-4xl">
              Choose your kitchen style
            </h2>
            <p className="mt-2 max-w-2xl text-text-muted">
              Twelve high-end looks photographed for inspiration. Pick a starting canvas — then swap
              counters, backsplash, island, and hardware with a live planning estimate.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {kitchenStyles.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => pickStyle(s.id)}
                  className={`card card-hover group overflow-hidden p-0 text-left transition ${
                    sel.styleId === s.id ? "ring-2 ring-gold" : ""
                  }`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-bg-soft">
                    <SmartImage
                      src={s.heroImage}
                      alt={`${s.name} luxury kitchen inspiration`}
                      fill
                      className="transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <span className="absolute bottom-2 left-2 right-2 font-display text-lg text-white drop-shadow sm:text-xl">
                      {s.name}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-text-muted line-clamp-2 sm:text-sm">{s.tagline}</p>
                    <span className="mt-2 inline-block text-xs text-gold-deep sm:text-sm">
                      Select this style →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <StudioWorkspace
            mobileEstimateBar={mobileBar}
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
                    Live materials
                  </button>
                </div>

                {viewMode === "photo" ? (
                  <>
                    <SmartImage
                      src={style.heroImage}
                      alt={`${style.name} luxury kitchen`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 70vw"
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full bg-white/92 px-3 py-1 text-xs font-medium text-ivory shadow-sm backdrop-blur">
                        {style.name}
                      </span>
                      <span className="rounded-full bg-white/85 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.12em] text-text-dim shadow-sm backdrop-blur">
                        Inspiration photo
                      </span>
                    </div>
                  </>
                ) : (
                  <KitchenScene selections={sel} compact />
                )}
              </div>
            }
            modelFooter={
              <>
                <p className="text-sm text-text-muted">
                  {style.description}{" "}
                  {viewMode === "photo" ? (
                    <button
                      type="button"
                      className="text-gold-deep hover:underline"
                      onClick={() => setViewMode("configurator")}
                    >
                      Switch to live material preview →
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
                    Explore other styles
                  </p>
                  <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                    {kitchenStyles.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => pickStyle(s.id)}
                        className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border transition sm:h-16 sm:w-28 ${
                          s.id === sel.styleId
                            ? "border-gold ring-1 ring-gold"
                            : "border-border opacity-90 hover:opacity-100"
                        }`}
                        title={s.name}
                      >
                        <SmartImage src={s.heroImage} alt={s.name} fill sizes="112px" />
                        <span className="absolute inset-x-0 bottom-0 bg-black/55 px-1 py-0.5 text-[0.55rem] text-white">
                          {s.name.split(" ")[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            }
            estimate={estimateBlock}
            controls={
              <div id="kitchen-controls" className="scroll-mt-36 space-y-2">
                <div className="studio-control-group flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.12em] text-text-dim">Style</p>
                    <p className="font-display text-lg text-ivory">{style.name}</p>
                  </div>
                  <button
                    type="button"
                    className="text-xs font-semibold text-gold-deep hover:underline"
                    onClick={() => setStep("style")}
                  >
                    Change
                  </button>
                </div>

                <StudioControlGroup label="Countertops">
                  {countertops.map((c) => (
                    <StudioChip
                      key={c.id}
                      active={sel.counter === c.id}
                      onClick={() => patch("counter", c.id as CounterId)}
                      swatch={c.swatch}
                    >
                      {c.label}
                    </StudioChip>
                  ))}
                </StudioControlGroup>

                <StudioControlGroup label="Backsplash">
                  {backsplashes.map((b) => (
                    <StudioChip
                      key={b.id}
                      active={sel.backsplash === b.id}
                      onClick={() => patch("backsplash", b.id as BacksplashId)}
                    >
                      {b.label}
                    </StudioChip>
                  ))}
                </StudioControlGroup>

                <StudioControlGroup label="Island">
                  {islands.map((i) => (
                    <StudioChip
                      key={i.id}
                      active={sel.island === i.id}
                      onClick={() => patch("island", i.id as IslandId)}
                    >
                      {i.label}
                    </StudioChip>
                  ))}
                </StudioControlGroup>

                <StudioControlGroup label="Hardware & fixtures">
                  {hardwareFinishes.map((h) => (
                    <StudioChip
                      key={h.id}
                      active={sel.hardware === h.id}
                      onClick={() => patch("hardware", h.id as HardwareId)}
                      swatch={h.metal}
                    >
                      {h.label}
                    </StudioChip>
                  ))}
                </StudioControlGroup>

                <StudioControlGroup label="Cabinet tone">
                  {cabinetTones.map((c) => (
                    <StudioChip
                      key={c.id}
                      active={sel.cabinetTone === c.id}
                      onClick={() => patch("cabinetTone", c.id as CabinetToneId)}
                      swatch={c.color ?? style.cabinet}
                    >
                      {c.label}
                    </StudioChip>
                  ))}
                </StudioControlGroup>

                <ToolLeadGate
                  tool="kitchen-studio"
                  title="Unlock your Kitchen Vision Summary"
                  description="Get a mood board of your selections, planning estimate range, and next-step checklist emailed to you."
                  summaryPayload={summaryPayload}
                />

                <div className="flex flex-wrap gap-2 pt-1">
                  <Link href="/start" className="btn btn-primary !px-4 !py-2.5 text-xs">
                    Schedule a consultation
                  </Link>
                  <Link
                    href="/transformations/kitchens"
                    className="btn btn-secondary !px-4 !py-2.5 text-xs"
                  >
                    How we build kitchens
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
