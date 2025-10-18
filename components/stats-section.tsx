"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const stats = [
  {
    number: "50,000+",
    label: "Healthcare Professionals",
    description: "Trust Madaden scrubs daily",
  },
  {
    number: "1,200+",
    label: "Medical Facilities",
    description: "Partner with us nationwide",
  },
  {
    number: "98.7%",
    label: "Satisfaction Rate",
    description: "Would recommend to colleagues",
  },
  {
    number: "24/7",
    label: "Comfort Guarantee",
    description: "All-day performance promise",
  },
]

export function StatsSection() {
  return (
    <section className="py-28 bg-gradient-to-br from-muted/20 via-muted/40 to-muted/20 relative overflow-hidden">

      
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
            Trust & Recognition
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
            Trusted by Healthcare
            <span className="text-primary block bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">Professionals Everywhere</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our commitment to quality and innovation has earned the trust of medical professionals across the country.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-border/30 group">
                <CardContent className="p-8">
                  <motion.div
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-4xl lg:text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300"
                  >
                    {stat.number}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{stat.label}</h3>
                  <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
