"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Search, Package, Mail } from "lucide-react"

interface OrderItem {
  id: string
  quantity: number
  price: number
  product: {
    name: string
    image: string
  }
}

interface Order {
  id: string
  customerName: string
  customerEmail: string
  status: string
  total: number
  items: OrderItem[]
  createdAt: string
  shippingAddress: string
  city: string
  state: string
  zipCode: string
  country: string
}

export default function OrdersPage() {
  const [email, setEmail] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to view orders.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/orders/search?email=${encodeURIComponent(email)}`)
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
        setSearched(true)
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to fetch orders")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch orders",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "APPROVED":
        return "bg-blue-100 text-blue-800"
      case "OUT_FOR_DELIVERY":
        return "bg-purple-100 text-purple-800"
      case "DELIVERED":
        return "bg-green-100 text-green-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">View Your Orders</h1>
            <p className="text-muted-foreground">
              Enter your email address to view your order history and track your deliveries.
            </p>
          </div>

          <div className="max-w-md mx-auto mb-8">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="flex space-x-2">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {searched && (
            <div className="space-y-6">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            Order #{order.id.slice(-8)}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Customer Details</h4>
                            <p className="text-sm">{order.customerName}</p>
                            <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Shipping Address</h4>
                            <p className="text-sm">{order.shippingAddress}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.city}, {order.state} {order.zipCode}
                            </p>
                            <p className="text-sm text-muted-foreground">{order.country}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Order Items</h4>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-8 h-8 object-cover rounded"
                                  />
                                  <span className="text-sm">{item.product.name}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">Total</span>
                            <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">No Orders Found</h3>
                  <p className="text-muted-foreground">
                    No orders found for this email address. Please check your email or contact support.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
