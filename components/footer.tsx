import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Facebook, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-muted/30 via-muted/50 to-muted/30 border-t border-border/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(22,78,99,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(22,78,99,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/logo.png" alt="Madaden Logo" width={32} height={32} className="h-8 w-8" />
              <span className="font-heading font-bold text-xl">MADADEN</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Engineered scrubs with thoughtful comfort for healthcare professionals who care.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">Get notified about new products and updates.</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/20 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">© 2024 Madaden. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 transform">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>

            {/* ✅ Facebook opens in new tab */}
            <a
              href="https://www.facebook.com/share/1713HFRsKz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 transform"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>

            <Link href="#" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 transform">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>

            <p className="text-sm text-muted-foreground">
              <Link href="mailto:info@madaden.com" className="hover:text-primary transition-colors">
                info@madaden.com
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
