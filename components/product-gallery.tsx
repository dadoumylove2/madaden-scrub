"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-muted/50 rounded-xl overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentImage] || "/placeholder.svg"}
              alt={`${productName} - View ${currentImage + 1}`}
              width={600}
              height={600}
              className="object-cover w-full h-full"
              priority={currentImage === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={prevImage}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={nextImage}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}

        {/* Zoom Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <div className="aspect-square relative">
              <Image
                src={images[currentImage] || "/placeholder.svg"}
                alt={`${productName} - Zoomed View`}
                width={800}
                height={800}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`aspect-square bg-muted/50 rounded-lg overflow-hidden border-2 transition-colors ${
                currentImage === index ? "border-primary" : "border-transparent hover:border-muted-foreground"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${productName} - Thumbnail ${index + 1}`}
                width={150}
                height={150}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
