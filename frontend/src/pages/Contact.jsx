import { useState } from 'react'
import axios from 'axios'

export default function Contact() {
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    try {
      await axios.post('http://localhost:8000/api/contact-messages', {
        name: form.get('name'),
        email: form.get('email'),
        phone: form.get('phone'),
        subject: form.get('subject'),
        message: form.get('message'),
      })
      setMessage('Votre message a été envoyé.')
      event.currentTarget.reset()
    } catch {
      setMessage("Impossible d'envoyer le message pour le moment.")
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange">Contact</p>
      <h1 className="mt-3 text-2xl font-bold text-charcoal sm:text-3xl">Contact, carte et WhatsApp</h1>
      {message ? <p className="mt-6 rounded-2xl bg-orange/10 p-4 text-sm font-semibold">{message}</p> : null}
      <form onSubmit={handleSubmit} className="mt-6 grid max-w-2xl gap-3 sm:mt-8 sm:gap-4">
        <input className="rounded-xl border border-stone-200 px-4 py-3" name="name" placeholder="Nom complet" required />
        <input className="rounded-xl border border-stone-200 px-4 py-3" name="email" type="email" placeholder="Email" required />
        <input className="rounded-xl border border-stone-200 px-4 py-3" name="phone" placeholder="Téléphone" />
        <input className="rounded-xl border border-stone-200 px-4 py-3" name="subject" placeholder="Sujet" />
        <textarea className="min-h-36 rounded-xl border border-stone-200 px-4 py-3" name="message" placeholder="Votre message" required />
        <button className="w-fit rounded-md bg-orange px-6 py-3 text-sm font-semibold text-white" type="submit">Envoyer</button>
      </form>
    </section>
  )
}