"use client";

import { useState } from "react";
import Link from "next/link";
import { trackInvestorEvent } from "@/lib/investors/analytics";
import { investmentRanges } from "@/lib/investors/content";
import { company } from "@/lib/company";

const structures = ["Loan", "Equity", "Hybrid", "Exploring"] as const;

export function InvestorOverviewForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    investmentRange: string;
    preferredStructure: (typeof structures)[number];
    notes: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    investmentRange: investmentRanges[1],
    preferredStructure: "Exploring",
    notes: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    trackInvestorEvent("investor_overview_requested", {
      structure: form.preferredStructure,
      range: form.investmentRange,
    });

    try {
      const res = await fetch("/api/investors/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          leadType: "Investor Lead",
          source: "partners/investors",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Unable to submit. Please try again.");
      }
      setSubmitted(true);
      trackInvestorEvent("investor_overview_submitted");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="card p-8 text-center sm:p-10">
        <p className="eyebrow justify-center">Thank you</p>
        <h3 className="mt-3 font-display text-3xl text-ivory">Overview request received</h3>
        <p className="mt-3 text-text-muted">
          We’ve tagged this as an Investor Lead. Victor’s team will follow up with the Investor
          Overview and next steps. For a direct conversation, call{" "}
          <a className="text-gold-deep" href={`tel:${company.phoneTel}`}>
            {company.phone}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={`/start?source=investor&name=${encodeURIComponent(
              `${form.firstName} ${form.lastName}`.trim(),
            )}&email=${encodeURIComponent(form.email)}&phone=${encodeURIComponent(form.phone)}`}
            className="btn btn-primary"
            onClick={() => trackInvestorEvent("investor_consultation_clicked")}
          >
            Schedule a conversation with Victor
          </Link>
          <a href="#deal-modeler" className="btn btn-secondary">
            Back to deal modeler
          </a>
        </div>
        <p className="mt-6 text-xs text-text-dim">
          The Investor Overview PDF is delivered by the team after review (or attached via CRM
          automation when configured). Nothing in the overview is an offer or guarantee.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card grid gap-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="First name"
          required
          value={form.firstName}
          onChange={(v) => setForm((f) => ({ ...f, firstName: v }))}
        />
        <Field
          label="Last name"
          required
          value={form.lastName}
          onChange={(v) => setForm((f) => ({ ...f, lastName: v }))}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
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
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="inv-range">
            Target investment range
          </label>
          <select
            id="inv-range"
            className="select"
            value={form.investmentRange}
            onChange={(e) => setForm((f) => ({ ...f, investmentRange: e.target.value }))}
          >
            {investmentRanges.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="inv-structure">
            Preferred structure
          </label>
          <select
            id="inv-structure"
            className="select"
            value={form.preferredStructure}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                preferredStructure: e.target.value as (typeof structures)[number],
              }))
            }
          >
            {structures.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="label" htmlFor="inv-notes">
          Notes (optional)
        </label>
        <textarea
          id="inv-notes"
          className="textarea"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          placeholder="Timeline, entity type, markets of interest…"
        />
      </div>
      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Sending…" : "Request the Investor Overview"}
      </button>
      <p className="text-xs text-text-dim">
        We use this information only to respond about partnership opportunities. We never sell your
        data. Submitting is not an investment commitment.
      </p>
    </form>
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
