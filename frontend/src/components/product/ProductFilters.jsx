export default function ProductFilters({ categories = [], category = '', onCategoryChange }) {
  return (
    <aside style={{
      background: '#fff',
      border: '1px solid rgba(15,36,56,.07)',
      borderRadius: '4px',
      padding: '1.75rem',
      position: 'sticky',
      top: '110px',
    }}>
      <div style={{ borderBottom: '2px solid #FF6B00', paddingBottom: '.75rem', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '.2em', textTransform: 'uppercase', color: '#FF6B00', margin: 0 }}>
          Filtres
        </p>
      </div>

      {/* Category filter */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', color: '#6b6054', marginBottom: '.75rem' }}>
          Catégorie
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.375rem' }}>
          <button
            type="button"
            onClick={() => onCategoryChange?.('')}
            style={{
              textAlign: 'left',
              padding: '.5rem .75rem',
              background: !category ? 'rgba(255,107,0,.08)' : 'transparent',
              borderLeft: !category ? '3px solid #FF6B00' : '3px solid transparent',
              color: !category ? '#FF6B00' : '#6b6054',
              fontSize: '.875rem',
              fontWeight: !category ? 700 : 500,
              border: 'none',
              borderLeft: !category ? '3px solid #FF6B00' : '3px solid transparent',
              cursor: 'pointer',
              transition: 'all .2s',
              borderRadius: '0 2px 2px 0',
            }}
          >
            Toutes les catégories
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onCategoryChange?.(item.slug)}
              style={{
                textAlign: 'left',
                padding: '.5rem .75rem',
                background: category === item.slug ? 'rgba(255,107,0,.08)' : 'transparent',
                borderLeft: category === item.slug ? '3px solid #FF6B00' : '3px solid transparent',
                color: category === item.slug ? '#FF6B00' : '#6b6054',
                fontSize: '.875rem',
                fontWeight: category === item.slug ? 700 : 500,
                border: 'none',
                cursor: 'pointer',
                transition: 'all .2s',
                borderRadius: '0 2px 2px 0',
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(15,36,56,.06)', margin: '1.5rem 0' }} />

      {/* Quick contact */}
      <div style={{ background: '#0F2438', borderRadius: '4px', padding: '1.25rem' }}>
        <p style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '.18em', textTransform: 'uppercase', color: '#FF6B00', margin: '0 0 .5rem' }}>
          Besoin d'aide ?
        </p>
        <p style={{ fontSize: '.8125rem', color: 'rgba(255,255,255,.6)', margin: '0 0 1rem', lineHeight: 1.6 }}>
          Notre équipe vous conseille sur les produits adaptés à votre projet.
        </p>
        <a
          href="tel:+212522247420"
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#FF6B00', color: '#fff',
            fontSize: '.8125rem', fontWeight: 800, letterSpacing: '.04em',
            padding: '.625rem 1rem', borderRadius: '2px', textDecoration: 'none',
            transition: 'background .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#e55e00' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#FF6B00' }}
        >
          <span>☎</span> 0522 247 420
        </a>
      </div>
    </aside>
  )
}