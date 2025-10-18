"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Droplets, Package, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Package,
    title: "Attached Undershirt",
    description: "Secure, polished look",
  },
  {
    icon: Zap,
    title: "4-Way Stretch",
    description: "Breathable blend",
  },
  {
    icon: Shield,
    title: "Antimicrobial Finish",
    description: "Stay fresh longer",
  },
  {
    icon: Droplets,
    title: "Secure Pocket System",
    description: "Everything in place",
  },
  {
    icon: Sparkles,
    title: "Easy-Care",
    description: "Quick-dry fabric",
  },
]

export function USPBar() {
  return (
    <section className="py-20 bg-gradient-to-br from-muted/20 via-muted/30 to-muted/20 relative overflow-hidden">

      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center space-y-4 group"
            >
              <motion.div 
                className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl flex items-center justify-center shadow-lg border border-primary/20 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300"
                whileHover={{ rotate: 5 }}
              >
                <feature.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <div className="space-y-2">
                <h3 className="font-heading font-semibold text-base text-foreground group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
