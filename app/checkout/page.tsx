"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/api/cart")
        if (response.ok) {
          const data = await response.json()
          setCartItems(data.items || [])
          setTotal(data.total || 0)
        } else {
          throw new Error("Failed to fetch cart")
        }
      } catch (error) {
        console.error("Error fetching cart:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

  const handleOrderSuccess = () => {
    // Clear cart after successful order
    fetch("/api/cart", { method: "DELETE" })
    router.push("/orders")
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your cart...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Add some products to your cart before proceeding to checkout.
            </p>
            <button
              onClick={() => router.push("/products")}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90"
            >
              Browse Products
            </button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-32">
        <CheckoutForm items={cartItems} total={total} onSuccess={handleOrderSuccess} />
      </main>
      <Footer />
    </>
  )
}
