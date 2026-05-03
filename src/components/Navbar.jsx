import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      style={{
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      {/* Logo */}
      <a href="#hero" className="navbar-logo">
        <div className="navbar-logo-icon">⬡</div>
        <span>SM</span>
      </a>

      {/* Links */}
      <ul className="navbar-links">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <motion.a
        href="#contact"
        className="navbar-cta"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.1 2.92 2 2 0 012.08 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.44-.44a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
        Hire Me
      </motion.a>
    </motion.nav>
  )
}
