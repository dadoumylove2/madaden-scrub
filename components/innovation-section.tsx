"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Microscope, Droplets, Wind } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const innovations = [
  {
    icon: Microscope,
    title: "Integrated Undershirt Technology",
    description: "Revolutionary attached undershirt eliminates bunching and provides seamless coverage",
    badge: "Patent Pending",
  },
  {
    icon: Droplets,
    title: "Advanced Moisture Management",
    description: "Triple-layer fabric system wicks moisture away while maintaining breathability",
    badge: "Clinically Tested",
  },
  {
    icon: Wind,
    title: "360° Stretch Performance",
    description: "Four-way stretch technology that maintains shape and provides unrestricted movement",
    badge: "Lab Verified",
  },
]

export function InnovationSection() {
  return (
    <section className="py-28 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">

      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium w-fit">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Innovation Lab
              </div>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground">
                Breakthrough Technology
                <span className="text-primary block bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">Meets Healthcare Needs</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Three years of research and development with leading medical institutions have resulted in scrubs that
                redefine what's possible in healthcare apparel.
              </p>
            </div>
            <Button size="lg" className="rounded-full px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300" asChild>
              <Link href="/about">
                Learn Our Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {innovations.map((innovation, index) => (
              <motion.div
                key={innovation.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-border/30 group">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <innovation.icon className="h-8 w-8" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{innovation.title}</h3>
                          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                            {innovation.badge}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">{innovation.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
