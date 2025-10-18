import { NextRequest, NextResponse } from "next/server";
import { stripe, assertStripeConfigured } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    console.log("Checkout API called");
    
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY not configured");
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }
    
    assertStripeConfigured();
    const user = await getCurrentUser();
    if (!user) {
      console.error("No authenticated user");
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    console.log("User authenticated:", user.id);
    
    const body = await req.json();
    const { customerName, customerEmail, customerPhone, shippingAddress, city, state, zipCode, country } = body;
    
    console.log("Customer details:", { customerName, customerEmail });

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: { product: true },
    });

    console.log("Cart items found:", cartItems.length);

    if (cartItems.length === 0) {
      console.error("Cart is empty");
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.product.price * 100),
        product_data: {
          name: item.product.name,
          // Removed images due to base64 data being too long for Stripe
        },
      },
      quantity: item.quantity,
    }));

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
    
    console.log("Base URL for redirects:", baseUrl);

    console.log("Creating Stripe session...");
    
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      metadata: { 
        userId: user.id,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        city,
        state,
        zipCode,
        country
      },
    });

    console.log("Stripe session created:", session.id);
    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("Failed to create checkout session:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}


