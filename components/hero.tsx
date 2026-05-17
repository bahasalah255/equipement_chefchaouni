"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section 
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/gallery/showroom-1.jpg"
          alt="Showroom Equipement Chefchaouni"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark Overlay with Blue Tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-primary/80" />
        {/* Additional gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-primary/40" />
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Orange Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-secondary" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/images/logo.jpg"
              alt="Equipement Chefchaouni"
              width={280}
              height={70}
              className="h-16 md:h-20 w-auto mx-auto object-contain brightness-0 invert"
              priority
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm border border-card/20 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-card text-sm font-medium">
              Distributeur officiel depuis 2009
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-card leading-tight mb-6 text-balance">
            Votre partenaire en{" "}
            <span className="text-secondary">outillage</span> et{" "}
            <span className="text-secondary">visserie</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-card/80 mb-10 max-w-2xl mx-auto text-pretty">
            Equipement Chefchaouni vous accompagne avec une large gamme de produits 
            professionnels et un service personnalisé à Casablanca.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-base px-8 group"
            >
              Voir le catalogue
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-card/30 text-card hover:bg-card/10 hover:text-card font-semibold text-base px-8"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Demander un devis
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-card/20">
            <p className="text-card/60 text-sm mb-4">Ils nous font confiance</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
              {["Entreprises BTP", "Artisans", "Industries", "Particuliers"].map((item) => (
                <span key={item} className="text-card font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  )
}
