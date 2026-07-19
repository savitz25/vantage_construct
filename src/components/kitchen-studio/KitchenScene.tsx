"use client";

import { getCounter, getHardware, getCabinetTone } from "@/lib/kitchen-studio/options";
import { getStyle } from "@/lib/kitchen-studio/styles";
import type { KitchenSelections } from "@/lib/kitchen-studio/types";

/** Stylized editorial kitchen — all materials repaint from selections. */
export function KitchenScene({ selections }: { selections: KitchenSelections }) {
  const style = getStyle(selections.styleId);
  const counter = getCounter(selections.counter);
  const hardware = getHardware(selections.hardware);
  const tone = getCabinetTone(selections.cabinetTone);

  const cabinet = tone.color ?? style.cabinet;
  const cabinetDoor = tone.color
    ? shade(tone.color, -12)
    : style.cabinetDoor;
  const wall = style.wall;
  const floor = style.floor;
  const stone = counter.swatch;
  const stoneVein = counter.pattern ?? shade(stone, -15);
  const metal = hardware.metal;
  const hasIsland = selections.island !== "none";
  const isWaterfall = selections.island === "waterfall";
  const isOversized = selections.island === "oversized-seating";

  const splashFill =
    selections.backsplash === "full-slab"
      ? stone
      : selections.backsplash === "painted"
        ? wall
        : selections.backsplash === "zellige"
          ? "#c9d4c8"
          : selections.backsplash === "herringbone"
            ? "#e8e4de"
            : "#f2f0ec";

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border shadow-[0_20px_60px_rgba(40,30,15,0.12)]"
      style={{ background: wall }}
      aria-label={`${style.name} kitchen preview`}
    >
      <svg
        viewBox="0 0 800 520"
        className="h-auto w-full transition-colors duration-300"
        role="img"
      >
        <defs>
          <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={shade(floor, 10)} />
            <stop offset="100%" stopColor={shade(floor, -20)} />
          </linearGradient>
          <pattern id="subway" width="28" height="14" patternUnits="userSpaceOnUse">
            <rect width="27" height="13" fill={splashFill} stroke="#d0ccc4" strokeWidth="0.8" />
          </pattern>
          <pattern id="herring" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="10" height="20" fill={splashFill} />
            <rect x="10" width="10" height="20" fill={shade(splashFill, -8)} />
          </pattern>
          <pattern id="zellige" width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="15" height="15" fill={splashFill} opacity="0.95" />
            <rect x="1" y="1" width="13" height="13" fill="none" stroke={shade(splashFill, 20)} strokeWidth="0.5" opacity="0.5" />
          </pattern>
          <linearGradient id="stoneGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={stone} />
            <stop offset="45%" stopColor={stoneVein} stopOpacity="0.35" />
            <stop offset="100%" stopColor={stone} />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Room */}
        <rect x="0" y="0" width="800" height="360" fill={wall} />
        <rect x="0" y="360" width="800" height="160" fill="url(#floorGrad)" />
        {/* Floor perspective lines */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line
            key={i}
            x1={80 + i * 110}
            y1="360"
            x2={40 + i * 120}
            y2="520"
            stroke="rgba(0,0,0,0.04)"
            strokeWidth="1"
          />
        ))}

        {/* Window */}
        <rect x="300" y="48" width="200" height="130" rx="4" fill="#dce8f0" stroke="#c5d0d8" />
        <line x1="400" y1="48" x2="400" y2="178" stroke="#c5d0d8" />
        <line x1="300" y1="113" x2="500" y2="113" stroke="#c5d0d8" />
        <rect x="300" y="178" width="200" height="10" fill={cabinet} />

        {/* Upper cabinets left */}
        <g filter="url(#softShadow)">
          <rect x="40" y="70" width="230" height="110" rx="3" fill={cabinet} />
          <rect x="48" y="78" width="100" height="94" rx="2" fill={cabinetDoor} stroke={shade(cabinetDoor, -10)} />
          <rect x="162" y="78" width="100" height="94" rx="2" fill={cabinetDoor} stroke={shade(cabinetDoor, -10)} />
          <circle cx="140" cy="125" r="3" fill={metal} />
          <circle cx="170" cy="125" r="3" fill={metal} />
        </g>

        {/* Upper cabinets right */}
        <g filter="url(#softShadow)">
          <rect x="530" y="70" width="230" height="110" rx="3" fill={cabinet} />
          <rect x="538" y="78" width="100" height="94" rx="2" fill={cabinetDoor} stroke={shade(cabinetDoor, -10)} />
          <rect x="652" y="78" width="100" height="94" rx="2" fill={cabinetDoor} stroke={shade(cabinetDoor, -10)} />
          <circle cx="630" cy="125" r="3" fill={metal} />
          <circle cx="660" cy="125" r="3" fill={metal} />
        </g>

        {/* Range hood */}
        <path
          d="M340 185 L460 185 L440 240 L360 240 Z"
          fill={metal}
          opacity="0.92"
        />
        <rect x="372" y="240" width="56" height="8" rx="1" fill={shade(metal, -20)} />

        {/* Backsplash zone */}
        <rect
          x="40"
          y="250"
          width="720"
          height="70"
          fill={
            selections.backsplash === "subway"
              ? "url(#subway)"
              : selections.backsplash === "herringbone"
                ? "url(#herring)"
                : selections.backsplash === "zellige"
                  ? "url(#zellige)"
                  : splashFill
          }
        />
        {selections.backsplash === "full-slab" ? (
          <path
            d="M60 260 Q200 290 400 265 T740 280"
            fill="none"
            stroke={stoneVein}
            strokeWidth="1.2"
            opacity="0.4"
          />
        ) : null}

        {/* Lower run cabinets */}
        <g filter="url(#softShadow)">
          <rect x="40" y="320" width="720" height="100" fill={cabinet} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <rect
                x={52 + i * 118}
                y="328"
                width="108"
                height="84"
                rx="2"
                fill={cabinetDoor}
                stroke={shade(cabinetDoor, -12)}
              />
              <rect
                x={95 + i * 118}
                y="360"
                width="22"
                height="4"
                rx="1"
                fill={metal}
              />
            </g>
          ))}
        </g>

        {/* Countertop run */}
        <rect x="36" y="308" width="728" height="16" rx="1" fill="url(#stoneGrad)" />
        <rect x="36" y="320" width="728" height="4" fill={shade(stone, -18)} opacity="0.5" />

        {/* Sink + faucet */}
        <ellipse cx="200" cy="312" rx="36" ry="6" fill={shade(stone, -25)} opacity="0.5" />
        <path
          d="M200 300 C200 280 220 278 220 290"
          fill="none"
          stroke={metal}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="200" cy="300" r="5" fill={metal} />

        {/* Cooktop */}
        <rect x="370" y="300" width="60" height="14" rx="2" fill="#1a1a1a" />
        <circle cx="385" cy="307" r="4" fill="#333" />
        <circle cx="400" cy="307" r="4" fill="#333" />
        <circle cx="415" cy="307" r="4" fill="#333" />

        {/* Island */}
        {hasIsland ? (
          <g filter="url(#softShadow)">
            {/* Island body */}
            <rect
              x={isOversized ? 250 : 280}
              y="400"
              width={isOversized ? 300 : 240}
              height="70"
              rx="3"
              fill={cabinet}
            />
            <rect
              x={isOversized ? 260 : 290}
              y="408"
              width={isOversized ? 130 : 100}
              height="54"
              rx="2"
              fill={cabinetDoor}
            />
            <rect
              x={isOversized ? 410 : 400}
              y="408"
              width={isOversized ? 130 : 100}
              height="54"
              rx="2"
              fill={cabinetDoor}
            />
            <rect
              x={isOversized ? 385 : 370}
              y="428"
              width="22"
              height="4"
              rx="1"
              fill={metal}
            />
            {/* Island top */}
            <rect
              x={isOversized ? 244 : 274}
              y="388"
              width={isOversized ? 312 : 252}
              height="16"
              rx="2"
              fill="url(#stoneGrad)"
            />
            {/* Waterfall ends */}
            {isWaterfall ? (
              <>
                <rect
                  x={isOversized ? 244 : 274}
                  y="388"
                  width="12"
                  height="82"
                  fill={stone}
                />
                <rect
                  x={isOversized ? 544 : 514}
                  y="388"
                  width="12"
                  height="82"
                  fill={stone}
                />
              </>
            ) : null}
            {/* Seating stools */}
            {isOversized ? (
              <>
                {[0, 1, 2].map((i) => (
                  <g key={i}>
                    <ellipse
                      cx={290 + i * 70}
                      cy="490"
                      rx="18"
                      ry="5"
                      fill={shade(cabinet, -30)}
                      opacity="0.35"
                    />
                    <rect
                      x={282 + i * 70}
                      y="455"
                      width="16"
                      height="35"
                      rx="2"
                      fill={metal}
                      opacity="0.85"
                    />
                    <ellipse
                      cx={290 + i * 70}
                      cy="455"
                      rx="16"
                      ry="6"
                      fill={cabinetDoor}
                    />
                  </g>
                ))}
              </>
            ) : null}
          </g>
        ) : null}

        {/* Pendants */}
        {[340, 400, 460].map((x) => (
          <g key={x}>
            <line x1={x} y1="48" x2={x} y2="200" stroke={metal} strokeWidth="1.5" />
            <path
              d={`M${x - 18} 200 Q${x} 230 ${x + 18} 200 Z`}
              fill={metal}
              opacity="0.9"
            />
            <ellipse cx={x} cy="200" rx="10" ry="4" fill="#fff8e8" opacity="0.7" />
          </g>
        ))}

        {/* Soft vignette */}
        <rect
          x="0"
          y="0"
          width="800"
          height="520"
          fill="url(#vignette)"
          style={{ pointerEvents: "none" }}
          opacity="0"
        />
      </svg>

      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ivory shadow-sm backdrop-blur">
          {style.name}
        </span>
        <span className="rounded-full bg-white/80 px-3 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-text-dim shadow-sm backdrop-blur">
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
