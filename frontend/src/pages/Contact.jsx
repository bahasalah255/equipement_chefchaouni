import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const INFO_ITEMS = [
  {
    icon: '◆',
    label: 'Adresse',
    value: '28, Rue De Buzancy, 20300 Casablanca, Maroc',
    href: 'https://maps.google.com/?q=28+Rue+De+Buzancy+Casablanca',
  },
  {
    icon: '☎',
    label: 'Téléphone',
    value: '0522 247 420',
    href: 'tel:+212522247420',
  },
  {
    icon: '✉',
    label: 'Email',
    value: 'contact@equipementchefchaouni.ma',
    href: 'mailto:contact@equipementchefchaouni.ma',
  },
  {
    icon: '◉',
    label: 'WhatsApp',
    value: '+212 522 247 420',
    href: 'https://wa.me/212522247420',
    whatsapp: true,
  },
]

const HOURS = [
  { day: 'Lundi – Vendredi', time: '08h00 – 18h00', open: true },
  { day: 'Samedi', time: '08h00 – 13h00', open: true },
  { day: 'Dimanche', time: 'Fermé', open: false },
]

export default function Contact() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setLoading(true)
    try {
      await axios.post('http://localhost:8000/api/contact-messages', {
        name: form.get('name'),
        email: form.get('email'),
        phone: form.get('phone'),
        subject: form.get('subject'),
        message: form.get('message'),
      })
      setStatus('success')
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
        .contact-reveal {
          opacity: 0;
          transform: translateY(24px);
          animation: contact-in 0.75s cubic-bezier(.16,.82,.28,1) forwards;
        }
        .contact-reveal.d1 { animation-delay: 0.1s; }
        .contact-reveal.d2 { animation-delay: 0.2s; }
        .contact-reveal.d3 { animation-delay: 0.3s; }
        @keyframes contact-in {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Hero */
        .contact-hero {
          position: relative;
          background: linear-gradient(135deg, #071526 0%, #0F2438 60%, #142f4a 100%);
          padding: 3.5rem 1.25rem 2.5rem;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .contact-hero { padding: 5rem 2rem 4rem; }
        }
        .contact-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,107,0,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,0,.05) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .contact-hero-glow {
          position: absolute;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255,107,0,.14) 0%, transparent 70%);
          border-radius: 50%;
          top: -150px; right: -100px;
        }
        .contact-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
        }
        .contact-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,.5);
          margin-bottom: 2rem;
          letter-spacing: .08em;
        }
        .contact-breadcrumb a { color: rgba(255,255,255,.5); text-decoration: none; transition: color .2s; }
        .contact-breadcrumb a:hover { color: #FF6B00; }
        .contact-breadcrumb-sep { color: rgba(255,255,255,.25); }
        .contact-breadcrumb-current { color: #FF6B00; }

        .contact-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: #FF6B00;
          margin-bottom: 1rem;
        }
        .contact-hero-tag::before { content: ''; display: block; width: 28px; height: 2px; background: #FF6B00; border-radius: 2px; }
        .contact-hero-title {
          font-size: clamp(1.75rem, 7vw, 3.5rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -.04em;
          color: #fff;
          margin: 0;
        }
        .contact-hero-title em { font-style: normal; color: #FF6B00; }
        .contact-hero-sub {
          font-size: 1rem;
          line-height: 1.75;
          color: rgba(255,255,255,.58);
          max-width: 500px;
          margin: 1rem 0 0;
        }

        /* Main layout */
        .contact-main {
          background: #F7F5F2;
          padding: 2.5rem 1.25rem 3rem;
        }
        @media (min-width: 640px) { .contact-main { padding: 3rem 1.5rem; } }
        @media (min-width: 1024px) { .contact-main { padding: 5rem 2rem; } }
        .contact-main-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .contact-main-inner { grid-template-columns: 1fr 1fr; gap: 4rem; }
        }

        /* Form */
        .contact-form-wrap {
          background: #fff;
          border: 1px solid rgba(15,36,56,.06);
          border-radius: 4px;
          padding: 1.5rem;
        }
        @media (min-width: 640px) { .contact-form-wrap { padding: 2.5rem; } }
        .contact-form-title {
          font-size: 1.375rem;
          font-weight: 900;
          color: #0F2438;
          letter-spacing: -.03em;
          margin: 0 0 .5rem;
        }
        .contact-form-sub {
          font-size: .875rem;
          color: #8b8070;
          margin: 0 0 2rem;
          line-height: 1.6;
        }
        .contact-field {
          margin-bottom: 1.5rem;
        }
        .contact-label {
          display: block;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: #6b6054;
          margin-bottom: .5rem;
        }
        .contact-input {
          width: 100%;
          height: 48px;
          border: none;
          border-bottom: 2px solid #e5e1db;
          background: transparent;
          outline: none;
          font-size: .9375rem;
          color: #0F2438;
          transition: border-color .2s;
          font-family: inherit;
          box-sizing: border-box;
        }
        .contact-input:focus { border-color: #FF6B00; }
        .contact-textarea {
          width: 100%;
          border: none;
          border-bottom: 2px solid #e5e1db;
          background: transparent;
          outline: none;
          font-size: .9375rem;
          color: #0F2438;
          resize: none;
          transition: border-color .2s;
          font-family: inherit;
          padding: .5rem 0;
          box-sizing: border-box;
        }
        .contact-textarea:focus { border-color: #FF6B00; }
        .contact-grid-2 { display: grid; grid-template-columns: 1fr; gap: 0; }
        @media (min-width: 480px) { .contact-grid-2 { grid-template-columns: 1fr 1fr; gap: 0 1.5rem; } }
        @media (max-width: 600px) { .contact-grid-2 { grid-template-columns: 1fr; } }

        .contact-submit {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: .5rem;
          height: 52px;
          padding: 0 32px;
          background: #FF6B00;
          color: #fff;
          font-size: .875rem;
          font-weight: 800;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: background .2s, transform .2s, box-shadow .2s;
          box-shadow: 0 4px 20px rgba(255,107,0,.3);
        }
        .contact-submit:hover:not(:disabled) { background: #e55e00; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(255,107,0,.4); }
        .contact-submit:disabled { opacity: .7; cursor: not-allowed; }

        .contact-status-success {
          margin-top: 1.25rem;
          border-left: 4px solid #22c55e;
          background: #f0fdf4;
          padding: .875rem 1rem;
          font-size: .875rem;
          font-weight: 600;
          color: #166534;
          border-radius: 0 2px 2px 0;
        }
        .contact-status-error {
          margin-top: 1.25rem;
          border-left: 4px solid #ef4444;
          background: #fef2f2;
          padding: .875rem 1rem;
          font-size: .875rem;
          font-weight: 600;
          color: #991b1b;
          border-radius: 0 2px 2px 0;
        }

        /* Info panel */
        .contact-info-panel {}
        .contact-section-tag {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: #FF6B00;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1rem;
        }
        .contact-section-tag::before { content: ''; display: block; width: 28px; height: 2px; background: #FF6B00; border-radius: 2px; }
        .contact-info-title {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 900;
          letter-spacing: -.035em;
          color: #0F2438;
          margin: 0 0 2rem;
          line-height: 1.1;
        }

        .contact-info-cards { display: flex; flex-direction: column; gap: 1rem; }
        .contact-info-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: #fff;
          border: 1px solid rgba(15,36,56,.06);
          border-radius: 4px;
          transition: transform .25s, box-shadow .25s;
          text-decoration: none;
          color: inherit;
        }
        .contact-info-card:hover { transform: translateX(4px); box-shadow: 0 8px 24px rgba(15,36,56,.08); }
        .contact-info-icon {
          width: 42px; height: 42px;
          border-radius: 50%;
          background: rgba(255,107,0,.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FF6B00;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .contact-info-label {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: #8b8070;
          margin-bottom: .25rem;
        }
        .contact-info-value {
          font-size: .9375rem;
          font-weight: 600;
          color: #0F2438;
          line-height: 1.4;
        }
        .contact-info-card.whatsapp .contact-info-value { color: #16a34a; }

        /* Hours */
        .contact-hours {
          margin-top: 1.5rem;
          background: #0F2438;
          border-radius: 4px;
          padding: 1.5rem;
          color: #fff;
        }
        .contact-hours-title {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #FF6B00;
          margin-bottom: 1rem;
        }
        .contact-hours-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: .5rem 0;
          border-bottom: 1px solid rgba(255,255,255,.06);
          font-size: .875rem;
        }
        .contact-hours-row:last-child { border-bottom: none; }
        .contact-hours-day { color: rgba(255,255,255,.6); }
        .contact-hours-time { font-weight: 700; }
        .contact-hours-time.open { color: #fff; }
        .contact-hours-time.closed { color: rgba(255,255,255,.35); }

        /* Map */
        .contact-map {
          background: #F7F5F2;
          padding: 0 2rem 5rem;
        }
        .contact-map-inner {
          max-width: 1280px;
          margin: 0 auto;
        }
        .contact-map-frame {
          width: 100%;
          height: 380px;
          border-radius: 4px;
          overflow: hidden;
          border: none;
          box-shadow: 0 20px 50px rgba(15,36,56,.12);
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="contact-hero-grid" aria-hidden="true" />
        <div className="contact-hero-glow" aria-hidden="true" />
        <div className="contact-hero-inner">
          {/* Breadcrumb */}
          <nav className="contact-breadcrumb contact-reveal" aria-label="Fil d'Ariane">
            <Link to="/">Accueil</Link>
            <span className="contact-breadcrumb-sep" aria-hidden="true">›</span>
            <span className="contact-breadcrumb-current">Contact</span>
          </nav>

          <div className="contact-hero-tag contact-reveal d1">Contactez-nous</div>
          <h1 id="contact-title" className="contact-hero-title contact-reveal d2">
            <br />
            <em>projet.</em>
          </h1>
          <p className="contact-hero-sub contact-reveal d3">
            Si vous avez une question ou une demande, n'hésitez pas à nous contacter.
          </p>
        </div>
      </section>

      {/* ── Main ── */}
      <section className="contact-main" aria-label="Formulaire et coordonnées">
        <div className="contact-main-inner">

          {/* Form */}
          <div className="contact-form-wrap">
            <h2 className="contact-form-title">Envoyez-nous un message</h2>
            <p className="contact-form-sub">
              Nous répondons sous 24 h les jours ouvrables.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="contact-grid-2">
                <label className="contact-field">
                  <span className="contact-label">Nom complet *</span>
                  <input name="name" required className="contact-input" placeholder="Votre nom" />
                </label>
                <label className="contact-field">
                  <span className="contact-label">Téléphone</span>
                  <input name="phone" type="tel" className="contact-input" placeholder="+212 …" />
                </label>
              </div>
              <label className="contact-field">
                <span className="contact-label">Email *</span>
                <input name="email" type="email" required className="contact-input" placeholder="votre@email.com" />
              </label>
              <label className="contact-field">
                <span className="contact-label">Sujet</span>
                <input name="subject" className="contact-input" placeholder="Objet de votre message" />
              </label>
              <label className="contact-field">
                <span className="contact-label">Message *</span>
                <textarea name="message" required rows={5} className="contact-textarea" placeholder="Décrivez votre besoin…" />
              </label>

              <button type="submit" className="contact-submit" disabled={loading}>
                {loading ? 'Envoi en cours…' : 'Envoyer le message'} {!loading && <span aria-hidden="true">→</span>}
              </button>

              {status === 'success' && (
                <div className="contact-status-success" role="status">
                  ✓ Votre message a bien été envoyé. Nous vous répondrons sous 24 h.
                </div>
              )}
              {status === 'error' && (
                <div className="contact-status-error" role="alert">
                  ✗ Impossible d'envoyer le message. Veuillez réessayer ou nous appeler directement.
                </div>
              )}
            </form>
          </div>

          {/* Info panel */}
          <div className="contact-info-panel">
            <div className="contact-section-tag">Nos coordonnées</div>
            <h2 className="contact-info-title">
              À Casablanca,<br />nous sommes proches.
            </h2>

            <div className="contact-info-cards">
              <a href="https://maps.google.com/?q=28+Rue+De+Buzancy+Casablanca" target="_blank" rel="noreferrer" className="contact-info-card">
                <div className="contact-info-icon">◆</div>
                <div>
                  <div className="contact-info-label">Adresse</div>
                  <div className="contact-info-value">28, Rue De Buzancy, 20300 Casablanca</div>
                </div>
              </a>
              <a href="tel:+212522247420" className="contact-info-card">
                <div className="contact-info-icon">☎</div>
                <div>
                  <div className="contact-info-label">Téléphone</div>
                  <div className="contact-info-value">0522 247 420</div>
                </div>
              </a>
              <a href="mailto:contact@equipementchefchaouni.ma" className="contact-info-card">
                <div className="contact-info-icon">✉</div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value">contact@equipementchefchaouni.ma</div>
                </div>
              </a>
              <a href="https://wa.me/212522247420" target="_blank" rel="noreferrer" className="contact-info-card whatsapp">
                <div className="contact-info-icon">◉</div>
                <div>
                  <div className="contact-info-label">WhatsApp</div>
                  <div className="contact-info-value">+212 522 247 420 — Réponse rapide</div>
                </div>
              </a>
            </div>

            {/* Hours */}
            <div className="contact-hours">
              <div className="contact-hours-title">Horaires d'ouverture</div>
              {HOURS.map((h) => (
                <div key={h.day} className="contact-hours-row">
                  <span className="contact-hours-day">{h.day}</span>
                  <span className={`contact-hours-time ${h.open ? 'open' : 'closed'}`}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="contact-map" aria-label="Localisation">
        <div className="contact-map-inner">
          <iframe
            className="contact-map-frame"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.2!2d-7.6189!3d33.5912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjgsIFJ1ZSBEZSBCdXphbmN5LCBDYXNhYmxhbmNh!5e0!3m2!1sfr!2sma!4v1"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation Équipement Chefchaouni — 28 Rue De Buzancy, Casablanca"
          />
        </div>
      </section>
    </>
  )
}