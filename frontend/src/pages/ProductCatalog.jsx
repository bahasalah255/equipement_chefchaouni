import ProductFilters from '../components/product/ProductFilters.jsx'
import ProductCard from '../components/product/ProductCard.jsx'
import { getCategories, getProducts } from '../services/api.js'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductCatalog() {
  const { slug } = useParams()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState(slug ?? '')

  useEffect(() => {
    getCategories().then((response) => setCategories(response.data)).catch(() => setCategories([]))
  }, [])

  useEffect(() => {
    getProducts(category ? { category } : {}).then((response) => {
      setProducts(response.data?.data ?? response.data ?? [])
    }).catch(() => setProducts([]))
  }, [category])

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[320px_1fr] lg:px-8">
      <ProductFilters categories={categories} category={category} onCategoryChange={setCategory} />
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange">Produits</p>
        <h1 className="mt-3 text-2xl font-bold text-charcoal sm:text-3xl">Catalogue avec filtres</h1>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={{ ...product, category: product.category?.name }} />
          ))}
        </div>
      </div>
    </section>
  )
}