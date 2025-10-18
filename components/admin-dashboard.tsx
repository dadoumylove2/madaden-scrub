"use client"

import React, { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Package, Users, DollarSign, TrendingUp, Plus, Edit, Trash, Eye, X, Upload, ShoppingBag, Calendar, Clock, CheckCircle, AlertCircle, BarChart3, Settings, Activity } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
}

interface Order {
  id: string
  status: "PENDING" | "APPROVED" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED"
  total: number
  customerName: string
  customerEmail: string
  customerPhone?: string
  shippingAddress: string
  city: string
  state: string
  zipCode: string
  country: string
  items: Array<{
    product: {
      name: string
      price: number
    }
    quantity: number
  }>
  createdAt: string
}

export function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    inStock: true,
    sizes: [] as string[],
    colors: [] as string[]
  })
  const [imagePreview, setImagePreview] = useState("")
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [imageUploadLoading, setImageUploadLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const [deleteOrderLoading, setDeleteOrderLoading] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchProducts()
    fetchOrders()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders")
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    } finally {
      setLoading(false)
    }
  }

  // Function to handle file upload
  const handleFileUpload = async (file: File) => {
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, GIF, etc.)",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 2MB",
        variant: "destructive",
      })
      return
    }

    setImageUploadLoading(true)
    setUploadedImage(file)

    try {
      // Compress image before converting to base64
      const compressedImage = await compressImage(file)
      
      // Convert compressed file to base64
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setNewProduct({...newProduct, image: result})
        setImageUploadLoading(false)
        toast({
          title: "Image uploaded",
          description: "Image has been uploaded and compressed successfully",
        })
      }
      reader.readAsDataURL(compressedImage)
    } catch (error) {
      setImageUploadLoading(false)
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Function to compress image
  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        // Calculate new dimensions (max 800px width/height)
        const maxSize = 800
        let { width, height } = img
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width
            width = maxSize
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height
            height = maxSize
          }
        }
        
        canvas.width = width
        canvas.height = height
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              })
              resolve(compressedFile)
            } else {
              reject(new Error('Failed to compress image'))
            }
          },
          'image/jpeg',
          0.7 // 70% quality
        )
      }
      
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(file)
    })
  }

  // Function to handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  // Function to trigger file input
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Function to remove uploaded image
  const removeUploadedImage = () => {
    setUploadedImage(null)
    setImagePreview("")
    setNewProduct({...newProduct, image: ""})
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Function to delete product
  const deleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return
    }

    setDeleteLoading(productId)
    
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Product deleted",
          description: "Product has been deleted successfully",
        })
        fetchProducts() // Refresh the products list
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete product")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete product",
        variant: "destructive",
      })
    } finally {
      setDeleteLoading(null)
    }
  }

  // Function to delete order
  const deleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      return
    }

    setDeleteOrderLoading(orderId)
    
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Order deleted",
          description: "Order has been deleted successfully",
        })
        fetchOrders() // Refresh the orders list
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete order")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete order",
        variant: "destructive",
      })
    } finally {
      setDeleteOrderLoading(null)
    }
  }

  const addProduct = async (productData: any) => {
    try {
      // Use the base64 image data directly
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        toast({
          title: "Product added",
          description: "Product has been added successfully",
        })
        fetchProducts()
        setShowAddProduct(false)
        setNewProduct({
          name: "",
          description: "",
          price: "",
          image: "",
          category: "",
          inStock: true,
          sizes: [],
          colors: []
        })
        setImagePreview("")
        setUploadedImage(null)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to add product")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add product",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if image is uploaded
    if (!newProduct.image) {
      toast({
        title: "Image Required",
        description: "Please upload an image for the product",
        variant: "destructive",
      })
      return
    }
    
    addProduct({
      ...newProduct,
      price: parseFloat(newProduct.price)
    })
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        toast({
          title: "Order updated",
          description: `Order status updated to ${status}`,
        })
        fetchOrders()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "APPROVED":
        return "bg-blue-100 text-blue-800"
      case "OUT_FOR_DELIVERY":
        return "bg-purple-100 text-purple-800"
      case "DELIVERED":
        return "bg-green-100 text-green-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground text-lg">Manage your products and track orders</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Products</p>
                    <p className="text-3xl font-bold text-foreground">{products.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Orders</p>
                    <p className="text-3xl font-bold text-foreground">{orders.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold text-foreground">
                      ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Pending Orders</p>
                    <p className="text-3xl font-bold text-foreground">
                      {orders.filter(order => order.status === "PENDING").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border/20 overflow-hidden">
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-muted/50 to-muted/30 border-0 p-0 h-auto">
                <TabsTrigger 
                  value="products" 
                  className="data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-lg rounded-none py-6 text-lg font-semibold transition-all duration-300 hover:bg-card/50 data-[state=active]:hover:bg-card border-r border-border/30"
                >
                  <Package className="w-5 h-5 mr-3" />
                  Products
                </TabsTrigger>
                <TabsTrigger 
                  value="orders" 
                  className="data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-lg rounded-none py-6 text-lg font-semibold transition-all duration-300 hover:bg-card/50 data-[state=active]:hover:bg-card"
                >
                  <ShoppingBag className="w-5 h-5 mr-3" />
                  Orders
                </TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="space-y-6 p-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">Products</h2>
                    <p className="text-muted-foreground">Manage your product catalog</p>
                  </div>
                  <Button onClick={() => setShowAddProduct(true)} className="bg-primary hover:bg-primary/90 shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card key={product.id} className="bg-card/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                      <div className="relative h-48 bg-gradient-to-br from-muted/30 to-muted/10">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.jpg"
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                        <Badge 
                          variant={product.inStock ? "default" : "secondary"}
                          className="absolute top-3 right-3 text-xs"
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteProduct(product.id)}
                          disabled={deleteLoading === product.id}
                          className="absolute top-3 left-3 text-white hover:text-red-300 hover:bg-red-500/20"
                        >
                          {deleteLoading === product.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <Trash className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-bold text-foreground text-lg mb-2 truncate">{product.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{product.description}</p>
                            <div className="flex items-center justify-between mb-3">
                              <p className="font-bold text-primary text-xl">${product.price}</p>
                              <Badge variant="outline" className="text-xs bg-primary/10 border-primary/20 text-primary">
                                {product.category}
                              </Badge>
                            </div>
                          </div>
                          
                                                     {/* Product Details */}
                           <div className="space-y-2">
                             <div className="flex items-center justify-between text-sm">
                               <span className="text-muted-foreground">Stock Status:</span>
                               <Badge variant={product.inStock ? "default" : "secondary"} className="text-xs">
                                 {product.inStock ? "Available" : "Out of Stock"}
                               </Badge>
                             </div>
                             
                             {/* Sizes */}
                             {(product as any).sizes && (product as any).sizes.length > 0 && (
                               <div className="flex items-center justify-between text-sm">
                                 <span className="text-muted-foreground">Sizes:</span>
                                 <div className="flex gap-1">
                                   {(product as any).sizes.map((size: string, index: number) => (
                                     <Badge key={index} variant="outline" className="text-xs bg-primary/10 border-primary/20 text-primary">
                                       {size}
                                     </Badge>
                                   ))}
                                 </div>
                               </div>
                             )}
                             
                             {/* Colors */}
                             {(product as any).colors && (product as any).colors.length > 0 && (
                               <div className="flex items-center justify-between text-sm">
                                 <span className="text-muted-foreground">Colors:</span>
                                 <div className="flex gap-1">
                                   {(product as any).colors.map((color: string, index: number) => (
                                     <Badge key={index} variant="outline" className="text-xs bg-primary/10 border-primary/20 text-primary">
                                       {color}
                                     </Badge>
                                   ))}
                                 </div>
                               </div>
                             )}
                             
                             <div className="flex items-center justify-between text-sm">
                               <span className="text-muted-foreground">Product ID:</span>
                               <span className="font-mono text-xs text-muted-foreground">{product.id.slice(-8)}</span>
                             </div>
                           </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6 p-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">Orders</h2>
                    <p className="text-muted-foreground">Track and manage customer orders</p>
                  </div>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
                    <span className="ml-3 text-gray-600">Loading orders...</span>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                                           <Card key={order.id} className="bg-card/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                       <div className="bg-gradient-to-r from-muted/30 to-muted/20 p-6 border-b border-border/30">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                                                             <div className="flex items-center gap-3 mb-3">
                                 <h3 className="font-bold text-xl text-foreground">Order #{order.id.slice(-8)}</h3>
                                 <Badge className={`${getStatusColor(order.status)} text-xs font-medium px-3 py-1`}>
                                   {order.status.replace("_", " ")}
                                 </Badge>
                               </div>
                               <div className="flex items-center gap-6 text-sm text-muted-foreground mb-2">
                                 <div className="flex items-center gap-2">
                                   <Calendar className="w-4 h-4 text-primary" />
                                   {new Date(order.createdAt).toLocaleDateString()}
                                 </div>
                                 <div className="flex items-center gap-2">
                                   <Users className="w-4 h-4 text-primary" />
                                   {order.customerName}
                                 </div>
                               </div>
                               <p className="text-sm text-muted-foreground mb-1">{order.customerEmail}</p>
                               <p className="text-xs text-muted-foreground flex items-center gap-1">
                                 <span className="text-primary">📍</span> {order.shippingAddress}, {order.city}, {order.state} {order.zipCode}
                               </p>
                             </div>
                             <div className="text-right">
                               <p className="font-bold text-3xl text-foreground mb-1">${order.total}</p>
                               <p className="text-sm text-muted-foreground bg-card/50 px-3 py-1 rounded-full">{order.items.length} items</p>
                             </div>
                          </div>
                        </div>
                        
                                                 <CardContent className="p-6">
                           <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl p-4 mb-6">
                             <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                               <ShoppingBag className="w-4 h-4 text-primary" />
                               Order Items
                             </h4>
                             <div className="space-y-3">
                               {order.items.map((item, index) => (
                                 <div key={index} className="flex justify-between items-center text-sm bg-card/60 rounded-lg p-3">
                                   <div className="flex items-center gap-3">
                                     <div className="w-3 h-3 bg-primary rounded-full"></div>
                                     <span className="font-medium text-foreground">{item.product.name}</span>
                                     <Badge variant="outline" className="text-xs bg-card border-primary/20 text-primary">x{item.quantity}</Badge>
                                   </div>
                                   <span className="font-semibold text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                                 </div>
                               ))}
                             </div>
                           </div>

                           <div className="flex items-center justify-between">
                             <Select
                               value={order.status}
                               onValueChange={(value) => updateOrderStatus(order.id, value)}
                             >
                               <SelectTrigger className="w-48 bg-card border-border focus:border-primary">
                                 <SelectValue />
                               </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="PENDING" className="flex items-center gap-2">
                                   <Clock className="w-4 h-4" />
                                   Pending
                                 </SelectItem>
                                 <SelectItem value="APPROVED" className="flex items-center gap-2">
                                   <CheckCircle className="w-4 h-4" />
                                   Approved
                                 </SelectItem>
                                 <SelectItem value="OUT_FOR_DELIVERY" className="flex items-center gap-2">
                                   <Package className="w-4 h-4" />
                                   Out for Delivery
                                 </SelectItem>
                                 <SelectItem value="DELIVERED" className="flex items-center gap-2">
                                   <CheckCircle className="w-4 h-4" />
                                   Delivered
                                 </SelectItem>
                                 <SelectItem value="CANCELLED" className="flex items-center gap-2">
                                   <AlertCircle className="w-4 h-4" />
                                   Cancelled
                                 </SelectItem>
                               </SelectContent>
                             </Select>
                             
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => deleteOrder(order.id)}
                               disabled={deleteOrderLoading === order.id}
                               className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4"
                             >
                               {deleteOrderLoading === order.id ? (
                                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                               ) : (
                                 <>
                                   <Trash className="h-4 w-4 mr-2" />
                                   Delete
                                 </>
                               )}
                             </Button>
                           </div>
                         </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                  <p className="text-gray-600 mt-1">Create a new product for your catalog</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowAddProduct(false)
                    setImagePreview("")
                    setUploadedImage(null)
                  }}
                  className="hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">Product Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="Enter product name"
                    required
                    className="border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="price" className="text-sm font-medium text-gray-700 mb-2 block">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="0.00"
                    required
                    className="border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2 block">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Enter product description"
                  required
                  className="border-gray-300 focus:border-sky-500 focus:ring-sky-500 min-h-[100px]"
                />
              </div>
              
              <div>
                <Label htmlFor="image" className="text-sm font-medium text-gray-700 mb-2 block">Product Image *</Label>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-sky-400 transition-colors">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={triggerFileInput}
                      className="w-full h-12"
                      disabled={imageUploadLoading}
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      {imageUploadLoading ? "Uploading..." : uploadedImage ? uploadedImage.name : "Choose Image"}
                    </Button>
                    
                    <p className="text-xs text-gray-500 mt-2">
                      JPG, PNG, GIF up to 2MB
                    </p>
                  </div>
                  
                  {uploadedImage && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-16 h-16 object-cover rounded-lg shadow-sm"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.jpg"
                            }}
                          />
                          <div>
                            <p className="font-medium text-sm">{uploadedImage.name}</p>
                            <p className="text-xs text-gray-500">{(uploadedImage.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={removeUploadedImage}
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700 mb-2 block">Category</Label>
                  <Input
                    id="category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    placeholder="Enter category"
                    required
                    className="border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={newProduct.inStock}
                    onChange={(e) => setNewProduct({...newProduct, inStock: e.target.checked})}
                    className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                  />
                  <Label htmlFor="inStock" className="text-sm font-medium text-gray-700">In Stock</Label>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Available Sizes</Label>
                <div className="grid grid-cols-3 gap-3">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <Button
                      key={size}
                      type="button"
                      variant={newProduct.sizes.includes(size) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        const updatedSizes = newProduct.sizes.includes(size)
                          ? newProduct.sizes.filter(s => s !== size)
                          : [...newProduct.sizes, size]
                        setNewProduct({...newProduct, sizes: updatedSizes})
                      }}
                      className={newProduct.sizes.includes(size) ? "bg-sky-600 hover:bg-sky-700" : "border-gray-300 hover:border-sky-400"}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Available Colors</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Aqua", value: "#4ECDC4" },
                    { name: "Navy", value: "#1E3A8A" },
                    { name: "Black", value: "#000000" },
                    { name: "White", value: "#FFFFFF" },
                    { name: "Gray", value: "#6B7280" },
                    { name: "Teal", value: "#0D9488" }
                  ].map((color) => (
                    <Button
                      key={color.name}
                      type="button"
                      variant={newProduct.colors.includes(color.name) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        const updatedColors = newProduct.colors.includes(color.name)
                          ? newProduct.colors.filter(c => c !== color.name)
                          : [...newProduct.colors, color.name]
                        setNewProduct({...newProduct, colors: updatedColors})
                      }}
                      className={`flex items-center gap-2 ${newProduct.colors.includes(color.name) ? 'bg-sky-600 hover:bg-sky-700' : 'border-gray-300 hover:border-sky-400'}`}
                    >
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                        style={{ backgroundColor: color.value }}
                      />
                      {color.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <Button 
                  type="submit" 
                  className="flex-1 bg-sky-600 hover:bg-sky-700 shadow-lg" 
                  disabled={!newProduct.image}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddProduct(false)
                    setImagePreview("")
                    setUploadedImage(null)
                  }}
                  className="flex-1 border-gray-300 hover:border-gray-400"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
