import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="font-heading font-bold text-4xl">Product Not Found</h1>
          <p className="text-muted-foreground max-w-md">
            The product you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link href="/products">Browse All Products</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  )
}
