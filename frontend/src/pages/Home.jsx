import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedCounter from '../components/layout/AnimatedCounter.jsx'
import HomeSectionTitle from '../components/layout/HomeSectionTitle.jsx'
import { submitQuoteRequest } from '../services/api.js'

const galleryModules = import.meta.glob('../assets/images/*.jpeg', {
  eager: true,
  query: '?url',
  import: 'default',
})

const GALLERY_IMAGES = Object.values(galleryModules)

const CATEGORIES = [
  { name: 'Outillage', slug: 'outillage', number: '01', icon: '◈', text: 'Perceuses, meuleuses, clés et outils professionnels.' },
  { name: 'Quincaillerie', slug: 'quincaillerie', number: '02', icon: '▦', text: 'Fixations, équipements et accessoires pour tous les chantiers.' },
  { name: 'Visserie', slug: 'visserie', number: '03', icon: '⌁', text: 'Vis, boulons, écrous et solutions de montage fiables.' },
  { name: 'Soudure', slug: 'soudure', number: '04', icon: '⌁', text: 'Machines, consommables et équipements de soudage.' },
]

const BRANDS = [
  { name: 'Bahco', category: 'Outillage' },
  { name: 'Stanley', category: 'Outillage' },
  { name: 'Magmaweld', category: 'Soudure' },
  { name: 'Fixman', category: 'Quincaillerie' },
]

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [quoteStatus, setQuoteStatus] = useState('')

  useEffect(() => {
    if (!GALLERY_IMAGES.length) return undefined
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % GALLERY_IMAGES.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [])

  function previousSlide() {
    setActiveSlide((current) => (current - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
  }

  function nextSlide() {
    setActiveSlide((current) => (current + 1) % GALLERY_IMAGES.length)
  }

  async function handleQuote(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    try {
      await submitQuoteRequest({
        name: form.get('name'),
        phone: form.get('phone'),
        email: form.get('email'),
        message: form.get('message'),
        products: [],
      })
      setQuoteStatus('Votre demande a été envoyée.')
      event.currentTarget.reset()
    } catch {
      setQuoteStatus("La demande n'a pas pu être envoyée.")
    }
  }

  return (
    <div className="overflow-hidden bg-[#F7F5F2]">
      <section className="relative min-h-[560px] overflow-hidden bg-[#0F2438] text-white md:min-h-[680px]">
        <div className="absolute inset-0">
          {GALLERY_IMAGES.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Equipement Chefchaouni - image ${index + 1}`}
              className={[
                'absolute inset-0 h-full w-full object-cover transition-all duration-[1600ms] ease-out',
                activeSlide === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
              ].join(' ')}
              aria-hidden={activeSlide !== index}
            />
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,21,38,.96)_0%,rgba(7,21,38,.82)_42%,rgba(7,21,38,.20)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(7,21,38,.72)_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center overflow-hidden px-5 sm:px-6 md:min-h-[680px] md:px-16">
          <div className="max-w-4xl animate-[hero-enter_.9s_ease-out_both]">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 shrink-0 bg-orange-500" />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-400 sm:text-sm sm:tracking-[0.18em]">
                Fournisseur professionnel depuis 2008
              </p>
            </div>
            <h1 className="text-[clamp(1.75rem,8.5vw,7.2rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-white xs:text-[clamp(2rem,9vw,7.2rem)] sm:text-[clamp(3rem,8vw,7.2rem)]">
              Outillage.
              <br />
              <span className="text-orange-500">Quincaillerie.</span>
              <br />
              <span className="text-[0.75em]">Matériel pro.</span>
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-200 sm:max-w-xl sm:text-base md:text-lg">
              Plus de 15 ans d'expérience au service des professionnels, ateliers et particuliers à Casablanca.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/produits"
                className="inline-flex h-12 items-center justify-center rounded-sm bg-orange-500 px-6 text-sm font-bold uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Voir nos produits
              </Link>
              <Link
                to="/devis"
                className="inline-flex h-12 items-center justify-center rounded-sm border border-white/80 px-6 text-sm font-bold uppercase tracking-wide text-white transition hover:border-orange-400 hover:text-orange-300"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 right-6 z-10 flex items-center gap-3 md:bottom-10 md:right-10">
          <button type="button" onClick={previousSlide} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/20 text-2xl backdrop-blur transition hover:border-orange-400 hover:bg-orange-500" aria-label="Image précédente">‹</button>
          <div className="flex gap-2">
            {GALLERY_IMAGES.slice(0, 8).map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-1 rounded-full transition-all ${activeSlide === index ? 'w-8 bg-orange-500' : 'w-3 bg-white/55'}`}
                aria-label={`Afficher l'image ${index + 1}`}
              />
            ))}
          </div>
          <button type="button" onClick={nextSlide} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/20 text-2xl backdrop-blur transition hover:border-orange-400 hover:bg-orange-500" aria-label="Image suivante">›</button>
        </div>
      </section>

      <section className="relative z-10 border-y border-stone-200 bg-[#F7F5F2]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-stone-200 px-0 md:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              to={`/produits?categorie=${category.slug}`}
              className="group relative min-h-[180px] overflow-hidden bg-white px-5 py-7 transition duration-500 hover:bg-[#0F2438] md:min-h-[245px] md:px-8 md:py-9"
            >
              <div className="absolute right-4 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 text-xl text-stone-400 transition duration-500 group-hover:rotate-12 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white md:h-14 md:w-14">
                {category.icon}
              </div>
              <span className="inline-flex h-7 items-center border-l-2 border-orange-500 pl-3 text-xs font-extrabold tracking-[0.18em] text-orange-500">
                {category.number}
              </span>
              <h2 className="mt-8 text-base font-extrabold uppercase tracking-[0.06em] text-[#0F2438] transition group-hover:text-white md:text-xl">
                {category.name}
              </h2>
              <p className="mt-3 max-w-[230px] text-xs leading-6 text-stone-500 transition group-hover:text-slate-300 md:text-sm">
                {category.text}
              </p>
              <span className="absolute bottom-6 left-5 flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 text-sm text-[#0F2438] opacity-0 transition duration-500 group-hover:translate-x-2 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:opacity-100 md:left-8">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-16 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative">
            {GALLERY_IMAGES[0] ? (
              <img src={GALLERY_IMAGES[0]} alt="Equipement professionnel" className="h-[420px] w-full rounded-sm object-cover md:h-[520px]" />
            ) : null}
            <div className="absolute -bottom-6 -right-2 w-[220px] bg-orange-500 p-6 text-white shadow-2xl md:-right-8 md:w-[260px] md:p-8">
              <strong className="text-5xl font-extrabold">15+</strong>
              <p className="mt-2 text-sm font-bold uppercase tracking-wide">ans d'expérience</p>
            </div>
          </div>

          <div className="lg:pl-12">
            <HomeSectionTitle
              eyebrow="Notre savoir-faire"
              title="Des équipements fiables pour des résultats durables."
              subtitle="Depuis 2008, Equipement Chefchaouni accompagne les professionnels, les entreprises de construction, les ateliers et les particuliers avec une sélection de matériel pensée pour le terrain."
            />
            <div className="mt-8 grid grid-cols-2 gap-4">
              <AnimatedCounter value={2008} label="Depuis" />
              <AnimatedCounter value={18} label="Marques" suffix="+" />
              <AnimatedCounter value={1200} label="Clients satisfaits" suffix="+" />
              <AnimatedCounter value={4} label="Familles principales" />
            </div>
            <Link to="/a-propos" className="mt-8 inline-flex border-b-2 border-orange-500 pb-1 text-sm font-bold uppercase tracking-wide text-[#0F2438]">
              Découvrir notre histoire
            </Link>
          </div>
        </div>
      </section>

      {GALLERY_IMAGES.length > 0 ? (
        <section className="bg-[#0F2438] py-20 text-white md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-16">
            <div className="flex items-end justify-between gap-6">
              <HomeSectionTitle
                eyebrow="Galerie"
                title="Notre univers en images"
                subtitle="Découvrez une sélection de nos équipements et projets."
              />
              <Link to="/realisations" className="hidden text-sm font-bold uppercase tracking-wide text-orange-400 md:block">Toutes les réalisations →</Link>
            </div>

            <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[280px]">
              {GALLERY_IMAGES.slice(0, 7).map((image, index) => (
                <figure
                  key={image}
                  className={[
                    'group relative overflow-hidden rounded-sm',
                    index === 0 ? 'col-span-2 row-span-2' : '',
                    index === 4 ? 'md:col-span-2' : '',
                  ].join(' ')}
                >
                  <img src={image} alt={`Equipement Chefchaouni ${index + 1}`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071526]/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-16 md:py-28">
        <HomeSectionTitle align="center" eyebrow="Nos partenaires" title="Des marques professionnelles" subtitle="Nous sélectionnons des références reconnues pour leur fiabilité, leur performance et leur durabilité." />
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {BRANDS.map((brand) => (
            <article key={brand.name} className="flex min-h-40 flex-col items-center justify-center rounded-sm border border-stone-200 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-orange-400 hover:shadow-xl">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-stone-200 text-2xl font-black text-[#0F2438]">{brand.name.slice(0, 2).toUpperCase()}</div>
              <h3 className="mt-4 font-bold text-[#0F2438]">{brand.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-wide text-stone-500">{brand.category}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#071526]">
        <div className="absolute left-0 top-0 hidden h-full w-1/2 bg-[#F7F5F2] lg:block" />
        <div className="relative mx-auto grid max-w-7xl lg:min-h-[620px] lg:grid-cols-[1.02fr_0.98fr]">
          <div className="flex items-center bg-[#F7F5F2] px-6 py-14 sm:px-10 md:px-16 lg:py-16">
            <div className="w-full">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-500">Demande rapide</p>
              <h2 className="mt-4 max-w-xl text-4xl font-extrabold leading-[0.95] text-[#0F2438] md:text-6xl">
                Parlons de votre projet.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-stone-600">
                Décrivez votre besoin et notre équipe vous répondra rapidement avec une proposition adaptée.
              </p>
              {quoteStatus ? <p className="mt-5 border-l-4 border-orange-500 bg-white px-4 py-3 text-sm font-bold text-[#0F2438]">{quoteStatus}</p> : null}
              <form onSubmit={handleQuote} className="mt-7 grid gap-x-5 gap-y-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-600">Nom complet</span>
                  <input name="name" required className="h-12 w-full border-0 border-b-2 border-stone-300 bg-transparent outline-none transition focus:border-orange-500" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-600">Téléphone</span>
                  <input name="phone" required className="h-12 w-full border-0 border-b-2 border-stone-300 bg-transparent outline-none transition focus:border-orange-500" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-600">Email professionnel</span>
                  <input name="email" required type="email" className="h-12 w-full border-0 border-b-2 border-stone-300 bg-transparent outline-none transition focus:border-orange-500" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-600">Votre besoin</span>
                  <textarea name="message" rows="3" className="w-full resize-none border-0 border-b-2 border-stone-300 bg-transparent py-3 outline-none transition focus:border-orange-500" />
                </label>
                <button type="submit" className="mt-2 w-fit bg-orange-500 px-7 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5 hover:bg-orange-600">
                  Envoyer la demande
                </button>
              </form>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden md:min-h-[520px] lg:min-h-0">
            {GALLERY_IMAGES[1] ? <img src={GALLERY_IMAGES[1]} alt="Contact Equipement Chefchaouni" className="absolute inset-0 h-full w-full object-cover" /> : null}
            <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(7,21,38,.94)_0%,rgba(7,21,38,.72)_55%,rgba(7,21,38,.28)_100%)]" />
            <div className="absolute bottom-0 left-0 w-full p-6 text-white sm:p-10 md:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">Contact direct</p>
              <h3 className="mt-4 text-3xl font-extrabold md:text-4xl">À Casablanca,<br />nous sommes proches.</h3>
              <div className="mt-7 grid gap-3 text-sm text-slate-200">
                <p><span className="mr-3 text-orange-400">●</span>28, Rue De Buzancy, 20300 Casablanca</p>
                <p><span className="mr-3 text-orange-400">●</span>0522 247 420</p>
                <p><span className="mr-3 text-orange-400">●</span>contact@equipementchefchaouni.ma</p>
              </div>
              <Link to="/contact" className="mt-7 inline-flex border-b-2 border-orange-500 pb-2 text-sm font-bold uppercase tracking-wide text-white">
                Nous contacter →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
