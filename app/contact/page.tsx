import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Linkedin } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Contact Us - Madaden",
  description:
    "Get in touch with Madaden for product questions, sizing help, or general inquiries. We're here to help healthcare professionals.",
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "info@madaden.com",
    description: "Send us an email anytime",
    href: "mailto:info@madaden.com",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "1-800-MADADEN",
    description: "Mon-Fri, 9AM-6PM EST",
    href: "tel:1-800-623-2336",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "123 Healthcare Blvd",
    description: "Suite 100, Medical City, MC 12345",
    href: null,
  },
  {
    icon: Clock,
    title: "Response Time",
    content: "Within 24 hours",
    description: "We respond to all inquiries quickly",
    href: null,
  },
]

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export default function ContactPage() {
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
            {/* Header */}
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Get in Touch
              </div>
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-balance bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                Contact Us
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
                We're here to help healthcare professionals find the perfect scrubs. Reach out with any questions or
                feedback.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="font-heading font-bold text-2xl">Get in Touch</h2>
                  <p className="text-muted-foreground">
                    Choose the best way to reach us. We're committed to providing excellent customer service.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="border-l-4 border-l-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-background to-muted/10">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                            <info.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm text-muted-foreground">{info.title}</h3>
                            {info.href ? (
                              <Link
                                href={info.href}
                                className="font-semibold text-foreground hover:text-primary transition-colors"
                              >
                                {info.content}
                              </Link>
                            ) : (
                              <p className="font-semibold text-foreground">{info.content}</p>
                            )}
                            <p className="text-xs text-muted-foreground">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <h3 className="font-heading font-semibold">Follow Us</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <Link
                        key={index}
                        href={social.href}
                        className="w-10 h-10 bg-muted hover:bg-primary/10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 transform group"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* FAQ Link */}
                <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-4">
                    <h3 className="font-heading font-semibold mb-2">Frequently Asked Questions</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Find quick answers to common questions about sizing, care, and ordering.
                    </p>
                    <Link href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 group">
                      View FAQ 
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
