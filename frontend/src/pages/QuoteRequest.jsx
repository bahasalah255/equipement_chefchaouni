import QuoteForm from '../components/quote/QuoteForm.jsx'
import { useQuote } from '../hooks/useQuote.js'
import { submitQuoteRequest } from '../services/api.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function QuoteRequest() {
  const { items, removeProduct, clearQuote } = useQuote()
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setLoading(true)
    try {
      await submitQuoteRequest({
        name: form.get('name'),
        phone: form.get('phone'),
        email: form.get('email'),
        message: form.get('message'),
        products: items,
      })
      setStatus('success')
      clearQuote()
      event.currentTarget.reset()
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        .quote-reveal {
          opacity: 0; transform: translateY(24px);
          animation: quote-in 0.75s cubic-bezier(.16,.82,.28,1) forwards;
        }
        .quote-reveal.d1 { animation-delay: 0.1s; }
        .quote-reveal.d2 { animation-delay: 0.2s; }
        @keyframes quote-in { to { opacity: 1; transform: translateY(0); } }

        .quote-hero {
          position: relative;
          background: linear-gradient(135deg, #071526 0%, #0F2438 60%, #142f4a 100%);
          padding: 3rem 1.25rem 2.5rem;
          overflow: hidden;
        }
        @media (min-width: 768px) { .quote-hero { padding: 4.5rem 2rem 3.5rem; } }
        .quote-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,107,0,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,0,.05) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .quote-hero-glow {
          position: absolute; width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(255,107,0,.14) 0%, transparent 70%);
          border-radius: 50%; top: -100px; right: -60px;
        }
        .quote-hero-inner {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto;
        }
        .quote-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; color: rgba(255,255,255,.5);
          margin-bottom: 1.5rem; letter-spacing: .08em;
        }
        .quote-breadcrumb a { color: rgba(255,255,255,.5); text-decoration: none; transition: color .2s; }
        .quote-breadcrumb a:hover { color: #FF6B00; }
        .quote-breadcrumb-sep { color: rgba(255,255,255,.25); }
        .quote-breadcrumb-current { color: #FF6B00; }
        .quote-hero-tag {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 800; letter-spacing: .2em;
          text-transform: uppercase; color: #FF6B00; margin-bottom: 1rem;
        }
        .quote-hero-tag::before { content: ''; display: block; width: 28px; height: 2px; background: #FF6B00; border-radius: 2px; }
        .quote-hero-title {
          font-size: clamp(1.75rem, 7vw, 3.25rem); font-weight: 900;
          line-height: 1.08; letter-spacing: -.04em; color: #fff; margin: 0;
        }
        .quote-hero-title em { font-style: normal; color: #FF6B00; }
        .quote-hero-sub {
          font-size: 1rem; line-height: 1.75; color: rgba(255,255,255,.58);
          max-width: 540px; margin: 1rem 0 0;
        }

        /* Body */
        .quote-body {
          background: #F7F5F2;
          padding: 2rem 1.25rem 3rem;
        }
        @media (min-width: 768px) { .quote-body { padding: 3.5rem 2rem 5rem; } }
        .quote-body-inner {
          max-width: 1280px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        @media (min-width: 1024px) { .quote-body-inner { grid-template-columns: 1fr 1fr; gap: 3.5rem; } }

        /* Products list */
        .quote-products-panel {
          background: #fff;
          border: 1px solid rgba(15,36,56,.07);
          border-radius: 4px;
          overflow: hidden;
        }
        .quote-products-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(15,36,56,.07);
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
          flex-wrap: wrap;
        }
        .quote-products-header-title {
          font-size: 1rem; font-weight: 900; color: #0F2438;
          letter-spacing: -.02em; margin: 0;
        }
        .quote-products-count {
          font-size: .8125rem; font-weight: 700;
          background: rgba(255,107,0,.1); color: #FF6B00;
          border-radius: 100px; padding: .2rem .75rem;
        }
        .quote-products-body { padding: 1rem 1.5rem; }
        .quote-product-row {
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
          padding: .875rem 0;
          border-bottom: 1px solid rgba(15,36,56,.05);
        }
        .quote-product-row:last-child { border-bottom: none; }
        .quote-product-name {
          font-size: .9375rem; font-weight: 700; color: #0F2438; margin: 0;
          flex: 1;
        }
        .quote-product-remove {
          background: none; border: none; cursor: pointer;
          font-size: .8125rem; font-weight: 700; color: #8b8070;
          padding: .25rem .5rem; border-radius: 2px;
          transition: color .2s, background .2s;
        }
        .quote-product-remove:hover { color: #ef4444; background: #fef2f2; }

        .quote-empty-products {
          padding: 2.5rem 1.5rem; text-align: center;
        }
        .quote-empty-icon { font-size: 2.5rem; opacity: .15; margin-bottom: .75rem; }
        .quote-empty-title { font-size: .9375rem; font-weight: 700; color: #0F2438; margin: 0 0 .375rem; }
        .quote-empty-sub { font-size: .8125rem; color: #8b8070; margin: 0 0 1.25rem; }
        .quote-empty-cta {
          display: inline-flex; align-items: center; gap: 8px;
          height: 42px; padding: 0 20px;
          background: #0F2438; color: #fff;
          font-size: .8125rem; font-weight: 800; border-radius: 2px;
          text-decoration: none; transition: background .2s;
        }
        .quote-empty-cta:hover { background: #FF6B00; }

        .quote-clear-btn {
          display: block; width: 100%;
          padding: .875rem;
          background: none; border: none; border-top: 1px solid rgba(15,36,56,.06);
          font-size: .8125rem; font-weight: 700; color: #8b8070;
          cursor: pointer; text-align: center; transition: color .2s, background .2s;
        }
        .quote-clear-btn:hover { color: #ef4444; background: #fef2f2; }

        /* Form panel */
        .quote-form-panel {
          background: #fff;
          border: 1px solid rgba(15,36,56,.07);
          border-radius: 4px;
          padding: 1.5rem;
        }
        @media (min-width: 640px) { .quote-form-panel { padding: 2rem; } }
        .quote-form-title {
          font-size: 1rem; font-weight: 900; color: #0F2438;
          letter-spacing: -.02em; margin: 0 0 .375rem;
        }
        .quote-form-sub { font-size: .875rem; color: #8b8070; margin: 0 0 1.75rem; line-height: 1.6; }

        .quote-status-success {
          margin-bottom: 1.25rem;
          border-left: 4px solid #22c55e; background: #f0fdf4;
          padding: .875rem 1rem; font-size: .875rem; font-weight: 600; color: #166534;
          border-radius: 0 2px 2px 0;
        }
        .quote-status-error {
          margin-bottom: 1.25rem;
          border-left: 4px solid #ef4444; background: #fef2f2;
          padding: .875rem 1rem; font-size: .875rem; font-weight: 600; color: #991b1b;
          border-radius: 0 2px 2px 0;
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="quote-hero" aria-labelledby="quote-title">
        <div className="quote-hero-grid" aria-hidden="true" />
        <div className="quote-hero-glow" aria-hidden="true" />
        <div className="quote-hero-inner">
          <nav className="quote-breadcrumb quote-reveal" aria-label="Fil d'Ariane">
            <Link to="/">Accueil</Link>
            <span className="quote-breadcrumb-sep" aria-hidden="true">›</span>
            <span className="quote-breadcrumb-current">Demande de devis</span>
          </nav>
          <div className="quote-hero-tag quote-reveal d1">Devis gratuit</div>
          <h1 id="quote-title" className="quote-hero-title quote-reveal d2">
            Votre demande de<br />
            <em>devis personnalisé.</em>
          </h1>
          <p className="quote-hero-sub quote-reveal d2">
            Ajoutez les produits souhaités et envoyez-nous votre demande. Notre équipe vous répondra rapidement avec une offre adaptée.
          </p>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="quote-body" aria-label="Formulaire de devis">
        <div className="quote-body-inner">

          {/* Products list */}
          <div>
            <div className="quote-products-panel">
              <div className="quote-products-header">
                <h2 className="quote-products-header-title">Produits sélectionnés</h2>
                {items.length > 0 && (
                  <span className="quote-products-count">{items.length} produit{items.length !== 1 ? 's' : ''}</span>
                )}
              </div>

              {items.length > 0 ? (
                <>
                  <div className="quote-products-body">
                    {items.map((item) => (
                      <div key={item.id ?? item.slug} className="quote-product-row">
                        <p className="quote-product-name">{item.name}</p>
                        <button
                          type="button"
                          onClick={() => removeProduct(item.id ?? item.slug)}
                          className="quote-product-remove"
                          aria-label={`Retirer ${item.name}`}
                        >
                          Retirer
                        </button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={clearQuote} className="quote-clear-btn">
                    Vider la liste
                  </button>
                </>
              ) : (
                <div className="quote-empty-products">
                  <div className="quote-empty-icon" aria-hidden="true">◈</div>
                  <h3 className="quote-empty-title">Aucun produit ajouté</h3>
                  <p className="quote-empty-sub">Parcourez notre catalogue et ajoutez les produits qui vous intéressent.</p>
                  <Link to="/produits" className="quote-empty-cta">
                    Voir le catalogue →
                  </Link>
                </div>
              )}
            </div>

            {/* Info box */}
            <div style={{
              marginTop: '1.5rem',
              background: '#0F2438', borderRadius: '4px', padding: '1.5rem',
            }}>
              <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '.18em', textTransform: 'uppercase', color: '#FF6B00', margin: '0 0 .75rem' }}>
                Devis sous 24h
              </p>
              <p style={{ fontSize: '.875rem', color: 'rgba(255,255,255,.6)', margin: '0 0 1rem', lineHeight: 1.6 }}>
                Vous pouvez aussi nous contacter directement par téléphone ou WhatsApp.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                <a href="tel:+212522247420" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '.875rem', fontWeight: 700, color: '#fff', textDecoration: 'none' }}>
                  <span style={{ color: '#FF6B00' }}>☎</span> 0522 247 420
                </a>
                <a href="https://wa.me/212522247420" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '.875rem', fontWeight: 700, color: '#4ade80', textDecoration: 'none' }}>
                  <span>◉</span> WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="quote-form-panel">
            <h2 className="quote-form-title">Vos informations</h2>
            <p className="quote-form-sub">Remplissez le formulaire et nous vous recontacterons sous 24 h.</p>

            {status === 'success' && (
              <div className="quote-status-success" role="status">
                ✓ Votre demande a bien été envoyée. Nous vous contacterons rapidement.
              </div>
            )}
            {status === 'error' && (
              <div className="quote-status-error" role="alert">
                ✗ Impossible d'envoyer la demande. Veuillez réessayer ou nous appeler.
              </div>
            )}

            <QuoteForm onSubmit={handleSubmit} loading={loading} />
          </div>
        </div>
      </section>
    </>
  )
}