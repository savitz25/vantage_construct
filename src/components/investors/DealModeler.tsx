"use client";

import { useMemo, useState } from "react";
import { trackInvestorEvent } from "@/lib/investors/analytics";
import { illustrativeAssumptions, investorDisclaimer } from "@/lib/investors/content";
import { formatUsd, modelStructures, type StructureId } from "@/lib/investors/model";
import { ToolResetButton } from "@/components/tools/ToolResetButton";

const structureAccent: Record<StructureId, string> = {
  loan: "#c4a035",
  equity: "#4f7d52",
  hybrid: "#3d4f73",
};

export function DealModeler() {
  const a = illustrativeAssumptions;
  const [investment, setInvestment] = useState<number>(a.defaultInvestment);
  const [holdMonths, setHoldMonths] = useState<number>(a.defaultHoldMonths);
  const [projectCost, setProjectCost] = useState<number>(a.defaultProjectCost);

  function handleReset() {
    setInvestment(a.defaultInvestment);
    setHoldMonths(a.defaultHoldMonths);
    setProjectCost(a.defaultProjectCost);
    trackInvestorEvent("deal_modeler_reset");
  }

  const outcomes = useMemo(
    () => modelStructures({ investment, holdMonths, projectCost }),
    [investment, holdMonths, projectCost],
  );

  const maxTotal = Math.max(...outcomes.map((o) => o.totalReturned), 1);

  return (
    <section id="deal-modeler" className="section scroll-mt-28">
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">Interactive deal modeler</p>
          <h2 className="mt-3 font-display text-4xl text-ivory sm:text-5xl">
            Compare loan, equity & hybrid — side by side
          </h2>
          <p className="mt-4 text-text-muted">
            Adjust the controls to explore how structures can differ on one{" "}
            <strong className="text-ivory">illustrative</strong> project. This is an educational
            tool, not an offer or performance projection.
          </p>
          <div className="mt-5 flex justify-center">
            <ToolResetButton onReset={handleReset} />
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-amber-700/30 bg-amber-50/80 px-5 py-4 text-sm text-amber-950">
          <strong>Illustrative scenario only.</strong> Not an offer to sell or solicitation. Rates,
          splits, and outcomes vary by project and are established in written agreements. Past
          performance does not guarantee future results.
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="card space-y-8 p-6 sm:p-8">
            <Control
              label="Investment amount"
              valueLabel={formatUsd(investment)}
              minLabel={formatUsd(a.minInvestment)}
              maxLabel={formatUsd(a.maxInvestment)}
              min={a.minInvestment}
              max={a.maxInvestment}
              step={25000}
              value={investment}
              onChange={(v) => {
                setInvestment(v);
                trackInvestorEvent("investment_amount_changed", { value: v });
              }}
            />
            <Control
              label="Hold period"
              valueLabel={`${holdMonths} months`}
              minLabel="6 mo"
              maxLabel="36 mo"
              min={6}
              max={36}
              step={1}
              value={holdMonths}
              onChange={(v) => {
                setHoldMonths(v);
                trackInvestorEvent("hold_period_changed", { value: v });
              }}
            />
            <Control
              label="Illustrative project construction budget"
              valueLabel={formatUsd(projectCost)}
              minLabel={formatUsd(500000)}
              maxLabel={formatUsd(5000000)}
              min={500000}
              max={5000000}
              step={50000}
              value={projectCost}
              onChange={(v) => {
                setProjectCost(v);
                trackInvestorEvent("project_cost_changed", { value: v });
              }}
            />

            <div className="rounded-xl border border-border bg-bg-elevated p-4 text-xs leading-relaxed text-text-dim">
              <p className="font-semibold uppercase tracking-[0.14em] text-gold-deep">
                Placeholder assumptions (replace after Victor + counsel review)
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-4">
                <li>Loan preferred ~{(a.loanAnnualRate * 100).toFixed(0)}% annualized (illustrative)</li>
                <li>
                  Equity residual share ~{(a.equityProfitShare * 100).toFixed(0)}% of assumed margin
                  pool × capital share (illustrative)
                </li>
                <li>
                  Hybrid ~{(a.hybridPreferredRate * 100).toFixed(0)}% preferred +{" "}
                  {(a.hybridProfitKicker * 100).toFixed(0)}% kicker on residual (illustrative)
                </li>
                <li>
                  Assumed illustrative gross margin{" "}
                  {(a.illustrativeGrossProfitMargin * 100).toFixed(0)}% of project cost — not a
                  forecast
                </li>
              </ul>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {outcomes.map((o) => (
              <article
                key={o.id}
                className="card flex flex-col p-5"
                onMouseEnter={() =>
                  trackInvestorEvent("structure_compared", { structure: o.id })
                }
              >
                <p
                  className="text-xs font-semibold uppercase tracking-[0.16em]"
                  style={{ color: structureAccent[o.id] }}
                >
                  {o.label}
                </p>
                <p className="mt-3 text-[0.65rem] uppercase tracking-[0.12em] text-text-dim">
                  Illustrative total returned
                </p>
                <p className="font-display text-3xl text-ivory">{formatUsd(o.totalReturned)}</p>
                <p className="mt-1 text-sm text-gold-deep">
                  Earnings (illustrative): {formatUsd(o.earnings)}
                </p>
                <p className="mt-1 text-xs text-text-dim">
                  Simple annualized ~{o.simpleAnnualizedPct}% (educational metric only)
                </p>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-bg-elevated">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(o.totalReturned / maxTotal) * 100}%`,
                      background: structureAccent[o.id],
                    }}
                  />
                </div>

                <ul className="mt-4 flex-1 space-y-1.5 text-xs text-text-muted">
                  {o.notes.map((n) => (
                    <li key={n} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {n}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs leading-relaxed text-text-dim">*{investorDisclaimer}</p>
      </div>
    </section>
  );
}

function Control({
  label,
  valueLabel,
  minLabel,
  maxLabel,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  valueLabel: string;
  minLabel: string;
  maxLabel: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <label className="text-sm font-medium text-ivory">{label}</label>
        <span className="font-display text-2xl text-gold-deep">{valueLabel}</span>
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
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
