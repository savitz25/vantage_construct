/**
 * Segmented lead inboxes on vantagecustombuilds.com
 *
 * Forms send with From = segment address (design@ / investor@ / realtors@).
 * Delivery goes to LEAD_FORWARD_TO (Victor) with CC to LEAD_CC (MoveTrustHub).
 * Optional LEAD_SEND_TO_ALIAS also addresses the segment mailbox once MX forwarding exists.
 */

export type LeadSegment = "design" | "investor" | "realtor";

export const LEAD_SEGMENT_INBOX: Record<LeadSegment, string> = {
  design: "design@vantagecustombuilds.com",
  investor: "investor@vantagecustombuilds.com",
  realtor: "realtors@vantagecustombuilds.com",
};

export const LEAD_SEGMENT_LABEL: Record<LeadSegment, string> = {
  design: "Design / General",
  investor: "Investor",
  realtor: "Realtor",
};

/** Final mailbox that must always receive leads */
export function leadForwardTo() {
  return (
    process.env.LEAD_FORWARD_TO?.trim() || "V.Lobozzo@VantageConstruct.com"
  );
}

/** Always CC on form notifications */
export function leadCc() {
  return process.env.LEAD_CC?.trim() || "info@movetrusthub.com";
}

export function segmentInbox(segment: LeadSegment) {
  const envKey =
    segment === "design"
      ? process.env.LEAD_EMAIL_DESIGN
      : segment === "investor"
        ? process.env.LEAD_EMAIL_INVESTOR
        : process.env.LEAD_EMAIL_REALTOR;
  return (envKey?.trim() || LEAD_SEGMENT_INBOX[segment]).toLowerCase();
}

/**
 * Who receives the notification.
 * Default: Victor (forward target) — reliable without inbound MX.
 * When LEAD_SEND_TO_ALIAS=true, also include the segment address (for alias/MX setups).
 */
export function leadRecipients(segment: LeadSegment): {
  to: string[];
  cc: string[];
  fromAddress: string;
  fromName: string;
} {
  const inbox = segmentInbox(segment);
  const forward = leadForwardTo();
  const cc = leadCc();
  const sendToAlias = process.env.LEAD_SEND_TO_ALIAS === "true";

  const to = sendToAlias
    ? Array.from(new Set([inbox, forward].map((e) => e.toLowerCase())))
    : [forward.toLowerCase()];

  const ccList = [cc.toLowerCase()].filter((e) => !to.includes(e));

  const fromName =
    segment === "investor"
      ? "Vantage Investor Leads"
      : segment === "realtor"
        ? "Vantage Realtor Leads"
        : "Vantage Design Leads";

  return {
    to,
    cc: ccList,
    fromAddress: inbox,
    fromName,
  };
}
