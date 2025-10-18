"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Wind, Shield, Ruler } from "lucide-react"

const materials = [
  {
    icon: Droplets,
    title: "Moisture-Wicking",
    description: "Advanced fabric technology keeps you dry and comfortable throughout your shift.",
  },
  {
    icon: Wind,
    title: "Breathable Blend",
    description: "Optimal airflow with our proprietary fabric blend for all-day freshness.",
  },
  {
    icon: Shield,
    title: "Antimicrobial Protection",
    description: "Built-in antimicrobial finish prevents odor-causing bacteria growth.",
  },
]

export function MaterialsFit() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Materials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-3xl">Premium Materials</h2>
              <p className="text-muted-foreground leading-relaxed">
                Every Madaden scrub is crafted with carefully selected materials that prioritize both comfort and
                performance.
              </p>
            </div>

            <div className="space-y-4">
              {materials.map((material, index) => (
                <Card key={material.title} className="border-l-4 border-l-primary">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <material.icon className="w-5 h-5 text-primary" />
                      {material.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">{material.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Fit & Sizing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-3xl">Perfect Fit</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our scrubs are designed with input from healthcare professionals to ensure the perfect fit for every
                body type.
              </p>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Ruler className="w-5 h-5 text-primary" />
                  Size Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Available in sizes XS through XXL with detailed measurements for chest, waist, and hip.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium">XS - S</div>
                    <div className="text-muted-foreground">Chest: 32-36"</div>
                  </div>
                  <div>
                    <div className="font-medium">M - L</div>
                    <div className="text-muted-foreground">Chest: 38-42"</div>
                  </div>
                  <div>
                    <div className="font-medium">XL - XXL</div>
                    <div className="text-muted-foreground">Chest: 44-48"</div>
                  </div>
                  <div>
                    <div className="font-medium">Custom</div>
                    <div className="text-muted-foreground">Contact us</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Complete Size Guide
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
