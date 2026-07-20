"use client";

import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { siteCostFlags } from "@/lib/land/evaluation-content";

const LOT_W = 100; // feet (illustrative)
const LOT_D = 150;

function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

/**
 * Interactive buildable-envelope visualizer + optional site-cost flags.
 * Educational only — not a survey or official zoning determination.
 */
export function SetbackVisualizer() {
  const [front, setFront] = useState(40);
  const [rear, setRear] = useState(40);
  const [left, setLeft] = useState(15);
  const [right, setRight] = useState(15);
  const [flags, setFlags] = useState<string[]>([]);

  useEffect(() => {
    trackEvent("land_eval_tool_started", { event_category: "land_evaluation" });
  }, []);

  const metrics = useMemo(() => {
    const buildW = Math.max(0, LOT_W - left - right);
    const buildD = Math.max(0, LOT_D - front - rear);
    const buildable = buildW * buildD;
    const lotArea = LOT_W * LOT_D;
    const coveragePct = lotArea > 0 ? (buildable / lotArea) * 100 : 0;
    // Rough “house footprint” allowance inside envelope (not a code calc)
    const footprintHint = Math.round(buildable * 0.55);
    return { buildW, buildD, buildable, coveragePct, footprintHint, ok: buildW > 20 && buildD > 30 };
  }, [front, rear, left, right]);

  const costImpact = useMemo(() => {
    let low = 0;
    let high = 0;
    for (const f of siteCostFlags) {
      if (flags.includes(f.id)) {
        low += f.impactLow;
        high += f.impactHigh;
      }
    }
    return { low, high };
  }, [flags]);

  function onSetbackChange(
    which: "front" | "rear" | "left" | "right",
    value: number,
  ) {
    const setters = { front: setFront, rear: setRear, left: setLeft, right: setRight };
    setters[which](value);
    trackEvent("land_eval_setback_change", {
      event_category: "land_evaluation",
      which,
      value,
    });
  }

  function toggleFlag(id: string) {
    setFlags((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      trackEvent("land_eval_site_flag", {
        event_category: "land_evaluation",
        flag: id,
        on: !prev.includes(id),
      });
      return next;
    });
  }

  // SVG layout: lot maps to viewBox 0 0 400 520 with margin
  const pad = 36;
  const svgW = 400;
  const svgH = 520;
  const scaleX = (svgW - pad * 2) / LOT_W;
  const scaleY = (svgH - pad * 2) / LOT_D;
  const lotX = pad;
  const lotY = pad;
  const lotPw = LOT_W * scaleX;
  const lotPh = LOT_D * scaleY;
  const envX = lotX + left * scaleX;
  const envY = lotY + front * scaleY;
  const envW = Math.max(0, metrics.buildW * scaleX);
  const envH = Math.max(0, metrics.buildD * scaleY);

  return (
    <div id="feasibility-tool" className="scroll-mt-28">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        {/* Diagram */}
        <div className="card overflow-hidden p-0">
          <div className="border-b border-border bg-bg-elevated px-5 py-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
              Interactive · Buildable envelope
            </p>
            <p className="mt-1 text-sm text-text-muted">
              Illustrative {LOT_W}&apos; × {LOT_D}&apos; lot. Drag setbacks to see the envelope
              shrink — this is how zoning quietly decides your home.
            </p>
          </div>
          <div className="bg-[#f7f2ea] p-4 sm:p-6">
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="mx-auto h-auto w-full max-w-md"
              role="img"
              aria-label="Lot diagram with adjustable setbacks and buildable area"
            >
              {/* Street */}
              <rect x="0" y={svgH - 28} width={svgW} height="28" fill="#d4cdc2" />
              <text
                x={svgW / 2}
                y={svgH - 10}
                textAnchor="middle"
                fontSize="11"
                fill="#5a534a"
                fontFamily="system-ui,sans-serif"
              >
                STREET
              </text>

              {/* Lot */}
              <rect
                x={lotX}
                y={lotY}
                width={lotPw}
                height={lotPh}
                fill="#ebe4d6"
                stroke="#8f6a28"
                strokeWidth="2"
              />
              <text
                x={lotX + 8}
                y={lotY + 18}
                fontSize="10"
                fill="#857c70"
                fontFamily="system-ui,sans-serif"
              >
                Property line
              </text>

              {/* Setback wash (non-buildable) */}
              <rect
                x={lotX}
                y={lotY}
                width={lotPw}
                height={lotPh}
                fill="rgba(196,92,74,0.12)"
              />

              {/* Buildable envelope */}
              {envW > 2 && envH > 2 ? (
                <>
                  <rect
                    x={envX}
                    y={envY}
                    width={envW}
                    height={envH}
                    fill="rgba(95,138,88,0.35)"
                    stroke="#5f8a58"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                  />
                  <text
                    x={envX + envW / 2}
                    y={envY + envH / 2}
                    textAnchor="middle"
                    fontSize="13"
                    fill="#2f4a2c"
                    fontFamily="system-ui,sans-serif"
                    fontWeight="600"
                  >
                    Buildable
                  </text>
                  <text
                    x={envX + envW / 2}
                    y={envY + envH / 2 + 16}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#3d5c3a"
                    fontFamily="system-ui,sans-serif"
                  >
                    {Math.round(metrics.buildW)}&apos; × {Math.round(metrics.buildD)}&apos;
                  </text>
                </>
              ) : (
                <text
                  x={lotX + lotPw / 2}
                  y={lotY + lotPh / 2}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#c45c4a"
                  fontFamily="system-ui,sans-serif"
                  fontWeight="600"
                >
                  Envelope collapsed
                </text>
              )}

              {/* Dimension labels */}
              <text
                x={lotX + lotPw / 2}
                y={lotY + front * scaleY * 0.55}
                textAnchor="middle"
                fontSize="10"
                fill="#8f6a28"
                fontFamily="system-ui,sans-serif"
              >
                Front {front}&apos;
              </text>
              <text
                x={lotX + lotPw / 2}
                y={lotY + lotPh - rear * scaleY * 0.35}
                textAnchor="middle"
                fontSize="10"
                fill="#8f6a28"
                fontFamily="system-ui,sans-serif"
              >
                Rear {rear}&apos;
              </text>
            </svg>
          </div>
          <p className="border-t border-border px-5 py-3 text-[0.65rem] text-text-dim sm:px-6">
            Educational model only — not a survey, site plan, or official zoning determination.
            Real setbacks vary by municipality, zone, and lot conditions.
          </p>
        </div>

        {/* Controls */}
        <div className="space-y-5">
          <div className="card space-y-5 p-6">
            <div>
              <p className="studio-estimate-label">Live envelope</p>
              <p className="studio-estimate-range">
                {metrics.buildable.toLocaleString()} sf
              </p>
              <p className="studio-estimate-meta">
                Rough footprint room ~{metrics.footprintHint.toLocaleString()} sf ·{" "}
                {metrics.coveragePct.toFixed(0)}% of lot surface
              </p>
              {!metrics.ok ? (
                <p className="mt-2 rounded-md border border-red-300/50 bg-red-50 px-3 py-2 text-xs text-red-900">
                  These setbacks leave a tight or unusable envelope for most custom homes —
                  exactly the kind of surprise evaluation catches early.
                </p>
              ) : (
                <p className="mt-2 text-xs text-text-muted">
                  Green area is the theoretical buildable zone after yards. Height, coverage, and
                  other rules still apply.
                </p>
              )}
            </div>

            {(
              [
                ["front", "Front setback", front, 20, 60, setFront],
                ["rear", "Rear setback", rear, 20, 60, setRear],
                ["left", "Left side yard", left, 5, 30, setLeft],
                ["right", "Right side yard", right, 5, 30, setRight],
              ] as const
            ).map(([key, label, value, min, max]) => (
              <div key={key}>
                <div className="flex justify-between text-sm">
                  <span className="text-ivory">{label}</span>
                  <span className="text-gold-deep">{value} ft</span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={1}
                  value={value}
                  onChange={(e) =>
                    onSetbackChange(key, Number(e.target.value))
                  }
                  className="mt-2 w-full accent-[#b8893d]"
                />
              </div>
            ))}
          </div>

          <div className="card p-6">
            <p className="text-sm font-medium text-ivory">Hidden site-cost flags</p>
            <p className="mt-1 text-xs text-text-muted">
              Toggle common North Jersey conditions. Ranges are educational only.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {siteCostFlags.map((f) => {
                const on = flags.includes(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => toggleFlag(f.id)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition ${
                      on
                        ? "border-gold bg-gold/15 text-gold-deep"
                        : "border-border text-text-muted hover:border-gold/40"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
            {flags.length > 0 ? (
              <div className="mt-4 rounded-lg border border-border bg-bg-elevated p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-text-dim">
                  Potential site-prep impact
                </p>
                <p className="mt-1 font-display text-2xl text-ivory">
                  {formatUsd(costImpact.low)} – {formatUsd(costImpact.high)}
                </p>
                <p className="mt-2 text-xs text-text-muted">
                  Stack these on top of house construction — and on top of land price. A Vantage
                  evaluation turns flags into property-specific numbers.
                </p>
              </div>
            ) : (
              <p className="mt-3 text-xs text-text-dim">
                Select conditions you suspect. Leave blank if you&apos;re unsure — that&apos;s what
                the audit is for.
              </p>
            )}
          </div>

          <a href="#lot-audit" className="btn btn-primary w-full sm:w-auto">
            Request a Pre-Purchase Lot Audit
          </a>
        </div>
      </div>
    </div>
  );
}
