"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/components/cart-provider"
import { notFound } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"
import RelatedProducts from "@/components/related-products"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        if (!response.ok) {
          throw new Error("Product not found")
        }
        const data = await response.json()
        setProduct(data.product)

        // Fetch related products
        const relatedResponse = await fetch(`/api/products?category=${data.product.category}`)
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json()
          setRelatedProducts(
            relatedData.products.filter((p: any) => p._id !== data.product._id).slice(0, 4)
          )
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        notFound()
      }
    }

    fetchProduct()
  }, [params.id])

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading product details...</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
    })
  }

  return (
    <div className="container mx-auto p-4">
      {/* Product Details */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="flex flex-col gap-4">
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg"
          />
          <div className="flex gap-2">
            {product.images.map((image: string, index: number) => (
              <Image
                key={index}
                src={image}
                alt={`${product.name} - ${index + 1}`}
                width={100}
                height={100}
                className={`cursor-pointer rounded-md ${
                  selectedImage === index ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-semibold mt-4">Price: GH₵{product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">Stock: {product.stock}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-4">
            <label htmlFor="quantity" className="text-sm font-medium">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 border rounded-md p-1 text-center"
            />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  )
}