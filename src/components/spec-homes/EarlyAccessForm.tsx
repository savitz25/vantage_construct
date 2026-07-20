"use client";

import { useState } from "react";
import { FormConfirmation } from "@/components/forms/FormConfirmation";
import { trackEvent } from "@/lib/analytics";
import { company } from "@/lib/company";

const budgets = [
  "Under $1.2M",
  "$1.2M – $1.8M",
  "$1.8M – $2.5M",
  "$2.5M+",
  "Flexible / explore",
] as const;

const timelines = [
  "0–6 months",
  "6–12 months",
  "12–24 months",
  "Just exploring",
] as const;

const townOptions = [
  ...company.focusTowns,
  "Westfield",
  "Other North Jersey",
] as const;

export function EarlyAccessForm() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [towns, setTowns] = useState<string[]>(["Warren"]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    budget: budgets[1] as string,
    timeline: timelines[1] as string,
    style: "",
    notes: "",
  });

  function toggleTown(t: string) {
    setTowns((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    trackEvent("spec_early_access_submit", {
      event_category: "spec_homes",
      budget: form.budget,
      timeline: form.timeline,
    });
    try {
      const res = await fetch("/api/transformations/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "spec-early-access",
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          payload: {
            preferredTowns: towns,
            budgetRange: form.budget,
            timeline: form.timeline,
            preferredStyle: form.style,
            notes: form.notes,
            leadIntent: "Signature Builds Early Access / VIP Waitlist",
          },
          source: "land/spec-homes",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Unable to submit.");
      }
      setDone(true);
      trackEvent("spec_early_access_captured", { event_category: "spec_homes" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <FormConfirmation
        variant="design"
        extraLinks={[
          { href: "/start", label: "Schedule a consultation", primary: true },
          { href: "#inventory", label: "Browse current inventory" },
          { href: "/land/spec-homes", label: "Signature Builds" },
        ]}
      />
    );
  }

  return (
    <form id="early-access" onSubmit={submit} className="card scroll-mt-28 space-y-5 p-6 sm:p-8">
      <div>
        <p className="eyebrow">VIP Early Access</p>
        <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
          The best opportunities often never reach the public market
        </h2>
        <p className="mt-3 max-w-2xl text-text-muted">
          Join the Signature Builds list for early notification of new lots and homes — before broad
          release. Share towns, budget, and timeline so we only surface what fits.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="First name"
          required
          value={form.firstName}
          onChange={(v) => setForm((f) => ({ ...f, firstName: v }))}
        />
        <Field
          label="Last name"
          value={form.lastName}
          onChange={(v) => setForm((f) => ({ ...f, lastName: v }))}
        />
        <Field
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
        />
        <Field
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
        />
      </div>

      <div>
        <p className="label">Preferred towns</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {townOptions.map((t) => {
            const on = towns.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTown(t)}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${
                  on
                    ? "border-gold bg-gold/15 text-gold-deep"
                    : "border-border text-text-muted hover:border-gold/40"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Target budget</label>
          <select
            className="input"
            value={form.budget}
            onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
          >
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Preferred timeline</label>
          <select
            className="input"
            value={form.timeline}
            onChange={(e) => setForm((f) => ({ ...f, timeline: e.target.value }))}
          >
            {timelines.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Field
        label="Preferred home style (optional)"
        value={form.style}
        onChange={(v) => setForm((f) => ({ ...f, style: v }))}
        placeholder="Modern farmhouse, transitional, contemporary…"
      />

      <div>
        <label className="label">Notes (optional)</label>
        <textarea
          className="input min-h-[90px]"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          placeholder="School district priorities, knockdown interest, must-have rooms…"
        />
      </div>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Joining…" : "Join the Early Access list"}
      </button>
      <p className="text-xs text-text-dim">
        Tagged as Signature Builds Early Access lead. No spam — only relevant inventory alerts.
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="label">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        className="input"
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
