import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms of Service - Madaden",
  description:
    "Read Madaden's terms of service and understand your rights and responsibilities when using our website and services.",
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-32">
        <div className="bg-gradient-to-br from-background via-primary/5 to-accent/10 py-16 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(22,78,99,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(22,78,99,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Legal & Terms
                  </div>
                  <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                    Terms of Service
                  </h1>
                  <p className="text-lg text-muted-foreground">Last updated: January 1, 2024</p>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                    Welcome to Madaden. These Terms of Service govern your use of our website and services. By accessing
                    or using our services, you agree to be bound by these terms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <section className="space-y-6 bg-gradient-to-br from-background to-muted/20 rounded-2xl p-8 border border-border/30 shadow-lg">
                <h2 className="font-heading font-bold text-2xl flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of
                  this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="space-y-6 bg-gradient-to-br from-background to-muted/20 rounded-2xl p-8 border border-border/30 shadow-lg">
                <h2 className="font-heading font-bold text-2xl flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Use License
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Permission is granted to temporarily download one copy of the materials on Madaden's website for
                  personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of
                  title, and under this license you may not:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Modify or copy the materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Use the materials for any commercial purpose or for any public display</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Attempt to reverse engineer any software contained on the website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Remove any copyright or other proprietary notations from the materials</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-6 bg-gradient-to-br from-background to-muted/20 rounded-2xl p-8 border border-border/30 shadow-lg">
                <h2 className="font-heading font-bold text-2xl flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Product Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We strive to provide accurate product information, including descriptions, pricing, and availability.
                  However, we do not warrant that product descriptions or other content is accurate, complete, reliable,
                  current, or error-free.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading font-bold text-2xl">Orders and Payment</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading font-semibold text-lg">Order Acceptance</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      All orders are subject to acceptance and availability. We reserve the right to refuse or cancel
                      any order for any reason.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading font-semibold text-lg">Pricing</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Prices are subject to change without notice. We reserve the right to modify prices at any time.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading font-semibold text-lg">Payment</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Payment is due at the time of order. We accept major credit cards and other payment methods as
                      indicated on our website.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading font-bold text-2xl">Shipping and Returns</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading font-semibold text-lg">Shipping</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We will make every effort to ship orders promptly. Shipping times are estimates and not
                      guaranteed. Risk of loss passes to you upon delivery to the carrier.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading font-semibold text-lg">Returns</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We offer a 30-day return policy for unworn items in original condition. Return shipping costs may
                      apply unless the return is due to our error.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading font-bold text-2xl">Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The materials on Madaden's website are provided on an 'as is' basis. Madaden makes no warranties,
                  expressed or implied, and hereby disclaims and negates all other warranties including without
                  limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
                  non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading font-bold text-2xl">Limitations</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall Madaden or its suppliers be liable for any damages (including, without limitation,
                  damages for loss of data or profit, or due to business interruption) arising out of the use or
                  inability to use the materials on Madaden's website, even if Madaden or an authorized representative
                  has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading font-bold text-2xl">Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the laws of the United
                  States and you irrevocably submit to the exclusive jurisdiction of the courts in that state or
                  location.
                </p>
              </section>

              <section className="space-y-6 bg-gradient-to-br from-background to-muted/20 rounded-2xl p-8 border border-border/30 shadow-lg">
                <h2 className="font-heading font-bold text-2xl flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-xl border border-primary/20">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="text-muted-foreground">Email: </span>
                      <a href="mailto:legal@madaden.com" className="text-primary hover:text-primary/80 font-medium transition-colors">
                        legal@madaden.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="text-muted-foreground">Address: </span>
                      <span className="text-foreground font-medium">123 Healthcare Blvd, Suite 100, Medical City, MC 12345</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
