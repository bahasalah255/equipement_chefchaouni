import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useQuote } from '../../hooks/useQuote.js'

export default function ProductCard({ product }) {
  const { addProduct, hasProduct } = useQuote()
  const isAdded = hasProduct(product.id ?? product.slug)

  return (
    <article style={{
      background: '#fff',
      border: '1px solid rgba(15,36,56,.07)',
      borderRadius: '4px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(15,36,56,.12)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      {/* Image */}
      <div style={{ aspectRatio: '4/3', background: '#F7F5F2', overflow: 'hidden', position: 'relative' }}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '2rem', opacity: 0.2 }}>◈</span>
          </div>
        )}
        {product.category && (
          <span style={{
            position: 'absolute', top: '12px', left: '12px',
            background: '#0F2438', color: '#fff',
            fontSize: '10px', fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase',
            padding: '4px 10px', borderRadius: '2px',
          }}>
            {product.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '.75rem', flex: 1 }}>
        <div>
          {product.brand && (
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#FF6B00', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '.25rem' }}>
              {product.brand}
            </p>
          )}
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F2438', letterSpacing: '-.02em', margin: 0, lineHeight: 1.3 }}>
            {product.name}
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '.5rem', marginTop: 'auto', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => addProduct(product)}
            disabled={isAdded}
            style={{
              height: '40px', padding: '0 18px',
              background: isAdded ? '#e5e1db' : '#FF6B00',
              color: isAdded ? '#8b8070' : '#fff',
              fontSize: '.8125rem', fontWeight: 800,
              border: 'none', borderRadius: '2px', cursor: isAdded ? 'not-allowed' : 'pointer',
              transition: 'background .2s, transform .2s',
              letterSpacing: '.04em',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { if (!isAdded) e.currentTarget.style.background = '#e55e00' }}
            onMouseLeave={e => { if (!isAdded) e.currentTarget.style.background = '#FF6B00' }}
          >
            {isAdded ? '✓ Ajouté' : '+ Demande de devis'}
          </button>
          <Link
            to={`/produits/${product.slug}`}
            style={{
              height: '40px', padding: '0 18px',
              display: 'inline-flex', alignItems: 'center',
              background: 'transparent',
              color: '#0F2438',
              fontSize: '.8125rem', fontWeight: 700,
              border: '1px solid rgba(15,36,56,.2)', borderRadius: '2px',
              textDecoration: 'none', transition: 'border-color .2s, color .2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF6B00'; e.currentTarget.style.color = '#FF6B00' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(15,36,56,.2)'; e.currentTarget.style.color = '#0F2438' }}
          >
            Voir la fiche
          </Link>
        </div>
      </div>
    </article>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
}