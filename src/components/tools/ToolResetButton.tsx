"use client";

/**
 * Shared secondary Reset control for Studios and Calculators.
 * Place near the top of each tool (toolbar / step row) — never as the primary CTA.
 */
export function ToolResetButton({
  onReset,
  label = "Reset",
  className = "",
}: {
  onReset: () => void;
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onReset}
      className={`inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-navy transition hover:border-navy/30 hover:bg-bg-elevated active:scale-[0.98] ${className}`}
      aria-label={`${label} — restore default options`}
    >
      {label}
    </button>
  );
}

/** Compact toolbar row: title/meta on the left, reset on the right (mobile-friendly). */
export function ToolToolbar({
  children,
  onReset,
  resetLabel = "Reset",
  className = "",
}: {
  children?: React.ReactNode;
  onReset: () => void;
  resetLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={`mb-6 flex flex-wrap items-center gap-3 ${className}`}
    >
      {children}
      <div className="ml-auto flex items-center gap-2">
        <ToolResetButton onReset={onReset} label={resetLabel} />
      </div>
    </div>
  );
}
