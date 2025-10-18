import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db";
import { sendAdminNotificationEmail, sendOrderConfirmationEmail, OrderEmailData } from "@/lib/email";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || !sig) {
    return new NextResponse("Webhook signature missing", { status: 400 });
  }

  const buf = await req.arrayBuffer();
  const body = Buffer.from(buf);

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2024-06-20" });
    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = (session.metadata?.userId as string) || null;

      if (userId) {
        const cartItems = await prisma.cartItem.findMany({
          where: { userId },
          include: { product: true, user: true },
        });

        if (cartItems.length > 0) {
          const order = await prisma.order.create({
            data: {
              customerName: session.metadata?.customerName || cartItems[0].user.name || "Customer",
              customerEmail: session.metadata?.customerEmail || cartItems[0].user.email || "",
              customerPhone: session.metadata?.customerPhone || "",
              shippingAddress: session.metadata?.shippingAddress || "",
              city: session.metadata?.city || "",
              state: session.metadata?.state || "",
              zipCode: session.metadata?.zipCode || "",
              country: session.metadata?.country || "",
              total: cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0),
              status: "APPROVED",
              items: {
                create: cartItems.map((i) => ({ productId: i.productId, quantity: i.quantity, price: i.product.price })),
              },
            },
            include: { items: { include: { product: true } } },
          });

          await prisma.cartItem.deleteMany({ where: { userId } });

          const emailData: OrderEmailData = {
            orderId: order.id,
            customerName: order.customerName,
            customerEmail: order.customerEmail,
            total: order.total,
            items: order.items.map((it) => ({ productName: it.product.name, quantity: it.quantity, price: it.price })),
            shippingAddress: order.shippingAddress,
            city: order.city,
            state: order.state,
            zipCode: order.zipCode,
            country: order.country,
          };

          await Promise.all([
            sendOrderConfirmationEmail(emailData),
            sendAdminNotificationEmail(emailData),
          ]);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Stripe webhook error:", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }
}

export const dynamic = "force-dynamic";


