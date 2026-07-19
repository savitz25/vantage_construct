"use client";

import { getVision } from "@/lib/attic-studio/visions";
import type { AtticSelections } from "@/lib/attic-studio/types";

/** Stylized attic cross-section — dormers, skylights, bath, and storage repaint live. */
export function AtticScene({ selections }: { selections: AtticSelections }) {
  const vision = getVision(selections.visionId);
  const wall = vision.wall;
  const floor = vision.floor;
  const accent = vision.accent;
  const hasDormer = selections.dormer !== "none";
  const shed = selections.dormer === "shed";
  const paired = selections.dormer === "paired";
  const hasBath = selections.bath !== "none";
  const fullBath = selections.bath === "full";
  const hasSkylight = selections.skylights !== "none";
  const twinSky = selections.skylights === "paired";
  const beams = selections.ceiling === "exposed-beams";
  const tray = selections.ceiling === "tray";
  const seats = selections.storage === "window-seats" || selections.storage === "full-built-ins";
  const kneewall = selections.storage !== "basic";

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border shadow-[0_20px_60px_rgba(40,30,15,0.12)]"
      style={{ background: wall }}
      aria-label={`${vision.name} attic preview`}
    >
      <svg viewBox="0 0 800 480" className="h-auto w-full" role="img">
        <defs>
          <linearGradient id="atticFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={shade(floor, 12)} />
            <stop offset="100%" stopColor={shade(floor, -18)} />
          </linearGradient>
          <linearGradient id="skyGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cfe0f0" />
            <stop offset="100%" stopColor="#e8f0f6" />
          </linearGradient>
          <filter id="soft" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Exterior sky strip above roof */}
        <rect x="0" y="0" width="800" height="120" fill="url(#skyGlow)" />

        {/* Main roof gable */}
        <path
          d={
            shed
              ? "M40 200 L40 110 L760 70 L760 200 Z"
              : "M40 200 L400 40 L760 200 Z"
          }
          fill="#5c5348"
          opacity="0.95"
        />
        <path
          d={
            shed
              ? "M55 195 L55 120 L745 82 L745 195 Z"
              : "M70 195 L400 60 L730 195 Z"
          }
          fill={wall}
        />

        {/* Interior volume */}
        <path d="M70 195 L400 60 L730 195 L730 380 L70 380 Z" fill={wall} />
        <rect x="70" y="340" width="660" height="100" fill="url(#atticFloor)" />

        {/* Floor boards hint */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line
            key={i}
            x1={90 + i * 85}
            y1="340"
            x2={70 + i * 90}
            y2="440"
            stroke="rgba(0,0,0,0.04)"
          />
        ))}

        {/* Kneewall storage */}
        {kneewall ? (
          <>
            <rect x="70" y="280" width="90" height="100" fill={shade(wall, -12)} />
            <rect x="640" y="280" width="90" height="100" fill={shade(wall, -12)} />
            <rect x="80" y="290" width="30" height="70" rx="2" fill={shade(wall, -22)} />
            <rect x="115" y="290" width="30" height="70" rx="2" fill={shade(wall, -22)} />
            <rect x="655" y="290" width="30" height="70" rx="2" fill={shade(wall, -22)} />
            <rect x="690" y="290" width="30" height="70" rx="2" fill={shade(wall, -22)} />
          </>
        ) : null}

        {/* Dormers */}
        {hasDormer ? (
          <>
            <Dormer x={paired || shed ? 180 : 320} wall={wall} accent={accent} />
            {paired || shed ? <Dormer x={500} wall={wall} accent={accent} /> : null}
          </>
        ) : (
          /* gable end window */
          <rect x="360" y="160" width="80" height="70" rx="3" fill="#dce8f0" stroke="#c5d0d8" />
        )}

        {/* Skylights on roof plane */}
        {hasSkylight ? (
          <>
            <rect
              x={twinSky ? 250 : 340}
              y="95"
              width="50"
              height="28"
              rx="2"
              fill="#a8c8e0"
              transform="rotate(-18 275 109)"
              opacity="0.9"
            />
            {twinSky ? (
              <rect
                x="480"
                y="95"
                width="50"
                height="28"
                rx="2"
                fill="#a8c8e0"
                transform="rotate(18 505 109)"
                opacity="0.9"
              />
            ) : null}
          </>
        ) : null}

        {/* Ceiling treatment */}
        {beams ? (
          <>
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1={140 + i * 140}
                y1="200"
                x2={180 + i * 130}
                y2="340"
                stroke={shade(accent, -30)}
                strokeWidth="6"
                opacity="0.35"
              />
            ))}
          </>
        ) : null}
        {tray ? (
          <path
            d="M160 210 L400 100 L640 210 L600 230 L400 140 L200 230 Z"
            fill="none"
            stroke={shade(wall, -18)}
            strokeWidth="3"
            opacity="0.7"
          />
        ) : null}

        {/* Window seats */}
        {seats ? (
          <g filter="url(#soft)">
            <rect x="200" y="310" width="100" height="30" rx="3" fill={shade(wall, -8)} />
            <rect x="205" y="300" width="90" height="14" rx="2" fill={accent} opacity="0.35" />
            <rect x="500" y="310" width="100" height="30" rx="3" fill={shade(wall, -8)} />
            <rect x="505" y="300" width="90" height="14" rx="2" fill={accent} opacity="0.35" />
          </g>
        ) : null}

        {/* Bed / lounge furniture by vision-ish */}
        <g filter="url(#soft)">
          <rect x="280" y="300" width="160" height="40" rx="4" fill={shade(wall, -15)} />
          <rect x="290" y="285" width="140" height="22" rx="4" fill={shade(accent, 40)} opacity="0.5" />
        </g>

        {/* Bath zone */}
        {hasBath ? (
          <g filter="url(#soft)">
            <rect x="580" y="250" width="120" height="90" rx="4" fill={shade(wall, -6)} stroke={shade(wall, -20)} />
            <text x="640" y="275" textAnchor="middle" fontSize="11" fill={shade(wall, -50)}>
              {fullBath ? "Bath" : "½ Bath"}
            </text>
            {fullBath ? (
              <>
                <rect x="595" y="290" width="40" height="35" rx="3" fill="#d0d8e0" />
                <ellipse cx="660" cy="310" rx="18" ry="12" fill="#c5d0d8" />
              </>
            ) : (
              <ellipse cx="640" cy="310" rx="16" ry="10" fill="#c5d0d8" />
            )}
          </g>
        ) : null}

        {/* Stairs hint from below */}
        <path
          d="M120 380 L180 380 L200 340 L160 340 Z"
          fill={shade(floor, -10)}
          opacity="0.8"
        />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={125 + i * 12}
            y={365 - i * 12}
            width="40"
            height="8"
            fill={shade(floor, -5 + i * 3)}
          />
        ))}
      </svg>

      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ivory shadow-sm backdrop-blur">
          {vision.lifestyleName}
        </span>
        <span className="rounded-full bg-white/80 px-3 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-text-dim shadow-sm backdrop-blur">
          Live preview · concept
        </span>
      </div>
    </div>
  );
}

function Dormer({ x, wall, accent }: { x: number; wall: string; accent: string }) {
  return (
    <g>
      <path d={`M${x} 175 L${x + 50} 120 L${x + 100} 175 Z`} fill="#5c5348" />
      <path d={`M${x + 10} 172 L${x + 50} 130 L${x + 90} 172 Z`} fill={wall} />
      <rect x={x + 28} y={145} width="44" height="40" rx="2" fill="#dce8f0" stroke="#c5d0d8" />
      <line x1={x + 50} y1={145} x2={x + 50} y2={185} stroke="#c5d0d8" />
      <rect x={x + 20} y={172} width="60" height="8" fill={shade(accent, 20)} opacity="0.4" />
    </g>
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
