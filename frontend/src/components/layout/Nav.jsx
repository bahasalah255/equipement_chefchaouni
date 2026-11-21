import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/a-propos', label: 'À propos de nous' },
  { to: '/marques', label: 'Marques' },
  { to: '/produits', label: 'Produits' },
]

export default function Nav({ className = '', vertical = false, onNavigate }) {
  return (
    <nav className={className}>
      <ul className={vertical ? 'flex flex-col gap-1' : 'flex flex-col gap-2 md:flex-row md:items-center md:gap-1'}>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                [
                  vertical
                    ? 'group flex items-center justify-between border-b border-white/10 px-1 py-4 text-lg font-bold uppercase tracking-[0.08em] transition'
                    : 'rounded-sm px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors',
                  isActive
                    ? 'text-[#F5711B]'
                    : vertical
                      ? 'text-white hover:translate-x-1 hover:text-orange-400'
                      : 'text-[#111111] hover:text-[#F5711B]',
                ].join(' ')
              }
            >
              <span>{link.label}</span>
              {vertical ? <span className="text-xs text-white/30 transition group-hover:translate-x-1 group-hover:text-orange-400">→</span> : null}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Nav.propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
  onNavigate: PropTypes.func,
}