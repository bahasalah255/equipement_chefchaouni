import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProductBySlug } from '../services/api.js'
import { useQuote } from '../hooks/useQuote.js'

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addProduct, hasProduct } = useQuote()

  useEffect(() => {
    setLoading(true)
    getProductBySlug(slug)
      .then((response) => setProduct(response.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [slug])

  const isAdded = product ? hasProduct(product.id ?? product.slug) : false

  return (
    <>
      <style>{`
        .pd-hero {
          position: relative;
          background: linear-gradient(135deg, #071526 0%, #0F2438 60%);
          padding: 2.5rem 2rem;
          overflow: hidden;
        }
        .pd-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,107,0,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,0,.04) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .pd-breadcrumb {
          position: relative; z-index: 2;
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; color: rgba(255,255,255,.5);
          letter-spacing: .08em; max-width: 1280px; margin: 0 auto;
        }
        .pd-breadcrumb a { color: rgba(255,255,255,.5); text-decoration: none; transition: color .2s; }
        .pd-breadcrumb a:hover { color: #FF6B00; }
        .pd-breadcrumb-sep { color: rgba(255,255,255,.25); }
        .pd-breadcrumb-current { color: rgba(255,255,255,.85); font-weight: 700; }

        .pd-body {
          background: #F7F5F2;
          padding: 3.5rem 2rem 5rem;
        }
        .pd-body-inner {
          max-width: 1280px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 1024px) { .pd-body-inner { grid-template-columns: 1fr; gap: 2.5rem; } .pd-body { padding: 2.5rem 1.5rem 4rem; } }

        /* Image panel */
        .pd-image-wrap {
          position: sticky;
          top: 110px;
        }
        .pd-image-main {
          width: 100%; aspect-ratio: 1;
          background: #fff;
          border: 1px solid rgba(15,36,56,.07);
          border-radius: 4px;
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .pd-image-main img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s ease;
        }
        .pd-image-main:hover img { transform: scale(1.04); }
        .pd-image-placeholder {
          font-size: 4rem; opacity: .15;
        }

        /* Info panel */
        .pd-category-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 800; letter-spacing: .2em;
          text-transform: uppercase; color: #FF6B00; margin-bottom: 1rem;
        }
        .pd-category-tag::before { content: ''; display: block; width: 24px; height: 2px; background: #FF6B00; border-radius: 2px; }

        .pd-title {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 900; letter-spacing: -.04em; color: #0F2438;
          line-height: 1.08; margin: 0 0 .75rem;
        }
        .pd-brand {
          font-size: .9375rem; color: #8b8070; font-weight: 600; margin: 0 0 1.5rem;
        }

        .pd-divider { height: 1px; background: rgba(15,36,56,.08); margin: 1.5rem 0; }

        .pd-price {
          font-size: 2rem; font-weight: 900; color: #FF6B00;
          letter-spacing: -.04em; margin: 0 0 1.5rem;
        }

        .pd-description {
          font-size: .9375rem; line-height: 1.8; color: #6b6054;
          margin: 0 0 2rem;
        }

        .pd-actions {
          display: flex; flex-wrap: wrap; gap: .75rem; margin-bottom: 2rem;
        }
        .pd-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          height: 52px; padding: 0 28px;
          background: #FF6B00; color: #fff;
          font-size: .875rem; font-weight: 800;
          border: none; border-radius: 2px; cursor: pointer;
          transition: background .2s, transform .2s, box-shadow .2s;
          box-shadow: 0 4px 20px rgba(255,107,0,.3);
        }
        .pd-btn-primary:hover:not(:disabled) { background: #e55e00; transform: translateY(-2px); }
        .pd-btn-primary:disabled { background: #e5e1db; color: #8b8070; cursor: not-allowed; box-shadow: none; }
        .pd-btn-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          height: 52px; padding: 0 28px;
          background: transparent; color: #0F2438;
          font-size: .875rem; font-weight: 700;
          border: 1px solid rgba(15,36,56,.2); border-radius: 2px;
          text-decoration: none;
          transition: border-color .2s, color .2s, transform .2s;
        }
        .pd-btn-secondary:hover { border-color: #FF6B00; color: #FF6B00; transform: translateY(-2px); }

        /* Contact CTA */
        .pd-contact-box {
          background: #0F2438;
          border-radius: 4px;
          padding: 1.5rem;
          display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
        }
        .pd-contact-box-text { flex: 1; }
        .pd-contact-box-title { font-size: .9375rem; font-weight: 800; color: #fff; margin: 0 0 .25rem; }
        .pd-contact-box-sub { font-size: .8125rem; color: rgba(255,255,255,.55); margin: 0; line-height: 1.5; }
        .pd-contact-box-btn {
          display: inline-flex; align-items: center; gap: 8px;
          height: 42px; padding: 0 20px;
          background: #FF6B00; color: #fff;
          font-size: .8125rem; font-weight: 800;
          border-radius: 2px; text-decoration: none;
          white-space: nowrap; transition: background .2s;
          flex-shrink: 0;
        }
        .pd-contact-box-btn:hover { background: #e55e00; }

        /* Skeleton */
        .pd-skeleton {
          background: linear-gradient(90deg, #f0ede8 25%, #e8e4de 50%, #f0ede8 75%);
          background-size: 400% 100%;
          animation: pd-shimmer 1.5s infinite;
          border-radius: 4px;
        }
        @keyframes pd-shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
      `}</style>

      {/* Breadcrumb hero bar */}
      <div className="pd-hero" aria-label="Navigation">
        <div className="pd-hero-grid" aria-hidden="true" />
        <nav className="pd-breadcrumb" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link>
          <span className="pd-breadcrumb-sep" aria-hidden="true">›</span>
          <Link to="/produits">Produits</Link>
          <span className="pd-breadcrumb-sep" aria-hidden="true">›</span>
          <span className="pd-breadcrumb-current">{loading ? '…' : (product?.name ?? 'Produit introuvable')}</span>
        </nav>
      </div>

      {/* Body */}
      <div className="pd-body">
        <div className="pd-body-inner">
          {/* Image */}
          <div className="pd-image-wrap">
            <div className="pd-image-main">
              {loading ? (
                <div className="pd-skeleton" style={{ width: '100%', height: '100%', borderRadius: '4px' }} />
              ) : product?.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <span className="pd-image-placeholder" aria-hidden="true">◈</span>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="pd-skeleton" style={{ height: '12px', width: '30%' }} />
                <div className="pd-skeleton" style={{ height: '48px', width: '90%' }} />
                <div className="pd-skeleton" style={{ height: '20px', width: '40%' }} />
                <div className="pd-skeleton" style={{ height: '1px', width: '100%' }} />
                <div className="pd-skeleton" style={{ height: '80px', width: '100%' }} />
                <div className="pd-skeleton" style={{ height: '52px', width: '60%' }} />
              </div>
            ) : product ? (
              <>
                {product.category && (
                  <div className="pd-category-tag">{product.category?.name ?? product.category}</div>
                )}
                <h1 className="pd-title">{product.name}</h1>
                {product.brand && <p className="pd-brand">Marque : <strong style={{ color: '#0F2438' }}>{product.brand}</strong></p>}

                <div className="pd-divider" />

                {product.price && (
                  <p className="pd-price">{Number(product.price).toLocaleString('fr-MA')} DH</p>
                )}

                {product.description && (
                  <p className="pd-description">{product.description}</p>
                )}

                <div className="pd-actions">
                  <button
                    type="button"
                    onClick={() => addProduct(product)}
                    disabled={isAdded}
                    className="pd-btn-primary"
                  >
                    {isAdded ? '✓ Ajouté à la demande' : '+ Ajouter à ma demande'}
                  </button>
                  <Link to="/devis" className="pd-btn-secondary">
                    Voir mon devis
                  </Link>
                </div>

                <div className="pd-divider" />

                {/* Contact box */}
                <div className="pd-contact-box">
                  <div className="pd-contact-box-text">
                    <p className="pd-contact-box-title">Besoin d'un conseil ?</p>
                    <p className="pd-contact-box-sub">Notre équipe répond à toutes vos questions.</p>
                  </div>
                  <a href="tel:+212522247420" className="pd-contact-box-btn">
                    ☎ 0522 247 420
                  </a>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <div style={{ fontSize: '3rem', opacity: .2, marginBottom: '1rem' }}>◈</div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F2438', margin: '0 0 .5rem' }}>Produit introuvable</h2>
                <p style={{ color: '#8b8070', marginBottom: '1.5rem' }}>Ce produit n'existe pas ou a été retiré du catalogue.</p>
                <Link to="/produits" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  height: '48px', padding: '0 24px',
                  background: '#FF6B00', color: '#fff',
                  fontSize: '.875rem', fontWeight: 800, borderRadius: '2px', textDecoration: 'none',
                }}>
                  ← Retour au catalogue
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}