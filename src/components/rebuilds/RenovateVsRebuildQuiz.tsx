"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import {
  ageOptions,
  budgetOptions,
  emptyAnswers,
  evaluateQuiz,
  isQuizComplete,
  issueOptions,
  lotOptions,
  neighborhoodOptions,
  quizSteps,
  sizeOptions,
  type QuizAnswers,
  type IssueId,
} from "@/lib/rebuilds/quiz";

export function RenovateVsRebuildQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(emptyAnswers);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    trackEvent("rebuild_quiz_started", { event_category: "rebuilds" });
  }, []);

  const verdict = useMemo(
    () => (submitted && isQuizComplete(answers) ? evaluateQuiz(answers) : null),
    [submitted, answers],
  );

  const progress = ((step + (submitted ? 1 : 0)) / (quizSteps.length + 1)) * 100;

  function toggleIssue(id: IssueId) {
    setAnswers((prev) => ({
      ...prev,
      issues: prev.issues.includes(id)
        ? prev.issues.filter((x) => x !== id)
        : [...prev.issues, id],
    }));
  }

  function canAdvance(): boolean {
    switch (quizSteps[step]?.id) {
      case "age":
        return Boolean(answers.age);
      case "sizeJump":
        return Boolean(answers.sizeJump);
      case "issues":
        return answers.issues.length > 0;
      case "neighborhood":
        return Boolean(answers.neighborhood);
      case "budget":
        return Boolean(answers.budget);
      case "lot":
        return Boolean(answers.lot);
      default:
        return false;
    }
  }

  function next() {
    if (step < quizSteps.length - 1) {
      setStep((s) => s + 1);
      trackEvent("rebuild_quiz_step", {
        event_category: "rebuilds",
        step: quizSteps[step + 1]?.id,
      });
      return;
    }
    if (!isQuizComplete(answers)) return;
    const v = evaluateQuiz(answers);
    setSubmitted(true);
    trackEvent("rebuild_quiz_completed", {
      event_category: "rebuilds",
      verdict: v.id,
      score: v.score,
    });
  }

  function reset() {
    setAnswers(emptyAnswers);
    setStep(0);
    setSubmitted(false);
    trackEvent("rebuild_quiz_reset", { event_category: "rebuilds" });
  }

  const toneStyles = {
    rebuild: "border-gold/50 bg-gold/10",
    lean: "border-border-strong bg-bg-elevated",
    renovate: "border-emerald-700/30 bg-emerald-50/50",
  } as const;

  return (
    <div id="assessment" className="scroll-mt-28">
      <div className="card overflow-hidden">
        <div className="border-b border-border bg-bg-elevated px-6 py-5 sm:px-8">
          <p className="eyebrow">Interactive decision tool</p>
          <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
            Renovate vs rebuild assessment
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            Six honest questions. One of the outcomes genuinely recommends renovation when that is
            smarter — we also build renovations, so the recommendation is not a sales trick.
          </p>
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-bg-soft">
            <div
              className="h-full rounded-full bg-gold transition-all duration-300"
              style={{ width: `${Math.max(8, progress)}%` }}
            />
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {!submitted ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-dim">
                Question {step + 1} of {quizSteps.length}
              </p>
              <h3 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">
                {quizSteps[step]?.title}
              </h3>

              <div className="mt-6 space-y-3">
                {quizSteps[step]?.id === "age" &&
                  ageOptions.map((o) => (
                    <Choice
                      key={o.id}
                      active={answers.age === o.id}
                      label={o.label}
                      hint={o.hint}
                      onClick={() => setAnswers((a) => ({ ...a, age: o.id }))}
                    />
                  ))}

                {quizSteps[step]?.id === "sizeJump" &&
                  sizeOptions.map((o) => (
                    <Choice
                      key={o.id}
                      active={answers.sizeJump === o.id}
                      label={o.label}
                      hint={o.hint}
                      onClick={() => setAnswers((a) => ({ ...a, sizeJump: o.id }))}
                    />
                  ))}

                {quizSteps[step]?.id === "issues" && (
                  <div className="flex flex-wrap gap-2">
                    {issueOptions.map((o) => {
                      const on = answers.issues.includes(o.id);
                      return (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => toggleIssue(o.id)}
                          className={`rounded-full border px-4 py-2 text-sm transition ${
                            on
                              ? "border-gold bg-gold/15 text-gold-deep"
                              : "border-border text-text-muted hover:border-border-strong"
                          }`}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {quizSteps[step]?.id === "neighborhood" &&
                  neighborhoodOptions.map((o) => (
                    <Choice
                      key={o.id}
                      active={answers.neighborhood === o.id}
                      label={o.label}
                      hint={o.hint}
                      onClick={() => setAnswers((a) => ({ ...a, neighborhood: o.id }))}
                    />
                  ))}

                {quizSteps[step]?.id === "budget" &&
                  budgetOptions.map((o) => (
                    <Choice
                      key={o.id}
                      active={answers.budget === o.id}
                      label={o.label}
                      onClick={() => setAnswers((a) => ({ ...a, budget: o.id }))}
                    />
                  ))}

                {quizSteps[step]?.id === "lot" &&
                  lotOptions.map((o) => (
                    <Choice
                      key={o.id}
                      active={answers.lot === o.id}
                      label={o.label}
                      hint={o.hint}
                      onClick={() => setAnswers((a) => ({ ...a, lot: o.id }))}
                    />
                  ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!canAdvance()}
                  onClick={next}
                >
                  {step === quizSteps.length - 1 ? "See my recommendation" : "Continue"}
                </button>
              </div>
            </>
          ) : verdict ? (
            <div className={`rounded-xl border p-6 sm:p-8 ${toneStyles[verdict.tone]}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Your result · score {verdict.score}/100
              </p>
              <h3 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">{verdict.title}</h3>
              <p className="mt-4 max-w-2xl text-text-muted">{verdict.summary}</p>
              <ul className="mt-6 space-y-2">
                {verdict.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={verdict.primaryCta.href}
                  className="btn btn-primary"
                  onClick={() =>
                    trackEvent("rebuild_quiz_cta", {
                      event_category: "rebuilds",
                      cta: verdict.primaryCta.label,
                      verdict: verdict.id,
                    })
                  }
                >
                  {verdict.primaryCta.label}
                </Link>
                <Link href={verdict.secondaryCta.href} className="btn btn-secondary">
                  {verdict.secondaryCta.label}
                </Link>
                <button type="button" className="btn btn-secondary" onClick={reset}>
                  Retake assessment
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Choice({
  active,
  label,
  hint,
  onClick,
}: {
  active: boolean;
  label: string;
  hint?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border px-4 py-4 text-left transition ${
        active
          ? "border-gold bg-gold/10 shadow-sm"
          : "border-border bg-surface hover:border-border-strong"
      }`}
    >
      <span className="font-medium text-ivory">{label}</span>
      {hint ? <span className="mt-1 block text-xs text-text-dim">{hint}</span> : null}
    </button>
  );
}
