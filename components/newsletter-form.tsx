"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Mail, CheckCircle } from "lucide-react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })

      if (!res.ok) {
        throw new Error('Failed subscription')
      }

      toast({
        title: "Successfully subscribed!",
        description: "You'll be the first to know about new products and updates.",
      })

      setEmail("")
      setName("")
    } catch (err) {
      console.error(err)
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-primary/5 via-primary/3 to-accent/5 border border-primary/20 shadow-xl relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(22,78,99,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(22,78,99,0.02)_1px,transparent_1px)] bg-[size:25px_25px] opacity-20" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-accent/10 rounded-full blur-2xl" />
            
            <CardContent className="p-8 text-center space-y-6 relative z-10">
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl">Stay in the Loop</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Be the first to know about new products, exclusive offers, and healthcare industry insights.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-background"
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    "Subscribing..."
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Get Updates
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
