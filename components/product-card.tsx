"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { toast } from "@/components/ui/use-toast"

type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  rating?: number
  [key: string]: any
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`,
    })
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="relative">
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 rounded-full opacity-70 hover:opacity-100"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toast({
                title: "Added to wishlist",
                description: `${product.name} added to your wishlist`,
              })
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className="p-4">
          <div className="mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
            <p className="text-muted-foreground text-sm">{product.category}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold">${product.price.toFixed(2)}</p>
            <Button variant="outline" size="sm" className="rounded-full" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
