"use client";

import { getBathSurface } from "@/lib/primary-suite/options";
import { getVision } from "@/lib/primary-suite/visions";
import type { SuiteSelections } from "@/lib/primary-suite/types";

export function SuiteScene({
  selections,
  compact = false,
  zone = "all",
}: {
  selections: SuiteSelections;
  compact?: boolean;
  zone?: "bedroom" | "bath" | "closet" | "all";
}) {
  const vision = getVision(selections.visionId);
  const surface = getBathSurface(selections.bathSurface);
  const hasTub = selections.tub !== "none";
  const freestanding = selections.tub === "freestanding";
  const hasFireplace =
    selections.bedWall === "fireplace-wall" || selections.sitting === "fireplace-lounge";
  const hasOutdoor = selections.outdoorAccess !== "none";
  const hasIsland = selections.closetIsland === "center-island";
  const steam = selections.shower === "steam" || selections.amenities.includes("steam-package");
  const statementLight = selections.amenities.includes("statement-lighting");

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${
        compact
          ? "rounded-[inherit]"
          : "rounded-2xl border border-border shadow-[0_20px_60px_rgba(40,30,15,0.12)]"
      }`}
      style={{
        background: `linear-gradient(180deg, ${vision.wall} 0%, ${vision.wall} 55%, ${vision.floor} 100%)`,
      }}
      aria-label={`${vision.name} suite preview`}
    >
      <svg
        viewBox="0 0 800 420"
        className="h-full w-full"
        role="img"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Floor */}
        <rect x="0" y="300" width="800" height="120" fill={vision.floor} opacity="0.9" />

        {/* Bedroom zone left */}
        {(zone === "all" || zone === "bedroom") && (
          <g>
            {/* Bed wall */}
            <rect x="40" y="100" width="280" height="200" fill={vision.wall} stroke={vision.accent} strokeWidth={selections.bedWall === "paneled" ? 2 : 0} />
            {selections.bedWall === "paneled"
              ? [0, 1, 2, 3].map((i) => (
                  <line
                    key={i}
                    x1={70 + i * 60}
                    y1="110"
                    x2={70 + i * 60}
                    y2="290"
                    stroke={vision.accent}
                    strokeWidth="1.5"
                    opacity="0.35"
                  />
                ))
              : null}
            {selections.bedWall === "upholstered" ? (
              <rect x="80" y="130" width="200" height="90" rx="8" fill={vision.accent} opacity="0.25" />
            ) : null}
            {/* Bed */}
            <rect x="90" y="200" width="180" height="90" rx="6" fill="#f5f0e8" stroke={vision.accent} opacity="0.9" />
            <rect x="100" y="185" width="160" height="30" rx="6" fill="#fff" opacity="0.85" />
            {hasFireplace ? (
              <rect x="50" y="220" width="30" height="70" fill="#3a3530" />
            ) : null}
            {hasOutdoor ? (
              <rect x="250" y="140" width="50" height="80" fill="#c5d8e8" stroke="#a8b8c4" />
            ) : null}
            {selections.ceiling === "tray" || selections.ceiling === "coffered" ? (
              <rect x="70" y="105" width="220" height="20" fill="none" stroke={vision.accent} opacity="0.3" />
            ) : null}
            {selections.ceiling === "beams"
              ? [0, 1, 2].map((i) => (
                  <line
                    key={i}
                    x1={90 + i * 70}
                    y1="110"
                    x2={100 + i * 65}
                    y2="200"
                    stroke={vision.accent}
                    strokeWidth="4"
                    opacity="0.3"
                  />
                ))
              : null}
          </g>
        )}

        {/* Bath zone center-right */}
        {(zone === "all" || zone === "bath") && (
          <g>
            <rect x="340" y="110" width="240" height="200" fill={vision.wall} opacity="0.95" />
            {/* Shower */}
            <rect
              x="360"
              y="140"
              width="70"
              height="100"
              fill="#c5d8e8"
              opacity="0.5"
              stroke="#a8b8c4"
            />
            {steam ? (
              <circle cx="395" cy="180" r="18" fill="#e8f0f4" opacity="0.6" />
            ) : null}
            {/* Tub */}
            {hasTub ? (
              freestanding ? (
                <ellipse cx="500" cy="250" rx="50" ry="22" fill={surface.color} stroke="#c0b8b0" />
              ) : (
                <rect x="460" y="230" width="90" height="40" rx="4" fill={surface.color} stroke="#c0b8b0" />
              )
            ) : null}
            {/* Vanity */}
            <rect x="360" y="260" width="120" height="28" rx="3" fill={surface.color} />
            <ellipse cx="390" cy="268" rx="14" ry="6" fill="#a8b0b8" opacity="0.5" />
            <ellipse cx="450" cy="268" rx="14" ry="6" fill="#a8b0b8" opacity="0.5" />
            {selections.vanity === "double-makeup" ? (
              <rect x="490" y="250" width="40" height="40" rx="2" fill={vision.accent} opacity="0.2" />
            ) : null}
            {statementLight ? (
              <path d="M450 120 L460 145 L440 145 Z" fill={vision.accent} opacity="0.5" />
            ) : null}
          </g>
        )}

        {/* Closet zone right */}
        {(zone === "all" || zone === "closet") && (
          <g>
            <rect x="600" y="120" width="160" height="190" fill={vision.wall} opacity="0.9" />
            {/* Closet rods / shelves */}
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="620"
                y1={150 + i * 35}
                x2="740"
                y2={150 + i * 35}
                stroke={vision.accent}
                strokeWidth="2"
                opacity="0.25"
              />
            ))}
            {hasIsland ? (
              <rect x="640" y="230" width="80" height="45" rx="4" fill={vision.accent} opacity="0.3" />
            ) : null}
            {selections.closet === "his-hers" ? (
              <line x1="680" y1="130" x2="680" y2="300" stroke={vision.accent} strokeWidth="2" opacity="0.4" />
            ) : null}
            {selections.amenities.includes("closet-vanity") ? (
              <rect x="610" y="270" width="50" height="30" rx="2" fill={surface.color} />
            ) : null}
          </g>
        )}
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
