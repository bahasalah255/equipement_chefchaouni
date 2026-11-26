import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import QuoteButton from '../quote/QuoteButton.jsx'
import logo from '../../assets/logo.png'

const NAV_LINKS = [
  { to: '/', label: 'Accueil' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/produits', label: 'Produits' },
  { to: '/realisations', label: 'Réalisations' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return
    const closeOnEscape = (e) => { if (e.key === 'Escape') setIsMenuOpen(false) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isMenuOpen])

  const close = () => setIsMenuOpen(false)

  return (
    <>
      <style>{`
        /* ── Top info bar (desktop only) ── */
        .hdr-topbar {
          background: #071526;
          color: #fff;
          height: 36px;
          display: none;
        }
        @media (min-width: 768px) { .hdr-topbar { display: flex; align-items: center; justify-content: center; } }
        .hdr-topbar-inner {
          max-width: 1380px; width: 100%;
          padding: 0 2.5rem;
          display: flex; align-items: center; justify-content: center; gap: 2rem;
          font-size: 11.5px; font-weight: 600; letter-spacing: .04em;
        }
        .hdr-topbar-item { display: flex; align-items: center; gap: 7px; white-space: nowrap; color: rgba(255,255,255,.85); }
        .hdr-topbar-item a { color: inherit; text-decoration: none; transition: color .2s; }
        .hdr-topbar-item a:hover { color: #FF6B00; }
        .hdr-topbar-dot { color: #FF6B00; font-size: .5rem; }

        /* ── Main header bar ── */
        .hdr-bar {
          background: #fff;
          transition: box-shadow .3s ease;
        }
        .hdr-bar.scrolled { box-shadow: 0 4px 24px rgba(15,36,56,.09); }
        .hdr-bar-inner {
          max-width: 1380px; margin: 0 auto;
          height: 68px;
          padding: 0 1.25rem;
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
        }
        @media (min-width: 640px) { .hdr-bar-inner { height: 80px; padding: 0 2rem; } }
        @media (min-width: 1024px) { .hdr-bar-inner { padding: 0 2.5rem; } }

        /* Logo */
        .hdr-logo { display: flex; align-items: center; height: 100%; text-decoration: none; }
        .hdr-logo img { height: 46px; width: auto; object-fit: contain; display: block; }
        @media (min-width: 640px) { .hdr-logo img { height: 58px; } }

        /* Right side */
        .hdr-right { display: flex; align-items: center; gap: .625rem; }

        /* WhatsApp quick button (mobile only) */
        .hdr-wa-btn {
          display: flex; align-items: center; justify-content: center;
          width: 42px; height: 42px;
          background: transparent;
          border: 1.5px solid #e2ddd7;
          border-radius: 4px;
          color: #0F2438;
          font-size: .9rem;
          text-decoration: none;
          transition: background .2s, border-color .2s, color .2s;
          flex-shrink: 0;
          font-weight: 800;
        }
        .hdr-wa-btn:hover { background: #0F2438; border-color: #0F2438; color: #fff; }
        @media (min-width: 768px) { .hdr-wa-btn { display: none; } }

        /* Hamburger button */
        .hdr-menu-btn {
          display: inline-flex; align-items: center; gap: 10px;
          height: 44px; padding: 0 14px;
          background: #fff;
          border: 1.5px solid #e2ddd7;
          border-radius: 4px;
          font-size: 12px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase;
          color: #0F2438;
          cursor: pointer;
          transition: background .2s, border-color .2s, color .2s;
          flex-shrink: 0;
        }
        .hdr-menu-btn:hover { background: #0F2438; border-color: #0F2438; color: #fff; }
        .hdr-menu-btn:hover .hdr-burger span { background: #fff; }
        .hdr-menu-btn-label { display: none; }
        @media (min-width: 480px) { .hdr-menu-btn-label { display: inline; } }

        .hdr-burger { display: flex; flex-direction: column; justify-content: center; gap: 5px; width: 20px; height: 18px; }
        .hdr-burger span { display: block; height: 2px; background: currentColor; border-radius: 2px; transition: transform .3s, opacity .3s, width .3s; }
        .hdr-burger span:last-child { width: 65%; align-self: flex-end; }

        /* open state */
        .hdr-menu-btn[aria-expanded="true"] { background: #0F2438; border-color: #0F2438; color: #fff; }
        .hdr-menu-btn[aria-expanded="true"] .hdr-burger span:first-child { transform: translateY(7px) rotate(45deg); }
        .hdr-menu-btn[aria-expanded="true"] .hdr-burger span:nth-child(2) { opacity: 0; }
        .hdr-menu-btn[aria-expanded="true"] .hdr-burger span:last-child { transform: translateY(-7px) rotate(-45deg); width: 100%; }

        /* ── Overlay ── */
        .hdr-overlay {
          position: fixed; inset: 0; z-index: 998;
          background: rgba(7,21,38,.5);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          opacity: 0; visibility: hidden;
          transition: opacity .4s ease, visibility .4s ease;
        }
        .hdr-overlay.open { opacity: 1; visibility: visible; }

        /* ── Drawer ── */
        .hdr-drawer {
          position: fixed; left: 0; top: 0; bottom: 0; z-index: 999;
          width: min(340px, 86vw);
          background: #0F2438;
          display: flex; flex-direction: column;
          transform: translateX(-100%);
          transition: transform .45s cubic-bezier(.16,.82,.28,1);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .hdr-drawer.open { transform: translateX(0); }

        .hdr-drawer-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,.08);
          flex-shrink: 0;
        }
        .hdr-drawer-head img { height: 42px; width: auto; object-fit: contain; }
        .hdr-drawer-close {
          display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px;
          border: 1.5px solid rgba(255,255,255,.18); border-radius: 50%;
          background: none; color: #fff; font-size: 1.375rem; line-height: 1;
          cursor: pointer; transition: background .2s, border-color .2s;
          flex-shrink: 0;
        }
        .hdr-drawer-close:hover { background: #FF6B00; border-color: #FF6B00; }

        .hdr-drawer-nav { padding: 1rem 0; flex: 1; }
        .hdr-drawer-nav a {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 1.5rem;
          font-size: 1rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase;
          color: rgba(255,255,255,.8); text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,.06);
          transition: color .2s, background .2s, padding-left .2s;
        }
        .hdr-drawer-nav a:hover, .hdr-drawer-nav a.active-link {
          color: #FF6B00; background: rgba(255,107,0,.06); padding-left: 1.875rem;
        }
        .hdr-drawer-nav a .arrow { font-size: .875rem; opacity: .4; transition: opacity .2s, transform .2s; }
        .hdr-drawer-nav a:hover .arrow { opacity: 1; transform: translateX(4px); }

        .hdr-drawer-footer {
          padding: 1.5rem;
          border-top: 1px solid rgba(255,255,255,.08);
          flex-shrink: 0;
          display: flex; flex-direction: column; gap: 1rem;
        }
        .hdr-drawer-cta {
          display: flex; align-items: center; justify-content: center;
          height: 50px;
          background: #FF6B00; color: #fff;
          font-size: .875rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase;
          border-radius: 2px; text-decoration: none;
          transition: background .2s;
        }
        .hdr-drawer-cta:hover { background: #e55e00; }

        .hdr-drawer-contact {
          display: flex; flex-direction: column; gap: .5rem;
        }
        .hdr-drawer-contact a {
          display: flex; align-items: center; gap: .625rem;
          font-size: .8125rem; color: rgba(255,255,255,.55); text-decoration: none;
          transition: color .2s;
        }
        .hdr-drawer-contact a:hover { color: #FF6B00; }
        .hdr-drawer-contact .dot { color: #FF6B00; font-size: .5rem; }
      `}</style>

      <header className={`sticky top-0 z-50`}>
        {/* Top info bar */}
        <div className="hdr-topbar">
          <div className="hdr-topbar-inner">
            <span className="hdr-topbar-item">
              <span className="hdr-topbar-dot">◆</span>
             JF58+933, Casablanca 20450, Maroc
            </span>
            <span className="hdr-topbar-dot">◆</span>
            <span className="hdr-topbar-item">
              <span className="hdr-topbar-dot">☎</span>
              <a href="tel:+212522247420">0522 247 420</a>
            </span>
            <span className="hdr-topbar-dot">◆</span>
            <span className="hdr-topbar-item">
              <span className="hdr-topbar-dot">✉</span>
              <a href="mailto:contact@equipementchefchaouni.ma">contact@equipementchefchaouni.ma</a>
            </span>
          </div>
        </div>

        {/* Main bar */}
        <div className={`hdr-bar ${scrolled ? 'scrolled' : ''}`}>
          <div className="hdr-bar-inner">
            <Link to="/" className="hdr-logo" aria-label="Accueil Équipement Chefchaouni">
              <img src={logo} alt="Équipement Chefchaouni" />
            </Link>

            <div className="hdr-right">
              {/* Phone shortcut (mobile) */}
              <a href="tel:+212522247420" className="hdr-wa-btn" aria-label="Appeler le 0522 247 420">
                ☎
              </a>

              {/* Hamburger */}
              <button
                type="button"
                className="hdr-menu-btn"
                onClick={() => setIsMenuOpen(o => !o)}
                aria-expanded={isMenuOpen}
                aria-controls="site-drawer"
                aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                <span className="hdr-burger" aria-hidden="true">
                  <span /><span /><span />
                </span>
                <span className="hdr-menu-btn-label">{isMenuOpen ? 'Fermer' : 'Menu'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`hdr-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        id="site-drawer"
        className={`hdr-drawer ${isMenuOpen ? 'open' : ''}`}
        aria-label="Navigation principale"
        aria-hidden={!isMenuOpen}
      >
        {/* Head */}
        <div className="hdr-drawer-head">
          <img src={logo} alt="Équipement Chefchaouni" />
          <button type="button" className="hdr-drawer-close" onClick={close} aria-label="Fermer le menu">
            ×
          </button>
        </div>

        {/* Nav links */}
        <nav className="hdr-drawer-nav" aria-label="Menu principal">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={close}
              className={({ isActive }) => isActive ? 'active-link' : ''}
            >
              <span>{link.label}</span>
              <span className="arrow" aria-hidden="true">→</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="hdr-drawer-footer">
          <Link to="/devis" className="hdr-drawer-cta" onClick={close}>
            Demander un devis gratuit
          </Link>
          <div className="hdr-drawer-contact">
            <a href="tel:+212522247420">
              <span className="dot">☎</span> 0522 247 420
            </a>
            <a href="https://wa.me/212522247420" target="_blank" rel="noreferrer">
              <span className="dot">◉</span> WhatsApp
            </a>
            <a href="mailto:contact@equipementchefchaouni.ma">
              <span className="dot">✉</span> contact@equipementchefchaouni.ma
            </a>
          </div>
        </div>
      </aside>
    </>
  )
}