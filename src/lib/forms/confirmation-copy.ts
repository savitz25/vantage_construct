import type { LeadSegment } from "@/lib/email/lead-routing";

export type ConfirmationVariant = LeadSegment; // investor | realtor | design

export type FormConfirmationContent = {
  eyebrow: string;
  headline: string;
  body: string;
  secondary?: string;
  links?: { href: string; label: string; primary?: boolean }[];
};

export const FORM_CONFIRMATIONS: Record<ConfirmationVariant, FormConfirmationContent> = {
  investor: {
    eyebrow: "Investor inquiry received",
    headline: "Thank you for your interest",
    body: "Your partnership inquiry has been received and will be reviewed discreetly. A member of the Vantage team will follow up regarding investment structures and next steps.",
    secondary:
      "You should also receive a confirmation email shortly. For a direct conversation, you may call us anytime.",
    links: [
      { href: "/partners/investors", label: "Review investor overview", primary: true },
      { href: "/start", label: "Schedule a conversation" },
    ],
  },
  realtor: {
    eyebrow: "Partnership inquiry received",
    headline: "Thank you — we’ve received your information",
    body: "Your details are with the team. We’ll be in touch regarding partnership opportunities and how we can support your clients and listings.",
    secondary: "A confirmation email is on its way. Prefer a call? Reach us at the number below.",
    links: [
      { href: "/available-homes", label: "Browse available designs", primary: true },
      { href: "/partners/realtors", label: "Realtor resources" },
    ],
  },
  design: {
    eyebrow: "Message received",
    headline: "Thank you for reaching out",
    body: "Your inquiry has been received. A member of the Vantage team will follow up shortly — usually within one business day.",
    secondary:
      "While you wait, you may explore a Studio or Calculator that matches your project. A confirmation email is on its way.",
    links: [
      { href: "/start", label: "Schedule a consultation", primary: true },
      { href: "/calculators", label: "Explore calculators" },
      { href: "/studios", label: "Explore Studios" },
    ],
  },
};

export function confirmationVariantFromIntent(intent?: string): ConfirmationVariant {
  const i = (intent || "").toLowerCase();
  if (i.includes("investor")) return "investor";
  if (i.includes("realtor")) return "realtor";
  return "design";
}
