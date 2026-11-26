import ProductFilters from '../components/product/ProductFilters.jsx'
import ProductCard from '../components/product/ProductCard.jsx'
import { getCategories, getProducts } from '../services/api.js'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'

export default function ProductCatalog() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState(slug ?? searchParams.get('categorie') ?? '')

  useEffect(() => {
    getCategories().then((response) => setCategories(response.data)).catch(() => setCategories([]))
  }, [])

  useEffect(() => {
    setLoading(true)
    getProducts(category ? { category } : {})
      .then((response) => setProducts(response.data?.data ?? response.data ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [category])

  const currentCategoryLabel = categories.find(c => c.slug === category)?.name ?? 'Tous les produits'

  return (
    <>
      <style>{`
        .catalog-reveal {
          opacity: 0;
          transform: translateY(24px);
          animation: catalog-in 0.75s cubic-bezier(.16,.82,.28,1) forwards;
        }
        .catalog-reveal.d1 { animation-delay: 0.1s; }
        .catalog-reveal.d2 { animation-delay: 0.2s; }
        @keyframes catalog-in { to { opacity: 1; transform: translateY(0); } }

        .catalog-hero {
          position: relative;
          background: linear-gradient(135deg, #071526 0%, #0F2438 60%, #142f4a 100%);
          padding: 3rem 1.25rem 2.5rem;
          overflow: hidden;
        }
        @media (min-width: 768px) { .catalog-hero { padding: 4.5rem 2rem 3.5rem; } }
        .catalog-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,107,0,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,0,.05) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .catalog-hero-glow {
          position: absolute; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,107,0,.14) 0%, transparent 70%);
          border-radius: 50%; top: -100px; right: -80px;
        }
        .catalog-hero-inner {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto;
        }
        .catalog-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; color: rgba(255,255,255,.5);
          margin-bottom: 1.5rem; letter-spacing: .08em;
        }
        .catalog-breadcrumb a { color: rgba(255,255,255,.5); text-decoration: none; transition: color .2s; }
        .catalog-breadcrumb a:hover { color: #FF6B00; }
        .catalog-breadcrumb-sep { color: rgba(255,255,255,.25); }
        .catalog-breadcrumb-current { color: #FF6B00; }
        .catalog-hero-tag {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 800; letter-spacing: .2em;
          text-transform: uppercase; color: #FF6B00; margin-bottom: 1rem;
        }
        .catalog-hero-tag::before { content: ''; display: block; width: 28px; height: 2px; background: #FF6B00; border-radius: 2px; }
        .catalog-hero-title {
          font-size: clamp(1.75rem, 7vw, 3.25rem); font-weight: 900;
          line-height: 1.08; letter-spacing: -.04em; color: #fff; margin: 0;
        }
        .catalog-hero-title em { font-style: normal; color: #FF6B00; }
        .catalog-hero-sub {
          font-size: 1rem; line-height: 1.75; color: rgba(255,255,255,.58);
          max-width: 540px; margin: 1rem 0 0;
        }

        /* Layout */
        .catalog-body {
          background: #F7F5F2;
          padding: 2rem 1.25rem 3rem;
        }
        @media (min-width: 768px) { .catalog-body { padding: 3rem 2rem 5rem; } }
        .catalog-body-inner {
          max-width: 1280px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        @media (min-width: 1024px) { .catalog-body-inner { grid-template-columns: 280px 1fr; } }
        @media (max-width: 1023px) { .catalog-body-inner > aside { display: none; } }

        .catalog-results-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.5rem; gap: 1rem; flex-wrap: wrap;
        }
        .catalog-results-title {
          font-size: 1.25rem; font-weight: 900; color: #0F2438;
          letter-spacing: -.025em; margin: 0;
        }
        .catalog-results-count {
          font-size: .8125rem; color: #8b8070; font-weight: 600;
          background: #fff; border: 1px solid rgba(15,36,56,.08);
          border-radius: 100px; padding: .25rem .875rem;
        }

        .catalog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 400px) { .catalog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .catalog-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); } }

        /* Empty state */
        .catalog-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 5rem 2rem;
          border: 2px dashed rgba(15,36,56,.1);
          border-radius: 4px;
          background: #fff;
        }
        .catalog-empty-icon {
          font-size: 3rem; margin-bottom: 1rem; opacity: .25;
        }
        .catalog-empty-title { font-size: 1.125rem; font-weight: 800; color: #0F2438; margin: 0 0 .5rem; }
        .catalog-empty-sub { font-size: .875rem; color: #8b8070; margin: 0; }

        /* Skeleton loader */
        .catalog-skeleton {
          background: linear-gradient(90deg, #f0ede8 25%, #e8e4de 50%, #f0ede8 75%);
          background-size: 400% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
        }
        @keyframes shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
      `}</style>

      {/* ── Hero ── */}
      <section className="catalog-hero" aria-labelledby="catalog-title">
        <div className="catalog-hero-grid" aria-hidden="true" />
        <div className="catalog-hero-glow" aria-hidden="true" />
        <div className="catalog-hero-inner">
          <nav className="catalog-breadcrumb catalog-reveal" aria-label="Fil d'Ariane">
            <Link to="/">Accueil</Link>
            <span className="catalog-breadcrumb-sep" aria-hidden="true">›</span>
            <span className="catalog-breadcrumb-current">Produits</span>
          </nav>
          <div className="catalog-hero-tag catalog-reveal d1">Notre catalogue</div>
          <h1 id="catalog-title" className="catalog-hero-title catalog-reveal d2">
            Outillage & équipements<br />
            <em>professionnels.</em>
          </h1>
          <p className="catalog-hero-sub catalog-reveal d2">
            Découvrez notre sélection complète d'outils, de matériel et de fournitures pour tous vos chantiers et projets.
          </p>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="catalog-body">
        <div className="catalog-body-inner">
          {/* Sidebar */}
          <ProductFilters categories={categories} category={category} onCategoryChange={setCategory} />

          {/* Products */}
          <div>
            <div className="catalog-results-header">
              <h2 className="catalog-results-title">{currentCategoryLabel}</h2>
              {!loading && (
                <span className="catalog-results-count">
                  {products.length} produit{products.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            <div className="catalog-grid">
              {loading ? (
                // Skeleton
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{ borderRadius: '4px', overflow: 'hidden', background: '#fff', border: '1px solid rgba(15,36,56,.06)' }}>
                    <div className="catalog-skeleton" style={{ aspectRatio: '4/3' }} />
                    <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                      <div className="catalog-skeleton" style={{ height: '12px', width: '40%', borderRadius: '4px' }} />
                      <div className="catalog-skeleton" style={{ height: '18px', width: '80%', borderRadius: '4px' }} />
                      <div style={{ display: 'flex', gap: '.5rem', marginTop: '.25rem' }}>
                        <div className="catalog-skeleton" style={{ height: '36px', flex: 1, borderRadius: '4px' }} />
                        <div className="catalog-skeleton" style={{ height: '36px', width: '90px', borderRadius: '4px' }} />
                      </div>
                    </div>
                  </div>
                ))
              ) : products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={{ ...product, category: product.category?.name }} />
                ))
              ) : (
                <div className="catalog-empty">
                  <div className="catalog-empty-icon">◈</div>
                  <h3 className="catalog-empty-title">Aucun produit trouvé</h3>
                  <p className="catalog-empty-sub">Essayez une autre catégorie ou contactez-nous directement.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}