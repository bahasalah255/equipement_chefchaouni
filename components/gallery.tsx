"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react"
import { Button } from "@/components/ui/button"

const galleryImages = [
  {
    id: 1,
    src: "/images/gallery/showroom-1.jpg",
    alt: "Showroom principal - Equipement Chefchaouni",
    title: "Notre Showroom",
  },
  {
    id: 2,
    src: "/images/gallery/entrepot-1.jpg",
    alt: "Entrepôt de stockage",
    title: "Entrepôt",
  },
  {
    id: 3,
    src: "/images/gallery/produits-1.jpg",
    alt: "Rayon outillage",
    title: "Rayon Outillage",
  },
  {
    id: 4,
    src: "/images/gallery/facade-1.jpg",
    alt: "Façade du magasin",
    title: "Notre Façade",
  },
  {
    id: 5,
    src: "/images/gallery/equipe-1.jpg",
    alt: "Notre équipe professionnelle",
    title: "Notre Équipe",
  },
  {
    id: 6,
    src: "/images/gallery/visserie-1.jpg",
    alt: "Rayon visserie et fixations",
    title: "Rayon Visserie",
  },
]

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }, [])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
    setIsAutoPlaying(false)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setIsAutoPlaying(true)
  }

  const nextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevLightbox = () => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") nextLightbox()
      if (e.key === "ArrowLeft") prevLightbox()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isLightboxOpen])

  return (
    <section id="galerie" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Notre Local
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Découvrez nos installations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Visitez notre showroom et nos entrepôts à Aïn Sebaâ, Casablanca.
            Un espace de plus de 500m² dédié à l&apos;outillage professionnel.
          </p>
        </div>

        {/* Main Carousel */}
        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
            <Image
              src={galleryImages[currentIndex].src}
              alt={galleryImages[currentIndex].alt}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
              priority={currentIndex === 0}
            />
            
            {/* Overlay with title */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-card text-xl md:text-2xl font-bold">
                {galleryImages[currentIndex].title}
              </h3>
            </div>

            {/* Expand button */}
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 bg-card/80 hover:bg-card text-foreground"
              onClick={() => openLightbox(currentIndex)}
              aria-label="Agrandir l'image"
            >
              <Expand className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card text-foreground shadow-lg"
            onClick={prevSlide}
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card text-foreground shadow-lg"
            onClick={nextSlide}
            aria-label="Image suivante"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-primary w-8" 
                    : "bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-8 max-w-5xl mx-auto">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => {
                setCurrentIndex(index)
                openLightbox(index)
              }}
              className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentIndex 
                  ? "ring-2 ring-primary ring-offset-2" 
                  : "opacity-70 hover:opacity-100"
              }`}
              aria-label={`Voir ${image.title}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 128px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-card hover:text-card/80 hover:bg-card/10 z-10"
            onClick={closeLightbox}
            aria-label="Fermer"
          >
            <X className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-card hover:text-card/80 hover:bg-card/10"
            onClick={(e) => {
              e.stopPropagation()
              prevLightbox()
            }}
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-10 w-10" />
          </Button>

          <div 
            className="relative w-full max-w-6xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <p className="text-card text-center mt-4 text-lg font-medium">
              {galleryImages[lightboxIndex].title}
            </p>
            <p className="text-card/70 text-center text-sm">
              {lightboxIndex + 1} / {galleryImages.length}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-card hover:text-card/80 hover:bg-card/10"
            onClick={(e) => {
              e.stopPropagation()
              nextLightbox()
            }}
            aria-label="Image suivante"
          >
            <ChevronRight className="h-10 w-10" />
          </Button>
        </div>
      )}
    </section>
  )
}
