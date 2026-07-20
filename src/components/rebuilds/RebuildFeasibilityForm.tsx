"use client";

import { useState } from "react";
import { FormConfirmation } from "@/components/forms/FormConfirmation";
import { trackEvent } from "@/lib/analytics";

const reasons = [
  "Need more space",
  "House is aging / systems failing",
  "Want open-concept layout",
  "Ceilings too low",
  "Love the lot, hate the house",
  "Other",
] as const;

const stages = [
  "Just dreaming / exploring",
  "Seriously evaluating builders",
  "Ready to move forward",
] as const;

export function RebuildFeasibilityForm() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    reason: (typeof reasons)[number];
    stage: (typeof stages)[number];
    notes: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    reason: "Need more space",
    stage: "Just dreaming / exploring",
    notes: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    trackEvent("rebuild_feasibility_submit", {
      event_category: "rebuilds",
      stage: form.stage,
      reason: form.reason,
    });
    try {
      const res = await fetch("/api/transformations/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "rebuild-feasibility",
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          payload: {
            propertyAddress: form.address,
            primaryReason: form.reason,
            stage: form.stage,
            notes: form.notes,
            leadIntent: "Knockdown / Rebuild Feasibility Report",
          },
          source: "custom-homes/rebuilds",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Unable to submit.");
      }
      setDone(true);
      trackEvent("rebuild_feasibility_captured", { event_category: "rebuilds" });
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
          { href: "/cost-to-build-a-house-nj", label: "Explore Cost Studio" },
          { href: "/custom-homes/rebuilds", label: "Rebuilds resources" },
        ]}
      />
    );
  }

  return (
    <form id="feasibility" onSubmit={submit} className="card scroll-mt-28 space-y-5 p-6 sm:p-8">
      <div>
        <p className="eyebrow">High-value next step</p>
        <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
          Request your Rebuild Feasibility Report
        </h2>
        <p className="mt-3 max-w-2xl text-text-muted">
          Love your neighborhood but outgrown the house? Tell us about the lot — we&apos;ll help you
          understand what it can legally and practically hold, with a transparent path to either
          rebuild or renovate.
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

      <Field
        label="Property address"
        required
        value={form.address}
        onChange={(v) => setForm((f) => ({ ...f, address: v }))}
        placeholder="Street, town, NJ"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Primary reason for considering a rebuild</label>
          <select
            className="input"
            value={form.reason}
            onChange={(e) =>
              setForm((f) => ({ ...f, reason: e.target.value as (typeof reasons)[number] }))
            }
          >
            {reasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Where are you in the process?</label>
          <select
            className="input"
            value={form.stage}
            onChange={(e) =>
              setForm((f) => ({ ...f, stage: e.target.value as (typeof stages)[number] }))
            }
          >
            {stages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label">Anything else we should know? (optional)</label>
        <textarea
          className="input min-h-[100px]"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          placeholder="Lot quirks, HOA, target size, timeline…"
        />
      </div>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Sending…" : "Request feasibility report"}
      </button>
      <p className="text-xs text-text-dim">
        Tagged as a Knockdown / Rebuild lead. No spam — just a thoughtful follow-up from the Vantage
        team.
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
