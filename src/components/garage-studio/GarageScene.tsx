"use client";

import { getDoor, getExterior } from "@/lib/garage-studio/options";
import { getPurpose } from "@/lib/garage-studio/purposes";
import type { GarageSelections } from "@/lib/garage-studio/types";

export function GarageScene({
  selections,
  compact = false,
}: {
  selections: GarageSelections;
  compact?: boolean;
}) {
  const purpose = getPurpose(selections.purposeId);
  const exterior = getExterior(selections.exterior);
  const door = getDoor(selections.door);
  const body = exterior.body || purpose.body;
  const roofColor = purpose.roof;
  const doorColor = door.color;
  const hasUpper = selections.livingAbove !== "none";
  const fullSuite = selections.livingAbove === "full-suite";
  const bays =
    selections.bays === "two-car" ? 2 : selections.bays === "four-car" || selections.bays === "oversized" ? 4 : 3;
  const wide = selections.bays === "four-car" || selections.bays === "oversized";
  const shed = selections.roof === "shed-modern";
  const hip = selections.roof === "hip";

  const buildingW = wide ? 520 : 400;
  const buildingX = (800 - buildingW) / 2;

  return (
    <div
      className={`relative overflow-hidden border border-border ${
        compact
          ? "mx-auto h-[min(260px,36vh)] w-full max-w-xl rounded-xl shadow-[0_12px_40px_rgba(40,30,15,0.1)] sm:h-[min(300px,38vh)]"
          : "rounded-2xl shadow-[0_20px_60px_rgba(40,30,15,0.12)]"
      }`}
      style={{ background: `linear-gradient(180deg, #dce8f0 0%, ${purpose.wall} 45%, #c4b8a4 100%)` }}
      aria-label={`${purpose.name} building preview`}
    >
      <svg
        viewBox="0 0 800 420"
        className={`w-full ${compact ? "h-full" : "h-auto"}`}
        role="img"
        preserveAspectRatio={compact ? "xMidYMid slice" : "xMidYMid meet"}
      >
        {/* Ground */}
        <rect x="0" y="320" width="800" height="100" fill="#9a9080" opacity="0.35" />
        <ellipse cx="400" cy="360" rx="280" ry="28" fill="#8a8070" opacity="0.25" />

        {/* Main house hint far left */}
        <rect x="40" y="200" width="90" height="120" fill="#d8d0c4" opacity="0.5" />
        <path d="M35 200 L85 155 L135 200" fill="#5c5348" opacity="0.45" />

        {/* Building body */}
        <rect
          x={buildingX}
          y={hasUpper ? 140 : 180}
          width={buildingW}
          height={hasUpper ? 180 : 140}
          fill={body}
          stroke={shade(body, -20)}
          strokeWidth="1"
        />

        {/* Upper floor windows */}
        {hasUpper ? (
          <>
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x={buildingX + 40 + i * (buildingW / 3.2)}
                y="155"
                width={fullSuite ? 48 : 36}
                height={fullSuite ? 42 : 28}
                rx="2"
                fill="#c5d8e8"
                stroke="#a8b8c4"
              />
            ))}
            {fullSuite ? (
              <rect
                x={buildingX + buildingW - 70}
                y="200"
                width="22"
                height="50"
                rx="2"
                fill={shade(body, -15)}
              />
            ) : null}
          </>
        ) : null}

        {/* Roof */}
        {shed ? (
          <path
            d={`M${buildingX - 10} ${hasUpper ? 150 : 190} L${buildingX + buildingW + 10} ${hasUpper ? 120 : 160} L${buildingX + buildingW + 10} ${hasUpper ? 145 : 185} L${buildingX - 10} ${hasUpper ? 175 : 215} Z`}
            fill={roofColor}
          />
        ) : hip ? (
          <path
            d={`M${buildingX - 8} ${hasUpper ? 148 : 188} L${buildingX + buildingW / 2} ${hasUpper ? 95 : 135} L${buildingX + buildingW + 8} ${hasUpper ? 148 : 188} L${buildingX + buildingW - 20} ${hasUpper ? 160 : 200} L${buildingX + 20} ${hasUpper ? 160 : 200} Z`}
            fill={roofColor}
          />
        ) : (
          <path
            d={`M${buildingX - 12} ${hasUpper ? 150 : 190} L${buildingX + buildingW / 2} ${hasUpper ? 90 : 130} L${buildingX + buildingW + 12} ${hasUpper ? 150 : 190} Z`}
            fill={roofColor}
          />
        )}

        {/* Garage doors */}
        {Array.from({ length: Math.min(bays, 4) }).map((_, i) => {
          const gap = 12;
          const doorW = (buildingW - gap * (bays + 1)) / bays;
          const x = buildingX + gap + i * (doorW + gap);
          const y = hasUpper ? 230 : 210;
          const h = hasUpper ? 85 : 100;
          return (
            <g key={i}>
              <rect x={x} y={y} width={doorW} height={h} rx="3" fill={doorColor} stroke={shade(doorColor, -25)} />
              {selections.door === "carriage" || selections.door === "wood-clad" ? (
                <>
                  <line x1={x + doorW / 2} y1={y} x2={x + doorW / 2} y2={y + h} stroke={shade(doorColor, -40)} />
                  <line x1={x} y1={y + h * 0.45} x2={x + doorW} y2={y + h * 0.45} stroke={shade(doorColor, -30)} />
                </>
              ) : (
                <>
                  {[0.25, 0.5, 0.75].map((t) => (
                    <line
                      key={t}
                      x1={x + 6}
                      y1={y + h * t}
                      x2={x + doorW - 6}
                      y2={y + h * t}
                      stroke="rgba(255,255,255,0.25)"
                    />
                  ))}
                </>
              )}
              {selections.door === "full-view" || selections.door === "modern-glass" ? (
                <rect
                  x={x + 8}
                  y={y + 8}
                  width={doorW - 16}
                  height={h - 16}
                  fill="#a8c0d4"
                  opacity="0.55"
                />
              ) : null}
            </g>
          );
        })}

        {/* Stone base accent */}
        {selections.exterior === "stone-accent" ? (
          <rect
            x={buildingX}
            y={hasUpper ? 300 : 290}
            width={buildingW}
            height={20}
            fill="#7a7268"
            opacity="0.85"
          />
        ) : null}

        {/* Side workshop wing hint */}
        {selections.workshop !== "none" ? (
          <rect
            x={buildingX + buildingW}
            y={hasUpper ? 200 : 220}
            width="70"
            height={hasUpper ? 120 : 100}
            fill={shade(body, -8)}
            stroke={shade(body, -25)}
          />
        ) : null}
      </svg>

      <div className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-white/92 px-2.5 py-1 text-xs font-medium text-ivory shadow-sm backdrop-blur">
          {purpose.lifestyleName}
        </span>
        <span className="rounded-full bg-white/85 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.12em] text-text-dim shadow-sm backdrop-blur">
          Live preview · concept
        </span>
      </div>
    </div>
  );
}

function shade(hex: string, amount: number): string {
  const raw = hex.replace("#", "");
  if (raw.length !== 6) return hex;
  const num = parseInt(raw, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0xff) + amount;
  let b = (num & 0xff) + amount;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
