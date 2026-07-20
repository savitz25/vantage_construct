import { brandLogoAbsolute } from "@/lib/brand";
import { company } from "@/lib/company";
import {
  LEAD_SEGMENT_LABEL,
  leadRecipients,
  type LeadSegment,
} from "@/lib/email/lead-routing";
import type { SendLeadEmailResult } from "@/lib/email/send-lead-email";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const SUBJECT: Record<LeadSegment, string> = {
  investor: "We received your investor inquiry | Vantage Construction",
  realtor: "We received your partnership inquiry | Vantage Construction",
  design: "Thank you for reaching out | Vantage Construction",
};

type ConfirmationCopy = {
  eyebrow: string;
  headline: string;
  greeting: string;
  intro: string;
  body: string;
  nextStep: string;
  resourceLabel: string;
  resourceHref: string;
};

function confirmationCopy(segment: LeadSegment, firstName?: string): ConfirmationCopy {
  const name = firstName?.trim() || "there";

  if (segment === "investor") {
    return {
      eyebrow: LEAD_SEGMENT_LABEL.investor,
      headline: "Thank you for your investor inquiry",
      greeting: `Dear ${name},`,
      intro:
        "We have received your message and appreciate your interest in partnering with Vantage Construction.",
      body: "A member of our team will review your inquiry carefully and follow up regarding partnership opportunities and appropriate next steps. We value discretion and look forward to a thoughtful conversation.",
      nextStep:
        "While you wait, you are welcome to review our investor overview for a high-level sense of how we work with capital partners.",
      resourceLabel: "View investor overview",
      resourceHref: "https://vantagecustombuilds.com/partners/investors",
    };
  }

  if (segment === "realtor") {
    return {
      eyebrow: LEAD_SEGMENT_LABEL.realtor,
      headline: "Thank you for connecting with us",
      greeting: `Hello ${name},`,
      intro:
        "We have received your partnership information and look forward to exploring how we can support your clients and listings.",
      body: "Our team will be in touch regarding realtor collaboration — land-to-home packages, knockdowns, referrals, and the kind of builder support that protects your client relationships.",
      nextStep:
        "In the meantime, you may browse our realtor resources for a clear picture of how partnership typically works.",
      resourceLabel: "Explore realtor resources",
      resourceHref: "https://vantagecustombuilds.com/partners/realtors",
    };
  }

  return {
    eyebrow: LEAD_SEGMENT_LABEL.design,
    headline: "Thank you for reaching out",
    greeting: `Hello ${name},`,
    intro:
      "We have received your inquiry and appreciate you taking the time to contact Vantage Construction.",
    body: "A member of our team will follow up shortly. We keep the process clear and calm — starting with a genuine conversation about your goals, property, and timeline.",
    nextStep:
      "While you wait, you are welcome to explore Cost Studio, Design Studio, or other planning tools on our site.",
    resourceLabel: "Explore planning tools",
    resourceHref: "https://vantagecustombuilds.com/calculators",
  };
}

/**
 * Light, premium customer confirmation HTML.
 * Warm ivory / white surfaces, navy text, gold accents only.
 * Table-based for Outlook/Gmail compatibility.
 */
export function buildConfirmationEmailHtml(opts: {
  segment: LeadSegment;
  firstName?: string;
}): { subject: string; html: string; text: string } {
  const logoUrl = brandLogoAbsolute("logoEmail");
  const copy = confirmationCopy(opts.segment, opts.firstName);
  const subject = SUBJECT[opts.segment];
  const site = "https://vantagecustombuilds.com";
  const phoneDisplay = company.phone;
  const phoneTel = company.phoneTel;
  const address = company.address.full;

  // Brand tokens (inline — email clients strip style blocks inconsistently)
  const bgPage = "#f7f3ec"; // warm ivory page
  const bgCard = "#ffffff";
  const bgSoft = "#fbf9f6"; // soft cream header/footer
  const border = "#e8e2d6";
  const navy = "#0b1f4a";
  const bodyText = "#1a2438";
  const muted = "#4a5568";
  const dim = "#7a8494";
  const gold = "#9a7a28";
  const goldBtn = "#c4a035";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${escapeHtml(subject)}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${bgPage};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    ${escapeHtml(copy.headline)} — Vantage Construction will be in touch soon.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${bgPage};margin:0;padding:0;width:100%;">
    <tr>
      <td align="center" style="padding:28px 16px 36px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:${bgCard};border:1px solid ${border};border-radius:14px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td align="left" style="padding:28px 32px 22px;background-color:${bgSoft};border-bottom:1px solid ${border};">
              <img src="${escapeHtml(logoUrl)}" width="200" height="auto" alt="Vantage Construction" style="display:block;width:200px;max-width:70%;height:auto;border:0;outline:none;text-decoration:none;" />
            </td>
          </tr>

          <!-- Gold accent line -->
          <tr>
            <td style="padding:0;height:3px;line-height:3px;font-size:0;background:linear-gradient(90deg,${goldBtn},${gold});background-color:${gold};">
              &nbsp;
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding:32px 32px 8px;background-color:${bgCard};">
              <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${gold};">
                ${escapeHtml(copy.eyebrow)}
              </p>
              <h1 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.25;font-weight:600;color:${navy};">
                ${escapeHtml(copy.headline)}
              </h1>
              <p style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.55;color:${bodyText};">
                ${escapeHtml(copy.greeting)}
              </p>
              <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7;color:${muted};">
                ${escapeHtml(copy.intro)}
              </p>
              <p style="margin:0 0 22px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7;color:${muted};">
                ${escapeHtml(copy.body)}
              </p>
            </td>
          </tr>

          <!-- Next steps card -->
          <tr>
            <td style="padding:0 32px 28px;background-color:${bgCard};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${bgSoft};border:1px solid ${border};border-radius:10px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${gold};">
                      What happens next
                    </p>
                    <p style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:${muted};">
                      ${escapeHtml(copy.nextStep)}
                    </p>
                    <!-- Button (bulletproof) -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" bgcolor="${gold}" style="border-radius:999px;background-color:${gold};">
                          <a href="${escapeHtml(copy.resourceHref)}" target="_blank" style="display:inline-block;padding:13px 24px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.04em;color:#ffffff;text-decoration:none;border-radius:999px;">
                            ${escapeHtml(copy.resourceLabel)}&nbsp;&rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact strip -->
          <tr>
            <td style="padding:4px 32px 28px;background-color:${bgCard};">
              <p style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:16px;font-weight:600;color:${navy};">
                Prefer to talk now?
              </p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${muted};">
                Call us at
                <a href="tel:${escapeHtml(phoneTel)}" style="color:${navy};font-weight:600;text-decoration:none;">${escapeHtml(phoneDisplay)}</a>
                or visit
                <a href="${site}" style="color:${navy};font-weight:600;text-decoration:none;">vantagecustombuilds.com</a>
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;background-color:${bgCard};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-top:1px solid ${border};font-size:0;line-height:0;height:1px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Light footer -->
          <tr>
            <td style="padding:22px 32px 28px;background-color:${bgSoft};">
              <p style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:15px;font-weight:600;color:${navy};">
                Vantage Construction
              </p>
              <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.55;color:${muted};">
                <a href="tel:${escapeHtml(phoneTel)}" style="color:${muted};text-decoration:none;">${escapeHtml(phoneDisplay)}</a>
                &nbsp;&middot;&nbsp;
                <a href="${site}" style="color:${muted};text-decoration:none;">vantagecustombuilds.com</a>
              </p>
              <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:${dim};">
                ${escapeHtml(address)}
              </p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:${dim};font-style:italic;">
                Old-world craftsmanship. Modern innovation. No surprises.
              </p>
            </td>
          </tr>

        </table>

        <!-- Outer note -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
          <tr>
            <td align="center" style="padding:18px 12px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.5;color:${dim};">
              You received this email because you submitted a form on vantagecustombuilds.com.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    copy.headline,
    "",
    copy.greeting,
    "",
    copy.intro,
    "",
    copy.body,
    "",
    "What happens next",
    copy.nextStep,
    `${copy.resourceLabel}: ${copy.resourceHref}`,
    "",
    "Prefer to talk now?",
    `Call ${phoneDisplay} or visit ${site}`,
    "",
    "Vantage Construction",
    phoneDisplay,
    site,
    address,
    "Old-world craftsmanship. Modern innovation. No surprises.",
  ].join("\n");

  return { subject, html, text };
}

/** Confirmation email to the person who submitted the form */
export async function sendConfirmationEmail(opts: {
  segment: LeadSegment;
  to: string;
  firstName?: string;
}): Promise<SendLeadEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.info("[confirmation-email] RESEND_API_KEY not set — skipped");
    return { ok: true, skipped: true, reason: "RESEND_API_KEY not configured" };
  }

  const to = opts.to.trim();
  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return { ok: false, error: "Invalid confirmation recipient" };
  }

  const { fromAddress, fromName } = leadRecipients(opts.segment);
  const fromDomain = process.env.RESEND_FROM_DOMAIN?.trim() || "vantagecustombuilds.com";
  const fromLocal = fromAddress.split("@")[0] || "design";
  const forcedFrom = process.env.RESEND_FROM_EMAIL?.trim();
  const fromHeader = forcedFrom
    ? forcedFrom.includes("<")
      ? forcedFrom
      : `${fromName} <${forcedFrom}>`
    : `${fromName} <${fromLocal}@${fromDomain}>`;

  const { subject, html, text } = buildConfirmationEmailHtml({
    segment: opts.segment,
    firstName: opts.firstName,
  });

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromHeader,
        to: [to.toLowerCase()],
        reply_to: company.email,
        subject,
        html,
        text,
        tags: [
          { name: "type", value: "submitter_confirmation" },
          { name: "segment", value: opts.segment },
        ],
      }),
    });

    const data = (await res.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
      error?: { message?: string };
    };

    if (!res.ok) {
      const msg = data.error?.message || data.message || `HTTP ${res.status}`;
      console.error("[confirmation-email] failed", msg);
      return { ok: false, error: msg };
    }

    console.info("[confirmation-email] sent", { id: data.id, segment: opts.segment });
    return { ok: true, id: data.id };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Confirmation send failed";
    console.error("[confirmation-email]", msg);
    return { ok: false, error: msg };
  }
}
