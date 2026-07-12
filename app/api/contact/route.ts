import { NextResponse } from "next/server";

const EMAIL_IN_MESSAGE_PATTERN = /[^\s@]+@[^\s@]+\.[^\s@]+/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  const website = typeof body.website === "string" ? body.website.trim() : "";

  // Silently accept bot submissions caught by the hidden field.
  if (website) return NextResponse.json({ ok: true });

  if (!message || message.length > 2000) {
    return NextResponse.json({ error: "Please enter a message under 2,000 characters." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    return NextResponse.json(
      { error: "The message form isn’t connected yet." },
      { status: 503 },
    );
  }

  const emailMatch = message.match(EMAIL_IN_MESSAGE_PATTERN);
  const replyTo = emailMatch?.[0];
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [to],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject: "New message from your portfolio",
      text: message,
    }),
  });

  if (!resendResponse.ok) {
    console.error("Contact delivery failed", resendResponse.status, await resendResponse.text());
    return NextResponse.json(
      { error: "That didn’t go through. Try emailing me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
