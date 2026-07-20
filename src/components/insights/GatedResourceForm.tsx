"use client";

import { useState } from "react";
import { FormConfirmation } from "@/components/forms/FormConfirmation";
import { trackEvent } from "@/lib/analytics";
import { gatedResource } from "@/lib/insights/content";

export function GatedResourceForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    trackEvent("insights_gated_submit", {
      event_category: "insights",
      resource: "7-steps-guide",
    });
    try {
      const res = await fetch("/api/transformations/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "insights-gated-guide",
          firstName: firstName || "Friend",
          lastName: "",
          email,
          payload: {
            resource: gatedResource.title,
            leadIntent: "Gated guide: 7 Steps to Your Successful Build",
            pdfUrl: gatedResource.pdfUrl,
          },
          source: "insights/gated-resource",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Unable to submit.");
      }
      setDone(true);
      trackEvent("insights_gated_captured", { event_category: "insights" });
      // Open PDF for immediate value
      window.open(gatedResource.pdfUrl, "_blank", "noopener,noreferrer");
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
        compact
        extraLinks={[
          {
            href: gatedResource.pdfUrl,
            label: "Open the PDF",
            primary: true,
          },
          { href: "/custom-homes/process", label: "View the 7-step process" },
        ]}
      />
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="gated-first">
            First name
          </label>
          <input
            id="gated-first"
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Optional"
            autoComplete="given-name"
          />
        </div>
        <div>
          <label className="label" htmlFor="gated-email">
            Email *
          </label>
          <input
            id="gated-email"
            className="input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            autoComplete="email"
          />
        </div>
      </div>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={submitting}>
        {submitting ? "Sending…" : "Email me the guide"}
      </button>
      <p className="text-xs text-text-dim">
        We&apos;ll send occasional field notes — unsubscribe anytime. No spam.
      </p>
    </form>
  );
}
