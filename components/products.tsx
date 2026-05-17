"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const categories = ["Tous", "Outillage", "Visserie", "Électroportatif", "Accessoires"]

const products = [
  {
    id: 1,
    name: "Perceuse professionnelle",
    category: "Électroportatif",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Kit visserie inox",
    category: "Visserie",
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Clé à molette",
    category: "Outillage",
    image: "https://images.unsplash.com/photo-1426927308491-6380b6a9936f?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Disques de coupe",
    category: "Accessoires",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Tournevis multifonction",
    category: "Outillage",
    image: "https://images.unsplash.com/photo-1581092160607-ee67df6d7a3d?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Boulons acier zingué",
    category: "Visserie",
    image: "https://images.unsplash.com/photo-1597239451147-ffa25d6cb6fb?w=400&h=400&fit=crop",
  },
]

export function Products() {
  const [activeCategory, setActiveCategory] = useState("Tous")

  const filteredProducts = activeCategory === "Tous" 
    ? products 
    : products.filter(p => p.category === activeCategory)

  return (
    <section id="catalogue" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Nos Produits
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Découvrez notre catalogue
          </h2>
          <p className="text-muted-foreground text-pretty">
            Une sélection de produits de qualité pour tous vos projets professionnels.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-primary/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid - 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id}
              className="group overflow-hidden border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden bg-card">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button 
                    variant="secondary" 
                    className="bg-secondary text-secondary-foreground font-semibold"
                  >
                    Voir le détail
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <span className="text-xs font-medium text-secondary">
                  {product.category}
                </span>
                <h3 className="text-foreground font-semibold mt-1">
                  {product.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group"
          >
            Voir tout le catalogue
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
