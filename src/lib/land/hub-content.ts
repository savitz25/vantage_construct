import { landDevelopments } from "@/lib/content";
import { company } from "@/lib/company";

/** Land Opportunity Hub — elegant front door; does not replace sub-pages */

export const landPathways = [
  {
    id: "evaluation",
    href: "/land/evaluation",
    audience: "For lot owners & buyers",
    title: "Land Evaluation",
    tagline: "Can you build what you want here?",
    body: "Already looking at a specific parcel — or under contract? Get a clear read on setbacks, site risk, and whether to pursue, redesign, or walk away.",
    cta: "Start a feasibility check",
    image: "/media/plans/c5405c72-ridgeview-hires-drone1_1-768x435.webp",
    imageAlt: "Aerial view of a residential homesite — land evaluation and lot potential",
  },
  {
    id: "spec-homes",
    href: "/land/spec-homes",
    audience: "For home buyers",
    title: "Signature Builds",
    tagline: "New construction without starting from zero",
    body: "Luxury homes under construction with a phase-based customization window — less timeline risk than a full custom start, more personalization than a finished resale.",
    cta: "Browse Signature Builds",
    image: "/media/plans/22a95723-wellington-exterior-01-768x421.webp",
    imageAlt: "Luxury Signature Build exterior — homes under construction in North Jersey",
  },
  {
    id: "multi-lot",
    href: "/land/multi-lot",
    audience: "For landowners",
    title: "Multi-Lot Development",
    tagline: "What could your acreage actually be worth?",
    body: "Larger parcels and family land: understand sell as-is vs entitle & sell vs partner — and see conceptual lot potential before you leave value on the table.",
    cta: "Explore multi-lot options",
    image: "/media/plans/d973d32e-ridgeview-hires17-768x512.webp",
    imageAlt: "Luxury multi-home community setting — multi-lot development potential",
  },
] as const;

export const landCredibility = [
  {
    label: "Local tenure",
    value: `${company.yearsExperience} years`,
    note: "Building and developing in Central & Northern New Jersey since 1990.",
  },
  {
    label: "Named communities",
    value: "Three estates",
    note: landDevelopments.join(" · "),
  },
  {
    label: "Dual expertise",
    value: "Custom + land",
    note: "Homes and subdivisions under one roof — design, entitlement, and craft.",
  },
  {
    label: "Philosophy",
    value: company.philosophy,
    note: "Transparent process, honest walk-aways, and clear next steps.",
  },
] as const;

/** Light path-finder — maps self-ID to the right sub-page */
export const landPathFinderOptions = [
  {
    id: "have-lot",
    label: "I have a lot (or I’m under contract)",
    detail: "Need to know if the dream home fits — and what site costs to expect.",
    pathId: "evaluation" as const,
  },
  {
    id: "buying-home",
    label: "I want a new home without a full custom start",
    detail: "Looking for inventory under construction with room to personalize.",
    pathId: "spec-homes" as const,
  },
  {
    id: "own-acreage",
    label: "I own larger acreage or family land",
    detail: "Curious about multi-lot value, partnership, or an informed sale.",
    pathId: "multi-lot" as const,
  },
  {
    id: "not-sure",
    label: "I’m not sure yet",
    detail: "Start with a short confidential conversation — we’ll route you.",
    pathId: null,
    href: "/start",
  },
] as const;

export const landHubRelated = [
  { href: "/custom-homes/rebuilds", label: "Knockdowns & rebuilds", note: "Right lot, wrong house" },
  { href: "/cost-to-build-a-house-nj", label: "Cost Studio", note: "Construction ranges" },
  { href: "/design-studio", label: "Design Studio", note: "Style & program vision" },
  { href: "/partners/investors", label: "Investors", note: "Capital partnerships" },
  { href: "/partners/realtors", label: "Realtors", note: "Land & listing collaboration" },
  { href: "/locations", label: "Town guides", note: "Where we work" },
] as const;
