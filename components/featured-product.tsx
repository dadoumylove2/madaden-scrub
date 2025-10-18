"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Star, ArrowRight } from "lucide-react"

const productImages = [
  "/teal-nursing-scrub-top-front-view--medical-apparel.png",
  "/teal-nursing-scrub-pants-side-view--medical-appare.png",
  "/teal-nursing-scrub-set-back-view--complete-medical.png",
  "/teal-nursing-scrub-fabric-close-up--antimicrobial-.png",
  "/teal-nursing-scrub-pocket-detail--secure-storage-s.png",
]

const features = [
  "Attached undershirt for complete coverage",
  "4-way stretch fabric moves with you",
  "Antimicrobial finish stays fresh",
  "Strategic pocket placement",
  "Easy-care, wrinkle-resistant",
]

export function FeaturedProduct() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl">Featured Product</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our signature scrub set combines innovative design with premium materials for unmatched comfort and
            performance.
          </p>
        </motion.div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Product Gallery */}
              <div className="p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <div className="aspect-square bg-muted/50 rounded-xl overflow-hidden">
                      <Image
                        src={productImages[0] || "/placeholder.svg"}
                        alt="Madaden Featured Scrub Set - Main View"
                        width={400}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  {productImages.slice(1, 5).map((image, index) => (
                    <div key={index} className="aspect-square bg-muted/50 rounded-lg overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Madaden Featured Scrub Set - View ${index + 2}`}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-8 space-y-6">
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

                  <h3 className="font-heading font-bold text-2xl">Madaden Featured Scrub Set</h3>
                  <p className="text-muted-foreground">
                    The perfect combination of style, comfort, and functionality. Designed for healthcare professionals
                    who demand the best.
                  </p>

                  <div className="text-2xl font-bold">$89.99</div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-heading font-semibold">Key Features:</h4>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button size="lg" className="w-full" asChild>
                  <Link href="/products">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
