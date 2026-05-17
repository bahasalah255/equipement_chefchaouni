import { Check, Clock, MapPin, ThumbsUp } from "lucide-react"

const reasons = [
  {
    icon: Check,
    title: "Produits certifiés",
    description: "Tous nos produits sont authentiques et proviennent de fournisseurs agréés.",
  },
  {
    icon: Clock,
    title: "Réponse rapide",
    description: "Recevez votre devis en moins de 24 heures pour tous vos projets.",
  },
  {
    icon: MapPin,
    title: "Présence locale",
    description: "Basés à Casablanca, nous connaissons parfaitement le marché marocain.",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction client",
    description: "Plus de 500 clients nous font confiance depuis plus de 15 ans.",
  },
]

export function WhyChooseUs() {
  return (
    <section id="apropos" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Pourquoi nous ?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-balance">
              Choisissez l&apos;expertise et la fiabilité
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-pretty">
              Depuis plus de 15 ans, Equipement Chefchaouni est le partenaire de confiance 
              des professionnels et particuliers au Maroc. Notre engagement : qualité, 
              rapidité et service personnalisé.
            </p>

            {/* Reasons Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <reason.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{reason.title}</h3>
                    <p className="text-sm text-primary-foreground/70">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Stats Card */}
          <div className="bg-card rounded-2xl p-8 md:p-10 text-foreground">
            <h3 className="text-2xl font-bold mb-6">Notre engagement qualité</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Satisfaction client</span>
                  <span className="text-sm font-bold text-secondary">98%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: "98%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Livraison à temps</span>
                  <span className="text-sm font-bold text-secondary">95%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: "95%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Qualité des produits</span>
                  <span className="text-sm font-bold text-secondary">100%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: "100%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Réactivité support</span>
                  <span className="text-sm font-bold text-secondary">92%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: "92%" }} />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-muted-foreground text-sm text-center">
                Chiffres basés sur les retours de nos clients en 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
