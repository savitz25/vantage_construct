"use client";

import type { ReactNode } from "react";

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

/** Compact chip row group for the light sidebar */
export function StudioControlGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="studio-control-group">
      <p className="studio-control-label">{label}</p>
      <div className="studio-control-chips">{children}</div>
    </div>
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
