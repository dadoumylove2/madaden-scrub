"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Mail } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-primary via-primary/90 to-accent relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-[url('/medical-pattern.png')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/3 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Ready to Experience
            <span className="block">The Difference?</span>
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Join thousands of healthcare professionals who've made the switch to Madaden. Experience the perfect blend
            of comfort, functionality, and style.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                asChild
              >
                <Link href="/products">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Shop Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-bold rounded-full bg-transparent transition-all duration-300"
                asChild
              >
                <Link href="/contact">
                  <Mail className="h-5 w-5 mr-2" />
                  Get Updates
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/80 text-sm mt-8"
          >
            Free shipping on orders over $75 • 30-day satisfaction guarantee
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
