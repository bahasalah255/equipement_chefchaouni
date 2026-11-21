import PropTypes from 'prop-types'
import Input from '../ui/Input.jsx'

export default function QuoteForm({ onSubmit }) {
  return (
    <form className="space-y-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-soft sm:p-6" onSubmit={onSubmit}>
      <Input label="Nom complet" name="name" placeholder="Votre nom" required />
      <Input label="Téléphone" name="phone" placeholder="Votre téléphone" required />
      <Input label="Email" name="email" type="email" placeholder="Votre email" required />
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-stone-700">Message</span>
        <textarea
          name="message"
          rows="5"
          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
          placeholder="Décrivez votre besoin"
        />
      </label>
      <button type="submit" className="rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
        Envoyer ma demande
      </button>
    </form>
  )
}

QuoteForm.propTypes = {
  onSubmit: PropTypes.func,
}