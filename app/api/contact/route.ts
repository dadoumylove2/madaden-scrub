import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, topic, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const to = process.env.ADMIN_EMAIL || "Layepam19@gmail.com";

    const subject = `[Contact] ${topic ? `${topic} - ` : ""}${name}`;
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>New Contact Message</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background: #f6f9fc; margin: 0; padding: 24px; }
          .card { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); }
          .header { background: linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%); color: #fff; padding: 20px 24px; }
          .header h1 { margin: 0; font-size: 20px; }
          .content { padding: 24px; color: #0f172a; }
          .row { display: flex; gap: 16px; margin-bottom: 12px; }
          .label { width: 120px; color: #64748b; font-weight: 600; }
          .value { flex: 1; }
          .message { white-space: pre-wrap; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
          .footer { padding: 16px 24px; color: #64748b; font-size: 12px; border-top: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="row"><div class="label">Name</div><div class="value">${name}</div></div>
            <div class="row"><div class="label">Email</div><div class="value">${email}</div></div>
            ${topic ? `<div class="row"><div class="label">Topic</div><div class="value">${topic}</div></div>` : ''}
            <div style="margin-top:16px; margin-bottom:8px; font-weight:700;">Message</div>
            <div class="message">${message}</div>
          </div>
          <div class="footer">© ${new Date().getFullYear()} MADADEN</div>
        </div>
      </body>
      </html>
    `;

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const result = await resend.emails.send({
      from: "contact@madaden.com",
      to,
      reply_to: email,
      subject,
      html,
    });

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";


