"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "ICU Nurse",
    avatar: "/professional-nurse-headshot--healthcare-worker-por.png",
    content:
      "The attached undershirt is a game-changer. I feel confident and comfortable throughout my 12-hour shifts.",
    rating: 5,
  },
  {
    name: "Dr. Michael Rodriguez",
    role: "Emergency Physician",
    avatar: "/professional-doctor-headshot--physician-portrait.png",
    content: "Finally, scrubs that move with me. The 4-way stretch makes all the difference during long procedures.",
    rating: 5,
  },
  {
    name: "Jennifer Park",
    role: "Surgical Tech",
    avatar: "/professional-surgical-technician-headshot--medical.png",
    content:
      "Love the pocket system! Everything stays secure and organized. These scrubs are built for real healthcare work.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-28 bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">

      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Customer Stories
          </div>
          <h2 className="font-heading font-bold text-4xl md:text-5xl xl:text-6xl bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            What Healthcare Professionals Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Trusted by thousands of healthcare professionals across the country.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-background to-muted/20 border border-border/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary group-hover:scale-110 transition-transform duration-300" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg group-hover:text-foreground/80 transition-colors duration-300">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-border/20">
                    <Avatar className="w-12 h-12 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-base text-foreground group-hover:text-primary transition-colors duration-300">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
