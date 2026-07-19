"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { plans } from "@/lib/plans";
import { trackStudioEvent } from "@/lib/design-studio/analytics";
import { summarizeSelections } from "@/lib/design-studio/labels";
import {
  exteriorPalettes,
  finishLevels,
  lifestyleOptions,
  lotOptions,
  priorityOptions,
  roofOptions,
  sizeOptions,
  styleOptions,
  studioEstimateDisclaimer,
  timelineOptions,
} from "@/lib/design-studio/options";
import { estimateLabelParts, formatEstimateRange } from "@/lib/design-studio/pricing";
import {
  STEPS,
  createInitialState,
  generateConfigId,
  type DesignSelections,
  type DesignStudioState,
  type LifestyleAddon,
  type Priority,
  type StudioStep,
} from "@/lib/design-studio/types";
import { lifestyleMedia, roofMedia, sizeBandMedia, styleMedia } from "@/lib/plan-media";
import { EstimateBar } from "./EstimateBar";
import { OptionCard } from "./OptionCard";
import { PlanDetailModal } from "./PlanDetailModal";
import { PlanVisualCard } from "./PlanVisualCard";
import { ProgressBar } from "./ProgressBar";
import { SelectedPlanPreview } from "./SelectedPlanPreview";
import { VisualChoiceCard } from "./VisualChoiceCard";

const STORAGE_KEY = "vantage-design-studio-v1";

function loadState(): DesignStudioState {
  if (typeof window === "undefined") return createInitialState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw) as DesignStudioState;
    if (parsed?.version !== 1) return createInitialState();
    return { ...createInitialState(), ...parsed };
  } catch {
    return createInitialState();
  }
}

function NavButtons({
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
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
      <button
        type="button"
        className="btn btn-primary"
        onClick={onNext}
        disabled={nextDisabled}
      >
        {nextLabel}
      </button>
    </div>
  );
}

export function DesignStudio() {
  const [state, setState] = useState<DesignStudioState>(createInitialState);
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailNote, setEmailNote] = useState<string | null>(null);
  const [detailSlug, setDetailSlug] = useState<string | null>(null);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const estimate = useMemo(
    () => estimateLabelParts(state.selections),
    [state.selections],
  );

  const goTo = useCallback((step: StudioStep) => {
    setState((prev) => ({ ...prev, step }));
    trackStudioEvent("step_view", { step_name: step, step_number: STEPS.indexOf(step) + 1 });
  }, []);

  const completeStep = useCallback(
    (from: StudioStep, to: StudioStep) => {
      trackStudioEvent("step_completed", {
        step_name: from,
        step_number: STEPS.indexOf(from) + 1,
      });
      goTo(to);
    },
    [goTo],
  );

  const patchSelections = useCallback(
    (patch: Partial<DesignSelections>, event?: { category: string; value: string }) => {
      setState((prev) => {
        const next = { ...prev, selections: { ...prev.selections, ...patch } };
        return next;
      });
      if (event) {
        trackStudioEvent("option_selected", {
          option_category: event.category,
          option_value: event.value,
        });
      }
      trackStudioEvent("estimate_updated");
    },
    [],
  );

  const togglePriority = (id: Priority) => {
    const current = state.selections.priorities;
    const next = current.includes(id)
      ? current.filter((p) => p !== id)
      : [...current, id];
    patchSelections({ priorities: next }, { category: "priority", value: id });
  };

  const toggleLifestyle = (id: LifestyleAddon) => {
    const current = state.selections.lifestyle;
    const next = current.includes(id)
      ? current.filter((p) => p !== id)
      : [...current, id];
    patchSelections({ lifestyle: next }, { category: "lifestyle", value: id });
  };

  const startStudio = () => {
    setState((prev) => ({
      ...prev,
      startedAt: prev.startedAt ?? new Date().toISOString(),
    }));
    trackStudioEvent("design_studio_start");
    completeStep("welcome", "size");
  };

  const onLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    trackStudioEvent("form_submit");

    const configId = state.configId ?? generateConfigId();
    const payload = {
      configId,
      contact: state.contact,
      selections: state.selections,
      summary: summarizeSelections(state.selections),
      estimate: estimate.range,
      estimateLabel: formatEstimateRange(estimate.range),
      disclaimer: studioEstimateDisclaimer,
      source: "design-studio",
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/design-studio/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Unable to save your vision. Please try again.");
      }

      setState((prev) => ({
        ...prev,
        unlocked: true,
        configId,
        completedAt: new Date().toISOString(),
      }));
      trackStudioEvent("summary_unlocked", { config_id: configId });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const downloadSummary = () => {
    trackStudioEvent("pdf_downloaded", { config_id: state.configId });
    const summary = summarizeSelections(state.selections);
    const lines = [
      "Vantage Construction — Design Your Vantage Vision",
      `Configuration ID: ${state.configId ?? "—"}`,
      `Estimated range: ${formatEstimateRange(estimate.range)}`,
      "",
      "SELECTIONS",
      `Lot status: ${summary.lotStatus ?? "—"}`,
      `Timeline: ${summary.timeline ?? "—"}`,
      `Size: ${summary.sizeBand ?? "—"}`,
      `Starting plan: ${summary.plan ?? "—"}`,
      `Style: ${summary.style ?? "—"}`,
      `Roof: ${summary.roof ?? "—"}`,
      `Exterior palette: ${summary.exteriorPalette ?? "—"}`,
      `Finish level: ${summary.finishLevel ?? "—"}`,
      `Priorities: ${summary.priorities.join(", ") || "—"}`,
      `Lifestyle: ${summary.lifestyle.join(", ") || "—"}`,
      `Other notes: ${summary.lifestyleOther ?? "—"}`,
      "",
      "CONTACT",
      `${state.contact.firstName} ${state.contact.lastName}`,
      state.contact.email,
      state.contact.phone,
      "",
      studioEstimateDisclaimer,
      "",
      "Next step: Schedule your complimentary consultation at /start",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vantage-vision-${state.configId ?? "summary"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const emailSummary = () => {
    trackStudioEvent("email_summary_clicked", { config_id: state.configId });
    const summary = summarizeSelections(state.selections);
    const body = encodeURIComponent(
      [
        `Hi ${state.contact.firstName},`,
        "",
        "Here is your Vantage Vision summary:",
        `Config ID: ${state.configId}`,
        `Estimated range: ${formatEstimateRange(estimate.range)}`,
        `Style: ${summary.style}`,
        `Size: ${summary.sizeBand}`,
        `Finish: ${summary.finishLevel}`,
        "",
        studioEstimateDisclaimer,
        "",
        "Schedule a complimentary consultation: https://vantageconstruct.com/start",
      ].join("\n"),
    );
    window.location.href = `mailto:${state.contact.email}?subject=${encodeURIComponent(
      "Your Vantage Vision Summary",
    )}&body=${body}`;
    setEmailNote("Your email client should open with the summary ready to send.");
  };

  if (!hydrated) {
    return (
      <div className="section">
        <div className="container-v text-center text-text-muted">Loading Design Studio…</div>
      </div>
    );
  }

  const s = state.selections;
  const sizePlans = s.sizeBand
    ? plans.filter((p) => p.sizeBand === s.sizeBand)
    : plans;
  const selectedPlan = s.planSlug ? plans.find((p) => p.slug === s.planSlug) : null;
  const detailPlan = detailSlug ? plans.find((p) => p.slug === detailSlug) : null;

  const palette = exteriorPalettes.find((p) => p.id === s.exteriorPalette);
  const style = styleOptions.find((st) => st.id === s.style);

  return (
    <div id="studio" className="bg-bg">
      <ProgressBar step={state.step} />
      {state.step !== "welcome" ? <EstimateBar selections={s} /> : null}

      <div className="section pt-10">
        <div className="container-v">
          {/* WELCOME */}
          {state.step === "welcome" ? (
            <div className="mx-auto max-w-3xl">
              <p className="eyebrow">Design Your Vantage Vision</p>
              <h2 className="mt-3 font-display text-4xl text-ivory sm:text-5xl">
                A private design studio for your future home
              </h2>
              <p className="mt-4 text-lg text-text-muted">
                Shape size, style, exterior character, finishes, and lifestyle — then unlock a
                personalized Vision Summary that prepares you for a no-surprises conversation with
                Victor&apos;s team.
              </p>

              <div className="mt-10 space-y-8">
                <div>
                  <h3 className="font-display text-2xl text-ivory">
                    Do you already own a lot in Central or Northern New Jersey?
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {lotOptions.map((opt) => (
                      <OptionCard
                        key={opt.id}
                        selected={s.lotStatus === opt.id}
                        title={opt.label}
                        description={opt.description}
                        onClick={() =>
                          patchSelections(
                            { lotStatus: opt.id },
                            { category: "lot_status", value: opt.id },
                          )
                        }
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl text-ivory">
                    Timeline <span className="text-base text-text-dim">(optional)</span>
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {timelineOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`rounded-full border px-4 py-2 text-sm transition ${
                          s.timeline === opt.id
                            ? "border-gold bg-gold/10 text-gold-deep"
                            : "border-border text-text-muted hover:border-gold"
                        }`}
                        onClick={() =>
                          patchSelections(
                            { timeline: opt.id },
                            { category: "timeline", value: opt.id },
                          )
                        }
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <NavButtons
                onNext={startStudio}
                nextLabel="Begin Designing"
                nextDisabled={!s.lotStatus}
              />
            </div>
          ) : null}

          {/* SIZE */}
          {state.step === "size" ? (
            <div>
              <h2 className="font-display text-4xl text-ivory">Home size</h2>
              <p className="mt-3 max-w-2xl text-text-muted">
                Choose a size band seeded from real Vantage available-home starting prices — or start
                from a specific plan and see the actual design first.
              </p>
              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {sizeOptions.map((opt) => (
                  <VisualChoiceCard
                    key={opt.id}
                    selected={s.sizeBand === opt.id && !s.planSlug}
                    title={opt.label}
                    meta={opt.rangeLabel}
                    description={`${opt.anchor}. ${opt.description}`}
                    imageSrc={sizeBandMedia[opt.id]}
                    imageAlt={`${opt.label} representative custom home design`}
                    onClick={() =>
                      patchSelections(
                        { sizeBand: opt.id, planSlug: null },
                        { category: "size_band", value: opt.id },
                      )
                    }
                  />
                ))}
              </div>

              {selectedPlan ? (
                <div className="mt-10">
                  <SelectedPlanPreview
                    plan={selectedPlan}
                    onOpenDetails={() => setDetailSlug(selectedPlan.slug)}
                  />
                </div>
              ) : null}

              <div className="mt-12">
                <h3 className="font-display text-3xl text-ivory">
                  Or start from a specific available plan
                </h3>
                <p className="mt-2 text-sm text-text-muted">
                  Every card shows a real exterior elevation from the Available Homes catalog.
                  {s.sizeBand ? " Showing plans in your selected size band." : " Showing the full catalog."}
                </p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {sizePlans.map((plan, index) => (
                    <PlanVisualCard
                      key={plan.slug}
                      plan={plan}
                      selected={s.planSlug === plan.slug}
                      priority={index < 3}
                      onSelect={() =>
                        patchSelections(
                          { planSlug: plan.slug, sizeBand: plan.sizeBand },
                          { category: "plan", value: plan.slug },
                        )
                      }
                      onOpenDetails={() => setDetailSlug(plan.slug)}
                    />
                  ))}
                </div>
                <Link href="/available-homes" className="btn btn-ghost mt-4 px-0">
                  Browse full plan explorer →
                </Link>
              </div>

              <NavButtons
                onBack={() => goTo("welcome")}
                onNext={() => completeStep("size", "style")}
                nextDisabled={!s.sizeBand && !s.planSlug}
              />

              {detailPlan ? (
                <PlanDetailModal
                  plan={detailPlan}
                  open={Boolean(detailPlan)}
                  onClose={() => setDetailSlug(null)}
                  onSelect={() =>
                    patchSelections(
                      { planSlug: detailPlan.slug, sizeBand: detailPlan.sizeBand },
                      { category: "plan", value: detailPlan.slug },
                    )
                  }
                />
              ) : null}
            </div>
          ) : null}

          {/* STYLE */}
          {state.step === "style" ? (
            <div>
              <h2 className="font-display text-4xl text-ivory">Architectural style</h2>
              <p className="mt-3 max-w-2xl text-text-muted">
                Select the character that feels most like home. Every style is fully customizable in
                Design & Discovery.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {styleOptions.map((opt, index) => {
                  const media = styleMedia[opt.id];
                  return (
                    <VisualChoiceCard
                      key={opt.id}
                      selected={s.style === opt.id}
                      title={opt.label}
                      description={opt.lifestyle}
                      imageSrc={media?.image}
                      imageAlt={media?.alt || opt.label}
                      priority={index < 3}
                      onClick={() =>
                        patchSelections({ style: opt.id }, { category: "style", value: opt.id })
                      }
                    />
                  );
                })}
              </div>
              <NavButtons
                onBack={() => goTo("size")}
                onNext={() => completeStep("style", "exterior")}
                nextDisabled={!s.style}
              />
            </div>
          ) : null}

          {/* EXTERIOR */}
          {state.step === "exterior" ? (
            <div>
              <h2 className="font-display text-4xl text-ivory">Exterior character</h2>
              <p className="mt-3 max-w-2xl text-text-muted">
                Roof and material direction — with live elevation feedback as you choose.
              </p>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-8">
                  <div>
                    <h3 className="font-display text-2xl text-ivory">Roof type</h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {roofOptions.map((opt) => {
                        const media = roofMedia[opt.id];
                        return (
                          <VisualChoiceCard
                            key={opt.id}
                            selected={s.roof === opt.id}
                            title={opt.label}
                            description={opt.description}
                            imageSrc={media?.image}
                            imageAlt={media?.alt || opt.label}
                            onClick={() =>
                              patchSelections(
                                { roof: opt.id },
                                { category: "roof", value: opt.id },
                              )
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-ivory">Color & material palette</h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {exteriorPalettes.map((opt) => (
                        <OptionCard
                          key={opt.id}
                          selected={s.exteriorPalette === opt.id}
                          title={opt.label}
                          description={opt.description}
                          onClick={() =>
                            patchSelections(
                              { exteriorPalette: opt.id },
                              { category: "exterior_palette", value: opt.id },
                            )
                          }
                        >
                          <div className="flex h-16 overflow-hidden">
                            {opt.swatches.map((c) => (
                              <div key={c} className="flex-1" style={{ background: c }} />
                            ))}
                          </div>
                        </OptionCard>
                      ))}
                    </div>
                  </div>
                </div>

                <aside className="card sticky top-36 h-fit overflow-hidden p-0">
                  <div
                    className={`relative aspect-[4/3] bg-gradient-to-br ${style?.gradient ?? "from-[#e8dcc6] to-[#c4ad88]"} transition-all duration-500`}
                  >
                    <div
                      className="absolute inset-x-8 bottom-8 top-12 rounded-t-xl border border-white/40 shadow-2xl"
                      style={{
                        background: palette
                          ? `linear-gradient(160deg, ${palette.swatches[0]}, ${palette.swatches[1]} 45%, ${palette.swatches[2]})`
                          : "linear-gradient(160deg,#f5efe6,#d8cbb8)",
                      }}
                    >
                      <div
                        className="absolute inset-x-0 top-0 h-10"
                        style={{
                          background:
                            s.roof === "standing-seam"
                              ? "repeating-linear-gradient(90deg,#6b7280 0 8px,#9ca3af 8px 10px)"
                              : s.roof === "slate-inspired"
                                ? "linear-gradient(135deg,#4b5563,#6b7280)"
                                : "linear-gradient(135deg,#5c4a3a,#8b7355)",
                        }}
                      />
                      <div className="absolute bottom-0 left-1/2 h-16 w-14 -translate-x-1/2 bg-black/20" />
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">
                      Live elevation preview
                    </p>
                    <p className="mt-2 font-display text-2xl text-ivory">
                      {style?.label ?? "Your home"} · {palette?.label ?? "Palette pending"}
                    </p>
                    <p className="mt-1 text-sm text-text-muted">
                      Conceptual visualization only — final elevations are refined in Design &
                      Discovery.
                    </p>
                  </div>
                </aside>
              </div>

              <NavButtons
                onBack={() => goTo("style")}
                onNext={() => completeStep("exterior", "interior")}
                nextDisabled={!s.roof || !s.exteriorPalette}
              />
            </div>
          ) : null}

          {/* INTERIOR */}
          {state.step === "interior" ? (
            <div>
              <h2 className="font-display text-4xl text-ivory">
                Interior finish level & priorities
              </h2>
              <p className="mt-3 max-w-2xl text-text-muted">
                Transparent tiers — not a final package. Final inclusions are specified during Design
                & Discovery.
              </p>
              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {finishLevels.map((opt) => (
                  <OptionCard
                    key={opt.id}
                    selected={s.finishLevel === opt.id}
                    title={opt.label}
                    description={opt.description}
                    onClick={() =>
                      patchSelections(
                        { finishLevel: opt.id },
                        { category: "finish_level", value: opt.id },
                      )
                    }
                  >
                    <ul className="space-y-1 border-b border-border px-5 pb-4 pt-5 text-sm text-text-muted">
                      {opt.includes.map((item) => (
                        <li key={item}>· {item}</li>
                      ))}
                    </ul>
                  </OptionCard>
                ))}
              </div>

              <h3 className="mt-12 font-display text-3xl text-ivory">Must-haves</h3>
              <p className="mt-2 text-sm text-text-muted">Select all that apply.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {priorityOptions.map((opt) => (
                  <OptionCard
                    key={opt.id}
                    multi
                    selected={s.priorities.includes(opt.id)}
                    title={opt.label}
                    onClick={() => togglePriority(opt.id)}
                  />
                ))}
              </div>

              <NavButtons
                onBack={() => goTo("exterior")}
                onNext={() => completeStep("interior", "lifestyle")}
                nextDisabled={!s.finishLevel}
              />
            </div>
          ) : null}

          {/* LIFESTYLE */}
          {state.step === "lifestyle" ? (
            <div>
              <h2 className="font-display text-4xl text-ivory">Lifestyle add-ons</h2>
              <p className="mt-3 max-w-2xl text-text-muted">
                Multi-select the experiences that matter. Ranges update transparently as you choose.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {lifestyleOptions.map((opt) => {
                  const media = lifestyleMedia[opt.id];
                  return (
                    <VisualChoiceCard
                      key={opt.id}
                      multi
                      selected={s.lifestyle.includes(opt.id)}
                      title={opt.label}
                      description={opt.description}
                      imageSrc={media?.image}
                      imageAlt={media?.alt || opt.label}
                      onClick={() => toggleLifestyle(opt.id)}
                    />
                  );
                })}
              </div>
              {s.lifestyle.includes("other") ? (
                <div className="mt-6">
                  <label className="label" htmlFor="lifestyle-other">
                    Tell us more
                  </label>
                  <textarea
                    id="lifestyle-other"
                    className="textarea"
                    value={s.lifestyleOther}
                    onChange={(e) => patchSelections({ lifestyleOther: e.target.value })}
                    placeholder="Pool house, wine room, elevator, equestrian, etc."
                  />
                </div>
              ) : null}
              <NavButtons
                onBack={() => goTo("interior")}
                onNext={() => {
                  trackStudioEvent("form_start");
                  completeStep("lifestyle", "summary");
                }}
                nextLabel="Unlock my vision"
              />
            </div>
          ) : null}

          {/* SUMMARY / GATE */}
          {state.step === "summary" ? (
            <div>
              {!state.unlocked ? (
                <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
                  <div className="card p-8">
                    <p className="eyebrow">Almost there</p>
                    <h2 className="mt-3 font-display text-4xl text-ivory">
                      Unlock your Vantage Vision Summary
                    </h2>
                    <p className="mt-3 text-text-muted">
                      We&apos;ve captured your design direction. Enter your details to reveal the
                      full summary, estimated range detail, and next steps into the real 7-step
                      process.
                    </p>
                    <div className="mt-6 rounded-xl border border-border bg-bg-elevated p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-text-dim">Teaser</p>
                      <p className="mt-2 font-display text-2xl text-ivory">
                        {style?.label ?? "Custom vision"} ·{" "}
                        {sizeOptions.find((x) => x.id === s.sizeBand)?.label ?? "Size pending"}
                      </p>
                      <p className="mt-2 text-gold-deep">
                        Current conceptual range: {formatEstimateRange(estimate.range)}*
                      </p>
                      <p className="mt-3 text-xs text-text-dim">*{studioEstimateDisclaimer}</p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary mt-6"
                      onClick={() => goTo("lifestyle")}
                    >
                      Back to edit selections
                    </button>
                  </div>

                  <form onSubmit={onLeadSubmit} className="card grid gap-4 p-8">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="label" htmlFor="ds-first">
                          First name *
                        </label>
                        <input
                          id="ds-first"
                          required
                          className="input"
                          value={state.contact.firstName}
                          onChange={(e) =>
                            setState((prev) => ({
                              ...prev,
                              contact: { ...prev.contact, firstName: e.target.value },
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label className="label" htmlFor="ds-last">
                          Last name *
                        </label>
                        <input
                          id="ds-last"
                          required
                          className="input"
                          value={state.contact.lastName}
                          onChange={(e) =>
                            setState((prev) => ({
                              ...prev,
                              contact: { ...prev.contact, lastName: e.target.value },
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="label" htmlFor="ds-email">
                        Email *
                      </label>
                      <input
                        id="ds-email"
                        type="email"
                        required
                        className="input"
                        value={state.contact.email}
                        onChange={(e) =>
                          setState((prev) => ({
                            ...prev,
                            contact: { ...prev.contact, email: e.target.value },
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="label" htmlFor="ds-phone">
                        Phone <span className="normal-case tracking-normal">(strongly preferred)</span>
                      </label>
                      <input
                        id="ds-phone"
                        type="tel"
                        className="input"
                        value={state.contact.phone}
                        onChange={(e) =>
                          setState((prev) => ({
                            ...prev,
                            contact: { ...prev.contact, phone: e.target.value },
                          }))
                        }
                      />
                    </div>
                    {submitError ? (
                      <p className="text-sm text-red-700" role="alert">
                        {submitError}
                      </p>
                    ) : null}
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                      {submitting ? "Unlocking…" : "Reveal my Vision Summary"}
                    </button>
                    <p className="text-xs text-text-dim">
                      By continuing, you agree we may contact you about your project. We never sell
                      your information.
                    </p>
                  </form>
                </div>
              ) : (
                <UnlockedSummary
                  state={state}
                  estimateLabel={formatEstimateRange(estimate.range)}
                  onDownload={downloadSummary}
                  onEmail={emailSummary}
                  emailNote={emailNote}
                  onRestart={() => {
                    localStorage.removeItem(STORAGE_KEY);
                    setState(createInitialState());
                    trackStudioEvent("design_studio_start");
                  }}
                />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function UnlockedSummary({
  state,
  estimateLabel,
  onDownload,
  onEmail,
  emailNote,
  onRestart,
}: {
  state: DesignStudioState;
  estimateLabel: string;
  onDownload: () => void;
  onEmail: () => void;
  emailNote: string | null;
  onRestart: () => void;
}) {
  const summary = summarizeSelections(state.selections);
  const consultHref = `/start?source=design-studio&config=${encodeURIComponent(
    state.configId ?? "",
  )}&name=${encodeURIComponent(`${state.contact.firstName} ${state.contact.lastName}`.trim())}&email=${encodeURIComponent(
    state.contact.email,
  )}&phone=${encodeURIComponent(state.contact.phone)}`;

  return (
    <div className="space-y-8">
      <div className="card overflow-hidden p-0">
        <div className="bg-gradient-to-r from-[#f0e6d4] via-[#e8d9bc] to-[#dcc7a0] px-8 py-10">
          <p className="eyebrow">Vision unlocked</p>
          <h2 className="mt-3 font-display text-4xl text-ivory sm:text-5xl">
            {state.contact.firstName}, your Vantage Vision is ready
          </h2>
          <p className="mt-3 text-text-muted">
            Configuration ID: <strong className="text-ivory">{state.configId}</strong>
          </p>
          <p className="mt-4 font-display text-3xl text-gold-deep">
            Conceptual range: {estimateLabel}*
          </p>
        </div>
        <div className="grid gap-6 p-8 md:grid-cols-2">
          {[
            ["Lot", summary.lotStatus],
            ["Timeline", summary.timeline],
            ["Size", summary.sizeBand],
            ["Starting plan", summary.plan],
            ["Style", summary.style],
            ["Roof", summary.roof],
            ["Exterior", summary.exteriorPalette],
            ["Finish level", summary.finishLevel],
          ].map(([label, value]) => (
            <div key={label as string} className="border-b border-border pb-3">
              <p className="text-xs uppercase tracking-[0.14em] text-text-dim">{label}</p>
              <p className="mt-1 font-display text-xl text-ivory">{value || "—"}</p>
            </div>
          ))}
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.14em] text-text-dim">Priorities</p>
            <p className="mt-1 text-text-muted">
              {summary.priorities.length ? summary.priorities.join(" · ") : "—"}
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.14em] text-text-dim">Lifestyle add-ons</p>
            <p className="mt-1 text-text-muted">
              {summary.lifestyle.length ? summary.lifestyle.join(" · ") : "—"}
              {summary.lifestyleOther ? ` — ${summary.lifestyleOther}` : ""}
            </p>
          </div>
        </div>
        <div className="border-t border-border px-8 py-5 text-xs text-text-dim">
          *{studioEstimateDisclaimer}
        </div>
      </div>

      <div className="card p-8 text-center">
        <h3 className="font-display text-3xl text-ivory">
          Ready for the real No-Surprises process?
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-text-muted">
          Your preferences will inform the complimentary consultation and Design & Discovery phase —
          so the conversation starts with clarity, not guesswork.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={consultHref}
            className="btn btn-primary"
            onClick={() =>
              trackStudioEvent("consultation_clicked", { config_id: state.configId })
            }
          >
            Schedule my complimentary consultation
          </Link>
          <button type="button" className="btn btn-secondary" onClick={onDownload}>
            Download summary
          </button>
          <button type="button" className="btn btn-secondary" onClick={onEmail}>
            Email me this summary
          </button>
        </div>
        {emailNote ? <p className="mt-4 text-sm text-text-muted">{emailNote}</p> : null}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/custom-homes/process" className="text-gold-deep hover:underline">
            Review the 7-step process
          </Link>
          <Link href="/available-homes" className="text-gold-deep hover:underline">
            Explore available homes
          </Link>
          <button type="button" className="text-text-dim hover:text-gold-deep" onClick={onRestart}>
            Start a new vision
          </button>
        </div>
      </div>
    </div>
  );
}
