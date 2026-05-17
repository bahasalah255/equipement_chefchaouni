"use client"

import { MapPin, Phone, Mail, Clock, Navigation, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// Configuration de la localisation
const LOCATION_CONFIG = {
  address: "Bd Chefchaouni, Aïn Sebaâ",
  city: "Casablanca 20250, Maroc",
  fullAddress: "Bd Chefchaouni, Aïn Sebaâ, Casablanca 20250, Maroc",
  plusCode: "JFCR+WFV",
  // Coordonnées GPS pour Bd Chefchaouni, Aïn Sebaâ
  lat: 33.5892,
  lng: -7.5385,
  phone: "+212 5 22 XX XX XX",
  mobile: "+212 6 XX XX XX XX",
  email: "contact@eqchefchaouni.com",
  hours: {
    weekdays: "Lundi - Vendredi : 8h30 - 18h30",
    saturday: "Samedi : 8h30 - 13h00",
    sunday: "Dimanche : Fermé",
  },
  // Lien Google Maps avec le Plus Code
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=JFCR%2BWFV+Bd+Chefchaouni+Casablanca+20250",
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=JFCR%2BWFV+Bd+Chefchaouni+Casablanca+20250",
}

export function Location() {
  return (
    <section id="localisation" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Nous Trouver
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Notre localisation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Venez nous rendre visite dans notre showroom à Aïn Sebaâ, Casablanca.
            Parking gratuit disponible pour nos clients.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {/* Store Facade Photo */}
          <div>
            <div className="relative w-full h-0 pb-[75%] rounded-2xl overflow-hidden border border-border shadow-lg">
              <Image
                src="/images/gallery/facade-1.jpg"
                alt="Entrée et panneau Equipement Chefchaouni"
                fill
                className="object-cover absolute inset-0"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/80 to-transparent" />
              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-primary-foreground font-bold text-lg">Notre Showroom</p>
                <p className="text-primary-foreground/80 text-sm">Bd Chefchaouni, Ain Sebaa</p>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div>
            <div className="relative w-full rounded-2xl overflow-hidden border border-border shadow-lg" style={{ aspectRatio: '4/3' }}>
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.5!2d-7.5385!3d33.5892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM1JzIxLjEiTiA3wrAzMicxOC42Ilc!5e0!3m2!1sfr!2sma!4v1703347200000!5m2!1sfr!2sma"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Equipement Chefchaouni"
                className="absolute inset-0"
              />
              
              {/* Overlay badge */}
              <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-border">
                <p className="font-bold text-foreground text-sm">Equipement Chefchaouni</p>
                <p className="text-muted-foreground text-xs">{LOCATION_CONFIG.city}</p>
              </div>
            </div>

            {/* Map Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              <Button 
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href={LOCATION_CONFIG.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin className="mr-2 h-4 w-4" />
                  Voir sur Google Maps
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Link href={LOCATION_CONFIG.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="mr-2 h-4 w-4" />
                  Obtenir l&apos;itinéraire
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info Cards - Full Width Below */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">

          {/* Address Card */}
          <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
              <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1 text-sm">Adresse</h3>
                <p className="text-muted-foreground text-sm">{LOCATION_CONFIG.address}</p>
                <p className="text-muted-foreground text-sm">{LOCATION_CONFIG.city}</p>
                <p className="text-xs text-muted-foreground/70">Code: {LOCATION_CONFIG.plusCode}</p>
              </div>
            </div>
            </div>

          {/* Phone Card */}
          <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1 text-sm">Téléphone</h3>
                <p className="text-muted-foreground text-sm">{LOCATION_CONFIG.phone}</p>
                <p className="text-muted-foreground text-sm">{LOCATION_CONFIG.mobile}</p>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1 text-sm">Email</h3>
                <p className="text-muted-foreground text-sm">{LOCATION_CONFIG.email}</p>
              </div>
            </div>
          </div>

          {/* Hours Card */}
          <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1 text-sm">Horaires</h3>
                <div className="space-y-0.5 text-xs">
                  <p className="text-muted-foreground">{LOCATION_CONFIG.hours.weekdays}</p>
                  <p className="text-muted-foreground">{LOCATION_CONFIG.hours.saturday}</p>
                  <p className="text-muted-foreground">{LOCATION_CONFIG.hours.sunday}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parking Info - Centered below */}
        <div className="max-w-md mx-auto mt-6">
          <div className="bg-secondary/10 rounded-xl p-4 flex items-center justify-center gap-3">
            <Car className="w-5 h-5 text-secondary flex-shrink-0" />
            <p className="text-sm text-foreground">
              <span className="font-semibold">Parking gratuit</span> disponible pour nos clients
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
