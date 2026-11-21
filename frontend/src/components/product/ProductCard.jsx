import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useQuote } from '../../hooks/useQuote.js'

export default function ProductCard({ product }) {
  const { addProduct, hasProduct } = useQuote()
  const isAdded = hasProduct(product.id ?? product.slug)

  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-soft sm:rounded-3xl">
      <div className="aspect-[4/3] bg-stone-100">
        {product.image ? <img src={product.image} alt={product.name} className="h-full w-full object-cover" /> : null}
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">{product.category}</p>
          <h3 className="mt-1 text-lg font-semibold text-charcoal">{product.name}</h3>
          <p className="text-sm text-stone-600">{product.brand}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => addProduct(product)}
            className="rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-stone-300"
            disabled={isAdded}
          >
            {isAdded ? 'Ajouté' : 'Ajouter à ma demande'}
          </button>
          <Link to={`/produits/${product.slug}`} className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-charcoal transition hover:border-orange hover:text-orange">
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