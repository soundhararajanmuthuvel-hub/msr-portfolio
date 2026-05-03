import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    title: 'LuxeWear Shopify Store',
    desc: 'A premium fashion brand Shopify store with custom Liquid templating, advanced filters, and a conversion-optimized checkout flow.',
    platform: 'Shopify',
    tags: ['Liquid', 'Shopify', 'UI/UX', 'Conversion'],
    href: '#',
    bgColor1: '#1a0533',
    bgColor2: '#0d1030',
    label: 'LW',
  },
  {
    title: 'OrganicRoot WooCommerce',
    desc: 'Full-stack WooCommerce grocery store with real-time inventory, subscription products, and a lightning-fast custom theme.',
    platform: 'WordPress',
    tags: ['WooCommerce', 'PHP', 'Custom Theme', 'SEO'],
    href: '#',
    bgColor1: '#051a20',
    bgColor2: '#0a0d25',
    label: 'OR',
  },
  {
    title: 'TechGear Multi-Vendor',
    desc: 'Scalable multi-vendor electronics marketplace on Shopify Plus with custom app integrations and automated fulfillment workflows.',
    platform: 'Shopify Plus',
    tags: ['Shopify Plus', 'API', 'Automation', 'Scale'],
    href: '#',
    bgColor1: '#1a1005',
    bgColor2: '#0d1530',
    label: 'TG',
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -8 }}
    >
      {/* Thumbnail */}
      <div className="project-thumb">
        <div
          className="project-thumb-bg"
          style={{
            background: `linear-gradient(135deg, ${project.bgColor1} 0%, ${project.bgColor2} 100%)`,
            position: 'absolute',
            inset: 0,
          }}
        />
        <div className="project-thumb-pattern" />
        <div className="project-thumb-label">{project.label}</div>
        <div className="project-platform-badge">{project.platform}</div>
      </div>

      {/* Body */}
      <div className="project-body">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.desc}</p>

        <div className="project-tags">
          {project.tags.map((tag) => (
            <span className="project-tag" key={tag}>{tag}</span>
          ))}
        </div>

        <motion.a
          href={project.href}
          className="project-link"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Visit Project
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="projects" id="projects">
      <motion.div
        className="projects-header"
        ref={headerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="section-label">Selected Work</div>
        <h2 className="projects-title">
          Projects that<br />
          <em>speak for themselves</em>
        </h2>
        <p className="projects-desc">
          A curated selection of eCommerce builds that drove measurable growth for clients.
        </p>
      </motion.div>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
