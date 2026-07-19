import { NextResponse } from "next/server";

type LeadBody = {
  configId?: string;
  contact?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  selections?: unknown;
  summary?: unknown;
  estimate?: { low?: number; high?: number };
  estimateLabel?: string;
  disclaimer?: string;
  source?: string;
  submittedAt?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const firstName = body.contact?.firstName?.trim() ?? "";
  const lastName = body.contact?.lastName?.trim() ?? "";
  const email = body.contact?.email?.trim() ?? "";
  const phone = body.contact?.phone?.trim() ?? "";

  if (!firstName || !lastName || !email || !isEmail(email)) {
    return NextResponse.json(
      { error: "First name, last name, and a valid email are required." },
      { status: 400 },
    );
  }

  if (!body.configId) {
    return NextResponse.json({ error: "Missing configuration ID." }, { status: 400 });
  }

  const payload = {
    ...body,
    contact: { firstName, lastName, email, phone },
    receivedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.DESIGN_STUDIO_WEBHOOK_URL || process.env.CRM_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.DESIGN_STUDIO_WEBHOOK_SECRET
            ? { Authorization: `Bearer ${process.env.DESIGN_STUDIO_WEBHOOK_SECRET}` }
            : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!webhookRes.ok) {
        console.error("Design studio webhook failed", webhookRes.status);
        // Still accept the lead locally so UX is not blocked if CRM is misconfigured
      }
    } catch (error) {
      console.error("Design studio webhook error", error);
    }
  } else {
    // Local / demo mode — log structured payload for operators
    console.info("[design-studio-lead]", JSON.stringify(payload));
  }

  return NextResponse.json({
    ok: true,
    configId: body.configId,
    webhookConfigured: Boolean(webhookUrl),
  });
}
