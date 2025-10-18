import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Ruler, Users, ArrowRight, Info } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Size Guide - Madaden Healthcare Apparel",
  description:
    "Find your perfect fit with our comprehensive size guide for Madaden scrubs. Includes measurements for tops, bottoms, and fit recommendations.",
}

export default function SizingPage() {
  const sizeChart = {
    tops: [
      { size: "XS", chest: "32-34", waist: "24-26", length: "24" },
      { size: "S", chest: "34-36", waist: "26-28", length: "25" },
      { size: "M", chest: "36-38", waist: "28-30", length: "26" },
      { size: "L", chest: "38-40", waist: "30-32", length: "27" },
      { size: "XL", chest: "40-42", waist: "32-34", length: "28" },
      { size: "XXL", chest: "42-44", waist: "34-36", length: "29" },
    ],
    bottoms: [
      { size: "XS", waist: "24-26", hips: "34-36", inseam: "30" },
      { size: "S", waist: "26-28", hips: "36-38", inseam: "30" },
      { size: "M", waist: "28-30", hips: "38-40", inseam: "31" },
      { size: "L", waist: "30-32", hips: "40-42", inseam: "31" },
      { size: "XL", waist: "32-34", hips: "42-44", inseam: "32" },
      { size: "XXL", waist: "34-36", hips: "44-46", inseam: "32" },
    ],
  }

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
                <Ruler className="w-4 h-4 mr-2" />
                Size Guide
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Find Your Perfect
                <span className="text-primary block">Fit</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                Our comprehensive size guide helps you find the ideal fit for maximum comfort during long shifts.
              </p>
            </div>
          </div>
        </section>

        {/* Size Charts */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="tops" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="tops">Scrub Tops</TabsTrigger>
                <TabsTrigger value="bottoms">Scrub Bottoms</TabsTrigger>
              </TabsList>

              <TabsContent value="tops">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Scrub Tops Size Chart
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-semibold">Size</th>
                            <th className="text-left py-3 px-4 font-semibold">Chest (inches)</th>
                            <th className="text-left py-3 px-4 font-semibold">Waist (inches)</th>
                            <th className="text-left py-3 px-4 font-semibold">Length (inches)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sizeChart.tops.map((row, index) => (
                            <tr key={index} className="border-b border-border/50">
                              <td className="py-3 px-4 font-medium">{row.size}</td>
                              <td className="py-3 px-4">{row.chest}</td>
                              <td className="py-3 px-4">{row.waist}</td>
                              <td className="py-3 px-4">{row.length}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bottoms">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Scrub Bottoms Size Chart
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-semibold">Size</th>
                            <th className="text-left py-3 px-4 font-semibold">Waist (inches)</th>
                            <th className="text-left py-3 px-4 font-semibold">Hips (inches)</th>
                            <th className="text-left py-3 px-4 font-semibold">Inseam (inches)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sizeChart.bottoms.map((row, index) => (
                            <tr key={index} className="border-b border-border/50">
                              <td className="py-3 px-4 font-medium">{row.size}</td>
                              <td className="py-3 px-4">{row.waist}</td>
                              <td className="py-3 px-4">{row.hips}</td>
                              <td className="py-3 px-4">{row.inseam}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Fit Tips */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-muted/30 via-primary/5 to-accent/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 text-center">
                Fit Tips & Recommendations
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-primary/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                        <Info className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">How to Measure</h3>
                        <ul className="text-muted-foreground space-y-1 text-sm">
                          <li>• Chest: Measure around the fullest part</li>
                          <li>• Waist: Measure at your natural waistline</li>
                          <li>• Hips: Measure around the fullest part</li>
                          <li>• Use a soft measuring tape for accuracy</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Fit Preferences</h3>
                        <ul className="text-muted-foreground space-y-1 text-sm">
                          <li>• For a relaxed fit, size up</li>
                          <li>• Our scrubs have 4-way stretch</li>
                          <li>• Consider your layering needs</li>
                          <li>• Between sizes? We recommend sizing up</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Ready to Find Your Size?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Shop our premium scrub collection with confidence knowing you'll get the perfect fit.
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
                  <Link href="/contact">Need Help?</Link>
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
