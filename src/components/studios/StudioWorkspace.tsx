"use client";

import { useState, type ReactNode } from "react";

/**
 * Shared Studio layout: interactive model is the hero; estimate + controls
 * live in a narrower, independently scrollable sidebar.
 */
export function StudioWorkspace({
  model,
  estimate,
  controls,
  modelFooter,
  mobileEstimateBar,
}: {
  /** Primary visual (photo / scene) — dominates desktop */
  model: ReactNode;
  /** Compact investment summary — top of sidebar + sticky mobile bar */
  estimate: ReactNode;
  /** Feature chips, lead gate, CTAs — scrolls independently on desktop */
  controls: ReactNode;
  /** Optional under-model content (thumbs, description) */
  modelFooter?: ReactNode;
  /** Optional compact sticky estimate for mobile (if omitted, estimate still shows in flow) */
  mobileEstimateBar?: ReactNode;
}) {
  return (
    <div className="studio-workspace">
      {/* Mobile sticky estimate strip */}
      {mobileEstimateBar ? (
        <div className="studio-mobile-estimate-bar lg:hidden">{mobileEstimateBar}</div>
      ) : null}

      <div className="studio-workspace-grid">
        {/* HERO MODEL */}
        <div className="studio-model-column">
          <div className="studio-model-sticky">
            <div className="studio-model-stage">{model}</div>
            {modelFooter ? <div className="studio-model-footer">{modelFooter}</div> : null}
          </div>
        </div>

        {/* SUPPORTING SIDEBAR */}
        <aside className="studio-sidebar" aria-label="Planning estimate and options">
          <div className="studio-sidebar-scroll">
            <div className="studio-estimate-card">{estimate}</div>
            <div className="studio-controls-stack">{controls}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/** Compact chip row group for the light sidebar — collapsible on mobile */
export function StudioControlGroup({
  label,
  children,
  defaultOpen = true,
}: {
  label: string;
  children: ReactNode;
  /** On mobile, groups can collapse to reduce overwhelm */
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <details
      className="studio-control-group group/ctrl"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="studio-control-label flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 lg:min-h-0">
        <span>{label}</span>
        <span className="text-gold-deep transition group-open/ctrl:rotate-45 lg:hidden" aria-hidden>
          +
        </span>
      </summary>
      <div className="studio-control-chips">{children}</div>
    </details>
  );
}

export function StudioChip({
  active,
  onClick,
  children,
  swatch,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  swatch?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`studio-chip ${active ? "studio-chip-active" : ""}`}
    >
      {swatch ? (
        <span
          className="studio-chip-swatch"
          style={{ background: swatch }}
          aria-hidden
        />
      ) : null}
      {children}
    </button>
  );
}
