import { Truck, Headphones, Settings, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Settings,
    title: "Vente d'outillage",
    description: "Large gamme d'outils professionnels pour tous vos besoins en construction et industrie.",
  },
  {
    icon: Truck,
    title: "Livraison rapide",
    description: "Service de livraison efficace sur Casablanca et dans tout le Maroc.",
  },
  {
    icon: Headphones,
    title: "Conseil expert",
    description: "Notre équipe vous accompagne dans le choix des produits adaptés à vos projets.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie qualité",
    description: "Tous nos produits sont sélectionnés auprès des meilleures marques du marché.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Nos Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Une gamme complète de services pour vous accompagner
          </h2>
          <p className="text-muted-foreground text-pretty">
            De la sélection des produits à la livraison, nous sommes à vos côtés 
            pour répondre à tous vos besoins en outillage.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="group border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
                {/* Decorative accent */}
                <div className="mt-4 h-1 w-12 bg-secondary/30 group-hover:w-full group-hover:bg-secondary transition-all duration-300 rounded-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
