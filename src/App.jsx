import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Projects from './components/Projects'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="app">
      <div className="global-bg-glow" />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}
