import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const to = process.env.ADMIN_EMAIL || "Layepam19@gmail.com";

    const result = await resend.emails.send({
      from: "newsletter@madaden.com",
      to,
      subject: "New Newsletter Subscriber",
      html: `
        <div style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
          <h2 style="margin-bottom:8px;">New Subscriber</h2>
          ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
          <p><strong>Email:</strong> ${email}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";


