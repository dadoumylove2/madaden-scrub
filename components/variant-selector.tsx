"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface VariantSelectorProps {
  sizes?: string[]
  colors?: string[]
  onVariantChange?: (variant: { size: string; color: string; length: string }) => void
}

const defaultSizes = ["XS", "S", "M", "L", "XL", "XXL"]
const defaultColors = [
  { name: "Teal", value: "#4ECDC4" },
  { name: "Navy", value: "#1E3A8A" },
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
]
const lengths = ["Regular", "Petite", "Tall"]

// Color mapping for dynamic colors
const colorMap: Record<string, string> = {
  "Aqua": "#4ECDC4",
  "Navy": "#1E3A8A", 
  "Black": "#000000",
  "White": "#FFFFFF",
  "Gray": "#6B7280",
  "Teal": "#0D9488"
}

export function VariantSelector({ 
  sizes = defaultSizes, 
  colors = ["Navy", "Black", "White"],
  onVariantChange 
}: VariantSelectorProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedLength, setSelectedLength] = useState("Regular")

  const handleVariantChange = (type: string, value: string) => {
    const newVariant = { size: selectedSize, color: selectedColor, length: selectedLength }

    if (type === "size") {
      setSelectedSize(value)
      newVariant.size = value
    } else if (type === "color") {
      setSelectedColor(value)
      newVariant.color = value
    } else if (type === "length") {
      setSelectedLength(value)
      newVariant.length = value
    }

    onVariantChange?.(newVariant)
  }

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Size</Label>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? "default" : "outline"}
              size="sm"
              onClick={() => handleVariantChange("size", size)}
              className="min-w-[3rem]"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Color</Label>
        <div className="flex flex-wrap gap-3">
          {colors.map((colorName) => {
            const colorValue = colorMap[colorName] || "#000000"
            return (
              <button
                key={colorName}
                onClick={() => handleVariantChange("color", colorName)}
                className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor === colorName
                    ? "border-primary scale-110"
                    : "border-muted-foreground hover:border-foreground"
                }`}
                style={{ backgroundColor: colorValue }}
                title={colorName}
              >
                {selectedColor === colorName && (
                  <div className="absolute inset-0 rounded-full border-2 border-background" />
                )}
              </button>
            )
          })}
        </div>
        {selectedColor && <p className="text-sm text-muted-foreground">Selected: {selectedColor}</p>}
      </div>

      {/* Length Selection */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Length</Label>
        <div className="flex flex-wrap gap-2">
          {lengths.map((length) => (
            <Button
              key={length}
              variant={selectedLength === length ? "default" : "outline"}
              size="sm"
              onClick={() => handleVariantChange("length", length)}
            >
              {length}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
