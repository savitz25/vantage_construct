"use client";

import { useState } from "react";

const intents = [
  "New custom home",
  "Renovation / addition",
  "Land / development",
  "Spec home interest",
  "Realtor partnership",
  "Investor partnership",
  "Commercial project",
  "Other",
] as const;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card p-8 text-center">
        <p className="eyebrow justify-center">Thank you</p>
        <h3 className="mt-3 font-display text-3xl text-ivory">We received your request</h3>
        <p className="mt-3 text-text-muted">
          Victor&apos;s team will follow up shortly. For a faster response, call{" "}
          <a className="text-gold" href="tel:+19083500989">
            (908) 350-0989
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card grid gap-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">
            Full name
          </label>
          <input id="name" name="name" required className="input" autoComplete="name" />
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
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="phone">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" className="input" autoComplete="tel" />
        </div>
        <div>
          <label className="label" htmlFor="intent">
            I&apos;m interested in
          </label>
          <select id="intent" name="intent" className="select" defaultValue={intents[0]}>
            {intents.map((intent) => (
              <option key={intent} value={intent}>
                {intent}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="label" htmlFor="location">
          Project location (town)
        </label>
        <input id="location" name="location" className="input" placeholder="Warren, NJ" />
      </div>
      <div>
        <label className="label" htmlFor="message">
          Tell us about your project
        </label>
        <textarea
          id="message"
          name="message"
          className="textarea"
          placeholder="Timeline, budget range, property status, or anything helpful..."
        />
      </div>
      <button type="submit" className="btn btn-primary w-full sm:w-auto">
        Request complimentary consultation
      </button>
      <p className="text-xs text-text-dim">
        This form is a no-obligation request. We never sell your information.
      </p>
    </form>
  );
}
