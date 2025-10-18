import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { sendOrderStatusEmail, OrderEmailData } from "@/lib/email"

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin()
    
    const { id: orderId } = await params
    
    // Check if order exists
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    })
    
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }
    
    // Delete order items first (due to foreign key constraints)
    await prisma.orderItem.deleteMany({
      where: { orderId: orderId },
    })
    
    // Delete the order
    await prisma.order.delete({
      where: { id: orderId },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && error.message === "Admin access required") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }
    console.error("Failed to delete order:", error)
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin()
    
    const { id: orderId } = await params
    const body = await request.json()
    
    // Get current order with details
    const currentOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })
    
    if (!currentOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }
    
    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: body.status },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })
    
    // Send status update email for specific statuses
    if (['APPROVED', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(body.status)) {
      const emailData: OrderEmailData = {
        orderId: updatedOrder.id,
        customerName: updatedOrder.customerName,
        customerEmail: updatedOrder.customerEmail,
        total: updatedOrder.total,
        items: updatedOrder.items.map(item => ({
          productName: item.product.name,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: updatedOrder.shippingAddress,
        city: updatedOrder.city,
        state: updatedOrder.state,
        zipCode: updatedOrder.zipCode,
        country: updatedOrder.country,
      }
      
      await sendOrderStatusEmail(emailData, body.status)
    }
    
    return NextResponse.json(updatedOrder)
  } catch (error) {
    if (error instanceof Error && error.message === "Admin access required") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }
    console.error("Failed to update order status:", error)
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
  }
}
