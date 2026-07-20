"use client";

import Link from "next/link";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { company } from "@/lib/company";

const visions = [
  "Pool house / entertainment pavilion",
  "Collector’s garage",
  "Luxury multi-bay garage",
  "Carriage house",
  "Guest suite / private living",
  "Workshop or studio",
  "Fitness / wellness retreat",
  "Not sure yet — exploring",
] as const;

const budgets = [
  "Under $150k",
  "$150k – $250k",
  "$250k – $400k",
  "$400k – $600k",
  "$600k+",
  "Prefer not to say",
] as const;

export function AccessoryConceptForm() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    vision: visions[0] as string,
    sizeOrBudget: budgets[5] as string,
    notes: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    trackEvent("accessory_concept_submit", {
      event_category: "accessory_buildings",
      vision: form.vision,
    });
    try {
      const res = await fetch("/api/transformations/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "accessory-building-concept",
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          payload: {
            propertyAddress: form.address,
            vision: form.vision,
            budgetBand: form.sizeOrBudget,
            notes: form.notes,
            leadIntent: "Accessory Building Concept Review / Site Feasibility Check",
          },
          source: "custom-homes/accessory-buildings",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Unable to submit.");
      }
      setDone(true);
      trackEvent("accessory_concept_captured", { event_category: "accessory_buildings" });
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
        <h3 className="mt-2 font-display text-3xl text-ivory">We&apos;ll review your concept</h3>
        <p className="mx-auto mt-3 max-w-md text-text-muted">
          A Vantage team member will follow up for a Site Feasibility / Concept Review — tagged as
          an Accessory Building lead.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/start" className="btn btn-primary">
            Prefer to schedule now?
          </Link>
          <Link href="/accessory-building-cost-nj#tool" className="btn btn-secondary">
            Keep designing in Garage Studio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      id="concept-review"
      onSubmit={submit}
      className="card scroll-mt-28 space-y-5 p-6 sm:p-8"
    >
      <div>
        <p className="eyebrow">High-value next step</p>
        <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
          Site Feasibility & concept review
        </h2>
        <p className="mt-3 max-w-2xl text-text-muted">
          Share what you&apos;re envisioning and where. We&apos;ll give an honest read on
          feasibility, major cost drivers, and whether the dream fits the lot — before you over-invest
          in drawings.
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
        placeholder="Street, town — so we can orient to zoning"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">What are you envisioning?</label>
          <select
            className="input"
            value={form.vision}
            onChange={(e) => setForm((f) => ({ ...f, vision: e.target.value }))}
          >
            {visions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Rough budget band (optional)</label>
          <select
            className="input"
            value={form.sizeOrBudget}
            onChange={(e) => setForm((f) => ({ ...f, sizeOrBudget: e.target.value }))}
          >
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
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
          placeholder="Pool adjacency, car collection, guest suite goals, known setbacks…"
        />
      </div>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Sending…" : "Request concept review"}
      </button>
      <p className="text-xs text-text-dim">
        Tagged as Accessory Building / Concept Review. Or call{" "}
        <a href={`tel:${company.phoneTel}`} className="text-gold underline-offset-2 hover:underline">
          {company.phone}
        </a>
        .
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
