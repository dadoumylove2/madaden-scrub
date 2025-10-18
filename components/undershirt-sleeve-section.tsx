"use client"

import Image from 'next/image'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ThermometerSnowflake, Clock, Shirt } from "lucide-react"

const benefits = [
  {
    icon: ThermometerSnowflake,
    title: "Temperature Regulation",
    description: "The built-in undershirt sleeve provides optimal temperature control in varying hospital environments."
  },
  {
    icon: Clock,
    title: "Time-Saving Design",
    description: "Eliminate the need for layering with our innovative all-in-one scrub design."
  },
  {
    icon: Shirt,
    title: "Professional Appearance",
    description: "Maintain a polished look throughout your shift with sleeves that stay perfectly in place."
  },
  {
    icon: Check,
    title: "Infection Control",
    description: "Fewer separate garments means fewer contamination risks in clinical settings."
  }
]

export function UndershirtSleeveSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Image and highlight */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-6 -left-6 bg-primary/10 rounded-full w-32 h-32 blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-8 shadow-lg">
              <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                INNOVATIVE DESIGN
              </div>
              <Image 
                src="/images/underShirtSleeve.jpg" 
                alt="Madaden Scrub with Built-in Undershirt Sleeve" 
                width={500} 
                height={500}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-lg shadow-md mx-auto object-cover"
              />
              <div className="mt-6 space-y-3">
                <h3 className="text-xl font-bold">MADADEN SCRUB WITH BUILT-IN UNDERSHIRT SLEEVE</h3>
                <p className="text-muted-foreground">The first medical scrub designed with an integrated undershirt sleeve for comfort and professionalism.</p>
              </div>
            </div>
          </motion.div>

          {/* Right column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Revolutionary Design
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold">
                The Perfect Integration of 
                <span className="text-primary block">Comfort & Functionality</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our patented design eliminates the need for separate undershirts, providing seamless coverage and professional appearance throughout your shift.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <Card key={benefit.title} className="border border-border/30 bg-background/50 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-5">
                    <div className="flex gap-4 items-start">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Shop Undershirt Scrubs
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}