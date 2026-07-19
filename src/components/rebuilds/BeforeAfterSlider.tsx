"use client";

import { useCallback, useRef, useState } from "react";
import { SmartImage } from "@/components/SmartImage";
import { trackEvent } from "@/lib/analytics";
import type { TransformationPair } from "@/lib/rebuilds/content";

export function BeforeAfterCompare({ pair }: { pair: TransformationPair }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(52);
  const dragging = useRef(false);
  const interacted = useRef(false);

  const update = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const next = ((clientX - rect.left) / rect.width) * 100;
      setPos(Math.max(6, Math.min(94, next)));
      if (!interacted.current) {
        interacted.current = true;
        trackEvent("rebuild_before_after_interact", {
          event_category: "rebuilds",
          pair_id: pair.id,
        });
      }
    },
    [pair.id],
  );

  return (
    <figure className="card overflow-hidden">
      <div
        ref={containerRef}
        className="relative aspect-[16/10] w-full cursor-ew-resize touch-none select-none bg-bg-soft"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          update(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) update(e.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-label={`Compare before and after: ${pair.afterLabel}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(6, p - 4));
          if (e.key === "ArrowRight") setPos((p) => Math.min(94, p + 4));
        }}
      >
        <SmartImage src={pair.afterSrc} alt={`${pair.afterLabel} — after`} fill objectFit="cover" />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <SmartImage
            src={pair.beforeSrc}
            alt={`${pair.beforeLabel} — before`}
            fill
            objectFit="cover"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white"
          style={{ left: `${pos}%`, boxShadow: "0 0 0 1px rgba(0,0,0,0.15)" }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-surface text-sm font-semibold text-gold-deep shadow-lg">
            ‹ ›
          </div>
        </div>
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
          {pair.beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-gold-deep/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
          {pair.afterLabel}
        </span>
      </div>
      <figcaption className="space-y-1 p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-gold">{pair.town}</p>
        <p className="font-display text-xl text-ivory">{pair.caption}</p>
        {pair.note ? <p className="text-xs text-text-dim">{pair.note}</p> : null}
      </figcaption>
    </figure>
  );
}
