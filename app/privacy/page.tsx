import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Privacy Policy - Madaden",
  description: "Learn how Madaden protects your privacy and handles your personal information.",
}

export default function PrivacyPage() {
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
                    Privacy & Security
                  </div>
                  <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                    Privacy Policy
                  </h1>
                  <p className="text-lg text-muted-foreground">Last updated: January 1, 2024</p>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                    At Madaden, we are committed to protecting your privacy and ensuring the security of your personal
                    information. This Privacy Policy explains how we collect, use, and safeguard your data when you
                    visit our website or use our services.
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
                  Information We Collect
                </h2>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-heading font-semibold text-lg text-foreground">Personal Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We may collect personal information that you voluntarily provide to us, including:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Name and contact information (email address, phone number, mailing address)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Account credentials and preferences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Payment information (processed securely through third-party providers)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Communication preferences and marketing consent</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-heading font-semibold text-lg text-foreground">Usage Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We automatically collect certain information about your use of our website, including:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Device information (IP address, browser type, operating system)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Website usage data (pages visited, time spent, click patterns)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Cookies and similar tracking technologies</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-6 bg-gradient-to-br from-background to-muted/20 rounded-2xl p-8 border border-border/30 shadow-lg">
                <h2 className="font-heading font-bold text-2xl flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  How We Use Your Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>To provide and improve our products and services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>To process orders and handle customer service inquiries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>To send marketing communications (with your consent)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>To analyze website usage and optimize user experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>To comply with legal obligations and protect our rights</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-6 bg-gradient-to-br from-background to-muted/20 rounded-2xl p-8 border border-border/30 shadow-lg">
                <h2 className="font-heading font-bold text-2xl flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Information Sharing
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share your
                  information only in the following circumstances:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>With service providers who assist us in operating our business</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>When required by law or to protect our legal rights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>In connection with a business transfer or merger</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>With your explicit consent</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-6 bg-gradient-to-br from-background to-muted/20 rounded-2xl p-8 border border-border/30 shadow-lg">
                <h2 className="font-heading font-bold text-2xl flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Data Security
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction. However, no method of
                  transmission over the internet is 100% secure.
                </p>
              </section>

              <section className="space-y-6 bg-gradient-to-br from-background to-muted/20 rounded-2xl p-8 border border-border/30 shadow-lg">
                <h2 className="font-heading font-bold text-2xl flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Your Rights
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Access to your personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Correction of inaccurate information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Deletion of your personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Restriction of processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Data portability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Objection to processing</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-6 bg-gradient-to-br from-background to-muted/20 rounded-2xl p-8 border border-border/30 shadow-lg">
                <h2 className="font-heading font-bold text-2xl flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-xl border border-primary/20">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="text-muted-foreground">Email: </span>
                      <a href="mailto:privacy@madaden.com" className="text-primary hover:text-primary/80 font-medium transition-colors">
                        privacy@madaden.com
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
