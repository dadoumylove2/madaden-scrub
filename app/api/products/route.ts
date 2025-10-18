import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sizeParam = searchParams.get('size') // comma-separated
    const colorParam = searchParams.get('color') // comma-separated
    const searchParam = searchParams.get('search') // search query
    // 'fit' filter is currently UI-only; ignore unless added to schema

    const sizes = sizeParam ? sizeParam.split(',').filter(Boolean) : []
    const colors = colorParam ? colorParam.split(',').filter(Boolean) : []

    const where: any = {}
    if (sizes.length) {
      where.sizes = { hasSome: sizes }
    }
    if (colors.length) {
      where.colors = { hasSome: colors }
    }
    if (searchParam) {
      where.OR = [
        { name: { contains: searchParam, mode: 'insensitive' } },
        { description: { contains: searchParam, mode: 'insensitive' } },
        { category: { contains: searchParam, mode: 'insensitive' } }
      ]
    }

    const products = await prisma.product.findMany({
      where,
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        image: true,
        category: true,
        inStock: true,
        sizes: true,
        colors: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    })
    
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
    
    const body = await request.json()
    
    // Generate a unique slug by adding timestamp
    const baseSlug = body.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    const timestamp = Date.now()
    const uniqueSlug = `${baseSlug}-${timestamp}`
    
    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: uniqueSlug,
        description: body.description,
        price: body.price,
        image: body.image,
        category: body.category,
        inStock: body.inStock ?? true,
        sizes: body.sizes || [],
        colors: body.colors || [],
      },
    })
    
    return NextResponse.json(product)
  } catch (error) {
    if (error instanceof Error && error.message === "Admin access required") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }
    console.error("Product creation error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
