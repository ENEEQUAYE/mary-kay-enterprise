import ProductCard from "@/components/product-card"

type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  [key: string]: any
}

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
