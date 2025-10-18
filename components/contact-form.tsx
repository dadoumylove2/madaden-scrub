"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Send, CheckCircle } from "lucide-react"

const topics = [
  { value: "general", label: "General Inquiry" },
  { value: "product", label: "Product Question" },
  { value: "sizing", label: "Sizing Help" },
  { value: "wholesale", label: "Wholesale/Bulk Orders" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "support", label: "Customer Support" },
]

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Failed to send message')
      }

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      })

      setIsSubmitted(true)
    } catch (err) {
      console.error(err)
      toast({
        title: "Failed to send",
        description: "Please try again later.",
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8 space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-xl">Thank You!</h3>
              <p className="text-muted-foreground">
                Your message has been sent successfully. We'll get back to you within 24 hours.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setIsSubmitted(false)
                setFormData({ name: "", email: "", topic: "", message: "" })
              }}
            >
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="bg-gradient-to-br from-background to-muted/20 border border-border/30 shadow-xl">
        <CardHeader>
          <CardTitle className="font-heading text-2xl">Get in Touch</CardTitle>
          <p className="text-muted-foreground">
            Have a question about our products or need assistance? We're here to help.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Select value={formData.topic} onValueChange={(value) => handleInputChange("topic", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic.value} value={topic.value}>
                      {topic.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                placeholder="Tell us how we can help you..."
                rows={5}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
