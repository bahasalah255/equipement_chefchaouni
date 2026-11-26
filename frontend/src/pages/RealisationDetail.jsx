import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function RealisationDetail() {
  const { slug } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:8000/api/realisations/${encodeURIComponent(slug)}`)
      .then((response) => setItem(response.data))
      .catch(() => setItem(null))
      .finally(() => setLoading(false))
  }, [slug])

  return (
    <>
      <style>{`
        .rd-hero {
          position: relative;
          background: linear-gradient(135deg, #071526 0%, #0F2438 60%);
          padding: 2.5rem 2rem;
          overflow: hidden;
        }
        .rd-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,107,0,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,0,.04) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .rd-breadcrumb {
          position: relative; z-index: 2;
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; color: rgba(255,255,255,.5);
          letter-spacing: .08em; max-width: 1280px; margin: 0 auto;
          flex-wrap: wrap;
        }
        .rd-breadcrumb a { color: rgba(255,255,255,.5); text-decoration: none; transition: color .2s; }
        .rd-breadcrumb a:hover { color: #FF6B00; }
        .rd-breadcrumb-sep { color: rgba(255,255,255,.25); }
        .rd-breadcrumb-current { color: rgba(255,255,255,.85); font-weight: 700; }

        .rd-body {
          background: #F7F5F2;
          padding: 3.5rem 2rem 5rem;
        }
        .rd-body-inner {
          max-width: 900px; margin: 0 auto;
        }

        .rd-cover-wrap {
          width: 100%; border-radius: 4px; overflow: hidden;
          box-shadow: 0 20px 60px rgba(15,36,56,.15);
          margin-bottom: 2.5rem;
        }
        .rd-cover { width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block; }

        .rd-tag {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 800; letter-spacing: .2em;
          text-transform: uppercase; color: #FF6B00; margin-bottom: 1rem;
        }
        .rd-tag::before { content: ''; display: block; width: 24px; height: 2px; background: #FF6B00; border-radius: 2px; }

        .rd-title {
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          font-weight: 900; letter-spacing: -.04em; color: #0F2438;
          line-height: 1.08; margin: 0 0 1rem;
        }
        .rd-location {
          display: inline-flex; align-items: center; gap: .5rem;
          font-size: .9375rem; font-weight: 700; color: #FF6B00;
          margin-bottom: 1.5rem;
        }
        .rd-location::before { content: '◆'; font-size: .5rem; }
        .rd-divider { height: 1px; background: rgba(15,36,56,.08); margin: 1.5rem 0; }
        .rd-description {
          font-size: 1rem; line-height: 1.85; color: #6b6054;
          white-space: pre-wrap;
        }

        .rd-back-wrap { margin-top: 3rem; }
        .rd-back {
          display: inline-flex; align-items: center; gap: 10px;
          height: 48px; padding: 0 24px;
          background: #0F2438; color: #fff;
          font-size: .875rem; font-weight: 800;
          border-radius: 2px; text-decoration: none;
          transition: background .2s, transform .2s;
        }
        .rd-back:hover { background: #FF6B00; transform: translateY(-2px); }

        /* Skeleton */
        .rd-skeleton {
          background: linear-gradient(90deg, #f0ede8 25%, #e8e4de 50%, #f0ede8 75%);
          background-size: 400% 100%;
          animation: rd-shimmer 1.5s infinite;
          border-radius: 4px;
        }
        @keyframes rd-shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
      `}</style>

      {/* Breadcrumb bar */}
      <div className="rd-hero">
        <div className="rd-hero-grid" aria-hidden="true" />
        <nav className="rd-breadcrumb" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link>
          <span className="rd-breadcrumb-sep" aria-hidden="true">›</span>
          <Link to="/realisations">Réalisations</Link>
          <span className="rd-breadcrumb-sep" aria-hidden="true">›</span>
          <span className="rd-breadcrumb-current">{loading ? '…' : (item?.title ?? 'Réalisation introuvable')}</span>
        </nav>
      </div>

      {/* Body */}
      <div className="rd-body">
        <div className="rd-body-inner">
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="rd-skeleton" style={{ width: '100%', aspectRatio: '16/9', marginBottom: '.5rem' }} />
              <div className="rd-skeleton" style={{ height: '12px', width: '25%' }} />
              <div className="rd-skeleton" style={{ height: '48px', width: '80%' }} />
              <div className="rd-skeleton" style={{ height: '20px', width: '30%' }} />
              <div className="rd-skeleton" style={{ height: '1px', width: '100%' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                <div className="rd-skeleton" style={{ height: '16px', width: '100%' }} />
                <div className="rd-skeleton" style={{ height: '16px', width: '95%' }} />
                <div className="rd-skeleton" style={{ height: '16px', width: '88%' }} />
              </div>
            </div>
          ) : item ? (
            <>
              {item.cover && (
                <div className="rd-cover-wrap">
                  <img src={item.cover} alt={item.title} className="rd-cover" />
                </div>
              )}

              <div className="rd-tag">Réalisation</div>
              <h1 className="rd-title">{item.title}</h1>
              {item.location && <div className="rd-location">{item.location}</div>}

              <div className="rd-divider" />

              {item.description && (
                <p className="rd-description">{item.description}</p>
              )}

              <div className="rd-back-wrap">
                <Link to="/realisations" className="rd-back">
                  ← Retour aux réalisations
                </Link>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
              <div style={{ fontSize: '3rem', opacity: .2, marginBottom: '1rem' }}>◈</div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F2438', margin: '0 0 .5rem' }}>
                Réalisation introuvable
              </h2>
              <p style={{ color: '#8b8070', marginBottom: '1.5rem' }}>
                Cette réalisation n'existe pas ou a été retirée.
              </p>
              <Link to="/realisations" className="rd-back">← Retour aux réalisations</Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}