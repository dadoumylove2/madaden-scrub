"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Ruler } from "lucide-react"

const sizeChart = [
  { size: "XS", chest: "32-34", waist: "24-26", hip: "34-36" },
  { size: "S", chest: "34-36", waist: "26-28", hip: "36-38" },
  { size: "M", chest: "36-38", waist: "28-30", hip: "38-40" },
  { size: "L", chest: "38-40", waist: "30-32", hip: "40-42" },
  { size: "XL", chest: "40-42", waist: "32-34", hip: "42-44" },
  { size: "XXL", chest: "42-44", waist: "34-36", hip: "44-46" },
]

export function SizeGuideModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Ruler className="w-4 h-4 mr-2" />
          Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Size Guide</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            All measurements are in inches. For the best fit, measure yourself and compare to the chart below.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-medium">Size</th>
                  <th className="text-left py-2 px-3 font-medium">Chest</th>
                  <th className="text-left py-2 px-3 font-medium">Waist</th>
                  <th className="text-left py-2 px-3 font-medium">Hip</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((row) => (
                  <tr key={row.size} className="border-b">
                    <td className="py-2 px-3 font-medium">{row.size}</td>
                    <td className="py-2 px-3 text-muted-foreground">{row.chest}"</td>
                    <td className="py-2 px-3 text-muted-foreground">{row.waist}"</td>
                    <td className="py-2 px-3 text-muted-foreground">{row.hip}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">How to Measure</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                <strong>Chest:</strong> Measure around the fullest part of your chest
              </li>
              <li>
                <strong>Waist:</strong> Measure around your natural waistline
              </li>
              <li>
                <strong>Hip:</strong> Measure around the fullest part of your hips
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
