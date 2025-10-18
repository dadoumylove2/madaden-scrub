import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json({ error: "Email parameter is required" }, { status: 400 })
    }
    
    const orders = await prisma.order.findMany({
      where: {
        customerEmail: email.toLowerCase(),
      },
      include: {
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
    console.error("Failed to search orders:", error)
    return NextResponse.json({ error: "Failed to search orders" }, { status: 500 })
  }
}
