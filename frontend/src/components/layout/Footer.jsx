import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Produits', to: '/produits' },
  { label: 'Réalisations', to: '/realisations' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-[#0F2438] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-10 sm:grid-cols-2 sm:px-6 md:px-16 lg:grid-cols-4 lg:px-16 lg:py-16">
        <div>
          <p
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: 'Archivo, Inter, ui-sans-serif, system-ui, sans-serif' }}
          >
            Equipement Chefchaouni
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-200">
            Fournisseur d'outillage, quincaillerie, visserie et matériel de soudure à Casablanca depuis 2008.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Liens rapides</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-orange-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li>Ain Sebaa, Casablanca</li>
            <li>+212 5 00 00 00 00</li>
            <li>
              <a
                href="https://wa.me/212500000000"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-orange-300"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Réseaux</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-3 py-2 text-sm transition hover:border-orange-300 hover:text-orange-300"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-3 py-2 text-sm transition hover:border-orange-300 hover:text-orange-300"
            >
              Facebook
            </a>
            <a
              href="https://wa.me/212500000000"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-3 py-2 text-sm transition hover:border-orange-300 hover:text-orange-300"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm text-slate-300">
        © {new Date().getFullYear()} Equipement Chefchaouni. Tous droits réservés.
      </div>
    </footer>
  )
}