"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CheckoutFormProps {
  items: CartItem[]
  total: number
  onSuccess: (orderId: string) => void
}

export function CheckoutForm({ items, total, onSuccess }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Pakistan"
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create Stripe checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const { url } = await response.json()
        if (url) {
          // Redirect to Stripe Checkout
          window.location.href = url
        } else {
          throw new Error("No checkout URL received")
        }
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to create checkout session")
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-card rounded-lg border p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="border-t pt-3">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-xl font-semibold mb-4">Customer Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName">Full Name *</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => handleInputChange("customerName", e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="customerEmail">Email Address *</Label>
              <Input
                id="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="customerPhone">Phone Number</Label>
              <Input
                id="customerPhone"
                type="tel"
                value={formData.customerPhone}
                onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="shippingAddress">Address *</Label>
              <Textarea
                id="shippingAddress"
                value={formData.shippingAddress}
                onChange={(e) => handleInputChange("shippingAddress", e.target.value)}
                placeholder="Enter your complete address"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Enter city"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="state">State/Province *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  placeholder="Enter state"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  placeholder="Enter ZIP code"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                placeholder="Enter country"
              />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-xl font-semibold mb-4">Order Confirmation</h3>
          <p className="text-muted-foreground mb-4">
            By placing this order, you agree to receive order updates via email. 
            You will receive a confirmation email once your order is placed.
          </p>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Redirecting to Payment..." : `Pay with Card - $${total.toFixed(2)}`}
          </Button>
        </div>
      </form>
    </div>
  )
}
