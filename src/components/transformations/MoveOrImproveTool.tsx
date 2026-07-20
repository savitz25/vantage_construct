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
import { ToolResetButton } from "@/components/tools/ToolResetButton";
import { ToolLeadGate } from "./ToolLeadGate";

type Step = 1 | 2 | 3;

const DEFAULT_MISSING: MissingNeed[] = ["primary-suite"];

export function MoveOrImproveTool() {
  const [step, setStep] = useState<Step>(1);
  const [currentValue, setCurrentValue] = useState(1200000);
  const [targetBuy, setTargetBuy] = useState(1600000);
  const [missing, setMissing] = useState<MissingNeed[]>(DEFAULT_MISSING);
  const [additionBudget, setAdditionBudget] = useState<number | null>(null);

  function handleReset() {
    setStep(1);
    setCurrentValue(1200000);
    setTargetBuy(1600000);
    setMissing([...DEFAULT_MISSING]);
    setAdditionBudget(null);
    trackTransformEvent("move-or-improve", "tool_reset");
  }

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

  const inputs = (
    <div className="card space-y-6 p-5 sm:p-8">
      {/* Mobile step chrome */}
      <div className="flex gap-2 lg:hidden" role="tablist" aria-label="Calculator steps">
        {(
          [
            { n: 1 as Step, label: "Values" },
            { n: 2 as Step, label: "Needs" },
            { n: 3 as Step, label: "Results" },
          ] as const
        ).map((s) => (
          <button
            key={s.n}
            type="button"
            role="tab"
            aria-selected={step === s.n}
            onClick={() => setStep(s.n)}
            className={`min-h-11 flex-1 rounded-full border px-2 text-xs font-semibold transition ${
              step === s.n
                ? "border-navy bg-navy text-on-navy"
                : "border-border text-text-muted"
            }`}
          >
            {s.n} · {s.label}
          </button>
        ))}
      </div>

      {/* Step 1: values — always on desktop */}
      <div className={`space-y-6 ${step === 1 ? "block" : "hidden lg:block"}`}>
        <p className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep lg:block">
          Step 1 · Home values
        </p>
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
        <button
          type="button"
          className="btn btn-primary min-h-12 w-full lg:hidden"
          onClick={() => setStep(2)}
        >
          Next: What&apos;s missing →
        </button>
      </div>

      {/* Step 2: needs */}
      <div className={`space-y-6 ${step === 2 ? "block" : "hidden lg:block"}`}>
        <p className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep lg:block">
          Step 2 · What&apos;s missing
        </p>
        <div>
          <p className="text-sm font-medium text-ivory">What&apos;s missing today?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {needChips.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => toggleNeed(c.id)}
                className={`min-h-11 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
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
        <div className="flex gap-2 lg:hidden">
          <button
            type="button"
            className="btn btn-secondary min-h-12 flex-1"
            onClick={() => setStep(1)}
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-primary min-h-12 flex-1"
            onClick={() => setStep(3)}
          >
            See results →
          </button>
        </div>
      </div>

      <p className={`text-xs text-text-dim ${step === 3 ? "hidden lg:block" : ""}`}>
        *{taxDisclaimer}
      </p>
    </div>
  );

  const results = (
    <div className={`space-y-4 ${step === 3 ? "block" : "hidden lg:block"}`}>
      {/* Sticky summary on mobile results */}
      <div
        className={`card p-5 sm:p-6 ${
          result.favorsImprove ? "border-emerald-500/40" : "border-border"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
          Your comparison
        </p>
        <h3 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">
          {result.favorsImprove
            ? `Improving looks ~${formatUsd(result.savingsVsMove)} smarter`
            : "Compare carefully — inputs are close"}
        </h3>
        <p className="mt-2 text-sm text-text-muted">
          Selling in NJ layers commissions and transfer costs. Improving keeps your rate,
          neighborhood, and equity working for you.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card border-red-300/40 p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-800/80">
            Cost of moving
          </p>
          <p className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
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
        <div className="card border-emerald-500/30 p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800/80">
            Cost of improving
          </p>
          <p className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
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

      <div className="card p-5 sm:p-6">
        <p className="text-sm font-medium text-ivory">What&apos;s next?</p>
        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
          <Link href="/start" className="btn btn-primary min-h-12 w-full sm:w-auto">
            Talk through my options
          </Link>
          <Link
            href="/transformations/additions"
            className="btn btn-secondary min-h-12 w-full sm:w-auto"
          >
            Explore additions
          </Link>
          <Link
            href="/custom-homes/rebuilds"
            className="btn btn-secondary min-h-12 w-full sm:w-auto"
          >
            Consider rebuild
          </Link>
          <Link href="/studios" className="btn btn-secondary min-h-12 w-full sm:w-auto">
            Open Studios
          </Link>
        </div>
        <button
          type="button"
          className="mt-4 text-sm font-semibold text-gold-deep underline-offset-2 hover:underline lg:hidden"
          onClick={() => setStep(1)}
        >
          ← Adjust my numbers
        </button>
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
  );

  return (
    <div id="tool" className="section scroll-mt-28 !py-6 sm:!py-8">
      <div className="container-wide">
        <div className="mb-4 flex justify-end">
          <ToolResetButton onReset={handleReset} />
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
          <div className="space-y-4">{inputs}</div>
          <div>{results}</div>
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
        className="mt-4 h-2 w-full cursor-pointer accent-[#c4a035]"
        style={{ minHeight: "2rem" }}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
