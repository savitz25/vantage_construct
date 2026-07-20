import { NextResponse } from "next/server";
import { studioLeadLabel } from "@/lib/studios/lead-types";

type Body = {
  tool?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  payload?: unknown;
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
  const tool = body.tool?.trim() || "transformations";
  const leadType = studioLeadLabel(tool);

  if (!firstName || !email || !isEmail(email)) {
    return NextResponse.json(
      { error: "First name and a valid email are required." },
      { status: 400 },
    );
  }

  const payload = {
    ...body,
    firstName,
    lastName,
    email,
    phone: body.phone?.trim() ?? "",
    leadType,
    pipeline: "studios",
    tool,
    receivedAt: new Date().toISOString(),
  };

  const webhook =
    process.env.TRANSFORMATIONS_WEBHOOK_URL ||
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
      console.error("transformations webhook error", e);
    }
  } else {
    console.info("[transformations-lead]", JSON.stringify(payload));
  }

  return NextResponse.json({ ok: true, tool });
}
