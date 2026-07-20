"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { company } from "@/lib/company";

const goals = [
  "Exploring options",
  "Considering sale",
  "Interested in partnership",
  "Entitle then sell",
  "Compare sell as-is vs develop",
  "Other / not sure yet",
] as const;

const ownership = [
  "Sole owner",
  "Family / shared ownership",
  "Entity / trust",
  "Representing an owner",
] as const;

export function ConfidentialLandForm() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    acres: "",
    town: company.focusTowns[0] as string,
    goal: goals[0] as string,
    ownership: ownership[0] as string,
    notes: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    trackEvent("multi_lot_assessment_submit", {
      event_category: "multi_lot",
      goal: form.goal,
      town: form.town,
    });
    try {
      const res = await fetch("/api/transformations/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "multi-lot-assessment",
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          payload: {
            propertyAddress: form.address,
            approximateAcres: form.acres,
            town: form.town,
            goal: form.goal,
            ownership: form.ownership,
            notes: form.notes,
            leadIntent: "Landowner / Multi-Lot — Confidential Land Assessment",
            confidential: true,
            audience: "landowner",
          },
          source: "land/multi-lot",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Unable to submit.");
      }
      setDone(true);
      trackEvent("multi_lot_assessment_captured", { event_category: "multi_lot" });
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
        <h3 className="mt-2 font-display text-3xl text-ivory">Handled discreetly</h3>
        <p className="mx-auto mt-3 max-w-md text-text-muted">
          A Vantage principal or team member will follow up for a confidential conversation — tagged
          as a Multi-Lot Land Assessment lead.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/start" className="btn btn-primary">
            Prefer a scheduled consult?
          </Link>
          <Link href="/partners/investors" className="btn btn-secondary">
            Investor structures
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      id="confidential-assessment"
      onSubmit={submit}
      className="card scroll-mt-28 space-y-5 p-6 sm:p-8"
    >
      <div>
        <p className="eyebrow">Confidential</p>
        <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
          Confidential land assessment
        </h2>
        <p className="mt-3 max-w-2xl text-text-muted">
          Also called a private property review — a discreet conversation for landowners exploring
          multi-lot potential, sale, or partnership. Share what you can; we treat inquiries with
          confidentiality.
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
        label="Property address or general location"
        required
        value={form.address}
        onChange={(v) => setForm((f) => ({ ...f, address: v }))}
        placeholder="Address, cross streets, or tax block description"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Approximate acreage"
          value={form.acres}
          onChange={(v) => setForm((f) => ({ ...f, acres: v }))}
          placeholder="e.g. 4.5"
        />
        <div>
          <label className="label">Town</label>
          <select
            className="input"
            value={form.town}
            onChange={(e) => setForm((f) => ({ ...f, town: e.target.value }))}
          >
            {[...company.focusTowns, "Westfield", "Other"].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Primary goal</label>
          <select
            className="input"
            value={form.goal}
            onChange={(e) => setForm((f) => ({ ...f, goal: e.target.value }))}
          >
            {goals.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Ownership context</label>
          <select
            className="input"
            value={form.ownership}
            onChange={(e) => setForm((f) => ({ ...f, ownership: e.target.value }))}
          >
            {ownership.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label">Notes (optional)</label>
        <textarea
          className="input min-h-[100px]"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          placeholder="Zoning questions, family decision timeline, known wetlands, prior surveys…"
        />
      </div>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Sending…" : "Request confidential assessment"}
      </button>
      <p className="text-xs text-text-dim">
        Tagged as Landowner / Multi-Lot lead. Confidential — not a public listing inquiry.
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
