"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

const goals = [
  "Custom new home",
  "Knockdown rebuild",
  "Addition / expansion",
  "Still deciding program",
  "Other",
] as const;

const statuses = [
  "Actively looking at land",
  "Under contract / due diligence",
  "Already own the property",
  "Considering a knockdown on current home",
] as const;

export function LotAuditForm() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    goal: (typeof goals)[number];
    status: (typeof statuses)[number];
    notes: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    goal: "Custom new home",
    status: "Actively looking at land",
    notes: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    trackEvent("land_eval_audit_submit", {
      event_category: "land_evaluation",
      status: form.status,
      goal: form.goal,
    });
    try {
      const res = await fetch("/api/transformations/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "land-evaluation",
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          payload: {
            propertyAddress: form.address,
            buildGoal: form.goal,
            ownershipStatus: form.status,
            notes: form.notes,
            leadIntent: "Pre-Purchase Lot Audit / Rapid Feasibility Review",
          },
          source: "land/evaluation",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Unable to submit.");
      }
      setDone(true);
      trackEvent("land_eval_audit_captured", { event_category: "land_evaluation" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="card p-8 text-center sm:p-10">
        <p className="studio-estimate-label">Request received</p>
        <h3 className="mt-2 font-display text-3xl text-ivory">We&apos;ll review your lot</h3>
        <p className="mx-auto mt-3 max-w-md text-text-muted">
          A Vantage team member will follow up for a Rapid Feasibility conversation — tagged as a
          Land Evaluation lead with your property notes.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/start" className="btn btn-primary">
            Prefer to schedule now?
          </Link>
          <Link href="/cost-to-build-a-house-nj" className="btn btn-secondary">
            Cost Studio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form id="lot-audit" onSubmit={submit} className="card scroll-mt-28 space-y-5 p-6 sm:p-8">
      <div>
        <p className="eyebrow">High-value next step</p>
        <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
          Request a Pre-Purchase Lot Audit
        </h2>
        <p className="mt-3 max-w-2xl text-text-muted">
          Fast expert second opinion before you spend another dollar on land, plans, or hope. Share
          the address (or MLS link) and what you want to build — we&apos;ll tell you if the path is
          clear, constrained, or a walk-away.
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
        label="Property address or MLS link"
        required
        value={form.address}
        onChange={(v) => setForm((f) => ({ ...f, address: v }))}
        placeholder="Street, town, NJ — or paste MLS URL"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">What do you hope to build?</label>
          <select
            className="input"
            value={form.goal}
            onChange={(e) =>
              setForm((f) => ({ ...f, goal: e.target.value as (typeof goals)[number] }))
            }
          >
            {goals.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Where are you in the process?</label>
          <select
            className="input"
            value={form.status}
            onChange={(e) =>
              setForm((f) => ({ ...f, status: e.target.value as (typeof statuses)[number] }))
            }
          >
            {statuses.map((s) => (
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
          placeholder="Slope, wetlands rumor, septic, size of home you want…"
        />
      </div>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Sending…" : "Request Rapid Feasibility Review"}
      </button>
      <p className="text-xs text-text-dim">
        Tagged as Land Evaluation / Pre-Purchase Lot Audit. No spam — a thoughtful builder follow-up
        only.
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
