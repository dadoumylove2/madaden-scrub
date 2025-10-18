"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to orders page after 3 seconds
    const timer = setTimeout(() => {
      router.push("/orders")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <main className="min-h-screen pt-32 container mx-auto px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-green-600">Payment Successful!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. A confirmation email has been sent to your email address.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            You will be redirected to your orders page in a few seconds...
          </p>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={() => router.push("/orders")} 
            className="w-full"
          >
            View My Orders
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push("/products")} 
            className="w-full"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </main>
  );
}


