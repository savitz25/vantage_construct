"use client";

import {
  getCounter,
  getCover,
  getFire,
  getFlooring,
  getGrillType,
  getKitchenLevel,
} from "@/lib/outdoor-studio/options";
import { getVision } from "@/lib/outdoor-studio/visions";
import type { OutdoorSelections } from "@/lib/outdoor-studio/types";

export function OutdoorScene({
  selections,
  compact = false,
}: {
  selections: OutdoorSelections;
  compact?: boolean;
}) {
  const vision = getVision(selections.visionId);
  const flooring = getFlooring(selections.flooring);
  const counter = getCounter(selections.counter);
  const cover = getCover(selections.cover);
  const fire = getFire(selections.fire);
  const level = getKitchenLevel(selections.kitchenLevel);
  const grill = getGrillType(selections.grillType);

  const hasKitchen = selections.kitchenLevel !== "none";
  const layout = level.layout;
  const kitchenWide =
    layout === "l-shape" || layout === "island" ? 220 : layout === "linear" ? 200 : 140;
  const upgrades = new Set(selections.kitchenUpgrades);
  const covered = cover.id !== "open-patio";
  const pavilion = cover.id === "pavilion" || cover.id === "screened";
  const pergola = cover.id === "pergola";
  const hasFire = fire.id !== "none";
  const fireplace = fire.id === "traditional-fireplace";
  const linear = fire.id === "linear-modern";
  const dramatic = selections.lighting === "dramatic";
  const layered = selections.lighting === "layered" || dramatic;
  const lounge = selections.amenities.includes("lounge-seating");
  const dining = selections.amenities.includes("dining-zone");
  const bar = selections.amenities.includes("bar-seating");
  const pool = selections.amenities.includes("pool-connection");
  const screened = cover.id === "screened";

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${
        compact
          ? "rounded-[inherit]"
          : "rounded-2xl border border-border shadow-[0_20px_60px_rgba(40,30,15,0.12)]"
      }`}
      style={{
        background: `linear-gradient(180deg, ${vision.sky} 0%, #f5e6d0 38%, ${flooring.color} 100%)`,
      }}
      aria-label={`${vision.name} outdoor preview`}
    >
      <svg
        viewBox="0 0 800 420"
        className="h-full w-full"
        role="img"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* House facade hint */}
        <rect x="0" y="80" width="180" height="200" fill="#e8e0d4" opacity="0.7" />
        <rect x="40" y="120" width="50" height="60" fill="#c5d8e8" opacity="0.8" />
        <rect x="110" y="120" width="50" height="60" fill="#c5d8e8" opacity="0.8" />

        {/* Pool edge */}
        {pool ? (
          <ellipse cx="680" cy="340" rx="90" ry="40" fill="#5a9ab8" opacity="0.55" />
        ) : null}

        {/* Patio floor */}
        <path
          d="M160 220 L760 220 L800 400 L120 400 Z"
          fill={flooring.color}
          opacity="0.95"
        />
        {/* Paver lines */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={i}
            x1={200 + i * 100}
            y1="220"
            x2={140 + i * 110}
            y2="400"
            stroke="rgba(0,0,0,0.06)"
          />
        ))}

        {/* Cover structure */}
        {covered ? (
          <g>
            {/* Posts */}
            <rect x="220" y="140" width="12" height="100" fill="#5c5348" />
            <rect x="520" y="140" width="12" height="100" fill="#5c5348" />
            <rect x="680" y="140" width="12" height="100" fill="#5c5348" />
            {pavilion ? (
              <>
                <path d="M200 150 L460 90 L710 150 L710 165 L200 165 Z" fill="#4a4540" />
                <rect x="210" y="150" width="490" height="14" fill="#3a3530" />
              </>
            ) : pergola ? (
              <>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <rect
                    key={i}
                    x={230 + i * 58}
                    y="120"
                    width="8"
                    height="90"
                    fill="#6b5c48"
                    opacity="0.85"
                  />
                ))}
                <rect x="220" y="118" width="480" height="10" fill="#5c4e3c" />
              </>
            ) : null}
            {screened ? (
              <rect x="220" y="155" width="480" height="85" fill="#c8d0c8" opacity="0.25" />
            ) : null}
            {/* Ceiling fans under cover */}
            {selections.amenities.includes("ceiling-fans") && covered ? (
              <>
                <circle cx="350" cy="160" r="18" fill="none" stroke="#4a4540" strokeWidth="2" />
                <circle cx="520" cy="160" r="18" fill="none" stroke="#4a4540" strokeWidth="2" />
              </>
            ) : null}
          </g>
        ) : null}

        {/* Outdoor kitchen */}
        {hasKitchen ? (
          <g>
            <rect
              x="200"
              y="200"
              width={kitchenWide}
              height="55"
              rx="4"
              fill="#4a4540"
            />
            <rect
              x="205"
              y="195"
              width={kitchenWide - 10}
              height="12"
              rx="2"
              fill={counter.color}
            />
            {/* Primary grill */}
            <rect
              x="220"
              y="208"
              width={grill.visual === "large" || grill.visual === "dual" ? 56 : 40}
              height="28"
              rx="2"
              fill="#2a2a2a"
            />
            <rect
              x="225"
              y="212"
              width={grill.visual === "large" || grill.visual === "dual" ? 46 : 30}
              height="8"
              fill={grill.visual === "infrared" ? "#e07040" : "#c45c4a"}
              opacity="0.75"
            />
            {grill.visual === "dual" ? (
              <rect x="285" y="208" width="40" height="28" rx="2" fill="#2a2a2a" />
            ) : null}
            {grill.visual === "flattop" || upgrades.has("griddle") ? (
              <rect x="270" y="210" width="36" height="22" rx="2" fill="#3a3a3a" />
            ) : null}
            {grill.visual === "kamado" ? (
              <ellipse cx="300" cy="222" rx="16" ry="14" fill="#3d2a22" />
            ) : null}
            {/* Side / power burners */}
            {upgrades.has("side-burners") || upgrades.has("power-burner") ? (
              <rect x="320" y="212" width="22" height="18" rx="2" fill="#333" />
            ) : null}
            {/* Pizza oven dome */}
            {upgrades.has("pizza-oven") ? (
              <path d="M360 230 Q375 200 390 230 Z" fill="#6b5344" />
            ) : null}
            {/* Fridge / beverage tall unit */}
            {upgrades.has("refrigerator") || upgrades.has("beverage-center") ? (
              <rect x="200" y="210" width="16" height="40" rx="2" fill="#5a6570" />
            ) : null}
            {/* Sink */}
            {upgrades.has("sink") || upgrades.has("prep-sink") ? (
              <ellipse cx={200 + kitchenWide - 30} cy="218" rx="12" ry="6" fill="#8a9aaa" />
            ) : null}
            {layout === "l-shape" || layout === "island" ? (
              <rect
                x={200 + kitchenWide - 70}
                y="250"
                width="65"
                height="40"
                rx="3"
                fill="#4a4540"
              />
            ) : null}
            {layout === "island" ? (
              <rect x="340" y="255" width="90" height="45" rx="4" fill="#5c5348" />
            ) : null}
            {bar ? (
              <>
                {[0, 1, 2].map((i) => (
                  <ellipse
                    key={i}
                    cx={230 + i * 28}
                    cy="275"
                    rx="10"
                    ry="4"
                    fill="#6b5344"
                  />
                ))}
              </>
            ) : null}
          </g>
        ) : null}

        {/* Fire features */}
        {hasFire ? (
          <g>
            {fireplace ? (
              <>
                <rect x="560" y="150" width="90" height="110" fill="#6b6560" />
                <rect x="575" y="180" width="60" height="50" fill="#1a1a1a" />
                <path d="M575 230 Q605 200 635 230" fill="#e07040" opacity="0.85" />
                <rect x="555" y="140" width="100" height="14" fill="#4a4540" />
              </>
            ) : linear ? (
              <>
                <rect x="480" y="280" width="160" height="14" rx="4" fill="#3a3530" />
                <rect x="490" y="278" width="140" height="8" rx="3" fill="#e07040" opacity="0.9" />
              </>
            ) : (
              <>
                <ellipse cx="560" cy="300" rx="45" ry="18" fill="#5c5348" />
                <ellipse cx="560" cy="295" rx="28" ry="12" fill="#e07040" opacity="0.85" />
                <ellipse cx="560" cy="292" rx="12" ry="6" fill="#f0c050" opacity="0.9" />
              </>
            )}
          </g>
        ) : null}

        {/* Lounge */}
        {lounge ? (
          <g>
            <rect x="420" y="250" width="90" height="35" rx="6" fill="#7a6a58" opacity="0.85" />
            <rect x="415" y="240" width="30" height="25" rx="4" fill="#8b7a65" />
            <rect x="490" y="240" width="30" height="25" rx="4" fill="#8b7a65" />
          </g>
        ) : null}

        {/* Dining */}
        {dining ? (
          <g>
            <ellipse cx="350" cy="320" rx="40" ry="16" fill="#6b5344" />
            <rect x="330" y="300" width="12" height="22" fill="#5c4a38" />
            <rect x="358" y="300" width="12" height="22" fill="#5c4a38" />
          </g>
        ) : null}

        {/* Lighting */}
        {layered ? (
          <>
            <circle cx="240" cy="155" r="5" fill="#f5e6c8" opacity={dramatic ? 1 : 0.75} />
            <circle cx="400" cy="145" r="5" fill="#f5e6c8" opacity={dramatic ? 1 : 0.75} />
            <circle cx="560" cy="155" r="5" fill="#f5e6c8" opacity={dramatic ? 1 : 0.75} />
            {dramatic ? (
              <>
                <circle cx="300" cy="200" r="3" fill="#f0d8a0" />
                <circle cx="500" cy="210" r="3" fill="#f0d8a0" />
                <circle cx="620" cy="230" r="3" fill="#f0d8a0" />
              </>
            ) : null}
          </>
        ) : null}

        {/* Privacy screen */}
        {selections.amenities.includes("privacy-screen") ? (
          <rect x="720" y="180" width="50" height="140" fill="#5a7a58" opacity="0.45" />
        ) : null}
      </svg>

      <div className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-white/92 px-2.5 py-1 text-xs font-medium text-ivory shadow-sm backdrop-blur">
          {vision.lifestyleName}
        </span>
        <span className="rounded-full bg-white/85 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.12em] text-text-dim shadow-sm backdrop-blur">
          Live preview · concept
        </span>
      </div>
    </div>
  );
}
