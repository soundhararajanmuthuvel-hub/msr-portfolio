import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    icon: '🛍️',
    title: 'Shopify Store Development',
    desc: 'End-to-end Shopify store creation — from custom Liquid themes to full-featured storefronts that convert visitors into buyers.',
    features: [
      'Custom Liquid theme development',
      'Shopify Plus expertise',
      'Third-party app integrations',
      'Payment gateway setup',
      'Performance optimization',
      'Mobile-first responsive design',
    ],
    gradient: 'linear-gradient(135deg, #1a0533 0%, #0d1030 100%)',
  },
  {
    icon: '🌐',
    title: 'WordPress Website Development',
    desc: 'Blazing-fast, SEO-optimized WordPress sites and WooCommerce stores tailored to your brand and business goals.',
    features: [
      'WooCommerce store setup',
      'Custom WordPress themes',
      'Plugin development & customization',
      'SEO-ready architecture',
      'Security hardening',
      'Ongoing maintenance & support',
    ],
    gradient: 'linear-gradient(135deg, #051a30 0%, #0d0d30 100%)',
  },
]

function ServiceCard({ service, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className="service-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="service-icon">{service.icon}</div>
      <h3 className="service-card-title">{service.title}</h3>
      <p className="service-card-desc">{service.desc}</p>
      <ul className="service-features">
        {service.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Services() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="services" id="services">
      <motion.div
        className="services-header"
        ref={headerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="section-label">What I Do</div>
        <h2 className="services-title">
          Services built for<br />
          <em>real results</em>
        </h2>
        <p className="services-desc">
          Specialized in eCommerce solutions that look stunning and perform even better.
        </p>
      </motion.div>

      <div className="services-grid">
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </section>
  )
}
