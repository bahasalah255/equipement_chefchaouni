import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProductBySlug } from '../services/api.js'
import { useQuote } from '../hooks/useQuote.js'

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const { addProduct, hasProduct } = useQuote()
  useEffect(() => {
    getProductBySlug(slug).then((response) => setProduct(response.data)).catch(() => setProduct(null))
  }, [slug])

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange">Fiche produit</p>
      {product ? <>
        {product.image ? <img src={product.image} alt={product.name} className="mt-6 h-64 w-full rounded-2xl object-cover sm:mt-8 sm:h-96" /> : null}
        <h1 className="mt-6 text-2xl font-bold text-charcoal sm:text-3xl">{product.name}</h1>
        <p className="mt-3 max-w-3xl text-stone-600">{product.description}</p>
        {product.price ? <p className="mt-4 text-xl font-bold text-orange">{Number(product.price).toLocaleString('fr-MA')} DH</p> : null}
        <button type="button" onClick={() => addProduct(product)} disabled={hasProduct(product.id ?? product.slug)} className="mt-6 rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white disabled:bg-stone-300">
          {hasProduct(product.id ?? product.slug) ? 'Ajouté à la demande' : 'Ajouter à ma demande'}
        </button>
      </> : <p className="mt-6 text-stone-500">Chargement du produit...</p>}
    </section>
  )
}