"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, ShoppingCart } from "lucide-react"
import Link from "next/link"

export function AdminAccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="p-8 text-center">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-foreground mb-4">Admin Access Required</h1>
          <p className="text-muted-foreground mb-6">
            Only administrators can access this area. If you need to place an order, please visit our products page.
          </p>
          <div className="space-y-3">
            <Button className="w-full" asChild>
              <Link href="/products">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Browse Products
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
