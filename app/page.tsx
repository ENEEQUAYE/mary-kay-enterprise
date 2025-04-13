import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { products } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import FeaturedCategories from "@/components/featured-categories"
import TestimonialSection from "@/components/testimonial-section"
import NewsletterSection from "@/components/newsletter-section"

export default function Home() {
  // Get featured products (first 4)
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden rounded-xl">
        <Image
          src="/banner.jpg?height=1080&width=1920"
          alt="Luxury bedding"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Premium Home Textiles</h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            Elevate your home with our luxurious bedsheets, towels, and pillow cases
          </p>
          <Link href="/products">
            <Button size="lg" className="text-lg">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link href="/products" className="flex items-center text-primary">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="h-full transition-all hover:shadow-lg">
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-muted-foreground mb-2">{product.category}</p>
                  <p className="font-bold">GH₵{product.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  )
}
