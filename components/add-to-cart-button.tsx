"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Loader2, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface AddToCartButtonProps {
  productId: string
  productName: string
  price: number
  image: string
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  onSuccess?: () => void
}

export function AddToCartButton({ 
  productId, 
  productName, 
  price, 
  image, 
  className = "",
  variant = "default",
  size = "lg",
  onSuccess
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const addToCart = async () => {
    setIsLoading(true)
    setIsSuccess(false)
    
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      })

      if (response.status === 401) {
        // User is not authenticated
        toast({
          title: "Please sign in",
          description: "You need to sign in to add items to your cart.",
          variant: "destructive",
        })
        // Redirect to sign in page
        window.location.href = '/sign-in'
        return
      }

      if (!response.ok) {
        throw new Error('Failed to add to cart')
      }

      // Show success state
      setIsSuccess(true)
      
      toast({
        title: "Added to cart",
        description: `${productName} has been added to your cart.`,
      })

      // Notify other components (e.g., navbar cart) to refresh immediately
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('cart:updated'))
      }

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      }

      // Reset success state after 2 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 2000)
      
    } catch (error) {
      console.error('Cart error:', error)
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      size={size}
      variant={isSuccess ? "default" : variant}
      className={`${className} ${isLoading ? 'cursor-not-allowed' : ''} ${isSuccess ? 'bg-green-600 hover:bg-green-700' : ''}`}
      onClick={addToCart}
      disabled={isLoading || isSuccess}
    >
      {isLoading ? (
        size === "icon" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Adding...
          </>
        )
      ) : isSuccess ? (
        size === "icon" ? (
          <Check className="w-4 h-4" />
        ) : (
          <>
            <Check className="w-4 h-4 mr-2" />
            Added!
          </>
        )
      ) : (
        size === "icon" ? (
          <ShoppingCart className="w-4 h-4" />
        ) : (
          <>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </>
        )
      )}
    </Button>
  )
}
