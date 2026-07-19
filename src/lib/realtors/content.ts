/**
 * Realtor partner page content.
 * Commission rates below mirror the existing public Vantage example (land % + package %).
 * Actual rates/terms confirmed in writing per partnership.
 */

export const realtorTermsNote =
  "Example structures shown for illustration. Actual commission rates, payment timing, and terms are confirmed in writing per partnership.";

export const realtorAreas = [
  "Warren",
  "Watchung",
  "Basking Ridge",
  "Millburn–Short Hills",
  "Summit",
  "Chatham",
  "Westfield",
  "Other North / Central NJ",
] as const;

export const doubleDipPoints = [
  {
    title: "The land",
    body: "Earn your standard land / tear-down commission when the client purchases the lot — typically structured at your listing or buyer-side rate.",
  },
  {
    title: "The build",
    body: "Earn an additional package / referral fee on the custom home construction when you introduce the client to Vantage.",
  },
  {
    title: "You look like the hero",
    body: "We price, design, permit, and build. You stay the trusted advisor — without becoming the GC.",
  },
] as const;

export const reputationPoints = [
  {
    title: "Clear process, regular updates",
    body: "Clients get bi-weekly progress and budget visibility — the same no-surprises discipline that protects your referral reputation.",
  },
  {
    title: "Optional job-site camera",
    body: "24/7 remote viewing (~$50/mo where used) so out-of-area clients stay informed without calling you for construction updates.",
  },
  {
    title: "No-poaching commitment",
    body: "If the client sells later, we refer them back to you — the agent who introduced the relationship.",
  },
  {
    title: "You never chase the builder",
    body: "Dedicated responsiveness for your clients so you can focus on your next listing appointment.",
  },
] as const;

export const kitBenefits = [
  "Concept direction and package framing for “as-is vs to-be-built” marketing",
  "Professional flyer language agents can use at listing appointments",
  "Helps win the listing: two paths, one property",
  "Typically available within about a week of partnering on a qualifying land listing",
] as const;

export const vipTiers = [
  {
    name: "Preferred Partner",
    when: "After first successful package or referral",
    perks: ["Priority intake for new listings", "Direct Victor-team access", "Co-branded kit eligibility"],
  },
  {
    name: "Gold Partner",
    when: "Second successful collaboration",
    perks: ["Elevated recognition", "Faster package turnaround prioritization", "Collab marketing support"],
  },
  {
    name: "Platinum Partner",
    when: "Three or more successful packages",
    perks: ["Top-tier relationship status", "Event / open-house co-hosting discussions", "Strategic market planning sessions"],
  },
] as const;

export const qualifyQuestions = [
  {
    id: "town",
    label: "Is the property in our core North / Central NJ focus?",
    options: [
      { id: "yes", label: "Yes — Warren, Watchung, Basking Ridge, Millburn–Short Hills, or nearby" },
      { id: "maybe", label: "Nearby / surrounding counties" },
      { id: "no", label: "Outside our typical footprint" },
    ],
  },
  {
    id: "lot",
    label: "Lot character",
    options: [
      { id: "empty", label: "Vacant / ready-to-build feel" },
      { id: "teardown", label: "Tear-down / rebuild candidate" },
      { id: "unsure", label: "Not sure yet" },
    ],
  },
  {
    id: "utilities",
    label: "Utilities / access",
    options: [
      { id: "available", label: "Public utilities or known access" },
      { id: "unknown", label: "Unknown / needs evaluation" },
      { id: "challenging", label: "Likely challenging site" },
    ],
  },
] as const;
