"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { ShoppingCart, Plus, Minus, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
}

export function ShoppingCartComponent() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Fetch cart data from API
  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart")
      if (response.ok) {
        const data = await response.json()
        setCart(data.items || [])
      }
    } catch (error) {
      console.error("Error fetching cart:", error)
    }
  }

  useEffect(() => {
    fetchCart()

    // Listen for global cart updates to refresh badge immediately
    const handleCartUpdated = () => fetchCart()
    if (typeof window !== 'undefined') {
      window.addEventListener('cart:updated', handleCartUpdated)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('cart:updated', handleCartUpdated)
      }
    }
  }, [])

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId,
          quantity: newQuantity,
        }),
      })

      if (response.ok) {
        fetchCart() // Refresh cart data
      } else {
        throw new Error("Failed to update quantity")
      }
    } catch (error) {
      console.error("Error updating quantity:", error)
      toast({
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        variant: "destructive",
      })
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      const response = await fetch(`/api/cart?itemId=${itemId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchCart() // Refresh cart data
        toast({
          title: "Item removed",
          description: "Item has been removed from your cart",
        })
      } else {
        throw new Error("Failed to remove item")
      }
    } catch (error) {
      console.error("Error removing item:", error)
      toast({
        title: "Error",
        description: "Failed to remove item. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Empty cart",
        description: "Please add some items to your cart first",
        variant: "destructive",
      })
      return
    }
    setIsOpen(false)
    router.push("/checkout")
  }

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
              {cartItemCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart
            {cartItemCount > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <Card key={item.id} className="p-3 hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <Badge variant="secondary" className="absolute -top-1 -right-1 text-xs">
                            {item.quantity}
                          </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={loading}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={loading}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              disabled={loading}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
                <Button onClick={handleCheckout} className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
