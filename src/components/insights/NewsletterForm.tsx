"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    trackEvent("insights_newsletter_submit", { event_category: "insights" });
    try {
      const res = await fetch("/api/transformations/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "insights-newsletter",
          firstName: "Newsletter",
          lastName: "Subscriber",
          email,
          payload: {
            leadIntent: "Notes from the Master Builder — newsletter",
            list: "master-builder-notes",
          },
          source: "insights/newsletter",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Unable to subscribe.");
      }
      setDone(true);
      trackEvent("insights_newsletter_captured", { event_category: "insights" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-xl border border-gold/40 bg-white/10 px-5 py-4 text-sm text-on-navy">
        <p className="font-display text-xl text-on-navy">Thank you for reaching out</p>
        <p className="mt-2 text-on-navy/75">
          You&apos;re on the list. Expect honest notes from the field — not a sales drip. A
          confirmation email is on its way.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="min-w-0 flex-1">
        <label className="label" htmlFor="nl-email">
          Email
        </label>
        <input
          id="nl-email"
          className="input"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          autoComplete="email"
        />
      </div>
      <button type="submit" className="btn btn-primary shrink-0" disabled={submitting}>
        {submitting ? "Joining…" : "Subscribe"}
      </button>
      {error ? <p className="w-full text-sm text-red-700 sm:order-last">{error}</p> : null}
    </form>
  );
}
