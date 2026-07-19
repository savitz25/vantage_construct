"use client";

import { useState } from "react";
import Link from "next/link";
import { company } from "@/lib/company";
import { trackRealtorEvent } from "@/lib/realtors/analytics";
import { realtorAreas } from "@/lib/realtors/content";

const opportunityTypes = [
  "Land listing",
  "Buyer looking for custom / rebuild",
  "Both",
] as const;

export function RealtorPartnerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [areas, setAreas] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    brokerage: "",
    email: "",
    phone: "",
    opportunityType: "Land listing" as (typeof opportunityTypes)[number],
    listingAddress: "",
    mls: "",
    landPriceOrBudget: "",
    notes: "",
  });

  function toggleArea(area: string) {
    setAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    trackRealtorEvent("realtor_form_submit", {
      opportunity: form.opportunityType,
      areas: areas.join(","),
    });

    try {
      const res = await fetch("/api/realtors/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          areas,
          leadType: "Realtor Lead",
          source: "partners/realtors",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Unable to submit. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="card p-8 text-center sm:p-10">
        <p className="eyebrow justify-center">You’re in</p>
        <h3 className="mt-3 font-display text-3xl text-ivory">Partner submission received</h3>
        <p className="mt-3 text-text-muted">
          Tagged as a <strong className="text-ivory">Realtor Lead</strong>. We’ll review the
          opportunity and follow up quickly — often the same day.
        </p>
        <p className="mt-4 text-sm text-text-dim">
          Prefer a call?{" "}
          <a className="text-gold-deep" href={`tel:${company.phoneTel}`}>
            {company.phone}
          </a>
        </p>
        <Link href="/available-homes" className="btn btn-secondary mt-6">
          Browse available designs
        </Link>
      </div>
    );
  }

  return (
    <form id="realtor-form" onSubmit={onSubmit} className="card grid gap-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Your name"
          required
          value={form.name}
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
        />
        <Field
          label="Brokerage"
          required
          value={form.brokerage}
          onChange={(v) => setForm((f) => ({ ...f, brokerage: v }))}
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

      <div>
        <p className="label">Primary towns / areas you serve</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {realtorAreas.map((area) => (
            <button
              key={area}
              type="button"
              onClick={() => toggleArea(area)}
              className={`rounded-full border px-3 py-1.5 text-xs ${
                areas.includes(area)
                  ? "border-gold bg-gold/10 text-gold-deep"
                  : "border-border text-text-muted"
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label" htmlFor="opp-type">
          Type of opportunity
        </label>
        <select
          id="opp-type"
          className="select"
          value={form.opportunityType}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              opportunityType: e.target.value as (typeof opportunityTypes)[number],
            }))
          }
        >
          {opportunityTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Listing address (if applicable)"
          value={form.listingAddress}
          onChange={(v) => setForm((f) => ({ ...f, listingAddress: v }))}
        />
        <Field
          label="MLS # (optional)"
          value={form.mls}
          onChange={(v) => setForm((f) => ({ ...f, mls: v }))}
        />
      </div>
      <Field
        label="Approx. land price or client budget"
        value={form.landPriceOrBudget}
        onChange={(v) => setForm((f) => ({ ...f, landPriceOrBudget: v }))}
      />
      <div>
        <label className="label" htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          className="textarea"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          placeholder="Lot details, client timeline, package interest…"
        />
      </div>

      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Submitting…" : "Join the partner network / submit opportunity"}
      </button>
      <p className="text-xs text-text-dim">
        Purpose-built for agents — not a homeowner form. We never sell your information. Commission
        terms are confirmed in writing per partnership.
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
