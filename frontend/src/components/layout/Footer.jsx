import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

const quickLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Produits', to: '/produits' },
  { label: 'Réalisations', to: '/realisations' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Contact', to: '/contact' },
  { label: 'Devis', to: '/devis' },
]

const categories = [
  { label: 'Outillage professionnel', to: '/produits?categorie=outillage' },
  { label: 'Quincaillerie', to: '/produits?categorie=quincaillerie' },
  { label: 'Matériel électrique', to: '/produits?categorie=electricite' },
  { label: 'Sanitaire & Plomberie', to: '/produits?categorie=sanitaire' },
  { label: 'Peinture', to: '/produits?categorie=peinture' },
]

export default function Footer() {
  return (
    <footer className="bg-[#071526] text-white">
      {/* Orange accent top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600" />

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:px-16 lg:py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" aria-label="Accueil">
              <img src={logo} alt="Équipement Chefchaouni" className="h-14 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              Votre fournisseur de confiance en outillage, quincaillerie, matériel électrique, sanitaire et peinture à Casablanca depuis 2008.
            </p>
            {/* Social links */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-sm text-slate-400 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
              >
                f
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-sm text-slate-400 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
              >
                ig
              </a>
              <a
                href="https://wa.me/212522247420"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-sm text-slate-400 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
              >
                wa
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-400">Navigation</p>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-orange-400"
                  >
                    <span className="h-px w-3 bg-orange-500/60" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-400">Nos produits</p>
            <ul className="mt-5 space-y-3">
              {categories.map((cat) => (
                <li key={cat.to}>
                  <Link
                    to={cat.to}
                    className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-orange-400"
                  >
                    <span className="h-px w-3 bg-orange-500/60" />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-400">Contact</p>
            <ul className="mt-5 space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-orange-500">◆</span>
                <span>28, Rue De Buzancy,<br />20300 Casablanca, Maroc</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500">☎</span>
                <a href="tel:+212522247420" className="transition hover:text-orange-400">0522 247 420</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500">✉</span>
                <a href="mailto:contact@equipementchefchaouni.ma" className="transition hover:text-orange-400 break-all">
                  contact@equipementchefchaouni.ma
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500">✓</span>
                <a
                  href="https://wa.me/212522247420"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-green-400 transition hover:text-green-300"
                >
                  WhatsApp disponible
                </a>
              </li>
            </ul>

            {/* Hours */}
            <div className="mt-6 rounded-sm border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-400">Horaires</p>
              <div className="mt-3 space-y-1.5 text-[0.8125rem] text-slate-400">
                <div className="flex justify-between gap-2">
                  <span>Lun – Ven</span>
                  <span className="font-semibold text-white">08h00 – 18h00</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Samedi</span>
                  <span className="font-semibold text-white">08h00 – 13h00</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Dimanche</span>
                  <span className="text-slate-500">Fermé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:px-8 md:px-16">
          <p className="text-center sm:text-left">© {new Date().getFullYear()} Équipement Chefchaouni. Tous droits réservés.</p>
          <p className="text-center sm:text-right">28, Rue De Buzancy, 20300 Casablanca — 0522 247 420</p>
        </div>
      </div>
    </footer>
  )
}