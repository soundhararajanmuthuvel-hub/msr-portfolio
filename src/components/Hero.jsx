import React from 'react'
import { motion } from 'framer-motion'
import heroPhoto from '../assets/hero.png'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
  },
}

const techStack = [
  { label: 'Shopify' },
  { label: 'WordPress' },
  { label: 'WooCommerce' },
  { label: 'Liquid' },
  { label: 'React' },
]

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Left Side */}
      <motion.div
        className="hero-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div className="hero-welcome-badge" variants={itemVariants}>
          <span className="emoji">👋</span>
          Welcome to my portfolio
        </motion.div>

        {/* Name */}
        <motion.h1 className="hero-name" variants={itemVariants}>
          Hi, I'm
          <span className="hero-name-gradient">Soundhararajan</span>
        </motion.h1>

        {/* Title */}
        <motion.h2 className="hero-title" variants={itemVariants}>
          I build high-converting eCommerce websites using Shopify & WordPress
        </motion.h2>

        {/* Subtitle */}
        <motion.p className="hero-subtitle" variants={itemVariants}>
          Crafting pixel-perfect digital storefronts that drive real sales — from concept to launch, with performance and design at the core.
        </motion.p>

        {/* Tech stack chips */}
        <motion.div className="hero-tech-stack" variants={itemVariants}>
          {techStack.map((tech) => (
            <div className="tech-chip" key={tech.label}>
              <span className="dot" />
              {tech.label}
            </div>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div className="hero-buttons" variants={itemVariants}>
          <motion.a
            href="#projects"
            className="btn-primary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>View My Work</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>

          <motion.a
            href="#contact"
            className="btn-secondary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Me
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Right Side — 3D Scene */}
      <motion.div
        className="hero-right"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
      >
        {/* Floating badge 1 */}
        <motion.div
          className="float-badge float-badge-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          ✦ eCommerce Expert
        </motion.div>

        {/* Photo Card */}
        <div className="scene-wrapper">
          <div className="scene-glass-card">
            {/* Glow layers */}
            <div className="scene-glow-bg" />
            <div className="scene-ring scene-ring-1" />
            <div className="scene-ring scene-ring-2" />

            {/* Hero Photo */}
            <motion.img
              src={heroPhoto}
              alt="Soundhararajan Muthuvel"
              className="hero-photo"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
            />

            {/* Info overlay */}
            <div className="scene-info-card">
              <h4>
                <span className="scene-status-dot" />
                eCommerce Developer
              </h4>
              <p>Building conversion-optimized storefronts with modern technologies.</p>
            </div>
          </div>
        </div>

        {/* Floating badge 2 */}
        <motion.div
          className="float-badge float-badge-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          ✓ 20+ Projects Delivered
        </motion.div>
      </motion.div>
    </section>
  )
}
