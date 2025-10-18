import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Heart, Users, Award, Target, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "About Us - Madaden Healthcare Apparel",
  description:
    "Learn about Madaden's mission to revolutionize healthcare apparel with innovative scrubs designed for comfort, functionality, and style.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-50"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 px-4 py-2 bg-primary/10 text-primary border border-primary/20">
                <Heart className="w-4 h-4 mr-2" />
                Our Story
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Revolutionizing Healthcare
                <span className="text-primary block">Apparel</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                At Madaden, we believe healthcare professionals deserve apparel that works as hard as they do. Our
                innovative scrubs combine cutting-edge design with unmatched comfort.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We're on a mission to transform the healthcare apparel industry by creating scrubs that prioritize
                  both functionality and style. Every design decision is made with healthcare professionals in mind.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Target className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Innovation First</h3>
                      <p className="text-muted-foreground">Pioneering new technologies like integrated undershirts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Users className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Healthcare Heroes</h3>
                      <p className="text-muted-foreground">Designed by and for healthcare professionals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Award className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Quality Promise</h3>
                      <p className="text-muted-foreground">Premium materials and construction in every piece</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
                  <Image
                    src="/healthcare-team-in-modern-scrubs.png"
                    alt="Healthcare team wearing Madaden scrubs"
                    width={400}
                    height={400}
                    className="rounded-xl object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-muted/30 via-primary/5 to-accent/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These core principles guide everything we do at Madaden
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Comfort First",
                  description: "Every design prioritizes all-day comfort for long shifts",
                  icon: Heart,
                },
                {
                  title: "Functional Design",
                  description: "Thoughtful features that make work easier and more efficient",
                  icon: Target,
                },
                {
                  title: "Quality Materials",
                  description: "Premium fabrics that withstand the demands of healthcare",
                  icon: Award,
                },
              ].map((value, index) => (
                <Card key={index} className="border-primary/10 hover:border-primary/20 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Ready to Experience the Difference?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of healthcare professionals who have made the switch to Madaden scrubs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <Link href="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  asChild
                >
                  <Link href="/contact">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
