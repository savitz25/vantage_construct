import { NextResponse } from "next/server";
import { contactFields, mailNotDelivered, notifyLeadAndConfirm } from "@/lib/email/notify-lead";

type Body = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  investmentRange?: string;
  preferredStructure?: string;
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

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim() ?? "";

  if (!firstName || !lastName || !email || !isEmail(email)) {
    return NextResponse.json(
      { error: "First name, last name, and a valid email are required." },
      { status: 400 },
    );
  }

  const payload = {
    ...body,
    firstName,
    lastName,
    email,
    phone: body.phone?.trim() ?? "",
    leadType: "Investor Lead",
    pipeline: "investors",
    routeInbox: "investor@vantagecustombuilds.com",
    receivedAt: new Date().toISOString(),
  };

  const { internal: mail, confirmation } = await notifyLeadAndConfirm({
    segment: "investor",
    leadType: "Investor Lead",
    submitterEmail: email,
    submitterFirstName: firstName,
    replyTo: email,
    fields: [
      ...contactFields(payload),
      { label: "Investment range", value: payload.investmentRange },
      { label: "Preferred structure", value: payload.preferredStructure },
      { label: "Notes", value: payload.notes },
      { label: "Source", value: payload.source },
      { label: "Submitted at", value: payload.submittedAt || payload.receivedAt },
    ],
    extraPayload: payload,
  });

  const webhook =
    process.env.INVESTOR_WEBHOOK_URL ||
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
      console.error("investor webhook error", e);
    }
  } else if (mailNotDelivered(mail)) {
    console.info("[investor-lead]", JSON.stringify(payload));
  }

  return NextResponse.json({
    ok: true,
    leadType: "Investor Lead",
    emailRoutedTo: "investor@vantagecustombuilds.com",
    email: mail,
    confirmation,
  });
}
