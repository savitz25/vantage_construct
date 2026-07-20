"use client";

import { useMemo, useState } from "react";
import { trackRealtorEvent } from "@/lib/realtors/analytics";
import { realtorTermsNote } from "@/lib/realtors/content";
import { calculateCommission, formatUsd } from "@/lib/realtors/model";

export function CommissionCalculator() {
  const [landPrice, setLandPrice] = useState(150000);
  const [buildCost, setBuildCost] = useState(700000);
  const [yearly, setYearly] = useState(2);

  const result = useMemo(
    () => calculateCommission({ landPrice, buildCost, yearlyPackages: yearly }),
    [landPrice, buildCost, yearly],
  );

  return (
    <section id="commission-calculator" className="section scroll-mt-28">
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">Interactive commission calculator</p>
          <h2 className="mt-3 font-display text-4xl text-ivory sm:text-5xl">
            See the double-dip math on your numbers
          </h2>
          <p className="mt-4 text-text-muted">
            Plug in a land price and build cost. Watch land-only commission transform into a package
            opportunity — and model yearly impact if you convert just a few listings.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="card space-y-8 p-6 sm:p-8">
            <Slider
              label="Land / listing price"
              value={landPrice}
              min={75000}
              max={2000000}
              step={5000}
              display={formatUsd(landPrice)}
              onChange={(v) => {
                setLandPrice(v);
                trackRealtorEvent("land_price_changed", { value: v });
              }}
            />
            <Slider
              label="Estimated custom home / build cost"
              value={buildCost}
              min={250000}
              max={3500000}
              step={10000}
              display={formatUsd(buildCost)}
              onChange={(v) => {
                setBuildCost(v);
                trackRealtorEvent("build_cost_changed", { value: v });
              }}
            />
            <Slider
              label="Packages you could convert this year"
              value={yearly}
              min={1}
              max={6}
              step={1}
              display={String(yearly)}
              minLabel="1"
              maxLabel="6"
              onChange={(v) => {
                setYearly(v);
                trackRealtorEvent("yearly_packages_changed", { value: v });
              }}
            />
            <p className="text-xs leading-relaxed text-text-dim">*{realtorTermsNote}</p>
          </div>

          <div className="space-y-4">
            <div className="card grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
              <Stat label="Land-only commission (ex. 5%)" value={formatUsd(result.landCommission)} />
              <Stat
                label="Package path (ex. 3% of land + build)"
                value={formatUsd(result.packageCommission)}
                accent
              />
              <Stat label="Uplift vs land-only" value={`+${formatUsd(result.uplift)}`} />
            </div>

            <div className="card border-gold/40 bg-gradient-to-br from-[#fffdf8] to-[#f7f0e4] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
                Payment timing — your differentiator
              </p>
              <h3 className="mt-2 font-display text-3xl text-ivory">
                Paid at land closing + framing
              </h3>
              <p className="mt-3 text-text-muted">
                Land commission at closing. Build / package commission when construction begins
                (framing) — <strong className="text-ivory">not</strong> waiting for Certificate of
                Occupancy.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-text-dim">At land closing</p>
                  <p className="mt-1 font-display text-2xl text-ivory">
                    {formatUsd(result.landCommission)}
                  </p>
                  <p className="text-xs text-text-dim">Illustrative land-side earnings timing</p>
                </div>
                <div className="rounded-xl border border-border bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-text-dim">At framing</p>
                  <p className="mt-1 font-display text-2xl text-gold-deep">
                    {formatUsd(Math.max(0, result.packageCommission - result.landCommission))}
                  </p>
                  <p className="text-xs text-text-dim">
                    Illustrative remaining package fee timing (deal-specific)
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
                Yearly impact
              </p>
              <p className="mt-2 font-display text-3xl text-ivory">
                {formatUsd(result.yearlyCustom)}
              </p>
              <p className="mt-2 text-text-muted">
                If you convert <strong className="text-ivory">{yearly}</strong> similar package
                {yearly === 1 ? "" : "s"} this year (illustrative). Two packages ≈{" "}
                {formatUsd(result.yearlyAtTwo)}; three ≈ {formatUsd(result.yearlyAtThree)}.
              </p>
              <p className="mt-3 text-sm text-text-dim">
                Package total modeled: {formatUsd(result.packageTotal)} · ~{result.upliftMultiple}×
                land-only
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
  minLabel,
  maxLabel,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
  minLabel?: string;
  maxLabel?: string;
}) {
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <label className="text-sm font-medium text-ivory">{label}</label>
        <span className="font-display text-2xl text-gold-deep">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[#c4a035]"
        aria-label={label}
      />
      <div className="mt-1 flex justify-between text-[0.65rem] text-text-dim">
        <span>{minLabel ?? formatUsd(min)}</span>
        <span>{maxLabel ?? formatUsd(max)}</span>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-text-dim">{label}</p>
      <p className={`mt-2 font-display text-2xl ${accent ? "text-gold-deep" : "text-ivory"}`}>
        {value}
      </p>
    </div>
  );
}
