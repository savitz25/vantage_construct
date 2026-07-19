"use client";

import { useMemo, useState } from "react";
import { trackRealtorEvent } from "@/lib/realtors/analytics";
import { qualifyQuestions } from "@/lib/realtors/content";
import { scoreListing } from "@/lib/realtors/model";

export function QualifyListing() {
  const [answers, setAnswers] = useState<Record<string, string>>({
    town: "",
    lot: "",
    utilities: "",
  });

  const complete = Boolean(answers.town && answers.lot && answers.utilities);
  const result = useMemo(() => {
    if (!complete) return null;
    return scoreListing({
      town: answers.town,
      lot: answers.lot,
      utilities: answers.utilities,
    });
  }, [answers, complete]);

  return (
    <section className="section">
      <div className="container-v">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">30-second check</p>
          <h2 className="mt-3 font-display text-4xl text-ivory">Does this listing qualify?</h2>
          <p className="mt-3 text-text-muted">
            Quick pre-filter so you only submit strong package candidates — and we respond faster.
          </p>
        </div>

        <div className="card mt-10 space-y-8 p-6 sm:p-8">
          {qualifyQuestions.map((q) => (
            <div key={q.id}>
              <p className="text-sm font-medium text-ivory">{q.label}</p>
              <div className="mt-3 flex flex-col gap-2">
                {q.options.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setAnswers((a) => ({ ...a, [q.id]: opt.id }));
                      trackRealtorEvent("qualify_answer", { question: q.id, answer: opt.id });
                    }}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                      answers[q.id] === opt.id
                        ? "border-gold bg-gold/10 text-ivory"
                        : "border-border text-text-muted hover:border-gold/50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {result ? (
            <div
              className={`rounded-xl border p-5 ${
                result.score === "strong"
                  ? "border-emerald-600/30 bg-emerald-50/80 text-emerald-950"
                  : result.score === "talk"
                    ? "border-amber-600/30 bg-amber-50/80 text-amber-950"
                    : "border-border bg-bg-elevated text-text-muted"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                {result.score === "strong"
                  ? "Strong package candidate"
                  : result.score === "talk"
                    ? "Let’s talk"
                    : "Honest filter"}
              </p>
              <p className="mt-2 text-sm leading-relaxed">{result.message}</p>
              <a
                href="#realtor-form"
                className="btn btn-primary mt-4"
                onClick={() => trackRealtorEvent("qualify_cta_clicked", { score: result.score })}
              >
                Submit this opportunity
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
