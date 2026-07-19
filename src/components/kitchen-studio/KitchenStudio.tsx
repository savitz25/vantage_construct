"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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
    setStep("customize");
  }

  function patch<K extends keyof KitchenSelections>(key: K, value: KitchenSelections[K]) {
    setSel((prev) => ({ ...prev, [key]: value }));
    trackKitchenEvent("feature_changed", { feature: key, value: String(value) });
  }

  const summaryPayload = {
    ...sel,
    styleName: style.name,
    estimate,
  };

  return (
    <div id="tool" className="section scroll-mt-28 pt-6 sm:pt-8">
      <div className="container-wide">
        {/* Step tabs */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
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
            {kitchenStyles.length} designer styles · live estimate
          </span>
        </div>

        {step === "style" ? (
          <div>
            <h2 className="font-display text-3xl text-ivory sm:text-4xl">
              Choose your kitchen style
            </h2>
            <p className="mt-2 max-w-2xl text-text-muted">
              Twelve curated high-end looks. Pick a starting canvas — then swap counters, backsplash,
              island, and hardware live.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {kitchenStyles.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => pickStyle(s.id)}
                  className={`card card-hover overflow-hidden p-0 text-left transition ${
                    sel.styleId === s.id ? "ring-2 ring-gold" : ""
                  }`}
                >
                  <div
                    className="aspect-[16/10] relative"
                    style={{
                      background: `linear-gradient(145deg, ${s.wall} 0%, ${s.cabinet} 55%, ${s.floor} 100%)`,
                    }}
                  >
                    <div
                      className="absolute bottom-3 left-3 right-3 h-6 rounded-sm opacity-90"
                      style={{ background: s.cabinetDoor }}
                    />
                    <div
                      className="absolute bottom-9 left-6 right-6 h-2 rounded-sm"
                      style={{ background: "#f0ebe4" }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-xl text-ivory">{s.name}</h3>
                    <p className="mt-1 text-xs text-text-muted line-clamp-2">{s.tagline}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              <KitchenScene selections={sel} />

              {/* Portfolio proof strip — gradient placeholders by style tags */}
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
                  Style inspiration · {style.name}
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  {style.description} Real Vantage project photography can be tagged here by style.
                </p>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {style.portfolioTags.map((tag, i) => (
                    <div
                      key={tag}
                      className="h-20 w-32 shrink-0 rounded-lg border border-border"
                      style={{
                        background: `linear-gradient(${120 + i * 40}deg, ${style.cabinet}, ${style.wall}, ${style.floor})`,
                      }}
                      title={`Portfolio: ${tag}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {/* Estimate pill */}
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

              {/* Style re-pick */}
              <div className="card p-5">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs text-text-dim">Style</p>
                    <p className="font-display text-xl text-ivory">{style.name}</p>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-gold-deep hover:underline"
                    onClick={() => setStep("style")}
                  >
                    Change
                  </button>
                </div>
              </div>

              <FeatureGroup label="Countertops">
                {countertops.map((c) => (
                  <Chip
                    key={c.id}
                    active={sel.counter === c.id}
                    onClick={() => patch("counter", c.id as CounterId)}
                    swatch={c.swatch}
                  >
                    {c.label}
                  </Chip>
                ))}
              </FeatureGroup>

              <FeatureGroup label="Backsplash">
                {backsplashes.map((b) => (
                  <Chip
                    key={b.id}
                    active={sel.backsplash === b.id}
                    onClick={() => patch("backsplash", b.id as BacksplashId)}
                  >
                    {b.label}
                  </Chip>
                ))}
              </FeatureGroup>

              <FeatureGroup label="Island">
                {islands.map((i) => (
                  <Chip
                    key={i.id}
                    active={sel.island === i.id}
                    onClick={() => patch("island", i.id as IslandId)}
                  >
                    {i.label}
                  </Chip>
                ))}
              </FeatureGroup>

              <FeatureGroup label="Hardware & fixtures">
                {hardwareFinishes.map((h) => (
                  <Chip
                    key={h.id}
                    active={sel.hardware === h.id}
                    onClick={() => patch("hardware", h.id as HardwareId)}
                    swatch={h.metal}
                  >
                    {h.label}
                  </Chip>
                ))}
              </FeatureGroup>

              <FeatureGroup label="Cabinet tone">
                {cabinetTones.map((c) => (
                  <Chip
                    key={c.id}
                    active={sel.cabinetTone === c.id}
                    onClick={() => patch("cabinetTone", c.id as CabinetToneId)}
                    swatch={c.color ?? style.cabinet}
                  >
                    {c.label}
                  </Chip>
                ))}
              </FeatureGroup>

              <ToolLeadGate
                tool="kitchen-studio"
                title="Unlock your Kitchen Vision Summary"
                description="Get a mood board of your selections, planning estimate range, and next-step checklist emailed to you."
                summaryPayload={summaryPayload}
              />

              <div className="flex flex-wrap gap-3">
                <Link href="/start" className="btn btn-primary">
                  Schedule a consultation
                </Link>
                <Link href="/transformations/kitchens" className="btn btn-secondary">
                  Learn how we build kitchens
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
