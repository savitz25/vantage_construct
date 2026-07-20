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
  design: "We received your inquiry | Vantage Construction",
};

function confirmationCopy(segment: LeadSegment, firstName?: string) {
  const name = firstName?.trim() || "there";
  if (segment === "investor") {
    return {
      greeting: `Dear ${name},`,
      intro:
        "Thank you for your interest in partnering with Vantage Construction. We have received your investor inquiry and will review it carefully.",
      body: "A member of our team will follow up regarding partnership opportunities and appropriate next steps. We appreciate your discretion and look forward to the conversation.",
      resourceLabel: "Investor overview",
      resourceHref: "https://vantagecustombuilds.com/partners/investors",
    };
  }
  if (segment === "realtor") {
    return {
      greeting: `Hello ${name},`,
      intro:
        "Thank you for connecting with Vantage Construction. We have received your partnership information and look forward to working together.",
      body: "Our team will be in touch regarding realtor partnership opportunities, client support, and how we can best collaborate on listings and land opportunities in North Jersey.",
      resourceLabel: "Realtor resources",
      resourceHref: "https://vantagecustombuilds.com/partners/realtors",
    };
  }
  return {
    greeting: `Hello ${name},`,
    intro:
      "Thank you for contacting Vantage Construction. We have received your inquiry and appreciate you taking the time to reach out.",
    body: "A member of our team will follow up shortly. In the meantime, you are welcome to explore our Cost Studio, Design Studio, or other planning tools on the website.",
    resourceLabel: "Explore planning tools",
    resourceHref: "https://vantagecustombuilds.com/calculators",
  };
}

export function buildConfirmationEmailHtml(opts: {
  segment: LeadSegment;
  firstName?: string;
}): { subject: string; html: string; text: string } {
  const logoUrl = brandLogoAbsolute("logoEmail");
  const copy = confirmationCopy(opts.segment, opts.firstName);
  const subject = SUBJECT[opts.segment];
  const site = "https://vantagecustombuilds.com";

  const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;background:#f6f3ee;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e0d8cc;border-radius:12px;overflow:hidden;">
    <tr>
      <td style="padding:22px 28px;background:#fbf9f6;border-bottom:1px solid #e8e4dc;">
        <img src="${escapeHtml(logoUrl)}" width="180" alt="Vantage Construction" style="display:block;width:180px;max-width:100%;height:auto;border:0;" />
      </td>
    </tr>
    <tr>
      <td style="padding:28px 28px 12px;">
        <p style="margin:0 0 16px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#9a7a28;font-weight:600;font-family:system-ui,sans-serif;">
          ${escapeHtml(LEAD_SEGMENT_LABEL[opts.segment])}
        </p>
        <p style="margin:0 0 14px;font-size:17px;line-height:1.55;color:#1a1f2e;">${escapeHtml(copy.greeting)}</p>
        <p style="margin:0 0 14px;font-size:16px;line-height:1.65;color:#4a5160;">${escapeHtml(copy.intro)}</p>
        <p style="margin:0 0 22px;font-size:16px;line-height:1.65;color:#4a5160;">${escapeHtml(copy.body)}</p>
        <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
          <tr>
            <td style="border-radius:999px;background:linear-gradient(135deg,#d4b24a,#9a7a28);">
              <a href="${escapeHtml(copy.resourceHref)}" style="display:inline-block;padding:12px 22px;font-family:system-ui,sans-serif;font-size:13px;font-weight:600;color:#fffdf8;text-decoration:none;letter-spacing:0.04em;">
                ${escapeHtml(copy.resourceLabel)} →
              </a>
            </td>
          </tr>
        </table>
        <p style="margin:0 0 6px;font-size:15px;line-height:1.55;color:#0b1f4a;font-weight:600;">Vantage Construction</p>
        <p style="margin:0 0 4px;font-size:14px;line-height:1.5;color:#4a5160;font-family:system-ui,sans-serif;">
          <a href="tel:${escapeHtml(company.phoneTel)}" style="color:#0b1f4a;text-decoration:none;">${escapeHtml(company.phone)}</a>
        </p>
        <p style="margin:0 0 4px;font-size:14px;line-height:1.5;color:#4a5160;font-family:system-ui,sans-serif;">
          <a href="${site}" style="color:#0b1f4a;text-decoration:none;">vantagecustombuilds.com</a>
        </p>
        <p style="margin:12px 0 0;font-size:13px;line-height:1.5;color:#7a8190;font-family:system-ui,sans-serif;">
          ${escapeHtml(company.address.full)}
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 28px;background:#0b1f4a;font-family:system-ui,sans-serif;font-size:11px;line-height:1.5;color:rgba(247,244,239,0.65);">
        Old-world craftsmanship. Modern innovation. No surprises. · Central &amp; Northern New Jersey
      </td>
    </tr>
  </table>
</body></html>`;

  const text = [
    copy.greeting,
    "",
    copy.intro,
    "",
    copy.body,
    "",
    `${copy.resourceLabel}: ${copy.resourceHref}`,
    "",
    "Vantage Construction",
    company.phone,
    site,
    company.address.full,
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
