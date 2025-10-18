"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, ArrowRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function HeroSection() {
  return (
    <section className="relative pt-36 pb-24 lg:pt-44 lg:pb-32 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 border-t border-border/10 hero-glow">
      {/* Sophisticated grid background - lighter in light mode */}
      <div
        className={cn(
          "absolute inset-0 opacity-40",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,rgba(22,78,99,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,78,99,0.08)_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,rgba(22,78,99,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,78,99,0.25)_1px,transparent_1px)]"
        )}
      />
      
      {/* Secondary grid layer for depth */}
      <div
        className={cn(
          "absolute inset-0 opacity-25",
          "[background-size:80px_80px]",
          "[background-image:linear-gradient(to_right,rgba(22,78,99,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,78,99,0.06)_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,rgba(22,78,99,0.20)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,78,99,0.20)_1px,transparent_1px)]"
        )}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                                              <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Badge className="w-fit px-4 py-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 shadow-sm backdrop-blur-sm hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-primary/10 to-primary/5">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Clinician-Tested
                </Badge>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent drop-shadow-sm hover:scale-110 transition-transform duration-300" />
                  ))}
                  <span className="text-sm font-medium text-foreground bg-background/50 px-2 py-1 rounded-full backdrop-blur-sm border border-border/20 shadow-sm">4.9/5 Rating</span>
                </div>
              </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">Revolutionize Your Workday.</span>
                <br />
                <span className="text-primary bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent drop-shadow-sm">
                  With Madaden Scrubs.
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                High-performance scrubs designed for modern healthcare professionals. Experience unmatched comfort and style.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 px-8 py-3 relative overflow-hidden group"
                asChild
              >
                <Link href="/products" className="relative z-10">
                  Shop the Featured Set
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 px-8 py-3 relative overflow-hidden group"
                asChild
              >
                <Link href="/contact" className="relative z-10 flex items-center">
                  Contact Us
                </Link>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 pt-8">
              <div className="text-center sm:text-left group">
                <div className="text-2xl lg:text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent drop-shadow-sm">10K+</div>
                <div className="text-sm text-muted-foreground font-medium bg-background/30 px-2 py-1 rounded-full backdrop-blur-sm border border-border/20">Happy Nurses</div>
              </div>
              <div className="text-center sm:text-left group">
                <div className="text-2xl lg:text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent drop-shadow-sm">500+</div>
                <div className="text-sm text-muted-foreground font-medium bg-background/30 px-2 py-1 rounded-full backdrop-blur-sm border border-border/20">Hospitals</div>
              </div>
              <div className="text-center sm:text-left group">
                <div className="text-2xl lg:text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent drop-shadow-sm">99%</div>
                <div className="text-sm text-muted-foreground font-medium bg-background/30 px-2 py-1 rounded-full backdrop-blur-sm border border-border/20">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative max-w-lg mx-auto lg:mx-0 lg:ml-8">
            <div className="relative bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-4 border border-primary/10 shadow-lg overflow-hidden">
              {/* Enhanced background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-accent/3 opacity-20" />
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full blur-lg" />
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-accent/10 rounded-full blur-md" />
              
              <div className="relative aspect-[4/3] bg-muted/20 rounded-lg overflow-hidden shadow-inner">
                <Image
                  src="/images/hero.png"
                  alt="Madaden Featured Scrub Set"
                  width={500}
                  height={375}
                  className="rounded-lg object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                  priority
                />

                <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                  New Arrival
                </div>
              </div>

              <div className="mt-3 p-3 bg-background/90 backdrop-blur-md rounded-lg border border-border/50 shadow-sm">
                <h3 className="font-bold text-base text-foreground mb-1">Premium Scrub Set</h3>
                <p className="text-muted-foreground mb-2 text-xs">With integrated undershirt technology</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">$89.99</span>
                    <div className="text-xs text-muted-foreground">Free shipping</div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary border border-background shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white border border-background shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white border border-background shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
