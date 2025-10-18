"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Star, Heart } from "lucide-react"
import { AddToCartButton } from "@/components/add-to-cart-button"

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    description?: string
    price: number
    image: string
    category?: string
    inStock?: boolean
    // Optional fields with defaults
    tagline?: string
    originalPrice?: number
    colors?: string[]
    rating?: number
    reviewCount?: number
    badge?: string
  }
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  // Provide defaults for missing fields
  const productWithDefaults = {
    ...product,
    tagline: product.tagline || product.description || "Premium healthcare apparel",
    colors: product.colors || ["#1E3A8A", "#4ECDC4"],
    rating: product.rating || 5,
    reviewCount: product.reviewCount || 0,
    badge: product.badge || (product.inStock === false ? "Out of Stock" : undefined),
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/30">
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/30 to-muted/60">
            {productWithDefaults.badge && (
              <Badge className="absolute top-3 left-3 z-10 shadow-lg" variant="secondary">
                {productWithDefaults.badge}
              </Badge>
            )}
            {/* Removed wishlist heart icon for a cleaner card */}
            <Image
              src={productWithDefaults.image || "/placeholder.svg"}
              alt={productWithDefaults.name}
              width={400}
              height={400}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-3">
            <div className="space-y-2">
              <h3 className="font-heading font-semibold text-lg leading-tight">{productWithDefaults.name}</h3>
              {/* Truncate long descriptions/taglines to a single line on listing cards */}
              <p className="text-sm text-muted-foreground line-clamp-1">{productWithDefaults.tagline}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < productWithDefaults.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({productWithDefaults.reviewCount})</span>
            </div>

            {/* Color Swatches */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Colors:</span>
              <div className="flex gap-1">
                {productWithDefaults.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">${productWithDefaults.price}</span>
              {productWithDefaults.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${productWithDefaults.originalPrice}</span>
              )}
            </div>

            {/* CTA */}
            <div className="flex gap-2">
              <Button className="flex-1" asChild>
                <Link href={`/products/${productWithDefaults.slug}`}>View Details</Link>
              </Button>
              <AddToCartButton
                productId={productWithDefaults.id}
                productName={productWithDefaults.name}
                price={productWithDefaults.price}
                image={productWithDefaults.image}
                variant="outline"
                size="icon"
                className="min-w-[40px]"
                onSuccess={() => {
                  // Also emit cart update in case another consumer listens directly
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('cart:updated'))
                  }
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
