import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav.jsx'
import QuoteButton from '../quote/QuoteButton.jsx'
import logo from '../../assets/logo.png'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) return undefined

    function closeOnEscape(event) {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-50 bg-white text-[#111111] shadow-[0_6px_24px_rgba(15,36,56,0.08)]">
      <div className="hidden h-9 bg-[#071526] text-white md:block">
        <div className="mx-auto flex h-full max-w-[1380px] items-center justify-center px-6 text-[12px] font-semibold lg:px-10">
          <div className="flex items-center gap-8">
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <span className="text-orange-500">◆</span>
              28, Rue De Buzancy, 20300 Casablanca, Maroc
            </span>
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <span className="text-orange-500">☎</span>
              0522 247 420
            </span>
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <span className="text-orange-500">✉</span>
              contact@equipementchefchaouni.ma
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-[72px] max-w-[1380px] items-center justify-between px-4 sm:h-[88px] sm:px-8 lg:px-10">
        <Link to="/" className="flex h-full items-center" aria-label="Accueil Equipement Chefchaouni">
          <img
            src={logo}
            alt="Equipement Chefchaouni"
            className="h-[52px] w-auto object-contain sm:h-[68px]"
          />
        </Link>

        <button
          type="button"
          className="group relative inline-flex h-[54px] items-center gap-3 overflow-hidden rounded-md border border-[#dfe3e7] bg-white px-5 text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#0F2438] shadow-[0_5px_18px_rgba(15,36,56,0.06)] transition duration-300 hover:border-[#0F2438] hover:bg-[#0F2438] hover:text-white"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-expanded={isMenuOpen}
          aria-controls="vertical-navigation"
        >
          <span className="flex h-5 w-6 flex-col justify-center gap-[5px]" aria-hidden="true">
            <span className="h-[2px] w-full bg-current" />
            <span className="h-[2px] w-full bg-current" />
            <span className="h-[2px] w-2/3 self-end bg-current" />
          </span>
          <span>Menu</span>
        </button>
      </div>

      <div
        className={[
          'fixed inset-0 z-[60] transition-visibility duration-500',
          isMenuOpen ? 'visible' : 'invisible',
        ].join(' ')}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          className={[
            'absolute inset-0 h-full w-full bg-[#071526]/55 backdrop-blur-sm transition-opacity duration-500',
            isMenuOpen ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onClick={() => setIsMenuOpen(false)}
          aria-label="Fermer le menu"
        />

        <aside
          id="vertical-navigation"
          className={[
            'absolute left-0 top-0 flex h-full w-[min(390px,88vw)] flex-col bg-[#0F2438] p-6 text-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.16,.82,.28,1)] sm:p-8',
            isMenuOpen ? 'translate-x-0' : '-translate-x-full',
          ].join(' ')}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <img src={logo} alt="Equipement Chefchaouni" className="h-12 w-auto object-contain" />
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-2xl leading-none transition hover:border-orange-500 hover:bg-orange-500"
              aria-label="Fermer le menu"
            >
              ×
            </button>
          </div>

          <Nav
            className="mt-8"
            vertical
            onNavigate={() => setIsMenuOpen(false)}
          />

          <div className="mt-auto border-t border-white/10 pt-6">
            <QuoteButton className="w-full justify-center rounded-md bg-[#F5711B] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-orange-950/20 hover:bg-orange-600" />
            <p className="mt-5 text-xs leading-6 text-slate-300">
              28, Rue De Buzancy, Casablanca<br />
              0522 247 420
            </p>
          </div>
        </aside>
      </div>
    </header>
  )
}