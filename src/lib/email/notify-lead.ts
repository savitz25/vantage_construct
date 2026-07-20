import { sendLeadEmail, type LeadEmailField } from "@/lib/email/send-lead-email";
import type { LeadSegment } from "@/lib/email/lead-routing";

export type LeadMailResult = Awaited<ReturnType<typeof sendLeadEmail>>;

/** True when email was not delivered (skipped config or send failure). */
export function mailNotDelivered(mail: LeadMailResult): boolean {
  if (!mail.ok) return true;
  return Boolean(mail.skipped);
}

/** Fire-and-forget friendly: never throws; logs failures. */
export async function notifyLeadEmail(opts: {
  segment: LeadSegment;
  leadType: string;
  replyTo?: string;
  fields: LeadEmailField[];
  extraPayload?: unknown;
  subject?: string;
}): Promise<LeadMailResult> {
  try {
    return await sendLeadEmail(opts);
  } catch (e) {
    console.error("[notifyLeadEmail]", e);
    return {
      ok: false as const,
      error: e instanceof Error ? e.message : "notify failed",
    };
  }
}

export function contactFields(c: {
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
}): LeadEmailField[] {
  return [
    {
      label: "Name",
      value:
        c.name ||
        [c.firstName, c.lastName].filter(Boolean).join(" ") ||
        undefined,
    },
    { label: "Email", value: c.email },
    { label: "Phone", value: c.phone },
  ];
}
