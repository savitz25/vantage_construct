"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { studioLeadLabel } from "@/lib/studios/lead-types";

type Props = {
  tool: string;
  /** Short product name e.g. "Kitchen Vision Summary" */
  productName: string;
  /** What they receive */
  benefits: string[];
  /** Human-readable selection lines shown in the summary card */
  summaryLines: string[];
  /** Estimate display string e.g. "$180k – $240k" */
  estimateLabel: string;
  /** Structured payload for CRM */
  selections: Record<string, unknown>;
  estimate?: {
    low?: number;
    mid?: number;
    high?: number;
    label?: string;
  };
  pagePath?: string;
  configId?: string;
  /** Optional secondary CTA after success */
  serviceHref?: string;
  serviceLabel?: string;
};

/**
 * Premium Vision Summary + lead gate used across Studios.
 * Collects contact in exchange for a personalized summary (not a bare "contact us").
 */
export function StudioLeadCapture({
  tool,
  productName,
  benefits,
  summaryLines,
  estimateLabel,
  selections,
  estimate,
  pagePath,
  configId,
  serviceHref,
  serviceLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const leadType = studioLeadLabel(tool);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    trackEvent("studio_lead_submit", {
      event_category: "studios",
      tool,
      lead_type: leadType,
    });
    try {
      const res = await fetch("/api/transformations/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool,
          ...form,
          payload: {
            studio: tool,
            leadType,
            pipeline: "studios",
            estimate: estimate ?? { label: estimateLabel },
            selections,
            summaryLines,
            pagePath: pagePath ?? (typeof window !== "undefined" ? window.location.pathname : ""),
            configId,
            productName,
          },
          source: `studio/${tool}`,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Unable to submit.");
      }
      setDone(true);
      trackEvent("studio_lead_captured", {
        event_category: "studios",
        tool,
        lead_type: leadType,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="studio-lead-card studio-lead-success">
        <p className="studio-estimate-label">Vision summary requested</p>
        <h3 className="mt-1 font-display text-2xl text-ivory">You&apos;re on the list</h3>
        <p className="mt-2 text-sm text-text-muted">
          We&apos;ll send your <strong className="text-ivory">{productName}</strong> with selections,
          planning range, and next steps. A Vantage team member may follow up as a{" "}
          <strong className="text-ivory">{leadType}</strong>.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={`/start?source=${encodeURIComponent(tool)}&email=${encodeURIComponent(form.email)}&name=${encodeURIComponent(
              `${form.firstName} ${form.lastName}`.trim(),
            )}`}
            className="btn btn-primary !px-4 !py-2.5 text-xs"
          >
            Schedule a consultation
          </Link>
          {serviceHref ? (
            <Link href={serviceHref} className="btn btn-secondary !px-4 !py-2.5 text-xs">
              {serviceLabel ?? "Learn more"}
            </Link>
          ) : null}
        </div>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="studio-lead-card">
        <p className="studio-estimate-label">Your Vision Summary</p>
        <h3 className="mt-1 font-display text-xl text-ivory sm:text-2xl">{productName}</h3>
        <p className="mt-2 text-sm text-gold-deep font-medium">{estimateLabel}</p>
        {summaryLines.length > 0 ? (
          <ul className="mt-3 space-y-1 border-t border-border pt-3 text-xs text-text-muted">
            {summaryLines.slice(0, 6).map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-gold shrink-0">·</span>
                <span className="line-clamp-2">{line}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <ul className="mt-3 space-y-1.5 text-xs text-text-muted">
          {benefits.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-gold-deep shrink-0">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="btn btn-primary mt-4 w-full !px-4 !py-2.5 text-xs"
          onClick={() => {
            setOpen(true);
            trackEvent("studio_gate_opened", {
              event_category: "studios",
              tool,
            });
          }}
        >
          Email me this Vision Summary
        </button>
        <p className="mt-2 text-center text-[0.6rem] text-text-dim">
          Free · No spam · Tagged for {leadType.replace(" Lead", "")} follow-up
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="studio-lead-card space-y-3">
      <p className="studio-estimate-label">Almost there</p>
      <h3 className="font-display text-xl text-ivory">Where should we send it?</h3>
      <p className="text-xs text-text-muted">
        You&apos;ll receive your {productName} with the {estimateLabel} planning range and selection
        details.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="label !text-[0.65rem]">First name *</label>
          <input
            className="input !py-2 !text-sm"
            required
            value={form.firstName}
            onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
          />
        </div>
        <div>
          <label className="label !text-[0.65rem]">Last name</label>
          <input
            className="input !py-2 !text-sm"
            value={form.lastName}
            onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
          />
        </div>
      </div>
      <div>
        <label className="label !text-[0.65rem]">Email *</label>
        <input
          className="input !py-2 !text-sm"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
      </div>
      <div>
        <label className="label !text-[0.65rem]">Phone</label>
        <input
          className="input !py-2 !text-sm"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        />
      </div>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button type="submit" className="btn btn-primary w-full !px-4 !py-2.5 text-xs" disabled={submitting}>
        {submitting ? "Sending…" : "Send my Vision Summary"}
      </button>
      <button
        type="button"
        className="w-full text-center text-xs text-text-dim hover:text-gold-deep"
        onClick={() => setOpen(false)}
      >
        ← Back
      </button>
    </form>
  );
}
