import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import Link from "next/link"

export function ContactCTA() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left - CTA */}
            <div className="bg-primary p-8 md:p-12 text-primary-foreground">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                Contact rapide
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-balance">
                Besoin d&apos;un devis gratuit ?
              </h2>
              <p className="text-primary-foreground/80 mb-8 text-pretty">
                Contactez-nous dès maintenant et recevez votre devis personnalisé 
                en moins de 24 heures. Notre équipe est à votre écoute.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70">Téléphone</p>
                    <p className="font-semibold">+212 5 22 XX XX XX</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70">Email</p>
                    <p className="font-semibold">contact@eqchefchaouni.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70">Adresse</p>
                    <p className="font-semibold">Aïn Sebaâ, Casablanca</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70">Horaires</p>
                    <p className="font-semibold">Lun - Sam : 8h30 - 18h30</p>
                  </div>
                </div>
              </div>

              <Button 
                asChild
                size="lg" 
                className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
              >
                <Link href="https://wa.me/212522000000" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Contacter via WhatsApp
                </Link>
              </Button>
            </div>

            {/* Right - Form */}
            <div className="p-8 md:p-12">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Demande de devis rapide
              </h3>
              
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="+212 6 XX XX XX XX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="product" className="block text-sm font-medium text-foreground mb-1.5">
                    Produit souhaité
                  </label>
                  <select
                    id="product"
                    name="product"
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    <option value="outillage">Outillage</option>
                    <option value="visserie">Visserie</option>
                    <option value="electroportatif">Électroportatif</option>
                    <option value="accessoires">Accessoires</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Décrivez votre besoin..."
                  />
                </div>

                {/* Honeypot field for anti-spam */}
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  Envoyer ma demande
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  En soumettant ce formulaire, vous acceptez d&apos;être contacté par notre équipe.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
