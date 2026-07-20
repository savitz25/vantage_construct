import { brandLogoAbsolute } from "@/lib/brand";
import {
  LEAD_SEGMENT_LABEL,
  leadRecipients,
  type LeadSegment,
} from "@/lib/email/lead-routing";

export type LeadEmailField = {
  label: string;
  value: string | number | boolean | null | undefined;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatValue(v: LeadEmailField["value"]): string {
  if (v === null || v === undefined || v === "") return "—";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "object") return JSON.stringify(v, null, 2);
  return String(v);
}

function flattenPayload(
  obj: unknown,
  prefix = "",
): LeadEmailField[] {
  if (obj === null || obj === undefined) return [];
  if (typeof obj !== "object") {
    return [{ label: prefix || "Value", value: obj as string | number | boolean }];
  }
  if (Array.isArray(obj)) {
    return [
      {
        label: prefix || "List",
        value: obj.map((x) => (typeof x === "object" ? JSON.stringify(x) : String(x))).join(", "),
      },
    ];
  }
  const rows: LeadEmailField[] = [];
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    const label = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === "object" && !Array.isArray(v)) {
      rows.push(...flattenPayload(v, label));
    } else if (Array.isArray(v)) {
      rows.push({
        label,
        value: v.map((x) => (typeof x === "object" ? JSON.stringify(x) : String(x))).join(", "),
      });
    } else {
      rows.push({ label, value: v as string | number | boolean | null | undefined });
    }
  }
  return rows;
}

export function buildLeadEmailHtml(opts: {
  segment: LeadSegment;
  leadType: string;
  fields: LeadEmailField[];
  extraPayload?: unknown;
}): { html: string; text: string } {
  const allFields = [
    ...opts.fields,
    ...(opts.extraPayload ? flattenPayload(opts.extraPayload, "payload") : []),
  ];

  const rows = allFields
    .filter((f) => f.label)
    .map(
      (f) =>
        `<tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e8e4dc;font-weight:600;color:#3d3428;vertical-align:top;width:34%;">${escapeHtml(f.label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e8e4dc;color:#1a1612;white-space:pre-wrap;">${escapeHtml(formatValue(f.value))}</td>
        </tr>`,
    )
    .join("");

  const logoUrl = brandLogoAbsolute("logoEmail");

  const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;background:#f6f3ee;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e0d8cc;border-radius:12px;overflow:hidden;">
    <tr>
      <td style="padding:20px 24px;background:#fbf9f6;border-bottom:1px solid #e8e4dc;text-align:left;">
        <img src="${escapeHtml(logoUrl)}" width="180" alt="Vantage Construction" style="display:block;width:180px;max-width:100%;height:auto;border:0;outline:none;" />
      </td>
    </tr>
    <tr><td style="padding:18px 24px;background:#0b1f4a;color:#f7f4ef;">
      <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;opacity:0.8;">Website lead</div>
      <div style="font-size:22px;margin-top:8px;font-family:Georgia,serif;">${escapeHtml(opts.leadType)}</div>
      <div style="font-size:13px;margin-top:6px;opacity:0.9;">Route: ${escapeHtml(LEAD_SEGMENT_LABEL[opts.segment])}</div>
    </td></tr>
    <tr><td style="padding:8px 12px 20px;">
      <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    </td></tr>
    <tr><td style="padding:16px 24px;background:#faf8f5;font-size:12px;color:#6b635a;">
      Segmented routing · ${escapeHtml(LEAD_SEGMENT_LABEL[opts.segment])} · Vantage Construction
    </td></tr>
  </table>
</body></html>`;

  const text = [
    `Vantage lead: ${opts.leadType}`,
    `Route: ${LEAD_SEGMENT_LABEL[opts.segment]}`,
    "",
    ...allFields.map((f) => `${f.label}: ${formatValue(f.value)}`),
  ].join("\n");

  return { html, text };
}

export type SendLeadEmailResult =
  | { ok: true; id?: string; skipped?: boolean; reason?: string }
  | { ok: false; error: string };

/**
 * Send segmented lead notification via Resend.
 * Requires RESEND_API_KEY. Domain must be verified for custom From addresses.
 */
export async function sendLeadEmail(opts: {
  segment: LeadSegment;
  leadType: string;
  subject?: string;
  replyTo?: string;
  fields: LeadEmailField[];
  extraPayload?: unknown;
}): Promise<SendLeadEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.info(
      "[lead-email] RESEND_API_KEY not set — email skipped",
      opts.segment,
      opts.leadType,
    );
    return { ok: true, skipped: true, reason: "RESEND_API_KEY not configured" };
  }

  const { to, cc, fromAddress, fromName } = leadRecipients(opts.segment);
  const { html, text } = buildLeadEmailHtml(opts);
  const subject =
    opts.subject ||
    `[${LEAD_SEGMENT_LABEL[opts.segment]}] ${opts.leadType}`;

  // Prefer segment@verified-domain. RESEND_FROM_EMAIL can force a single verified mailbox.
  const fromDomain = process.env.RESEND_FROM_DOMAIN?.trim() || "vantagecustombuilds.com";
  const fromLocal = fromAddress.split("@")[0] || "design";
  const forcedFrom = process.env.RESEND_FROM_EMAIL?.trim();
  const fromHeader = forcedFrom
    ? forcedFrom.includes("<")
      ? forcedFrom
      : `${fromName} <${forcedFrom}>`
    : `${fromName} <${fromLocal}@${fromDomain}>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromHeader,
        to,
        cc: cc.length ? cc : undefined,
        reply_to: opts.replyTo || undefined,
        subject,
        html,
        text,
        tags: [
          { name: "segment", value: opts.segment },
          { name: "source", value: "vantagecustombuilds" },
        ],
        headers: {
          "X-Vantage-Lead-Segment": opts.segment,
          "X-Vantage-Lead-Inbox": fromAddress,
        },
      }),
    });

    const data = (await res.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
      name?: string;
      error?: { message?: string };
    };

    if (!res.ok) {
      const msg =
        data.error?.message || data.message || data.name || `HTTP ${res.status}`;
      console.error("[lead-email] Resend failed", msg, data);
      return { ok: false, error: msg };
    }

    console.info("[lead-email] sent", {
      id: data.id,
      segment: opts.segment,
      to,
      cc,
    });
    return { ok: true, id: data.id };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Email send failed";
    console.error("[lead-email] error", msg);
    return { ok: false, error: msg };
  }
}
