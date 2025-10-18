"use client"

import { motion } from "framer-motion"
import { Shield, Heart, Zap, Users, Award, Leaf } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Shield,
    title: "Antimicrobial Protection",
    description: "Advanced fabric technology that inhibits bacterial growth, keeping you fresh throughout your shift.",
    color: "text-blue-500",
  },
  {
    icon: Heart,
    title: "Comfort-First Design",
    description: "Ergonomically designed with 4-way stretch fabric that moves with your body for all-day comfort.",
    color: "text-red-500",
  },
  {
    icon: Zap,
    title: "Quick-Dry Technology",
    description:
      "Moisture-wicking fabric that dries 3x faster than traditional scrubs, perfect for busy healthcare environments.",
    color: "text-yellow-500",
  },
  {
    icon: Users,
    title: "Clinician Tested",
    description: "Developed with input from over 1,000 healthcare professionals to ensure real-world functionality.",
    color: "text-green-500",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Hospital-grade materials that maintain their shape, color, and performance after hundreds of washes.",
    color: "text-purple-500",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious",
    description: "Made from sustainable materials with environmentally responsible manufacturing processes.",
    color: "text-teal-500",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-28 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">

      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Features & Benefits
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
            Why Healthcare Professionals
            <span className="text-primary block bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">Choose Madaden</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Every detail is engineered for the demanding healthcare environment, combining cutting-edge technology with
            uncompromising comfort.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm border border-border/30 group">
                <CardContent className="p-8 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-background to-muted/30 shadow-xl mb-6 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}
                  >
                    <feature.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
