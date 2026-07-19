"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SmartImage } from "@/components/SmartImage";
import { trackCostEvent } from "@/lib/cost-studio/analytics";
import {
  addonCatalog,
  basementOptions,
  calculateCostEstimate,
  costDisclaimer,
  finishOptions,
  formatRange,
  formatUsd,
  garageOptions,
  lotOptions,
  roofOptions,
  styleOptions,
} from "@/lib/cost-studio/model";
import {
  COST_STEP_LABELS,
  COST_STEPS,
  createInitialCostState,
  generateCostConfigId,
  type AddonId,
  type CostSelections,
  type CostStep,
  type CostStudioState,
} from "@/lib/cost-studio/types";
import { styleMedia } from "@/lib/plan-media";
import { CostBreakdown } from "./CostBreakdown";
import { EstimatePill } from "./EstimatePill";
import { InteractiveHouseModel } from "./InteractiveHouseModel";

const STORAGE_KEY = "vantage-cost-studio-v1";

function loadState(): CostStudioState {
  if (typeof window === "undefined") return createInitialCostState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialCostState();
    const parsed = JSON.parse(raw) as CostStudioState;
    if (parsed?.version !== 1) return createInitialCostState();
    return { ...createInitialCostState(), ...parsed };
  } catch {
    return createInitialCostState();
  }
}

export function CostStudio() {
  const [state, setState] = useState<CostStudioState>(createInitialCostState);
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
    trackCostEvent("cost_studio_start");
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const estimate = useMemo(
    () => calculateCostEstimate(state.selections),
    [state.selections],
  );

  const patch = useCallback((partial: Partial<CostSelections>, event?: string) => {
    setState((prev) => ({
      ...prev,
      selections: { ...prev.selections, ...partial },
    }));
    trackCostEvent("estimate_updated");
    if (event) trackCostEvent("option_selected", { option: event });
  }, []);

  const go = (step: CostStep) => {
    setState((prev) => ({ ...prev, step }));
    trackCostEvent("step_view", { step_name: step });
  };

  const next = () => {
    const i = COST_STEPS.indexOf(state.step);
    if (i < COST_STEPS.length - 1) {
      trackCostEvent("step_completed", { step_name: state.step });
      go(COST_STEPS[i + 1]);
    }
  };

  const back = () => {
    const i = COST_STEPS.indexOf(state.step);
    if (i > 0) go(COST_STEPS[i - 1]);
  };

  const toggleAddon = (id: AddonId) => {
    const cur = state.selections.addons;
    const nextAddons = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    patch({ addons: nextAddons }, `addon_${id}`);
  };

  const unlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    trackCostEvent("form_submit");
    const configId = state.configId ?? generateCostConfigId();
    try {
      const res = await fetch("/api/cost-studio/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          configId,
          contact: state.contact,
          selections: state.selections,
          estimate,
          source: "cost-studio",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Unable to unlock details.");
      }
      setState((prev) => ({ ...prev, unlocked: true, configId }));
      trackCostEvent("summary_unlocked", { config_id: configId });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const downloadSummary = () => {
    trackCostEvent("pdf_downloaded", { config_id: state.configId });
    const lines = [
      "Vantage Vision Cost Studio — Construction Estimate Summary",
      `Config: ${state.configId}`,
      `Range: ${formatRange(estimate.low, estimate.high)}`,
      `Size: ${state.selections.sqft} sq ft`,
      `Style: ${state.selections.style}`,
      `Finish: ${state.selections.finish}`,
      `Basement: ${state.selections.basement}`,
      `Roof: ${state.selections.roof}`,
      `Garage: ${state.selections.garage}`,
      `Add-ons: ${state.selections.addons.join(", ") || "none"}`,
      "",
      "LINE ITEMS (mid conceptual)",
      ...estimate.lines.map((l) => `${l.label}: ${formatUsd(l.amount)}`),
      "",
      costDisclaimer,
      "",
      "Next: Schedule complimentary consultation at /start",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vantage-cost-${state.configId ?? "summary"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!hydrated) {
    return (
      <div className="section">
        <div className="container-v text-center text-text-muted">Loading Cost Studio…</div>
      </div>
    );
  }

  const s = state.selections;
  const stepIndex = COST_STEPS.indexOf(state.step);
  const pct = ((stepIndex + 1) / COST_STEPS.length) * 100;

  return (
    <div id="calculator" className="bg-bg">
      {/* Progress */}
      <div className="border-b border-border bg-surface">
        <div className="container-wide py-4">
          <div className="mb-2 flex justify-between text-xs uppercase tracking-[0.14em]">
            <span className="text-text-dim">
              Vision Cost Studio · Step {stepIndex + 1} of {COST_STEPS.length}
            </span>
            <span className="text-gold-deep">{COST_STEP_LABELS[state.step]}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-bg-elevated">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-bright to-gold-deep transition-[width] duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {state.step !== "lot" ? <EstimatePill estimate={estimate} /> : null}

      <div className="section pt-8">
        <div className="container-wide grid gap-6 lg:grid-cols-[minmax(260px,0.9fr)_minmax(0,1.25fr)] lg:items-start">
          {/* Decisions scroll; model column is wider so the visual stays dominant */}
          <div className="min-w-0 order-2 lg:order-1 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1">
            {state.step === "lot" && (
              <StepShell
                title="How will you build?"
                body="Start with your lot situation — including knockdown rebuilds, a North Jersey specialty."
              >
                <div className="grid gap-4 sm:grid-cols-3">
                  {lotOptions.map((opt) => (
                    <Choice
                      key={opt.id}
                      selected={s.lotPath === opt.id}
                      title={opt.label}
                      body={opt.blurb}
                      onClick={() => patch({ lotPath: opt.id }, `lot_${opt.id}`)}
                    />
                  ))}
                </div>
                <Nav onBack={undefined} onNext={next} nextDisabled={!s.lotPath} nextLabel="Begin designing" />
              </StepShell>
            )}

            {state.step === "size" && (
              <StepShell
                title="How much space does your family need?"
                body="A typical 5-bedroom luxury home in our area is roughly 4,000–5,000 sq ft. Drag to set your footprint."
              >
                <div className="card p-6">
                  <div className="flex items-end justify-between gap-4">
                    <p className="font-display text-5xl text-ivory">
                      {s.sqft.toLocaleString()}
                      <span className="ml-2 text-lg text-text-dim">sq ft</span>
                    </p>
                    <p className="text-sm text-gold-deep">
                      Live range {formatRange(estimate.low, estimate.high)}
                    </p>
                  </div>
                  <input
                    type="range"
                    min={1600}
                    max={7000}
                    step={50}
                    value={s.sqft}
                    onChange={(e) => patch({ sqft: Number(e.target.value) }, "sqft")}
                    className="mt-6 w-full accent-[#b8893d]"
                    aria-label="Home size in square feet"
                  />
                  <div className="mt-2 flex justify-between text-xs text-text-dim">
                    <span>1,600</span>
                    <span>4,000</span>
                    <span>7,000+</span>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="mb-3 text-sm font-medium text-ivory">Stories</p>
                  <div className="flex flex-wrap gap-2">
                    {([1, 1.5, 2] as const).map((n) => (
                      <button
                        key={n}
                        type="button"
                        className={`rounded-full border px-4 py-2 text-sm ${
                          s.stories === n
                            ? "border-gold bg-gold/10 text-gold-deep"
                            : "border-border text-text-muted"
                        }`}
                        onClick={() => patch({ stories: n }, `stories_${n}`)}
                      >
                        {n === 1 ? "1 story" : n === 1.5 ? "1.5 story" : "2 story"}
                      </button>
                    ))}
                  </div>
                </div>
                <Nav onBack={back} onNext={next} />
              </StepShell>
            )}

            {state.step === "style" && (
              <StepShell
                title="What style fits your vision?"
                body="Choose a character — every style is fully customizable in Design & Discovery."
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {styleOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => patch({ style: opt.id }, `style_${opt.id}`)}
                      className={`card overflow-hidden p-0 text-left ${
                        s.style === opt.id ? "border-gold ring-2 ring-gold/35" : ""
                      }`}
                    >
                      <div className="relative aspect-[16/10]">
                        <SmartImage
                          src={styleMedia[opt.id]?.image}
                          alt={styleMedia[opt.id]?.alt || opt.label}
                          fill
                          sizes="(max-width:768px) 100vw, 40vw"
                        />
                        {s.style === opt.id && (
                          <span className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-white">
                            ✓
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="font-display text-2xl text-ivory">{opt.label}</p>
                        <p className="mt-1 text-sm text-text-muted">{opt.blurb}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <Nav onBack={back} onNext={next} nextDisabled={!s.style} />
              </StepShell>
            )}

            {state.step === "finish" && (
              <StepShell
                title="Select your finish level"
                body="Transparent tiers for North Jersey luxury — not a final package."
              >
                <div className="grid gap-4">
                  {finishOptions.map((opt) => (
                    <Choice
                      key={opt.id}
                      selected={s.finish === opt.id}
                      title={opt.label}
                      meta={opt.psfHint}
                      body={opt.description}
                      onClick={() => patch({ finish: opt.id }, `finish_${opt.id}`)}
                    />
                  ))}
                </div>
                <Nav onBack={back} onNext={next} nextDisabled={!s.finish} />
              </StepShell>
            )}

            {state.step === "features" && (
              <StepShell
                title="Basement, roof, garage & lifestyle"
                body="North Jersey homes usually include basements — toggle packages and watch the model update."
              >
                <SectionLabel>Basement (NJ differentiator)</SectionLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {basementOptions.map((opt) => (
                    <Choice
                      key={opt.id}
                      selected={s.basement === opt.id}
                      title={opt.label}
                      body={opt.blurb}
                      onClick={() => patch({ basement: opt.id }, `basement_${opt.id}`)}
                    />
                  ))}
                </div>

                <SectionLabel>Roof</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {roofOptions.map((opt) => (
                    <Chip
                      key={opt.id}
                      selected={s.roof === opt.id}
                      label={opt.label}
                      onClick={() => patch({ roof: opt.id }, `roof_${opt.id}`)}
                    />
                  ))}
                </div>

                <SectionLabel>Garage</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {garageOptions.map((opt) => (
                    <Chip
                      key={opt.id}
                      selected={s.garage === opt.id}
                      label={opt.label}
                      onClick={() => patch({ garage: opt.id }, `garage_${opt.id}`)}
                    />
                  ))}
                </div>

                <SectionLabel>Wishlist add-ons</SectionLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {addonCatalog.map((opt) => (
                    <Choice
                      key={opt.id}
                      selected={s.addons.includes(opt.id)}
                      title={opt.label}
                      meta={`${formatUsd(opt.low)} – ${formatUsd(opt.high)}`}
                      body={opt.description}
                      onClick={() => toggleAddon(opt.id)}
                      multi
                    />
                  ))}
                </div>
                <Nav onBack={back} onNext={next} nextLabel="See my estimate" />
              </StepShell>
            )}

            {state.step === "summary" && (
              <div className="space-y-6">
                <div className="card p-6 sm:p-8">
                  <p className="eyebrow">Your free instant range</p>
                  <h2 className="mt-2 font-display text-4xl text-ivory">
                    {formatRange(estimate.low, estimate.high)}
                  </h2>
                  <p className="mt-2 text-text-muted">
                    {s.sqft.toLocaleString()} sq ft · {s.style?.replace("-", " ")} · {s.finish}{" "}
                    finishes · {s.addons.length} lifestyle add-on
                    {s.addons.length === 1 ? "" : "s"}
                  </p>
                  <p className="mt-4 text-xs text-text-dim">*{costDisclaimer}</p>
                </div>

                {!state.unlocked ? (
                  <div className="card p-6 sm:p-8">
                    <h3 className="font-display text-3xl text-ivory">
                      Unlock your itemized breakdown
                    </h3>
                    <p className="mt-2 text-text-muted">
                      Free range above stays open. Enter your details to reveal the full
                      line-item visualization, save your design, and get a summary for consultation.
                    </p>
                    <form onSubmit={unlock} className="mt-6 grid gap-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                          label="First name"
                          required
                          value={state.contact.firstName}
                          onChange={(v) =>
                            setState((p) => ({
                              ...p,
                              contact: { ...p.contact, firstName: v },
                            }))
                          }
                        />
                        <Field
                          label="Last name"
                          required
                          value={state.contact.lastName}
                          onChange={(v) =>
                            setState((p) => ({
                              ...p,
                              contact: { ...p.contact, lastName: v },
                            }))
                          }
                        />
                      </div>
                      <Field
                        label="Email"
                        type="email"
                        required
                        value={state.contact.email}
                        onChange={(v) =>
                          setState((p) => ({
                            ...p,
                            contact: { ...p.contact, email: v },
                          }))
                        }
                      />
                      <Field
                        label="Phone (preferred)"
                        type="tel"
                        value={state.contact.phone}
                        onChange={(v) =>
                          setState((p) => ({
                            ...p,
                            contact: { ...p.contact, phone: v },
                          }))
                        }
                      />
                      {error ? (
                        <p className="text-sm text-red-700" role="alert">
                          {error}
                        </p>
                      ) : null}
                      <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? "Unlocking…" : "Reveal detailed breakdown"}
                      </button>
                    </form>
                    <button type="button" className="btn btn-ghost mt-3 px-0" onClick={back}>
                      ← Edit selections
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="card p-6 sm:p-8">
                      <p className="text-sm text-gold-deep">
                        Config ID: <strong>{state.configId}</strong>
                      </p>
                      <div className="mt-6">
                        <CostBreakdown estimate={estimate} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={`/start?source=cost-studio&config=${encodeURIComponent(
                          state.configId ?? "",
                        )}&name=${encodeURIComponent(
                          `${state.contact.firstName} ${state.contact.lastName}`.trim(),
                        )}&email=${encodeURIComponent(state.contact.email)}&phone=${encodeURIComponent(
                          state.contact.phone,
                        )}`}
                        className="btn btn-primary"
                        onClick={() =>
                          trackCostEvent("consultation_clicked", {
                            config_id: state.configId,
                          })
                        }
                      >
                        Schedule complimentary consultation
                      </Link>
                      <button type="button" className="btn btn-secondary" onClick={downloadSummary}>
                        Download summary
                      </button>
                      <Link href="/design-studio" className="btn btn-secondary">
                        Open Design Studio
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Living model — visual hero; sticky + larger column */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start">
            <div className="studio-model-stage !aspect-auto !min-h-[min(48vh,380px)] !max-h-[min(70vh,620px)] h-[min(58vh,540px)]">
              <InteractiveHouseModel selections={s} className="!border-0 !shadow-none h-full !rounded-none" />
            </div>
            {state.step !== "lot" && state.step !== "summary" ? (
              <div className="studio-estimate-card mt-3">
                <p className="studio-estimate-label">Instant range</p>
                <p className="studio-estimate-range">
                  {formatRange(estimate.low, estimate.high)}
                </p>
                <p className="studio-estimate-meta">Construction only · No surprises</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepShell({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-4xl text-ivory">{title}</h2>
      <p className="mt-3 max-w-2xl text-text-muted">{body}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">
      {children}
    </p>
  );
}

function Choice({
  selected,
  title,
  body,
  meta,
  onClick,
  multi,
}: {
  selected: boolean;
  title: string;
  body: string;
  meta?: string;
  onClick: () => void;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`card w-full p-5 text-left transition ${
        selected ? "border-gold ring-2 ring-gold/30" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-display text-xl text-ivory">{title}</p>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs ${
            selected ? "border-gold bg-gold text-white" : "border-border text-transparent"
          }`}
        >
          ✓
        </span>
      </div>
      {meta ? <p className="mt-1 text-sm font-medium text-gold-deep">{meta}</p> : null}
      <p className="mt-2 text-sm text-text-muted">{body}</p>
      {multi && selected ? (
        <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold-deep">
          Added to vision
        </p>
      ) : null}
    </button>
  );
}

function Chip({
  selected,
  label,
  onClick,
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm ${
        selected ? "border-gold bg-gold/10 text-gold-deep" : "border-border text-text-muted"
      }`}
    >
      {label}
    </button>
  );
}

function Nav({
  onBack,
  onNext,
  nextDisabled,
  nextLabel = "Continue",
}: {
  onBack?: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
      {onBack ? (
        <button type="button" className="btn btn-secondary" onClick={onBack}>
          Back
        </button>
      ) : (
        <span />
      )}
      <button type="button" className="btn btn-primary" onClick={onNext} disabled={nextDisabled}>
        {nextLabel}
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="label">{label}</label>
      <input
        className="input"
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
