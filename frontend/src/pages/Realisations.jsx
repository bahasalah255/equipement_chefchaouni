import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRealisations } from '../services/api.js'

export default function Realisations() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRealisations()
      .then((response) => setItems(response.data?.data ?? response.data ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <style>{`
        .real-reveal {
          opacity: 0;
          transform: translateY(24px);
          animation: real-in 0.75s cubic-bezier(.16,.82,.28,1) forwards;
        }
        .real-reveal.d1 { animation-delay: 0.1s; }
        .real-reveal.d2 { animation-delay: 0.2s; }
        @keyframes real-in { to { opacity: 1; transform: translateY(0); } }

        .real-hero {
          position: relative;
          background: linear-gradient(135deg, #071526 0%, #0F2438 60%, #142f4a 100%);
          padding: 3rem 1.25rem 2.5rem;
          overflow: hidden;
        }
        @media (min-width: 768px) { .real-hero { padding: 4.5rem 2rem 3.5rem; } }
        .real-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,107,0,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,0,.05) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .real-hero-glow {
          position: absolute; width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(255,107,0,.14) 0%, transparent 70%);
          border-radius: 50%; top: -100px; right: -60px;
        }
        .real-hero-inner {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto;
        }
        .real-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; color: rgba(255,255,255,.5);
          margin-bottom: 1.5rem; letter-spacing: .08em;
        }
        .real-breadcrumb a { color: rgba(255,255,255,.5); text-decoration: none; transition: color .2s; }
        .real-breadcrumb a:hover { color: #FF6B00; }
        .real-breadcrumb-sep { color: rgba(255,255,255,.25); }
        .real-breadcrumb-current { color: #FF6B00; }
        .real-hero-tag {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 800; letter-spacing: .2em;
          text-transform: uppercase; color: #FF6B00; margin-bottom: 1rem;
        }
        .real-hero-tag::before { content: ''; display: block; width: 28px; height: 2px; background: #FF6B00; border-radius: 2px; }
        .real-hero-title {
          font-size: clamp(1.75rem, 7vw, 3.25rem); font-weight: 900;
          line-height: 1.08; letter-spacing: -.04em; color: #fff; margin: 0;
        }
        .real-hero-title em { font-style: normal; color: #FF6B00; }
        .real-hero-sub {
          font-size: 1rem; line-height: 1.75; color: rgba(255,255,255,.58);
          max-width: 540px; margin: 1rem 0 0;
        }

        /* Gallery body */
        .real-body {
          background: #F7F5F2;
          padding: 2rem 1.25rem 3rem;
        }
        @media (min-width: 768px) { .real-body { padding: 4rem 2rem 6rem; } }
        .real-body-inner { max-width: 1280px; margin: 0 auto; }

        .real-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 480px) { .real-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .real-grid { grid-template-columns: repeat(3, 1fr); } }

        .real-card {
          display: block;
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          text-decoration: none;
          background: #fff;
          border: 1px solid rgba(15,36,56,.07);
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .real-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(15,36,56,.14); }

        .real-card-img-wrap {
          aspect-ratio: 4/3;
          overflow: hidden;
          background: #F7F5F2;
          position: relative;
        }
        .real-card-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform .5s ease;
          display: block;
        }
        .real-card:hover .real-card-img { transform: scale(1.06); }
        .real-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(7,21,38,.75) 0%, transparent 60%);
          opacity: 0; transition: opacity .3s;
        }
        .real-card:hover .real-card-overlay { opacity: 1; }
        .real-card-view {
          position: absolute; bottom: 1rem; right: 1rem;
          background: #FF6B00; color: #fff;
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          transform: translateY(10px); opacity: 0;
          transition: transform .3s, opacity .3s;
        }
        .real-card:hover .real-card-view { transform: translateY(0); opacity: 1; }

        .real-card-body { padding: 1.25rem 1.5rem; }
        .real-card-title {
          font-size: 1rem; font-weight: 800; color: #0F2438;
          letter-spacing: -.02em; margin: 0 0 .375rem; line-height: 1.3;
        }
        .real-card-loc {
          font-size: .8125rem; color: #8b8070; font-weight: 600;
          display: flex; align-items: center; gap: .375rem;
          margin: 0;
        }
        .real-card-loc::before { content: '◆'; color: #FF6B00; font-size: .5rem; }

        .real-card-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 2.5rem; opacity: .15;
        }

        /* Empty state */
        .real-empty {
          text-align: center; padding: 5rem 2rem;
          border: 2px dashed rgba(15,36,56,.1); border-radius: 4px; background: #fff;
        }
        .real-empty-icon { font-size: 3rem; margin-bottom: 1rem; opacity: .2; }
        .real-empty-title { font-size: 1.125rem; font-weight: 800; color: #0F2438; margin: 0 0 .5rem; }
        .real-empty-sub { font-size: .875rem; color: #8b8070; margin: 0; }

        /* Skeleton */
        .real-skeleton {
          background: linear-gradient(90deg, #f0ede8 25%, #e8e4de 50%, #f0ede8 75%);
          background-size: 400% 100%;
          animation: real-shimmer 1.5s infinite;
          border-radius: 4px;
        }
        @keyframes real-shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
      `}</style>

      {/* ── Hero ── */}
      <section className="real-hero" aria-labelledby="real-title">
        <div className="real-hero-grid" aria-hidden="true" />
        <div className="real-hero-glow" aria-hidden="true" />
        <div className="real-hero-inner">
          <nav className="real-breadcrumb real-reveal" aria-label="Fil d'Ariane">
            <Link to="/">Accueil</Link>
            <span className="real-breadcrumb-sep" aria-hidden="true">›</span>
            <span className="real-breadcrumb-current">Réalisations</span>
          </nav>
          <div className="real-hero-tag real-reveal d1">Nos réalisations</div>
          <h1 id="real-title" className="real-hero-title real-reveal d2">
            Des projets réalisés<br />
            <em>avec excellence.</em>
          </h1>
          <p className="real-hero-sub real-reveal d2">
            Découvrez quelques-unes de nos interventions et les équipements fournis pour des professionnels et des particuliers à Casablanca et au Maroc.
          </p>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="real-body" aria-label="Galerie des réalisations">
        <div className="real-body-inner">
          <div className="real-grid">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ borderRadius: '4px', overflow: 'hidden', background: '#fff', border: '1px solid rgba(15,36,56,.06)' }}>
                  <div className="real-skeleton" style={{ aspectRatio: '4/3' }} />
                  <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                    <div className="real-skeleton" style={{ height: '18px', width: '75%', borderRadius: '4px' }} />
                    <div className="real-skeleton" style={{ height: '12px', width: '40%', borderRadius: '4px' }} />
                  </div>
                </div>
              ))
            ) : items.length > 0 ? (
              items.map((item) => (
                <Link key={item.id} to={`/realisations/${item.slug}`} className="real-card">
                  <div className="real-card-img-wrap">
                    {item.cover ? (
                      <img src={item.cover} alt={item.title} className="real-card-img" loading="lazy" />
                    ) : (
                      <div className="real-card-placeholder" aria-hidden="true">◈</div>
                    )}
                    <div className="real-card-overlay" aria-hidden="true" />
                    <div className="real-card-view" aria-hidden="true">→</div>
                  </div>
                  <div className="real-card-body">
                    <h2 className="real-card-title">{item.title}</h2>
                    {item.location && <p className="real-card-loc">{item.location}</p>}
                  </div>
                </Link>
              ))
            ) : (
              <div className="real-empty" style={{ gridColumn: '1 / -1' }}>
                <div className="real-empty-icon">◈</div>
                <h3 className="real-empty-title">Aucune réalisation disponible</h3>
                <p className="real-empty-sub">Les projets seront publiés prochainement. Contactez-nous pour en savoir plus.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}