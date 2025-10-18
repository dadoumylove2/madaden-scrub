import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductGallery } from "@/components/product-gallery"
import { VariantSelector } from "@/components/variant-selector"
import { SizeGuideModal } from "@/components/size-guide-modal"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react"
import { generateSEO, generateProductSchema } from "@/lib/seo"
import { prisma } from "@/lib/db"
import { AddToCartButton } from "@/components/add-to-cart-button"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
  
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
    })

    if (!product) {
      return generateSEO({
        title: "Product Not Found - Madaden",
        description: "The product you're looking for doesn't exist.",
      })
    }

    return generateSEO({
      title: `${product.name} - Madaden`,
      description: product.description || "Premium healthcare apparel",
      type: "website",
      url: `https://madaden.com/products/${slug}`,
      image: product.image,
    })
  } catch (error) {
    return generateSEO({
      title: "Product Not Found - Madaden",
      description: "The product you're looking for doesn't exist.",
    })
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
    })

    if (!product) {
      notFound()
    }

    // Get related products (excluding current product)
    const relatedProducts = await prisma.product.findMany({
      where: {
        id: { not: product.id },
        inStock: true,
      },
      take: 3,
      orderBy: { createdAt: "desc" },
    })

    const productSchema = generateProductSchema({
      name: product.name,
      description: product.description || "Premium healthcare apparel",
      price: product.price,
      image: product.image,
      rating: 5,
      reviewCount: 127,
    })



    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema),
          }}
        />
        <Navbar />
        <main id="main-content" className="min-h-screen pt-32">
          <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Product Gallery */}
              <div>
                <ProductGallery images={[product.image]} productName={product.name} />
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Best Seller</Badge>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">(127 reviews)</span>
                    </div>
                  </div>

                  <h1 className="font-heading font-bold text-3xl">{product.name}</h1>
                  <p className="text-lg text-muted-foreground">{product.description || "Premium healthcare apparel"}</p>

                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold">${product.price}</span>
                  </div>
                </div>

                {/* Variant Selection */}
                <VariantSelector 
                  sizes={(product as any).sizes?.length > 0 ? (product as any).sizes : ["S", "M", "L", "XL"]}
                  colors={(product as any).colors?.length > 0 ? (product as any).colors : ["Navy", "Black", "White"]}
                />

                {/* Size Guide */}
                <div className="flex items-center gap-4">
                  <SizeGuideModal />
                  <span className="text-sm text-muted-foreground">Need help with sizing?</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <AddToCartButton 
                    productId={product.id}
                    productName={product.name}
                    price={product.price}
                    image={product.image}
                    className="flex-1"
                  />
                  <Button variant="outline" size="lg">
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Product Details Accordion */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="features">
                    <AccordionTrigger>Features</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {[
                          "Premium quality fabric for comfort and durability",
                          "Professional design for healthcare settings",
                          "Easy care and maintenance",
                          "Available in multiple sizes",
                          "Antimicrobial finish prevents odor",
                          "Moisture-wicking technology",
                          "Reinforced stress points for longevity"
                        ].map((feature: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="fabric-care">
                    <AccordionTrigger>Fabric & Care</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Fabric Composition</h4>
                          <p className="text-sm text-muted-foreground">
                            65% Polyester, 32% Cotton, 3% Spandex blend for optimal comfort and durability
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Care Instructions</h4>
                          <ul className="space-y-1">
                            {[
                              "Machine wash cold with like colors",
                              "Tumble dry low heat or hang to dry",
                              "Do not bleach or use fabric softener",
                              "Iron on low heat if needed",
                              "Professional dry cleaning not required"
                            ].map((instruction: string, index: number) => (
                              <li key={index} className="text-sm text-muted-foreground">
                                • {instruction}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="shipping">
                    <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Shipping</h4>
                          <ul className="space-y-1">
                            {[
                              "Free standard shipping on orders over $75",
                              "Express shipping available for $9.99",
                              "Orders placed before 2 PM EST ship same day",
                              "Delivery within 3-7 business days",
                              "International shipping available"
                            ].map((info: string, index: number) => (
                              <li key={index} className="text-sm text-muted-foreground">
                                • {info}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Returns</h4>
                          <ul className="space-y-1">
                            {[
                              "30-day return policy for unworn items",
                              "Free returns with prepaid shipping label",
                              "Exchanges available for different sizes/colors",
                              "Refunds processed within 5-7 business days",
                              "Contact customer service for assistance"
                            ].map((info: string, index: number) => (
                              <li key={index} className="text-sm text-muted-foreground">
                                • {info}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Related Products */}
            <section className="mt-20">
              <h2 className="font-heading font-bold text-2xl mb-8">You Might Also Like</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                 {relatedProducts.map((relatedProduct, index) => (
                   <ProductCard 
                     key={relatedProduct.id} 
                     product={{
                       id: relatedProduct.id,
                       name: relatedProduct.name,
                       slug: relatedProduct.slug,
                       description: relatedProduct.description || undefined,
                       price: relatedProduct.price,
                       image: relatedProduct.image,
                       category: relatedProduct.category || undefined,
                       inStock: relatedProduct.inStock,
                       tagline: relatedProduct.description || "Premium healthcare apparel",
                       colors: ["#4ECDC4", "#1E3A8A", "#000000"],
                       rating: 5,
                       reviewCount: 127,
                       badge: relatedProduct.inStock ? "In Stock" : "Out of Stock",
                     }} 
                     index={index} 
                   />
                 ))}
              </div>
            </section>
          </div>

          {/* Sticky Mobile Bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="font-bold text-lg">${product.price}</div>
                <div className="text-sm text-muted-foreground">{product.name}</div>
              </div>
              <AddToCartButton 
                productId={product.id}
                productName={product.name}
                price={product.price}
                image={product.image}
              />
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  } catch (error) {
    console.error("Error loading product:", error)
    notFound()
  }
}
