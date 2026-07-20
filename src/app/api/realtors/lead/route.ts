import { NextResponse } from "next/server";
import { contactFields, mailNotDelivered, notifyLeadEmail } from "@/lib/email/notify-lead";

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
    routeInbox: "realtors@vantagecustombuilds.com",
    receivedAt: new Date().toISOString(),
  };

  const mail = await notifyLeadEmail({
    segment: "realtor",
    leadType: "Realtor Lead",
    replyTo: email,
    fields: [
      ...contactFields({ name, email, phone: payload.phone }),
      { label: "Brokerage", value: brokerage },
      {
        label: "Areas",
        value: Array.isArray(payload.areas) ? payload.areas.join(", ") : payload.areas,
      },
      { label: "Opportunity type", value: payload.opportunityType },
      { label: "Listing address", value: payload.listingAddress },
      { label: "MLS", value: payload.mls },
      { label: "Land price / budget", value: payload.landPriceOrBudget },
      { label: "Notes", value: payload.notes },
      { label: "Source", value: payload.source },
      { label: "Submitted at", value: payload.submittedAt || payload.receivedAt },
    ],
    extraPayload: payload,
  });

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
  } else if (mailNotDelivered(mail)) {
    console.info("[realtor-lead]", JSON.stringify(payload));
  }

  return NextResponse.json({
    ok: true,
    leadType: "Realtor Lead",
    emailRoutedTo: "realtors@vantagecustombuilds.com",
    email: mail,
  });
}
