"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { ShoppingCartComponent } from "./shopping-cart"
import { Menu, X, Search } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "View Orders", href: "/orders" },
  { name: "About", href: "/about" },
  { name: "Sizing", href: "/sizing" },
  { name: "Contact", href: "/contact" },
  { name: "Admin", href: "/dashboard" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsOpen(false) // Close mobile menu if open
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 header-separated ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/30 shadow-xl py-3"
          : "bg-background/80 backdrop-blur-md py-6"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" className="flex items-center focus-ring-enhanced">
            <Image
              src="/images/logo.png"
              alt="Madaden - Premium Healthcare Apparel"
              width={80}
              height={80}
              className="h-16 w-16 sm:h-18 sm:w-18 lg:h-20 lg:w-20 transition-all duration-300 hover:rotate-3 drop-shadow-lg"
              priority
            />
          </Link>
        </motion.div>

        <div className="hidden lg:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-base font-semibold text-foreground hover:text-primary transition-all duration-300 group focus-ring-enhanced"
            >
              {item.name}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full rounded-full" />
              <span className="absolute -top-1 left-1/2 w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-1/2 scale-0 group-hover:scale-100" />
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-300"
            />
          </form>
          <ThemeToggle />
          <ShoppingCartComponent />
        </div>

        {/* Mobile menu button and search */}
        <div className="lg:hidden flex items-center space-x-2">
          {/* Mobile Search Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="relative"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border/30"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search Bar */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-300"
                />
              </form>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-foreground hover:text-primary transition-all duration-300 focus-ring-enhanced"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                <ThemeToggle />
                <ShoppingCartComponent />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Navbar
