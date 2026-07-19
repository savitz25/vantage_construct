"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { trackTransformEvent } from "@/lib/transformations/analytics";
import {
  estimateDisclaimer,
  financingDisclaimer,
  taxDisclaimer,
} from "@/lib/transformations/disclaimers";
import {
  calculateMoveOrImprove,
  formatUsd,
  needChips,
  type MissingNeed,
} from "@/lib/transformations/move-or-improve";
import { ToolLeadGate } from "./ToolLeadGate";

export function MoveOrImproveTool() {
  const [currentValue, setCurrentValue] = useState(1200000);
  const [targetBuy, setTargetBuy] = useState(1600000);
  const [missing, setMissing] = useState<MissingNeed[]>(["primary-suite"]);
  const [additionBudget, setAdditionBudget] = useState<number | null>(null);

  const result = useMemo(
    () =>
      calculateMoveOrImprove({
        currentValue,
        targetBuyPrice: targetBuy,
        missing,
        additionBudgetOverride: additionBudget ?? undefined,
      }),
    [currentValue, targetBuy, missing, additionBudget],
  );

  useEffect(() => {
    trackTransformEvent("move-or-improve", "tool_started");
  }, []);

  useEffect(() => {
    trackTransformEvent("move-or-improve", "result_viewed", {
      favors: result.favorsImprove ? "improve" : "move",
    });
  }, [result.favorsImprove, result.move.totalCashOutlay, result.improve.netEffectiveCost]);

  function toggleNeed(id: MissingNeed) {
    setMissing((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
    setAdditionBudget(null);
  }

  return (
    <div id="tool" className="section scroll-mt-28 pt-6 sm:pt-8">
      <div className="container-wide grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <div className="card space-y-6 p-6 sm:p-8">
            <Slider
              label="Current home value"
              value={currentValue}
              min={500000}
              max={3000000}
              step={25000}
              display={formatUsd(currentValue)}
              onChange={setCurrentValue}
            />
            <Slider
              label="What would the “right” house cost to buy?"
              value={targetBuy}
              min={600000}
              max={4000000}
              step={25000}
              display={formatUsd(targetBuy)}
              onChange={setTargetBuy}
            />
            <div>
              <p className="text-sm font-medium text-ivory">What&apos;s missing today?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {needChips.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleNeed(c.id)}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      missing.includes(c.id)
                        ? "border-gold bg-gold/10 text-gold-deep"
                        : "border-border text-text-muted"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <Slider
              label="Improve budget (editable)"
              value={additionBudget ?? result.improve.additionBudget}
              min={50000}
              max={800000}
              step={5000}
              display={formatUsd(additionBudget ?? result.improve.additionBudget)}
              onChange={(v) => setAdditionBudget(v)}
            />
          </div>
          <p className="text-xs text-text-dim">*{taxDisclaimer}</p>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card border-red-300/40 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-800/80">
                Cost of moving
              </p>
              <p className="mt-2 font-display text-4xl text-ivory">
                {formatUsd(result.move.totalCashOutlay)}
              </p>
              <p className="mt-2 text-xs text-text-dim">Money that buys you nothing new at home</p>
              <ul className="mt-4 space-y-1.5 text-xs text-text-muted">
                <li>Commissions: {formatUsd(result.move.commission)}</li>
                <li>Est. base transfer fee: {formatUsd(result.move.baseRtf)}</li>
                <li>Est. Graduated Percent Fee: {formatUsd(result.move.gpf)}</li>
                <li>Moving: {formatUsd(result.move.movingCosts)}</li>
                <li>Buy-side closing: {formatUsd(result.move.buySideClosing)}</li>
                <li>Rate differential (5-yr framing): {formatUsd(result.move.rateDeltaAnnual * 5)}</li>
              </ul>
            </div>
            <div className="card border-emerald-500/30 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800/80">
                Cost of improving
              </p>
              <p className="mt-2 font-display text-4xl text-ivory">
                {formatUsd(result.improve.netEffectiveCost)}
              </p>
              <p className="mt-2 text-xs text-text-dim">Net effective after est. value add</p>
              <ul className="mt-4 space-y-1.5 text-xs text-text-muted">
                <li>Scope: {result.improve.scopeLabel}</li>
                <li>Addition budget: {formatUsd(result.improve.additionBudget)}</li>
                <li>
                  Value added (~{result.improve.recoupPct}% recoup avg):{" "}
                  {formatUsd(result.improve.valueAdded)}
                </li>
                <li>
                  Illustrative payment: ~{formatUsd(result.improve.monthlyPaymentIllustrative)}
                  /mo
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`card p-6 ${
              result.favorsImprove ? "border-emerald-500/40" : "border-border"
            }`}
          >
            <h3 className="font-display text-3xl text-ivory">
              {result.favorsImprove
                ? `Improving looks ~${formatUsd(result.savingsVsMove)} smarter`
                : "Compare carefully — inputs are close"}
            </h3>
            <p className="mt-2 text-text-muted">
              Selling in NJ layers commissions and transfer costs (including higher-value Graduated
              Percent Fee tiers). Improving keeps your rate, neighborhood, and equity working for
              you.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/start" className="btn btn-primary">
                Schedule a consultation
              </Link>
              <Link href="/transformations/additions" className="btn btn-secondary">
                Learn how we build additions
              </Link>
              <Link href="/custom-homes/rebuilds" className="btn btn-secondary">
                Or knockdown & rebuild
              </Link>
            </div>
            <p className="mt-4 text-xs text-text-dim">
              *{estimateDisclaimer} {financingDisclaimer}
            </p>
          </div>

          <ToolLeadGate
            tool="move-or-improve"
            title="Get the detailed Move vs Improve PDF"
            description="Itemized transaction costs, improve scope notes, and conversation checklist for North Jersey."
            summaryPayload={{ currentValue, targetBuy, missing, result }}
          />
        </div>
      </div>
    </div>
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
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <label className="text-sm font-medium text-ivory">{label}</label>
        <span className="font-display text-2xl text-gold-deep">{display}</span>
      </div>
      <input
        type="range"
        className="mt-3 w-full accent-[#b8893d]"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
