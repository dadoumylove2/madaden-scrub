"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { ShoppingCartComponent } from "@/components/shopping-cart"

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
}

function SearchableProductsContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<{ size: string[]; color: string[]; fit: string[] }>({ size: [], color: [], fit: [] })
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  useEffect(() => {
    fetchProducts()
  }, [filters, searchQuery])

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams()
      if (filters.size.length) params.set('size', filters.size.join(','))
      if (filters.color.length) params.set('color', filters.color.join(','))
      if (filters.fit.length) params.set('fit', filters.fit.join(','))
      if (searchQuery) params.set('search', searchQuery)
      const qs = params.toString()
      const response = await fetch(`/api/products${qs ? `?${qs}` : ''}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main id="main-content" className="min-h-screen pt-32">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Premium Healthcare Apparel
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            Our Products
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our collection of premium healthcare apparel designed for comfort, performance, and style.
          </p>
        </div>

        <div className="lg:flex lg:gap-8">
          {/* Filters Sidebar */}
          <div className="hidden lg:block">
            <ProductFilters onChange={setFilters} />
          </div>

          {/* Products Grid */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
              <div className="flex items-center gap-4">
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-muted/30 rounded w-32"></div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">
                    Showing {products.length} product{products.length !== 1 ? "s" : ""}
                  </p>
                )}
                <div className="hidden sm:flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-xs text-muted-foreground">Premium Quality</span>
                </div>
              </div>
              <div className="lg:hidden">
                <ProductFilters onChange={setFilters} />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-muted/30 aspect-square rounded-lg mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted/30 rounded"></div>
                      <div className="h-3 bg-muted/30 rounded w-2/3"></div>
                      <div className="h-4 bg-muted/30 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {products.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={{
                      id: product.id,
                      name: product.name,
                      slug: product.slug,
                      tagline: product.description,
                      price: product.price,
                      image: product.image,
                      colors: (product as any).colors?.length > 0 
                        ? (product as any).colors.map((color: string) => {
                            const colorMap: Record<string, string> = {
                              "Aqua": "#4ECDC4",
                              "Navy": "#1E3A8A", 
                              "Black": "#000000",
                              "White": "#FFFFFF",
                              "Gray": "#6B7280",
                              "Teal": "#0D9488"
                            }
                            return colorMap[color] || "#000000"
                          })
                        : ["#4ECDC4", "#1E3A8A", "#000000"],
                      rating: 5,
                      reviewCount: 127,
                      badge: product.inStock ? "In Stock" : "Out of Stock",
                    }} 
                    index={index} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-br from-muted/20 to-muted/10 rounded-2xl p-8 border border-border/30">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📦</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-2">No Products Available</h3>
                  <p className="text-muted-foreground mb-4">
                    We're currently setting up our product catalog. Check back soon!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <main id="main-content" className="min-h-screen pt-32">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Premium Healthcare Apparel
              </div>
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                Our Products
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover our collection of premium healthcare apparel designed for comfort, performance, and style.
              </p>
            </div>
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
      }>
        <SearchableProductsContent />
      </Suspense>
      <Footer />
    </>
  )
}
