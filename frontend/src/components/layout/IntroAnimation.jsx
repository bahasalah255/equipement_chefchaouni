import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import screwImage from '../../assets/screw.png'
import logoImage from '../../assets/logo-intro.png'

/*
  Stages:
  0 → "idle"   : black screen, nothing visible
  1 → "line"   : horizontal loading line sweeps in from left
  2 → "screw"  : screw drops from top with physics bounce
  3 → "logo"   : logo fades in, screw fades out
  4 → "hold"   : brief hold on logo + brand name
  5 → "exit"   : whole overlay splits (top/bottom curtain) revealing the site
*/

export default function IntroAnimation({ onFinish }) {
  const [stage, setStage] = useState(0)
  const [lineWidth, setLineWidth] = useState(0)
  const lineRaf = useRef(null)
  const lineStart = useRef(null)

  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Fast-track if user prefers reduced motion
  const D = reduceMotion
    ? { line: 100, screw: 200, logo: 350, hold: 600, exit: 900 }
    : { line: 900, screw: 1600, logo: 2400, hold: 3100, exit: 3700 }

  useEffect(() => {
    // Animate the line width from 0 → 100% over D.line ms
    const animateLine = (timestamp) => {
      if (!lineStart.current) lineStart.current = timestamp
      const elapsed = timestamp - lineStart.current
      const pct = Math.min((elapsed / D.line) * 100, 100)
      setLineWidth(pct)
      if (pct < 100) {
        lineRaf.current = requestAnimationFrame(animateLine)
      }
    }
    lineRaf.current = requestAnimationFrame(animateLine)

    const t1 = setTimeout(() => setStage(1), 0)
    const t2 = setTimeout(() => setStage(2), D.screw)
    const t3 = setTimeout(() => setStage(3), D.logo)
    const t4 = setTimeout(() => setStage(4), D.hold)
    const t5 = setTimeout(() => setStage(5), D.exit)
    const t6 = setTimeout(onFinish, D.exit + 700)

    return () => {
      cancelAnimationFrame(lineRaf.current)
      ;[t1, t2, t3, t4, t5, t6].forEach(clearTimeout)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const exiting = stage >= 5

  return (
    <div
      role="status"
      aria-label="Chargement Équipement Chefchaouni"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        pointerEvents: exiting ? 'none' : 'all',
      }}
    >
      {/* ── Top curtain ── */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '50%',
          background: '#071526',
          transform: exiting ? 'translateY(-100%)' : 'translateY(0)',
          transition: exiting ? 'transform 0.75s cubic-bezier(.76,0,.24,1)' : 'none',
        }}
      />

      {/* ── Bottom curtain ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '50%',
          background: '#071526',
          transform: exiting ? 'translateY(100%)' : 'translateY(0)',
          transition: exiting ? 'transform 0.75s cubic-bezier(.76,0,.24,1)' : 'none',
        }}
      />

      {/* ── Centre stage (always dark, hidden by curtains while exiting) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: exiting ? 0 : 1,
          transition: exiting ? 'opacity 0.3s ease' : 'none',
        }}
      >
        {/* Subtle radial glow */}
        <div style={{
          position: 'absolute',
          width: 480, height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,.13) 0%, transparent 68%)',
          filter: 'blur(8px)',
          animation: 'intro-pulse 3s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        {/* Fine grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,107,0,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,0,.035) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        {/* ── Screw ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: 'min(140px, 28vw)',
            opacity: stage >= 2 && stage < 4 ? 1 : 0,
            transform: stage >= 2 && stage < 4
              ? 'translateY(0) rotate(0deg) scale(1)'
              : stage < 2
                ? 'translateY(-55vh) rotate(-25deg) scale(0.6)'
                : 'translateY(8px) scale(0.5) rotate(540deg)',
            transition: stage >= 2 && stage < 4
              ? 'opacity 0.5s ease, transform 0.9s cubic-bezier(.17,.84,.44,1)'
              : 'opacity 0.4s ease, transform 0.5s ease',
            filter: 'drop-shadow(0 28px 32px rgba(0,0,0,.55))',
          }}
        >
          <img src={screwImage} alt="" style={{ width: '100%', display: 'block' }} />
        </div>

        {/* ── Logo ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: 'min(280px, 55vw)',
            opacity: stage >= 3 ? 1 : 0,
            transform: stage >= 3
              ? 'scale(1) translateY(0)'
              : 'scale(0.88) translateY(12px)',
            transition: 'opacity 0.65s ease, transform 0.65s cubic-bezier(.16,.82,.28,1)',
            filter: 'drop-shadow(0 16px 32px rgba(0,0,0,.45))',
          }}
        >
          <img src={logoImage} alt="Équipement Chefchaouni" style={{ width: '100%', display: 'block' }} />
        </div>

        {/* ── Brand name ── */}
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(50% - 120px)',
            opacity: stage >= 3 ? 1 : 0,
            transform: stage >= 3 ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.65s 0.2s ease, transform 0.65s 0.2s ease',
            textAlign: 'center',
          }}
        >
          <p style={{
            fontSize: 'clamp(10px, 1.6vw, 13px)',
            fontWeight: 800,
            letterSpacing: '.28em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,.45)',
            margin: 0,
            fontFamily: 'Archivo, Inter, ui-sans-serif, sans-serif',
          }}>
            Équipement Chefchaouni
          </p>
        </div>

        {/* ── Loading bar ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 44,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(260px, 58vw)',
            opacity: stage >= 4 ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        >
          <div style={{
            height: 2,
            background: 'rgba(255,255,255,.1)',
            borderRadius: 999,
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${lineWidth}%`,
              background: 'linear-gradient(90deg, #FF6B00, #ff9d4d)',
              borderRadius: 999,
              boxShadow: '0 0 14px rgba(255,107,0,.7)',
              transition: 'width 80ms linear',
            }} />
          </div>
          <p style={{
            marginTop: 10,
            color: 'rgba(255,255,255,.35)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '.22em',
            textTransform: 'uppercase',
            textAlign: 'center',
            fontFamily: 'Archivo, Inter, ui-sans-serif, sans-serif',
          }}>
            Chargement…
          </p>
        </div>
      </div>

      <style>{`
        @keyframes intro-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}

IntroAnimation.propTypes = {
  onFinish: PropTypes.func.isRequired,
}
