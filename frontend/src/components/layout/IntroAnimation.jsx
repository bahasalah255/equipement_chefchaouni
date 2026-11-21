import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import screwImage from '../../assets/screw.png'
import logoImage from '../../assets/logo-intro.png'

export default function IntroAnimation({ onFinish }) {
  const [stage, setStage] = useState('enter')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const durations = reduceMotion
      ? { screw: 120, morph: 300, logo: 500, exit: 800 }
      : { screw: 850, morph: 2300, logo: 3200, exit: 4600 }

    const progressTimer = window.setInterval(() => {
      setProgress((current) => Math.min(current + 2, 100))
    }, 90)

    const screwTimer = window.setTimeout(() => setStage('screw'), durations.screw)
    const morphTimer = window.setTimeout(() => setStage('morph'), durations.morph)
    const logoTimer = window.setTimeout(() => setStage('logo'), durations.logo)
    const exitTimer = window.setTimeout(onFinish, durations.exit)

    return () => {
      window.clearInterval(progressTimer)
      window.clearTimeout(screwTimer)
      window.clearTimeout(morphTimer)
      window.clearTimeout(logoTimer)
      window.clearTimeout(exitTimer)
    }
  }, [onFinish])

  return (
    <div
      className={[
        'intro-animation fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#071526]',
        stage === 'logo' ? 'intro-logo-stage' : '',
        stage === 'morph' ? 'intro-morph-stage' : '',
      ].join(' ')}
      aria-label="Chargement Equipement Chefchaouni"
      role="status"
    >
      <div className="intro-noise" />
      <div className="intro-glow" />
      <div className="intro-ring intro-ring-one" />
      <div className="intro-ring intro-ring-two" />

      <div className="intro-screw-wrap">
        <img
          src={screwImage}
          alt="Vis Equipement Chefchaouni"
          className="intro-screw"
        />
      </div>

      <img
        src={logoImage}
        alt="Equipement Chefchaouni"
        className="intro-logo"
      />

      <div className="intro-loader" aria-hidden="true">
        <div className="intro-loader-track">
          <span style={{ width: `${progress}%` }} />
        </div>
        <p>Equipement Chefchaouni</p>
      </div>
    </div>
  )
}

IntroAnimation.propTypes = {
  onFinish: PropTypes.func.isRequired,
}
