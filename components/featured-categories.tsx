import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    name: "Bedsheets",
    image: "/bedsheet.jpg?height=600&width=600",
    description: "Luxurious bedsheets for a comfortable sleep",
    link: "/products?category=Bedsheets",
  },
  {
    name: "Towels",
    image: "/towel.jpg?height=600&width=600",
    description: "Soft and absorbent towels for your bathroom",
    link: "/products?category=Towels",
  },
  {
    name: "Pillow Cases",
    image: "/pillowcases.jpg?height=600&width=600",
    description: "Comfortable pillow cases for a good night's sleep",
    link: "/products?category=Pillow%20Cases",
  },
  {
    name: "Blankets",
    image: "/placeholder.svg?height=600&width=600",
    description: "Warm and cozy blankets for cold nights",
    link: "/products?category=Blankets",
  },
]

export default function FeaturedCategories() {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.name} href={category.link}>
            <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
              <div className="aspect-square relative">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="font-bold text-xl mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
