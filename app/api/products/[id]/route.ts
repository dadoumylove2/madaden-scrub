import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin()
    
    const { id: productId } = await params
    
    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    })
    
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    
    // Delete the product
    await prisma.product.delete({
      where: { id: productId },
    })
    
    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    if (error instanceof Error && error.message === "Admin access required") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }
    console.error("Product deletion error:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
