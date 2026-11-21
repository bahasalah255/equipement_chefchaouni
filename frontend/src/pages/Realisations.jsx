import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRealisations } from '../services/api.js'

export default function Realisations() {
  const [items, setItems] = useState([])
  useEffect(() => {
    getRealisations().then((response) => setItems(response.data?.data ?? response.data ?? [])).catch(() => setItems([]))
  }, [])
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange">Réalisations</p>
      <h1 className="mt-3 text-2xl font-bold text-charcoal sm:text-3xl">Galerie de projets réalisés</h1>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:mt-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.id} to={`/realisations/${item.slug}`} className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft">
            {item.cover ? <img src={item.cover} alt={item.title} className="h-52 w-full object-cover" /> : <div className="h-52 bg-stone-100" />}
            <div className="p-5"><h2 className="text-lg font-bold">{item.title}</h2><p className="mt-2 text-sm text-stone-500">{item.location}</p></div>
          </Link>
        ))}
      </div>
    </section>
  )
}