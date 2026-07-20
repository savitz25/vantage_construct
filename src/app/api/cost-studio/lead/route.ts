import { NextResponse } from "next/server";
import { contactFields, mailNotDelivered, notifyLeadAndConfirm } from "@/lib/email/notify-lead";

type Body = {
  configId?: string;
  contact?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  selections?: unknown;
  estimate?: unknown;
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
    tool: "cost-studio",
    leadType: "Cost Studio Lead",
    pipeline: "studios",
    routeInbox: "design@vantagecustombuilds.com",
    receivedAt: new Date().toISOString(),
  };

  const { internal: mail, confirmation } = await notifyLeadAndConfirm({
    segment: "design",
    leadType: "Cost Studio Lead",
    submitterEmail: email,
    submitterFirstName: firstName,
    replyTo: email,
    subject: `[Design / General] Cost Studio Lead — ${body.configId}`,
    fields: [
      ...contactFields({ firstName, lastName, email, phone }),
      { label: "Config ID", value: body.configId },
      { label: "Source", value: body.source },
      { label: "Submitted at", value: body.submittedAt || payload.receivedAt },
    ],
    extraPayload: {
      selections: body.selections,
      estimate: body.estimate,
    },
  });

  const webhook =
    process.env.COST_STUDIO_WEBHOOK_URL ||
    process.env.DESIGN_STUDIO_WEBHOOK_URL ||
    process.env.CRM_WEBHOOK_URL;

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
      console.error("cost-studio webhook error", e);
    }
  } else if (mailNotDelivered(mail)) {
    console.info("[cost-studio-lead]", JSON.stringify(payload));
  }

  return NextResponse.json({
    ok: true,
    configId: body.configId,
    emailRoutedTo: "design@vantagecustombuilds.com",
    email: mail,
    confirmation,
  });
}
