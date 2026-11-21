import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function RealisationDetail() {
  const { slug } = useParams()
  const [item, setItem] = useState(null)
  useEffect(() => {
    axios.get(`http://localhost:8000/api/realisations/${encodeURIComponent(slug)}`).then((response) => setItem(response.data)).catch(() => setItem(null))
  }, [slug])

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange">Réalisation</p>
      {item ? <>
        {item.cover ? <img src={item.cover} alt={item.title} className="mt-6 h-64 w-full rounded-2xl object-cover sm:mt-8 sm:h-96" /> : null}
        <h1 className="mt-6 text-2xl font-bold text-charcoal sm:text-3xl">{item.title}</h1>
        {item.location ? <p className="mt-2 font-semibold text-orange">{item.location}</p> : null}
        <p className="mt-4 max-w-3xl text-stone-600">{item.description}</p>
      </> : <p className="mt-6 text-stone-500">Chargement de la réalisation...</p>}
    </section>
  )
}