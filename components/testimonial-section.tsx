import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Interior Designer",
    content:
      "The quality of Mary Kay's bedsheets is exceptional. My clients are always impressed with the softness and durability. I highly recommend their products for anyone looking to upgrade their bedroom.",
    rating: 5,
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Hotel Manager",
    content:
      "We've been using Mary Kay Enterprise towels in our hotel for over a year now. They maintain their softness even after hundreds of washes. Our guests frequently ask where they can purchase them.",
    rating: 5,
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Homeowner",
    content:
      "I purchased a complete bedding set from Mary Kay and couldn't be happier. The attention to detail and quality of the stitching is remarkable. It's transformed my bedroom completely.",
    rating: 4,
    avatar: "/placeholder.svg?height=200&width=200",
  },
]

export default function TestimonialSection() {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground flex-1">{testimonial.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
