import { NextResponse } from "next/server";

type Body = {
  name?: string;
  brokerage?: string;
  email?: string;
  phone?: string;
  areas?: string[];
  opportunityType?: string;
  listingAddress?: string;
  mls?: string;
  landPriceOrBudget?: string;
  notes?: string;
  leadType?: string;
  source?: string;
  submittedAt?: string;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const brokerage = body.brokerage?.trim() ?? "";
  const email = body.email?.trim() ?? "";

  if (!name || !brokerage || !email || !isEmail(email)) {
    return NextResponse.json(
      { error: "Name, brokerage, and a valid email are required." },
      { status: 400 },
    );
  }

  const payload = {
    ...body,
    name,
    brokerage,
    email,
    phone: body.phone?.trim() ?? "",
    leadType: "Realtor Lead",
    pipeline: "realtors",
    receivedAt: new Date().toISOString(),
  };

  const webhook =
    process.env.REALTOR_WEBHOOK_URL ||
    process.env.CRM_WEBHOOK_URL ||
    process.env.DESIGN_STUDIO_WEBHOOK_URL;

  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.DESIGN_STUDIO_WEBHOOK_SECRET
            ? { Authorization: `Bearer ${process.env.DESIGN_STUDIO_WEBHOOK_SECRET}` }
            : {}),
        },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.error("realtor webhook error", e);
    }
  } else {
    console.info("[realtor-lead]", JSON.stringify(payload));
  }

  return NextResponse.json({ ok: true, leadType: "Realtor Lead" });
}
