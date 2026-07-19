"use client";

import { useState } from "react";
import Link from "next/link";
import { trackTransformEvent } from "@/lib/transformations/analytics";

export function ToolLeadGate({
  tool,
  title,
  description,
  summaryPayload,
}: {
  tool: string;
  title: string;
  description: string;
  summaryPayload: Record<string, unknown>;
}) {
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

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    trackTransformEvent(tool, "lead_capture_submit");
    try {
      const res = await fetch("/api/transformations/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool,
          ...form,
          payload: summaryPayload,
          source: `transformations/${tool}`,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Unable to submit.");
      }
      setDone(true);
      trackTransformEvent(tool, "lead_captured");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="card p-6 text-center">
        <h3 className="font-display text-2xl text-ivory">You&apos;re on the list</h3>
        <p className="mt-2 text-sm text-text-muted">
          We&apos;ll send the detailed summary and follow up as a{" "}
          <strong className="text-ivory">{tool}</strong> lead.
        </p>
        <Link href="/start" className="btn btn-primary mt-5">
          Schedule a consultation
        </Link>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="card p-6">
        <h3 className="font-display text-2xl text-ivory">{title}</h3>
        <p className="mt-2 text-sm text-text-muted">{description}</p>
        <button
          type="button"
          className="btn btn-primary mt-5"
          onClick={() => {
            setOpen(true);
            trackTransformEvent(tool, "gate_opened");
          }}
        >
          Unlock detailed PDF summary
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card grid gap-4 p-6">
      <h3 className="font-display text-2xl text-ivory">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">First name</label>
          <input
            className="input"
            required
            value={form.firstName}
            onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
          />
        </div>
        <div>
          <label className="label">Last name</label>
          <input
            className="input"
            value={form.lastName}
            onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
          />
        </div>
      </div>
      <div>
        <label className="label">Email</label>
        <input
          className="input"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
      </div>
      <div>
        <label className="label">Phone</label>
        <input
          className="input"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        />
      </div>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Sending…" : "Email me the detailed summary"}
      </button>
    </form>
  );
}
