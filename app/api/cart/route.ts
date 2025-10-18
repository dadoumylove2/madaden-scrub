import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

// GET - Get cart items for authenticated user
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ items: [], total: 0 })
    }
    
    // Get user's cart items from database with optimized query
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        quantity: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
          }
        }
      }
    })
    
    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    
    return NextResponse.json({
      items: cartItems.map(item => ({
        id: item.id,
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
        quantity: item.quantity
      })),
      total
    })
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

// POST - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }
    
    const { productId, quantity = 1 } = await request.json()
    
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }
    
    // Check if item already exists in user's cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId: user.id,
        productId: productId
      }
    })
    
    if (existingItem) {
      // Update quantity
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      })
    } else {
      // Add new item
      await prisma.cartItem.create({
        data: {
          userId: user.id,
          productId,
          quantity
        }
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
  }
}

// PUT - Update cart item quantity
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }
    
    const { itemId, quantity } = await request.json()
    
    if (!itemId || quantity === undefined) {
      return NextResponse.json({ error: "Item ID and quantity are required" }, { status: 400 })
    }
    
    // Verify the item belongs to the user
    const item = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        userId: user.id
      }
    })
    
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      await prisma.cartItem.delete({
        where: { id: itemId }
      })
    } else {
      // Update quantity
      await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity }
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating cart:", error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
}

// DELETE - Remove item from cart or clear entire cart
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }
    
    const { searchParams } = new URL(request.url)
    const itemId = searchParams.get("itemId")
    
    if (itemId) {
      // Remove specific item (verify it belongs to user)
      const item = await prisma.cartItem.findFirst({
        where: {
          id: itemId,
          userId: user.id
        }
      })
      
      if (!item) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 })
      }
      
      await prisma.cartItem.delete({
        where: { id: itemId }
      })
    } else {
      // Clear entire cart
      await prisma.cartItem.deleteMany({
        where: { userId: user.id }
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error removing from cart:", error)
    return NextResponse.json({ error: "Failed to remove from cart" }, { status: 500 })
  }
}
