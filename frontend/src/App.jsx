import AppRouter from './router.jsx'
import { QuoteProvider } from './context/QuoteContext.jsx'
import IntroAnimation from './components/layout/IntroAnimation.jsx'
import { useState } from 'react'

export default function App() {
  const [introVisible, setIntroVisible] = useState(true)

  return (
    <QuoteProvider>
      {introVisible ? <IntroAnimation onFinish={() => setIntroVisible(false)} /> : null}
      <AppRouter />
    </QuoteProvider>
  )
}
