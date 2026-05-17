import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Phone } from "lucide-react"

const quickLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#catalogue", label: "Catalogue" },
  { href: "#services", label: "Services" },
  { href: "#apropos", label: "À propos" },
  { href: "#contact", label: "Contact" },
]

const productCategories = [
  { href: "#", label: "Outillage" },
  { href: "#", label: "Visserie" },
  { href: "#", label: "Électroportatif" },
  { href: "#", label: "Accessoires" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.jpg"
                alt="Equipement Chefchaouni"
                width={180}
                height={44}
                className="h-11 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-background/70 text-sm mb-4">
              Votre partenaire de confiance pour l&apos;outillage professionnel et 
              la visserie au Maroc depuis plus de 15 ans.
            </p>
            <div className="flex gap-3">
              <Link 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background/10 rounded-lg flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background/10 rounded-lg flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link 
                href="https://wa.me/212522000000" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background/10 rounded-lg flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-background/70 hover:text-secondary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-background mb-4">Produits</h4>
            <ul className="space-y-2">
              {productCategories.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-background/70 hover:text-secondary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-background mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="text-background/70">
                <span className="block text-background font-medium">Adresse</span>
                Bd Chefchaouni, Aïn Sebaâ<br />
                Casablanca 20250, Maroc
              </li>
              <li className="text-background/70">
                <span className="block text-background font-medium">Téléphone</span>
                +212 5 22 XX XX XX
              </li>
              <li className="text-background/70">
                <span className="block text-background font-medium">Email</span>
                contact@eqchefchaouni.com
              </li>
              <li className="text-background/70">
                <span className="block text-background font-medium">Horaires</span>
                Lun - Sam : 8h30 - 18h30
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © 2026 Equipement Chefchaouni. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-background/50 hover:text-secondary transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="#" className="text-background/50 hover:text-secondary transition-colors">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
