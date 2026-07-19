"use client";

import type { CostEstimate } from "@/lib/cost-studio/types";
import { formatUsd } from "@/lib/cost-studio/model";

const colors: Record<string, string> = {
  structure: "#b8893d",
  foundation: "#8a6a3a",
  exterior: "#6b8f9a",
  garage: "#7d6b58",
  addons: "#5f8a58",
  "site-path": "#8a5c4a",
};

export function CostBreakdown({ estimate }: { estimate: CostEstimate }) {
  const total = estimate.lines.reduce((s, l) => s + l.amount, 0) || 1;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-2xl text-ivory">Where the investment goes</h3>
        <p className="mt-1 text-sm text-text-muted">
          Conceptual mid-range allocation — not a contractor invoice. Final line items are set in
          Design & Discovery.
        </p>
      </div>

      {/* Stacked bar */}
      <div className="flex h-4 overflow-hidden rounded-full border border-border bg-bg-elevated">
        {estimate.lines.map((line) => (
          <div
            key={line.id}
            title={`${line.label}: ${formatUsd(line.amount)}`}
            style={{
              width: `${(line.amount / total) * 100}%`,
              background: colors[line.category] || "#b8893d",
            }}
          />
        ))}
      </div>

      <ul className="space-y-3">
        {estimate.lines.map((line) => {
          const pct = Math.round((line.amount / total) * 100);
          return (
            <li key={line.id} className="flex items-center gap-3">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ background: colors[line.category] || "#b8893d" }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="truncate text-sm text-ivory">{line.label}</p>
                  <p className="shrink-0 text-sm font-medium text-gold-deep">
                    {formatUsd(line.amount)}
                  </p>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-bg-elevated">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: colors[line.category] || "#b8893d",
                    }}
                  />
                </div>
              </div>
              <span className="w-10 text-right text-xs text-text-dim">{pct}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
