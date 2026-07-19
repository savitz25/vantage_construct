"use client";

import { getBay, getDoor, getExterior } from "@/lib/garage-studio/options";
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
  const bay = getBay(selections.bays);

  const body = exterior.fullStone ? exterior.body : exterior.body || purpose.body;
  const trim = exterior.trim;
  const roofColor = purpose.roof;
  const doorColor = door.color;

  const living = selections.livingAbove;
  const hasUpper = living !== "none";
  const loftOnly = living === "storage-loft";
  const fullLiving = living === "full-living" || living === "large-suite";
  const largeSuite = living === "large-suite";

  const doorCount = bay.doorCount;
  const wide = bay.wide;
  const deep = bay.deep;
  const asymmetric = bay.asymmetric;

  let buildingW = wide ? 540 : deep ? 380 : 420;
  if (asymmetric) buildingW = 460;
  if (doorCount === 3 && !wide) buildingW = 460;
  if (doorCount === 4) buildingW = 540;

  const buildingX = (800 - buildingW) / 2 - (deep ? 20 : 0);
  const groundY = 320;
  const bodyTop = hasUpper ? (largeSuite ? 120 : loftOnly ? 155 : 135) : 185;
  const bodyH = groundY - bodyTop;

  const hasWorkshop = selections.amenities.includes("workshop") || asymmetric;
  const hasCovered = selections.amenities.includes("covered-entry");
  const hasLighting = selections.amenities.includes("exterior-lighting");
  const hasEv = selections.amenities.includes("ev-ready");
  const hasBath = selections.bath !== "none";
  const fullBath = selections.bath === "full";
  const residential =
    selections.purposeId === "guest-adu" ||
    selections.purposeId === "carriage-house" ||
    fullLiving;

  return (
    <div
      className={`relative overflow-hidden border border-border ${
        compact
          ? "mx-auto h-[min(260px,36vh)] w-full max-w-xl rounded-xl shadow-[0_12px_40px_rgba(40,30,15,0.1)] sm:h-[min(300px,38vh)]"
          : "rounded-2xl shadow-[0_20px_60px_rgba(40,30,15,0.12)]"
      }`}
      style={{
        background: `linear-gradient(180deg, #dce8f0 0%, ${purpose.wall} 42%, #c4b8a4 100%)`,
      }}
      aria-label={`${purpose.name} building preview`}
    >
      <svg
        viewBox="0 0 800 420"
        className={`w-full ${compact ? "h-full" : "h-auto"}`}
        role="img"
        preserveAspectRatio={compact ? "xMidYMid slice" : "xMidYMid meet"}
      >
        <rect x="0" y="320" width="800" height="100" fill="#9a9080" opacity="0.35" />
        <ellipse cx="400" cy={deep ? 370 : 360} rx={deep ? 320 : 280} ry="28" fill="#8a8070" opacity="0.25" />

        {/* Main house hint */}
        <rect x="30" y="210" width="80" height="110" fill="#d8d0c4" opacity="0.45" />
        <path d="M25 210 L70 165 L115 210" fill="#5c5348" opacity="0.4" />

        {/* Covered entry */}
        {hasCovered ? (
          <g>
            <rect
              x={buildingX - 36}
              y={bodyTop + bodyH * 0.35}
              width="40"
              height={bodyH * 0.55}
              fill={shade(body, -5)}
              stroke={trim}
            />
            <path
              d={`M${buildingX - 42} ${bodyTop + bodyH * 0.35} L${buildingX - 16} ${bodyTop + bodyH * 0.22} L${buildingX + 8} ${bodyTop + bodyH * 0.35} Z`}
              fill={roofColor}
            />
          </g>
        ) : null}

        {/* Building body */}
        <rect
          x={buildingX}
          y={bodyTop}
          width={buildingW + (deep ? 60 : 0)}
          height={bodyH}
          fill={body}
          stroke={exterior.fullStone ? shade(body, -15) : trim}
          strokeWidth={exterior.craftsman ? 3 : 1.5}
        />

        {/* Board & batten verticals for farmhouse */}
        {selections.exterior === "modern-farmhouse"
          ? Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1={buildingX + 18 + i * ((buildingW + (deep ? 60 : 0)) / 12)}
                y1={bodyTop + 4}
                x2={buildingX + 18 + i * ((buildingW + (deep ? 60 : 0)) / 12)}
                y2={groundY - 4}
                stroke={trim}
                strokeWidth="1.2"
                opacity="0.35"
              />
            ))
          : null}

        {/* Craftsman brackets */}
        {exterior.craftsman ? (
          <>
            <path
              d={`M${buildingX + 20} ${bodyTop + 8} L${buildingX + 40} ${bodyTop - 12} L${buildingX + 60} ${bodyTop + 8}`}
              fill="none"
              stroke={trim}
              strokeWidth="3"
            />
            <path
              d={`M${buildingX + buildingW - 60} ${bodyTop + 8} L${buildingX + buildingW - 40} ${bodyTop - 12} L${buildingX + buildingW - 20} ${bodyTop + 8}`}
              fill="none"
              stroke={trim}
              strokeWidth="3"
            />
          </>
        ) : null}

        {/* Upper level */}
        {hasUpper ? (
          <>
            {loftOnly ? (
              <>
                <rect
                  x={buildingX + 50}
                  y={bodyTop + 18}
                  width="36"
                  height="22"
                  rx="2"
                  fill="#c5d8e8"
                  stroke="#a8b8c4"
                />
                <rect
                  x={buildingX + buildingW - 90}
                  y={bodyTop + 18}
                  width="36"
                  height="22"
                  rx="2"
                  fill="#c5d8e8"
                  stroke="#a8b8c4"
                />
              </>
            ) : (
              Array.from({ length: largeSuite ? 4 : 3 }).map((_, i) => (
                <rect
                  key={i}
                  x={buildingX + 30 + i * ((buildingW - 40) / (largeSuite ? 4 : 3))}
                  y={bodyTop + 18}
                  width={residential ? 44 : 36}
                  height={largeSuite ? 48 : 40}
                  rx="2"
                  fill="#c5d8e8"
                  stroke="#a8b8c4"
                />
              ))
            )}
            {fullLiving ? (
              <rect
                x={buildingX + buildingW - 55}
                y={bodyTop + bodyH * 0.28}
                width="20"
                height={42}
                rx="2"
                fill={shade(body, -18)}
                stroke={trim}
              />
            ) : null}
          </>
        ) : null}

        {/* Roof */}
        <path
          d={
            largeSuite
              ? `M${buildingX - 14} ${bodyTop + 8} L${buildingX + buildingW / 2} ${bodyTop - 48} L${buildingX + buildingW + 14 + (deep ? 60 : 0)} ${bodyTop + 8} Z`
              : loftOnly
                ? `M${buildingX - 10} ${bodyTop + 12} L${buildingX + buildingW / 2} ${bodyTop - 28} L${buildingX + buildingW + 10 + (deep ? 60 : 0)} ${bodyTop + 12} Z`
                : `M${buildingX - 12} ${bodyTop + 6} L${buildingX + buildingW / 2} ${bodyTop - 40} L${buildingX + buildingW + 12 + (deep ? 60 : 0)} ${bodyTop + 6} Z`
          }
          fill={roofColor}
        />

        {/* Stone base */}
        {exterior.stoneBase || exterior.fullStone ? (
          <rect
            x={buildingX}
            y={groundY - 22}
            width={buildingW + (deep ? 60 : 0)}
            height="22"
            fill={exterior.fullStone ? shade(body, -10) : "#7a7268"}
            opacity="0.9"
          />
        ) : null}

        {/* Garage doors */}
        {Array.from({ length: doorCount }).map((_, i) => {
          const totalW = buildingW + (deep ? 60 : 0);
          const gap = 10;
          const doorW = (totalW - gap * (doorCount + 1)) / doorCount;
          const x = buildingX + gap + i * (doorW + gap);
          const y = groundY - (deep ? 115 : 100);
          const h = deep ? 115 : 95;
          const isGlass =
            selections.door === "full-view" ||
            (selections.door === "mixed-glass-solid" && i % 2 === 0);
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={doorW}
                height={h}
                rx="3"
                fill={isGlass ? "#9ab0c4" : doorColor}
                stroke={shade(doorColor, -30)}
              />
              {selections.door === "carriage" || selections.door === "wood-clad" ? (
                <>
                  <line
                    x1={x + doorW / 2}
                    y1={y}
                    x2={x + doorW / 2}
                    y2={y + h}
                    stroke={shade(doorColor, -40)}
                  />
                  <line
                    x1={x}
                    y1={y + h * 0.42}
                    x2={x + doorW}
                    y2={y + h * 0.42}
                    stroke={shade(doorColor, -30)}
                  />
                </>
              ) : null}
              {selections.door === "solid-modern"
                ? [0.33, 0.66].map((t) => (
                    <line
                      key={t}
                      x1={x + 6}
                      y1={y + h * t}
                      x2={x + doorW - 6}
                      y2={y + h * t}
                      stroke="rgba(255,255,255,0.12)"
                    />
                  ))
                : null}
              {isGlass ? (
                <rect
                  x={x + 6}
                  y={y + 6}
                  width={doorW - 12}
                  height={h - 12}
                  fill="#b8d0e4"
                  opacity="0.55"
                />
              ) : null}
            </g>
          );
        })}

        {/* Workshop wing */}
        {hasWorkshop ? (
          <g>
            <rect
              x={buildingX + buildingW + (deep ? 60 : 0)}
              y={bodyTop + (hasUpper ? 40 : 20)}
              width="75"
              height={groundY - (bodyTop + (hasUpper ? 40 : 20))}
              fill={shade(body, -8)}
              stroke={trim}
            />
            <rect
              x={buildingX + buildingW + (deep ? 60 : 0) + 18}
              y={bodyTop + (hasUpper ? 55 : 40)}
              width="40"
              height="32"
              rx="2"
              fill="#c5d8e8"
            />
            <rect
              x={buildingX + buildingW + (deep ? 60 : 0) + 28}
              y={groundY - 55}
              width="18"
              height="50"
              rx="2"
              fill={shade(body, -20)}
            />
          </g>
        ) : null}

        {/* Bath residential windows */}
        {hasBath ? (
          <rect
            x={buildingX + 12}
            y={hasUpper ? bodyTop + bodyH * 0.45 : bodyTop + 30}
            width={fullBath ? 28 : 18}
            height={fullBath ? 36 : 24}
            rx="2"
            fill="#c5d8e8"
            stroke="#a8b8c4"
          />
        ) : null}

        {/* EV charger */}
        {hasEv ? (
          <g>
            <rect
              x={buildingX + buildingW + (deep ? 50 : -8) - (hasWorkshop ? -10 : 0)}
              y={groundY - 48}
              width="10"
              height="28"
              rx="2"
              fill="#2a2a2a"
            />
            <circle
              cx={buildingX + buildingW + (deep ? 55 : -3) - (hasWorkshop ? -10 : 0)}
              cy={groundY - 42}
              r="3"
              fill="#5f8a58"
            />
          </g>
        ) : null}

        {/* Exterior sconces */}
        {hasLighting ? (
          <>
            <circle cx={buildingX + 16} cy={bodyTop + bodyH * 0.4} r="4" fill="#f5e6c8" />
            <circle
              cx={buildingX + buildingW + (deep ? 60 : 0) - 16}
              cy={bodyTop + bodyH * 0.4}
              r="4"
              fill="#f5e6c8"
            />
          </>
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
