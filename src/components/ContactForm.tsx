"use client";

import { useState } from "react";
import { FormConfirmation } from "@/components/forms/FormConfirmation";
import { trackEvent } from "@/lib/analytics";
import {
  confirmationVariantFromIntent,
  type ConfirmationVariant,
} from "@/lib/forms/confirmation-copy";

const intents = [
  "New custom home",
  "Renovation / addition",
  "Land / development",
  "Spec home interest",
  "Realtor partnership",
  "Investor partnership",
  "Commercial project",
  "Design Studio follow-up",
  "Other",
] as const;

export function ContactForm({
  defaultName = "",
  defaultEmail = "",
  defaultPhone = "",
  defaultIntent = intents[0],
  defaultMessage = "",
}: {
  defaultName?: string;
  defaultEmail?: string;
  defaultPhone?: string;
  defaultIntent?: string;
  defaultMessage?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [variant, setVariant] = useState<ConfirmationVariant>("design");
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [phone, setPhone] = useState(defaultPhone);
  const [intent, setIntent] = useState(
    intents.includes(defaultIntent as (typeof intents)[number])
      ? defaultIntent
      : "Design Studio follow-up",
  );
  const [message, setMessage] = useState(defaultMessage);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const v = confirmationVariantFromIntent(intent);
    setVariant(v);

    trackEvent("contact_form_submit", {
      event_category: "contact",
      intent,
      segment: v,
    });

    try {
      if (v === "investor") {
        const parts = name.trim().split(/\s+/);
        const res = await fetch("/api/investors/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: parts[0] || name,
            lastName: parts.slice(1).join(" ") || "",
            email,
            phone,
            notes: message,
            preferredStructure: "Exploring",
            source: "start/contact",
            submittedAt: new Date().toISOString(),
          }),
        });
        if (!res.ok) throw new Error("Unable to submit.");
      } else if (v === "realtor") {
        const res = await fetch("/api/realtors/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            brokerage: "Via contact form",
            email,
            phone,
            notes: message,
            opportunityType: "Both",
            source: "start/contact",
            submittedAt: new Date().toISOString(),
          }),
        });
        if (!res.ok) throw new Error("Unable to submit.");
      } else {
        const parts = name.trim().split(/\s+/);
        const res = await fetch("/api/transformations/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tool: "contact-form",
            firstName: parts[0] || name,
            lastName: parts.slice(1).join(" ") || "",
            email,
            phone,
            payload: { intent, message, leadIntent: "General contact" },
            source: "start/contact",
            submittedAt: new Date().toISOString(),
          }),
        });
        if (!res.ok) throw new Error("Unable to submit.");
      }
      setSubmitted(true);
      trackEvent("contact_form_captured", { event_category: "contact", segment: v });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return <FormConfirmation variant={variant} />;
  }

  return (
    <form onSubmit={onSubmit} className="card grid gap-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            className="input"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="input"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="intent">
            I&apos;m interested in
          </label>
          <select
            id="intent"
            name="intent"
            className="input"
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
          >
            {intents.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="label" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="input min-h-[120px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your project, timeline, or questions…"
        />
      </div>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
