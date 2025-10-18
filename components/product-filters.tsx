"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SlidersHorizontal } from "lucide-react"

const filters = {
  size: ["XS", "S", "M", "L", "XL", "XXL"],
  color: ["Teal", "Navy", "Black", "White", "Gray"],
  fit: ["Regular", "Slim", "Relaxed"],
}

export function ProductFilters({ onChange }: { onChange?: (filters: { size: string[]; color: string[]; fit: string[] }) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    size: [],
    color: [],
    fit: [],
  })
  const [tempFilters, setTempFilters] = useState<Record<string, string[]>>({
    size: [],
    color: [],
    fit: [],
  })

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    const updatedFilters = {
      ...tempFilters,
      [category]: checked ? [...tempFilters[category], value] : tempFilters[category].filter((item) => item !== value),
    }
    setTempFilters(updatedFilters)
  }

  const applyFilters = () => {
    setSelectedFilters(tempFilters)
    onChange?.(tempFilters as { size: string[]; color: string[]; fit: string[] })
    setIsOpen(false)
  }

  const clearFilters = () => {
    const emptyFilters = { size: [], color: [], fit: [] }
    setTempFilters(emptyFilters)
    setSelectedFilters(emptyFilters)
    onChange?.(emptyFilters)
  }

  const resetTempFilters = () => {
    setTempFilters(selectedFilters)
  }

  const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0)
  const hasChanges = JSON.stringify(tempFilters) !== JSON.stringify(selectedFilters)

  const FilterContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="space-y-6">
      {Object.entries(filters).map(([category, options]) => (
        <div key={category} className="space-y-3">
          <h3 className="font-heading font-semibold capitalize text-foreground flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            {category}
          </h3>
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option} className="flex items-center space-x-2 group">
                <Checkbox
                  id={`${category}-${option}-${isMobile ? 'mobile' : 'desktop'}`}
                  checked={isMobile ? tempFilters[category].includes(option) : selectedFilters[category].includes(option)}
                  onCheckedChange={(checked) => {
                    if (isMobile) {
                      handleFilterChange(category, option, checked as boolean)
                    } else {
                      // Desktop: apply immediately
                      const updatedFilters = {
                        ...selectedFilters,
                        [category]: checked ? [...selectedFilters[category], option] : selectedFilters[category].filter((item) => item !== option),
                      }
                      setSelectedFilters(updatedFilters)
                      setTempFilters(updatedFilters)
                      onChange?.(updatedFilters as { size: string[]; color: string[]; fit: string[] })
                    }
                  }}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
                <Label htmlFor={`${category}-${option}-${isMobile ? 'mobile' : 'desktop'}`} className="text-sm group-hover:text-primary transition-colors cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Separator className="bg-border/50" />
      {!isMobile && (
        <div className="space-y-3">
          <Button 
            variant="outline" 
            onClick={clearFilters} 
            className="w-full bg-transparent hover:bg-primary/10 border-primary/30 hover:border-primary/50 hover:text-primary text-foreground transition-all duration-300"
            disabled={!Object.values(selectedFilters).some(arr => arr.length > 0)}
          >
            Clear All Filters
          </Button>
          <Button 
            onClick={() => {
              // Desktop applies immediately, so this is just for visual feedback
              onChange?.(selectedFilters as { size: string[]; color: string[]; fit: string[] })
            }} 
            className="w-full"
            disabled={!Object.values(selectedFilters).some(arr => arr.length > 0)}
          >
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block w-72 space-y-6">
        <div className="bg-gradient-to-br from-background to-muted/20 rounded-2xl p-6 border border-border/30 shadow-lg">
          <h2 className="font-heading font-bold text-xl mb-6 flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
            Filters
          </h2>
          <FilterContent isMobile={false} />
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={(open) => {
          setIsOpen(open)
          if (open) {
            resetTempFilters()
          }
        }}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className={`relative ${hasActiveFilters ? 'border-primary bg-primary/5' : ''}`}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-80 flex flex-col p-4 sm:p-6">
            <SheetHeader className="pb-4">
              <SheetTitle className="text-left">Filters</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-1">
              <FilterContent isMobile={true} />
            </div>
            <div className="pt-4 border-t space-y-3 px-1">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={clearFilters} 
                  className="flex-1"
                  disabled={!Object.values(tempFilters).some(arr => arr.length > 0)}
                >
                  Clear All
                </Button>
                <Button 
                  onClick={applyFilters} 
                  className="flex-1"
                  disabled={!hasChanges}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
