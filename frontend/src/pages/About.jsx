import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import shopFront from '../assets/images/WhatsApp Image 2026-11-21 at 19.17.47.jpeg'
import shopInterior from '../assets/images/WhatsApp Image 2026-11-21 at 19.17.44 (1).jpeg'
import shop2 from '../assets/images/WhatsApp Image 2026-11-21 at 19.17.42.jpeg'
import shop3 from '../assets/images/WhatsApp Image 2026-11-21 at 19.17.43.jpeg'

/* ─── Data ───────────────────────────────────────────────────── */
const STATS = [
  { value: 15, suffix: '+', label: 'Années d\'expérience' },
  { value: 1500, suffix: '+', label: 'Références produits' },
  { value: 5000, suffix: '+', label: 'Clients satisfaits' },
  { value: 5, suffix: '', label: 'Domaines d\'activité' },
]

const ACTIVITIES = [
  {
    number: '01',
    title: 'Outillage professionnel',
    description: 'Outils à main, électroportatifs et équipements de travail de haute qualité.',
    
  },
  {
    number: '02',
    title: 'Quincaillerie',
    description: 'Accessoires, fixations, pièces et solutions d\'aménagement pour tous vos projets.',
    
  },
  {
    number: '03',
    title: 'Matériel électrique',
    description: 'Équipements et fournitures pour vos installations électriques.',
   
  },
  {
    number: '04',
    title: 'Sanitaire & plomberie',
    description: 'Appareils sanitaires, robinetterie et accessoires de qualité.',
 
  },
  {
    number: '05',
    title: 'Peinture',
    description: 'Produits et fournitures pour peinture et finition professionnelle.',

  },
]

const VALUES = [
  {
    title: 'Qualité',
    description: 'Des produits rigoureusement sélectionnés, adaptés aux exigences de vos projets les plus ambitieux.',
  },
  {
    title: 'Proximité',
    description: 'Une équipe à l\'écoute, disponible et engagée pour vous accompagner à chaque étape.',
  },
  {
    title: 'Confiance',
    description: 'Des relations durables fondées sur la transparence, l\'honnêteté et la parole tenue.',
  },
  {
    title: 'Expertise',
    description: 'Une connaissance approfondie des produits et du marché pour vous guider avec précision.',
  },
]

const REASONS = [
  'Une gamme diversifiée de produits professionnels.',
  'Des solutions pour les artisans et les particuliers.',
  'Un service de proximité au cœur de Casablanca.',
  'Un accompagnement personnalisé à chaque projet.',
]

/* ─── Counter Hook ───────────────────────────────────────────── */
function useCounter(target, duration, start) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

/* ─── Stat Card ──────────────────────────────────────────────── */
function StatCard({ stat, animate }) {
  const count = useCounter(stat.value, 1800, animate)
  return (
    <div className="about-stat-card">
      <div className="about-stat-number">
        {animate ? count : 0}{stat.suffix}
      </div>
      <div className="about-stat-label">{stat.label}</div>
    </div>
  )
}

/* ─── Component ──────────────────────────────────────────────── */
export default function About() {
  const statsRef = useRef(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  /* scroll-reveal */
  useEffect(() => {
    const els = document.querySelectorAll('.about-reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('about-visible') }),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <style>{`
        /* ── Reveal animation ── */
        .about-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.75s cubic-bezier(.16,.82,.28,1), transform 0.75s cubic-bezier(.16,.82,.28,1);
        }
        .about-reveal.delay-1 { transition-delay: 0.1s; }
        .about-reveal.delay-2 { transition-delay: 0.2s; }
        .about-reveal.delay-3 { transition-delay: 0.3s; }
        .about-reveal.delay-4 { transition-delay: 0.4s; }
        .about-reveal.delay-5 { transition-delay: 0.5s; }
        .about-reveal.about-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Hero ── */
        .about-hero {
          position: relative;
          min-height: 92vh;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #071526 0%, #0F2438 50%, #142f4a 100%);
          overflow: hidden;
        }
        .about-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,107,0,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,0,.06) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .about-hero-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255,107,0,.18) 0%, transparent 70%);
          border-radius: 50%;
          top: -100px;
          right: -100px;
          pointer-events: none;
        }
        .about-hero-inner {
          position: relative;
          z-index: 10;
          max-width: 1280px;
          margin: 0 auto;
          padding: 100px 2rem 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 1024px) {
          .about-hero-inner { grid-template-columns: 1fr; gap: 3rem; padding: 80px 1.5rem 60px; }
          .about-hero { min-height: auto; }
        }
        .about-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,107,0,.12);
          border: 1px solid rgba(255,107,0,.25);
          border-radius: 100px;
          padding: 6px 16px;
          color: #FF6B00;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .2em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          animation: about-hero-in 0.9s cubic-bezier(.16,.82,.28,1) both;
        }
        .about-hero-badge span {
          width: 6px; height: 6px; border-radius: 50%; background: #FF6B00;
          animation: pulse-dot 2s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
        .about-hero-title {
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 1.04;
          letter-spacing: -.045em;
          color: #fff;
          margin: 0 0 1.5rem;
          animation: about-hero-in 0.9s .1s cubic-bezier(.16,.82,.28,1) both;
        }
        .about-hero-title em {
          font-style: normal;
          color: #FF6B00;
        }
        .about-hero-sub {
          font-size: 1.0625rem;
          line-height: 1.75;
          color: rgba(255,255,255,.65);
          max-width: 480px;
          margin: 0 0 2.5rem;
          animation: about-hero-in 0.9s .18s cubic-bezier(.16,.82,.28,1) both;
        }
        .about-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: .75rem;
          animation: about-hero-in 0.9s .26s cubic-bezier(.16,.82,.28,1) both;
        }
        .about-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0 28px;
          height: 52px;
          background: #FF6B00;
          color: #fff;
          font-size: .875rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
          transition: background .2s, transform .2s, box-shadow .2s;
          text-decoration: none;
          border-radius: 2px;
          box-shadow: 0 4px 24px rgba(255,107,0,.35);
        }
        .about-btn-primary:hover { background: #e55e00; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(255,107,0,.45); }
        .about-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0 28px;
          height: 52px;
          background: transparent;
          color: rgba(255,255,255,.85);
          font-size: .875rem;
          font-weight: 700;
          border: 1px solid rgba(255,255,255,.2);
          cursor: pointer;
          transition: border-color .2s, color .2s, transform .2s;
          text-decoration: none;
          border-radius: 2px;
        }
        .about-btn-secondary:hover { border-color: #FF6B00; color: #FF6B00; transform: translateY(-2px); }

        /* Hero image stack */
        .about-hero-visual {
          position: relative;
          animation: about-hero-in 0.9s .35s cubic-bezier(.16,.82,.28,1) both;
        }
        .about-hero-img-main {
          width: 100%;
          aspect-ratio: 4/3;
          object-fit: cover;
          border-radius: 4px;
          box-shadow: 0 32px 80px rgba(0,0,0,.55);
        }
        .about-hero-img-float {
          position: absolute;
          bottom: -24px;
          left: -24px;
          width: 42%;
          aspect-ratio: 1;
          object-fit: cover;
          border: 4px solid #071526;
          border-radius: 4px;
          box-shadow: 0 16px 40px rgba(0,0,0,.45);
        }
        .about-hero-badge-float {
          position: absolute;
          top: -16px;
          right: -16px;
          background: #FF6B00;
          color: #fff;
          padding: 12px 20px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
          line-height: 1.4;
          box-shadow: 0 8px 24px rgba(255,107,0,.4);
        }
        @keyframes about-hero-in {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Stats Bar ── */
        .about-stats-bar {
          background: #fff;
          border-top: 3px solid #FF6B00;
          box-shadow: 0 4px 32px rgba(15,36,56,.08);
        }
        .about-stats-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 768px) { .about-stats-inner { grid-template-columns: repeat(2, 1fr); } }
        .about-stat-card {
          padding: 2.5rem 1.5rem;
          text-align: center;
          border-right: 1px solid #f0ede8;
          position: relative;
          transition: background .25s;
        }
        .about-stat-card:last-child { border-right: none; }
        .about-stat-card:hover { background: #fdf9f5; }
        .about-stat-number {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 900;
          color: #0F2438;
          letter-spacing: -.04em;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .about-stat-label {
          font-size: .75rem;
          font-weight: 700;
          color: #8b8070;
          letter-spacing: .12em;
          text-transform: uppercase;
          margin-top: .5rem;
        }

        /* ── Story ── */
        .about-story {
          background: #F7F5F2;
          padding: 7rem 2rem;
        }
        .about-story-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        @media (max-width: 1024px) {
          .about-story-inner { grid-template-columns: 1fr; gap: 3rem; }
          .about-story { padding: 4rem 1.5rem; }
        }
        .about-story-imgs {
          position: relative;
          padding-bottom: 2rem;
          padding-right: 2rem;
        }
        .about-story-img-1 {
          width: 100%;
          aspect-ratio: 4/3;
          object-fit: cover;
          border-radius: 4px;
          box-shadow: 0 20px 60px rgba(15,36,56,.18);
          position: relative;
          z-index: 2;
        }
        .about-story-img-2 {
          position: absolute;
          bottom: 0; right: 0;
          width: 50%;
          aspect-ratio: 1;
          object-fit: cover;
          border: 5px solid #F7F5F2;
          border-radius: 4px;
          z-index: 3;
          box-shadow: 0 12px 36px rgba(15,36,56,.2);
        }
        .about-story-accent {
          position: absolute;
          bottom: -8px;
          left: -8px;
          width: 55%;
          height: 55%;
          border: 2px solid #FF6B00;
          border-radius: 4px;
          z-index: 1;
          opacity: .45;
        }
        .about-story-text { max-width: 520px; }
        .about-section-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: #FF6B00;
          margin-bottom: 1.25rem;
        }
        .about-section-tag::before {
          content: '';
          display: block;
          width: 32px;
          height: 2px;
          background: #FF6B00;
          border-radius: 2px;
        }
        .about-section-title {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -.04em;
          color: #0F2438;
          margin: 0 0 1.5rem;
        }
        .about-story-body p {
          font-size: 1rem;
          line-height: 1.8;
          color: #6b6054;
          margin: 0 0 1rem;
        }
        .about-story-body p:last-child { margin-bottom: 0; }
        .about-story-body strong { color: #0F2438; font-weight: 700; }

        /* ── Activities ── */
        .about-activities {
          background: #071526;
          padding: 7rem 2rem;
          position: relative;
          overflow: hidden;
        }
        .about-activities::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,107,0,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,0,.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .about-activities-inner {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .about-activities-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2rem;
          margin-bottom: 3.5rem;
        }
        @media (max-width: 768px) { .about-activities-header { flex-direction: column; align-items: flex-start; } }
        .about-activities-title { color: #fff !important; }
        .about-activities-sub {
          font-size: .9375rem;
          line-height: 1.6;
          color: rgba(255,255,255,.5);
          max-width: 320px;
          flex-shrink: 0;
        }
        .about-activities-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1px;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 4px;
          overflow: hidden;
        }
        @media (max-width: 1024px) { .about-activities-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 640px) { .about-activities-grid { grid-template-columns: repeat(2, 1fr); } }
        .about-activity-card {
          background: rgba(255,255,255,.025);
          padding: 2rem 1.75rem;
          transition: background .25s;
          position: relative;
          overflow: hidden;
          cursor: default;
          min-height: 220px;
          display: flex;
          flex-direction: column;
        }
        .about-activity-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #FF6B00, transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .3s ease;
        }
        .about-activity-card:hover { background: rgba(255,107,0,.07); }
        .about-activity-card:hover::after { transform: scaleX(1); }
        .about-activity-num {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .2em;
          color: #FF6B00;
          margin-bottom: auto;
        }
        .about-activity-icon {
          font-size: 1.75rem;
          margin: 1.5rem 0 1rem;
          display: block;
        }
        .about-activity-title {
          font-size: .9375rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 .625rem;
          line-height: 1.3;
        }
        .about-activity-desc {
          font-size: .8125rem;
          line-height: 1.6;
          color: rgba(255,255,255,.45);
          margin: 0;
        }

        /* ── Mission / Vision ── */
        .about-mv {
          background: #fff;
          padding: 7rem 2rem;
        }
        .about-mv-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
        }
        @media (max-width: 768px) { .about-mv-inner { grid-template-columns: 1fr; } .about-mv { padding: 4rem 1.5rem; } }
        .about-mv-card {
          padding: 3.5rem;
          transition: transform .3s ease;
        }
        .about-mv-card:hover { transform: translateY(-4px); }
        .about-mv-card-mission {
          background: #0F2438;
          border-radius: 4px 0 0 4px;
        }
        .about-mv-card-vision {
          background: #F7F5F2;
          border-radius: 0 4px 4px 0;
        }
        @media (max-width: 768px) {
          .about-mv-card-mission { border-radius: 4px 4px 0 0; }
          .about-mv-card-vision { border-radius: 0 0 4px 4px; }
        }
        .about-mv-label {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .22em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .about-mv-card-mission .about-mv-label { color: rgba(255,107,0,.8); }
        .about-mv-card-vision .about-mv-label { color: #FF6B00; }
        .about-mv-line {
          width: 40px;
          height: 3px;
          border-radius: 2px;
          margin-bottom: 1.5rem;
        }
        .about-mv-card-mission .about-mv-line { background: #FF6B00; }
        .about-mv-card-vision .about-mv-line { background: #0F2438; }
        .about-mv-title {
          font-size: clamp(1.4rem, 2.5vw, 1.875rem);
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -.035em;
          margin: 0 0 1.25rem;
        }
        .about-mv-card-mission .about-mv-title { color: #fff; }
        .about-mv-card-vision .about-mv-title { color: #0F2438; }
        .about-mv-text { font-size: .9375rem; line-height: 1.75; }
        .about-mv-card-mission .about-mv-text { color: rgba(255,255,255,.58); }
        .about-mv-card-vision .about-mv-text { color: #6b6054; }

        /* ── Values ── */
        .about-values {
          background: #F7F5F2;
          padding: 7rem 2rem;
        }
        .about-values-inner { max-width: 1280px; margin: 0 auto; }
        .about-values-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: end;
          margin-bottom: 4rem;
        }
        @media (max-width: 768px) {
          .about-values-header { grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 2.5rem; }
          .about-values { padding: 4rem 1.5rem; }
        }
        .about-values-header-sub {
          font-size: 1rem;
          line-height: 1.7;
          color: #8b8070;
          max-width: 400px;
          align-self: end;
        }
        .about-values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) { .about-values-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .about-values-grid { grid-template-columns: 1fr; } }
        .about-value-card {
          background: #fff;
          padding: 2.5rem 2rem;
          border-radius: 4px;
          border: 1px solid rgba(15,36,56,.06);
          transition: transform .3s ease, box-shadow .3s ease;
          position: relative;
          overflow: hidden;
        }
        .about-value-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #FF6B00, #ff8c35);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .4s ease;
        }
        .about-value-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(15,36,56,.1); }
        .about-value-card:hover::before { transform: scaleX(1); }
        .about-value-icon {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: rgba(255,107,0,.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          font-size: 1.25rem;
          color: #FF6B00;
          font-weight: 900;
        }
        .about-value-title {
          font-size: 1.125rem;
          font-weight: 900;
          color: #0F2438;
          letter-spacing: -.02em;
          margin: 0 0 .75rem;
        }
        .about-value-desc {
          font-size: .875rem;
          line-height: 1.7;
          color: #8b8070;
          margin: 0;
        }

        /* ── CTA ── */
        .about-cta {
          position: relative;
          background: linear-gradient(135deg, #071526 0%, #0F2438 60%, #142f4a 100%);
          padding: 7rem 2rem;
          overflow: hidden;
        }
        .about-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,107,0,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,0,.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .about-cta-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255,107,0,.14) 0%, transparent 70%);
          border-radius: 50%;
          bottom: -150px;
          right: -100px;
          pointer-events: none;
        }
        .about-cta-inner {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
        }
        @media (max-width: 768px) {
          .about-cta-inner { flex-direction: column; align-items: flex-start; }
          .about-cta { padding: 4rem 1.5rem; }
        }
        .about-cta-text { max-width: 600px; }
        .about-cta-title {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -.04em;
          color: #fff;
          margin: 0 0 1.5rem;
        }
        .about-cta-title em { font-style: normal; color: #FF6B00; }
        .about-cta-list {
          list-style: none;
          margin: 0 0 2.5rem;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: .625rem;
        }
        @media (max-width: 480px) { .about-cta-list { grid-template-columns: 1fr; } }
        .about-cta-list li {
          display: flex;
          align-items: flex-start;
          gap: .625rem;
          font-size: .875rem;
          line-height: 1.6;
          color: rgba(255,255,255,.65);
        }
        .about-cta-list li::before {
          content: '✓';
          color: #FF6B00;
          font-weight: 900;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .about-cta-actions {
          display: flex;
          flex-direction: column;
          gap: .75rem;
          flex-shrink: 0;
          min-width: 240px;
        }
        .about-cta-btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 28px;
          height: 52px;
          background: #FF6B00;
          color: #fff;
          font-size: .875rem;
          font-weight: 800;
          border-radius: 2px;
          text-decoration: none;
          transition: background .2s, transform .2s, box-shadow .2s;
          box-shadow: 0 4px 24px rgba(255,107,0,.35);
        }
        .about-cta-btn-primary:hover { background: #e55e00; transform: translateY(-2px); }
        .about-cta-btn-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 28px;
          height: 52px;
          background: transparent;
          color: rgba(255,255,255,.85);
          font-size: .875rem;
          font-weight: 700;
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 2px;
          text-decoration: none;
          transition: border-color .2s, color .2s, transform .2s;
        }
        .about-cta-btn-secondary:hover { border-color: #FF6B00; color: #FF6B00; transform: translateY(-2px); }

        /* ── Mobile responsiveness additions ── */

        /* Hero inner — 768px */
        @media (max-width: 768px) {
          .about-hero-inner {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 80px 1.25rem 48px;
          }
        }

        /* Hero inner — 480px extra tightening */
        @media (max-width: 480px) {
          .about-hero-inner {
            padding: 80px 1.25rem 48px;
          }
          /* Hide floating image on small phones */
          .about-hero-img-float {
            display: none;
          }
          /* Hide floating badge on small phones */
          .about-hero-badge-float {
            display: none;
          }
          /* Hero title — tighter clamp */
          .about-hero-title {
            font-size: clamp(1.9rem, 8vw, 4rem);
          }
        }

        /* Stats bar — 480px: 2-col grid, reduced padding, border fix */
        @media (max-width: 480px) {
          .about-stats-inner {
            grid-template-columns: 1fr 1fr;
            padding: 0 1rem;
          }
          .about-stat-card {
            padding: 1.75rem 1rem;
          }
          /* Remove border-right on even cards (right column) in 2-col layout */
          .about-stat-card:nth-child(2n) {
            border-right: none;
          }
        }

        /* Story inner — 768px */
        @media (max-width: 768px) {
          .about-story-inner {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2.5rem 1.25rem;
          }
          .about-story-imgs {
            padding-bottom: 3rem;
            padding-right: 0;
          }
        }

        /* Story img-2 — 480px */
        @media (max-width: 480px) {
          .about-story-img-2 {
            width: 42%;
          }
        }

        /* Activities grid — 480px: single column */
        @media (max-width: 480px) {
          .about-activities-grid {
            grid-template-columns: 1fr;
          }
          .about-activity-card {
            min-height: 160px;
            padding: 1.5rem 1.25rem;
          }
        }

        /* Mission/Vision — gap fix + 640px card padding */
        .about-mv-inner { gap: 2px; }
        @media (max-width: 640px) {
          .about-mv-inner { gap: 2px; }
          .about-mv-card { padding: 2rem 1.5rem; }
        }

        /* Values grid — 480px already declared above; ensure single col */
        @media (max-width: 480px) {
          .about-values-grid {
            grid-template-columns: 1fr;
          }
        }

        /* CTA inner — mobile layout */
        @media (max-width: 480px) {
          .about-cta-inner {
            flex-direction: column;
            align-items: flex-start;
          }
          .about-cta-actions {
            width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .about-cta-btn-primary,
          .about-cta-btn-secondary {
            flex: 1;
            min-width: 140px;
          }
        }
      `}</style>

      <div>
        {/* ── Hero ── */}
        <section className="about-hero" aria-labelledby="about-title">
          <div className="about-hero-grid" aria-hidden="true" />
          <div className="about-hero-glow" aria-hidden="true" />

          <div className="about-hero-inner">
            {/* Left */}
            <div>
              
              <h1 id="about-title" className="about-hero-title">
                Votre partenaire en<br />
                <em>équipement professionnel.</em>
              </h1>
              <p className="about-hero-sub">
                Outillage, quincaillerie et fournitures techniques — nous
                accompagnons professionnels, artisans, entreprises du bâtiment
                et particuliers depuis plus de 15 ans.
              </p>
              <div className="about-hero-actions">
                <Link to="/produits" className="about-btn-primary">
                  Découvrir nos produits <span aria-hidden="true">→</span>
                </Link>
                <Link to="/contact" className="about-btn-secondary">
                  Nous contacter
                </Link>
              </div>
            </div>

            {/* Right — image stack */}
            <div className="about-hero-visual">
              <img
                src={shopFront}
                alt="Façade du magasin Équipement Chefchaouni à Casablanca"
                className="about-hero-img-main"
                fetchPriority="high"
              />
              <img
                src={shop2}
                alt="Intérieur du magasin"
                className="about-hero-img-float"
                loading="lazy"
              />
              <div className="about-hero-badge-float">
                Casablanca<br />Maroc
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <div className="about-stats-bar" ref={statsRef}>
          <div className="about-stats-inner">
            {STATS.map((stat) => (
              <StatCard key={stat.label} stat={stat} animate={statsVisible} />
            ))}
          </div>
        </div>

        {/* ── Our Story ── */}
        <section className="about-story" aria-labelledby="story-title">
          <div className="about-story-inner">
            <div className="about-story-imgs about-reveal">
              <img
                src={shopInterior}
                alt="Sélection d'outils et de fournitures dans le magasin"
                className="about-story-img-1"
                loading="lazy"
              />
              <img
                src={shop3}
                alt="Produits en magasin"
                className="about-story-img-2"
                loading="lazy"
              />
              <div className="about-story-accent" aria-hidden="true" />
            </div>

            <div className="about-story-text">
              <div className="about-section-tag about-reveal delay-1">Qui sommes-nous ?</div>
              <h2 id="story-title" className="about-section-title about-reveal delay-2">
                Des solutions fiables pour faire avancer vos projets.
              </h2>
              <div className="about-story-body about-reveal delay-3">
                <p>
                  <strong>Équipement Chefchaouni</strong> est spécialisée dans la commercialisation
                  d'outillage, de matériel électrique, de quincaillerie, d'équipements sanitaires
                  et de produits de peinture.
                </p>
                <p>
                  Implantée à Casablanca, notre entreprise accompagne les professionnels, les artisans,
                  les entreprises du bâtiment ainsi que les particuliers dans leurs besoins en
                  équipements, fournitures et solutions techniques.
                </p>
                <p>
                  Notre engagement : proposer des produits disponibles et de qualité, avec un service
                  attentif et des solutions adaptées aux besoins de chacun.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Activities ── */}
        <section className="about-activities" aria-labelledby="activities-title">
          <div className="about-activities-inner">
            <div className="about-activities-header">
              <div>
                <div className="about-section-tag about-reveal" style={{ color: '#FF6B00' }}>
                  Nos domaines d'activité
                </div>
                <h2
                  id="activities-title"
                  className="about-section-title about-activities-title about-reveal delay-1"
                >
                  Tout l'essentiel,<br />au service de vos chantiers.
                </h2>
              </div>
              <p className="about-activities-sub about-reveal delay-2">
                Une sélection de produits pour les travaux, l'installation et la finition — pour
                chaque corps de métier.
              </p>
            </div>

            <div className="about-activities-grid">
              {ACTIVITIES.map((activity, i) => (
                <article
                  key={activity.number}
                  className={`about-activity-card about-reveal delay-${i + 1}`}
                >
                  <span className="about-activity-num">{activity.number}</span>
                 
                  <h3 className="about-activity-title">{activity.title}</h3>
                  <p className="about-activity-desc">{activity.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mission / Vision ── */}
        <section className="about-mv" aria-label="Notre mission et notre vision">
          <div className="about-mv-inner">
            <article className="about-mv-card about-mv-card-mission about-reveal">
              <div className="about-mv-label">Notre mission</div>
              <div className="about-mv-line" />
              <h2 className="about-mv-title">Vous accompagner à chaque étape.</h2>
              <p className="about-mv-text">
                Fournir les équipements et fournitures nécessaires à la réalisation de vos projets,
                avec une gamme variée et un accompagnement adapté à vos besoins — des professionnels
                aux particuliers.
              </p>
            </article>
            <article className="about-mv-card about-mv-card-vision about-reveal delay-2">
              <div className="about-mv-label">Notre vision</div>
              <div className="about-mv-line" />
              <h2 className="about-mv-title">Être votre partenaire de référence.</h2>
              <p className="about-mv-text">
                Contribuer à devenir une référence au Maroc dans l'outillage, la quincaillerie et
                les équipements, grâce à une relation durable fondée sur la confiance, la qualité
                et le professionnalisme.
              </p>
            </article>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="about-values" aria-labelledby="values-title">
          <div className="about-values-inner">
            <div className="about-values-header">
              <div>
                <div className="about-section-tag about-reveal">Nos valeurs</div>
                <h2 id="values-title" className="about-section-title about-reveal delay-1">
                  Le sens de notre engagement.
                </h2>
              </div>
              <p className="about-values-header-sub about-reveal delay-2">
                Ces valeurs guident chacune de nos actions et définissent la relation que nous
                souhaitons construire avec nos clients.
              </p>
            </div>

            <div className="about-values-grid">
              {VALUES.map((value, i) => (
                <article key={value.title} className={`about-value-card about-reveal delay-${i + 1}`}>
                  
                  <h3 className="about-value-title">{value.title}</h3>
                  <p className="about-value-desc">{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="about-cta" aria-label="Rejoignez-nous">
          <div className="about-cta-glow" aria-hidden="true" />
          <div className="about-cta-inner">
            <div className="about-cta-text">
              <div className="about-section-tag about-reveal" style={{ color: '#FF6B00' }}>
                Équipement Chefchaouni
              </div>
              <h2 className="about-cta-title about-reveal delay-1">
                L'équipement qu'il vous faut,<br />
                <em>au service de vos projets.</em>
              </h2>
              <ul className="about-cta-list about-reveal delay-2">
                {REASONS.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </div>
            <div className="about-cta-actions about-reveal delay-3">
              <Link to="/produits" className="about-cta-btn-primary">
                Découvrir nos produits
              </Link>
              <Link to="/contact" className="about-cta-btn-secondary">
                Nous contacter
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
