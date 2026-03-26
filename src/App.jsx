import { useState } from 'react'
import logo from './assets/logo.jpg'
import sarl from './assets/sarl.jpg'
import './index.css'

function App() {
  

  return (
    <>
    <h1 className="text-4xl text-green-500">Tailwind OK</h1>
    <img src={logo} alt="logo" className='logo-image' />
      <div className='container'>
        <img src={sarl} alt="logo" className='sarl-image'/>
        <h1>🚧 Under Maintenance</h1>
         <p>We are working on it...</p>
      </div>
    </>
  )
}

export default App
