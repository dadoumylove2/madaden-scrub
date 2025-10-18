import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { sendOrderConfirmationEmail, sendAdminNotificationEmail, OrderEmailData } from "@/lib/email"

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })
    
    return NextResponse.json(orders)
  } catch (error) {
    console.error("Failed to fetch orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Calculate total
    const total = body.items.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity)
    }, 0)
    
    // Create order with customer details
    const order = await prisma.order.create({
      data: {
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerPhone: body.customerPhone,
        shippingAddress: body.shippingAddress,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        country: body.country || "Pakistan",
        total: total,
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })
    
    // Prepare email data
    const emailData: OrderEmailData = {
      orderId: order.id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      total: order.total,
      items: order.items.map(item => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingAddress: order.shippingAddress,
      city: order.city,
      state: order.state,
      zipCode: order.zipCode,
      country: order.country,
    }
    
    // Send emails
    await sendOrderConfirmationEmail(emailData)
    await sendAdminNotificationEmail(emailData)
    
    return NextResponse.json(order)
  } catch (error) {
    console.error("Failed to create order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
