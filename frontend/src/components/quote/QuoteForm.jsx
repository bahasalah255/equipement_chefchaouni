import PropTypes from 'prop-types'

export default function QuoteForm({ onSubmit, loading = false }) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <style>{`
        .qf-field { margin-bottom: 1.5rem; }
        .qf-label {
          display: block;
          font-size: 11px; font-weight: 800; letter-spacing: .16em;
          text-transform: uppercase; color: #6b6054; margin-bottom: .5rem;
        }
        .qf-input {
          width: 100%; height: 48px;
          border: none; border-bottom: 2px solid #e5e1db;
          background: transparent; outline: none;
          font-size: .9375rem; color: #0F2438;
          transition: border-color .2s; font-family: inherit;
          box-sizing: border-box;
        }
        .qf-input:focus { border-color: #FF6B00; }
        .qf-textarea {
          width: 100%;
          border: none; border-bottom: 2px solid #e5e1db;
          background: transparent; outline: none;
          font-size: .9375rem; color: #0F2438;
          resize: none; transition: border-color .2s;
          font-family: inherit; padding: .5rem 0; box-sizing: border-box;
        }
        .qf-textarea:focus { border-color: #FF6B00; }
        .qf-submit {
          display: inline-flex; align-items: center; gap: 10px;
          margin-top: .5rem; height: 52px; padding: 0 32px;
          background: #FF6B00; color: #fff;
          font-size: .875rem; font-weight: 800;
          border: none; border-radius: 2px; cursor: pointer;
          transition: background .2s, transform .2s, box-shadow .2s;
          box-shadow: 0 4px 20px rgba(255,107,0,.3);
          font-family: inherit;
        }
        .qf-submit:hover:not(:disabled) { background: #e55e00; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(255,107,0,.4); }
        .qf-submit:disabled { opacity: .7; cursor: not-allowed; transform: none; }
      `}</style>

      <label className="qf-field">
        <span className="qf-label">Nom complet *</span>
        <input name="name" required className="qf-input" placeholder="Votre nom" />
      </label>
      <label className="qf-field">
        <span className="qf-label">Téléphone *</span>
        <input name="phone" type="tel" required className="qf-input" placeholder="+212 …" />
      </label>
      <label className="qf-field">
        <span className="qf-label">Email *</span>
        <input name="email" type="email" required className="qf-input" placeholder="votre@email.com" />
      </label>
      <label className="qf-field">
        <span className="qf-label">Message / Précisions</span>
        <textarea name="message" rows={5} className="qf-textarea" placeholder="Décrivez votre besoin, les quantités souhaitées…" />
      </label>

      <button type="submit" className="qf-submit" disabled={loading}>
        {loading ? 'Envoi en cours…' : <>Envoyer ma demande <span aria-hidden="true">→</span></>}
      </button>
    </form>
  )
}

QuoteForm.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
}