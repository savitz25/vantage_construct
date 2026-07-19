"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { trackTransformEvent } from "@/lib/transformations/analytics";
import {
  aduTypes,
  calculateAduPayback,
  countyRents,
  formatUsd,
  townAduStatus,
  type AduType,
  type AduUse,
  type CountyId,
} from "@/lib/transformations/adu-payback";
import { estimateDisclaimer, rentDisclaimer } from "@/lib/transformations/disclaimers";
import { ToolLeadGate } from "./ToolLeadGate";

export function AduPaybackTool() {
  const [type, setType] = useState<AduType>("detached");
  const [use, setUse] = useState<AduUse>("rental");
  const [county, setCounty] = useState<CountyId>("somerset");
  const [rent, setRent] = useState(countyRents.somerset.rent);
  const [town, setTown] = useState("Warren");

  useEffect(() => {
    trackTransformEvent("adu-payback", "tool_started");
  }, []);

  useEffect(() => {
    setRent(countyRents[county].rent);
  }, [county]);

  const result = useMemo(
    () => calculateAduPayback({ type, use, county, rentOverride: rent }),
    [type, use, county, rent],
  );

  const maxAbs = Math.max(...result.cashFlow10.map((v) => Math.abs(v)), 1);
  const zoning = townAduStatus[town];

  return (
    <div id="tool" className="section scroll-mt-28 pt-6 sm:pt-8">
      <div className="container-wide grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-ivory">ADU type</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {aduTypes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className={`card p-4 text-left ${type === t.id ? "border-gold ring-2 ring-gold/30" : ""}`}
                >
                  <p className="font-display text-xl text-ivory">{t.label}</p>
                  <p className="mt-1 text-xs text-text-muted">{t.blurb}</p>
                  <p className="mt-2 text-sm text-gold-deep">From ~{formatUsd(t.baseCost)}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="card space-y-5 p-6">
            <div>
              <p className="text-sm font-medium text-ivory">Intended use</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(
                  [
                    ["rental", "Rental income"],
                    ["multigen", "Multi-gen family"],
                    ["guest", "Guest / office"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setUse(id)}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      use === id
                        ? "border-gold bg-gold/10 text-gold-deep"
                        : "border-border text-text-muted"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-ivory">County (rent preset)</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(Object.keys(countyRents) as CountyId[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCounty(c)}
                    className={`rounded-full border px-3 py-1.5 text-xs capitalize ${
                      county === c
                        ? "border-gold bg-gold/10 text-gold-deep"
                        : "border-border text-text-muted"
                    }`}
                  >
                    {countyRents[c].label}
                  </button>
                ))}
              </div>
            </div>

            {use === "rental" ? (
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-ivory">Monthly rent</span>
                  <span className="text-gold-deep">{formatUsd(rent)}</span>
                </div>
                <input
                  type="range"
                  min={1200}
                  max={4000}
                  step={50}
                  value={rent}
                  onChange={(e) => setRent(Number(e.target.value))}
                  className="mt-2 w-full accent-[#b8893d]"
                />
              </div>
            ) : null}

            <div>
              <p className="text-sm font-medium text-ivory">Can I build an ADU in my town?</p>
              <select
                className="select mt-2"
                value={town}
                onChange={(e) => setTown(e.target.value)}
              >
                {Object.keys(townAduStatus).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {zoning ? (
                <p className="mt-2 rounded-lg border border-border bg-bg-elevated p-3 text-xs text-text-muted">
                  <strong className="text-ivory capitalize">{zoning.status}</strong> — {zoning.note}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.14em] text-text-dim">Build cost (planning)</p>
            <p className="font-display text-4xl text-ivory">{formatUsd(result.buildCost)}</p>
            {use === "rental" ? (
              <>
                <p className="mt-4 text-text-muted">
                  Pays for itself in about{" "}
                  <strong className="text-ivory">
                    {result.breakEvenYears < 50 ? `${result.breakEvenYears} years` : "—"}
                  </strong>
                  , then ~{formatUsd(result.monthlyNet)}/mo net (illustrative).
                </p>
                <p className="mt-2 text-sm text-text-dim">
                  Rent {formatUsd(result.monthlyRent)} − op-ex ~20% → net{" "}
                  {formatUsd(result.monthlyNet)}/mo
                </p>
              </>
            ) : (
              <p className="mt-4 text-text-muted">
                Multi-gen / guest path: est. value add ~{formatUsd(result.valueAdd)} (industry-style
                planning figure).
              </p>
            )}

            {use === "rental" ? (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.12em] text-gold-deep">
                  10-year cumulative cash flow
                </p>
                <div className="mt-3 flex h-36 items-end gap-1">
                  {result.cashFlow10.map((v, i) => {
                    const h = Math.max(8, (Math.abs(v) / maxAbs) * 100);
                    return (
                      <div key={i} className="flex flex-1 flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t"
                          style={{
                            height: `${h}%`,
                            background: v >= 0 ? "#5f8a58" : "#c45c4a",
                          }}
                          title={`Year ${i + 1}: ${formatUsd(v)}`}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-1 flex justify-between text-[0.6rem] text-text-dim">
                  <span>Y1</span>
                  <span>Y10</span>
                </div>
              </div>
            ) : null}

            <p className="mt-4 text-xs text-text-dim">
              *{estimateDisclaimer} {rentDisclaimer}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/start" className="btn btn-primary">
                Schedule a consultation
              </Link>
              <Link href="/custom-homes/adus" className="btn btn-secondary">
                Learn how we build ADUs
              </Link>
              {result.planSlug ? (
                <Link href={`/available-homes/${result.planSlug}`} className="btn btn-secondary">
                  View cottage plan
                </Link>
              ) : null}
            </div>
          </div>

          <ToolLeadGate
            tool="adu-payback"
            title="Get the ADU Feasibility Guide"
            description="Payback assumptions, zoning next steps, and lot evaluation checklist."
            summaryPayload={{ type, use, county, rent, result }}
          />
        </div>
      </div>
    </div>
  );
}
