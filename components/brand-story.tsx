"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function BrandStory() {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">

      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium w-fit">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Our Story
              </div>
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-balance bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                Designed by Healthcare Professionals, for Healthcare Professionals
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Madaden, we understand that comfort and performance aren't luxuries—they're necessities. Our scrubs
                  are engineered with input from nurses, doctors, and healthcare workers who know what it takes to get
                  through long shifts while maintaining professionalism and confidence.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Every detail, from the attached undershirt to the strategic pocket placement, is designed to support you
                  through your most demanding days. Because when you feel good, you can focus on what matters most: caring
                  for others.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative aspect-square bg-gradient-to-br from-muted/30 to-muted/50 rounded-3xl overflow-hidden shadow-2xl border border-border/20 group-hover:shadow-3xl transition-all duration-500">
              <Image
                src="/healthcare-professional-founder-portrait--medical-.png"
                alt="Madaden Founder"
                width={500}
                height={500}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative corner elements */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-primary/30 rounded-tl-lg" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-accent/30 rounded-br-lg" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
