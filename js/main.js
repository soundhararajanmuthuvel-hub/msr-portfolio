document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
      const spans = menuToggle.querySelectorAll('span');
      if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // Scroll effect on Navbar
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- MOUSE TRACKING GLOW EFFECT ---
  const glowCards = document.querySelectorAll('.glow-card');
  glowCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // --- BACKGROUND PARTICLE CANVAS ---
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  
  let particlesArray = [];
  const numberOfParticles = 50;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.3 - 0.15;
      this.speedY = Math.random() * 0.3 - 0.15;
      this.opacity = Math.random() * 0.4 + 0.1;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
      if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }
    
    draw() {
      ctx.fillStyle = `rgba(142, 76, 28, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 110) {
          ctx.strokeStyle = `rgba(90, 45, 12, ${(1 - distance/110) * 0.06})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }
  
  initParticles();
  animateParticles();

  // --- PREMIUM LOADER & ENTRANCE ANIMATION ---
  const loader = document.getElementById('loader');
  const loadBar = document.getElementById('load-bar');
  const loadText = document.getElementById('load-text');
  
  let percentage = 0;
  const loadInterval = setInterval(() => {
    const increment = Math.floor(Math.random() * 10) + 2;
    percentage += increment;
    
    if (percentage >= 100) {
      percentage = 100;
      clearInterval(loadInterval);
      
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        triggerEntranceAnimations();
      }, 400);
    }
    
    loadBar.style.width = `${percentage}%`;
    loadText.textContent = `${percentage}%`;
  }, 30);

  // --- GSAP ENTRANCE & SCROLL-TRIGGERED ANIMATIONS ---
  function triggerEntranceAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    const heroTl = gsap.timeline();
    
    heroTl.from('.navbar', {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.hero-content .accent-tag', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-content h1', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-content h3', {
      y: 15,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-content p', {
      y: 15,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-ctas', {
      y: 15,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-portrait-frame', {
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.7')
    .from('.scroll-indicator', {
      opacity: 0,
      y: -10,
      duration: 0.4
    }, '-=0.3');

    // Section header ScrollTriggers
    document.querySelectorAll('.section-header').forEach(header => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    // Stats Counter Animation
    const statsCard = document.querySelector('.stats-grid');
    if (statsCard) {
      gsap.from(statsCard, {
        scrollTrigger: {
          trigger: statsCard,
          start: 'top 90%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        onComplete: animateCounters
      });
    }

    // About box ScrollTrigger
    const aboutBox = document.querySelector('.about-box');
    if (aboutBox) {
      gsap.from(aboutBox, {
        scrollTrigger: {
          trigger: aboutBox,
          start: 'top 85%'
        },
        opacity: 0,
        scale: 0.97,
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    // Services Grid stagger ScrollTrigger
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 85%'
      },
      opacity: 0,
      y: 25,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out'
    });

    // Skills cards stagger ScrollTrigger
    gsap.from('.skills-card', {
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 85%'
      },
      opacity: 0,
      y: 25,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    });

    // Project Case Studies stagger ScrollTrigger
    document.querySelectorAll('.project-case-study').forEach(caseStudy => {
      gsap.from(caseStudy, {
        scrollTrigger: {
          trigger: caseStudy,
          start: 'top 80%'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    // Timeline items scroll stagger
    document.querySelectorAll('.timeline-item').forEach(item => {
      gsap.from(item.querySelector('.timeline-content'), {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%'
        },
        opacity: 0,
        x: item.getBoundingClientRect().left < window.innerWidth / 2 ? -30 : 30,
        duration: 0.6,
        ease: 'power3.out'
      });
      gsap.from(item.querySelector('.timeline-dot'), {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%'
        },
        scale: 0,
        duration: 0.4,
        ease: 'back.out(2)'
      }, '-=0.3');
    });

    // Tech stack cards ScrollTrigger
    gsap.from('.tech-card', {
      scrollTrigger: {
        trigger: '.tech-grid',
        start: 'top 85%'
      },
      opacity: 0,
      scale: 0.8,
      y: 15,
      duration: 0.5,
      stagger: 0.04,
      ease: 'back.out(1.2)'
    });

    // Achievements cards stagger ScrollTrigger
    gsap.from('.achievement-card', {
      scrollTrigger: {
        trigger: '.achievements-grid',
        start: 'top 85%'
      },
      opacity: 0,
      y: 25,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out'
    });

    // SEO Showcase Area ScrollTrigger
    const seoSection = document.querySelector('#seo-deepdive');
    if (seoSection) {
      gsap.from('.seo-tabs', {
        scrollTrigger: {
          trigger: seoSection,
          start: 'top 85%'
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out'
      });
    }

    // Testimonials slider ScrollTrigger
    const testimonialsBlock = document.querySelector('#testimonials');
    if (testimonialsBlock) {
      gsap.from('.testimonials-slider-container', {
        scrollTrigger: {
          trigger: testimonialsBlock,
          start: 'top 85%'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    // Contact Grid ScrollTrigger
    const contactGrid = document.querySelector('.contact-grid');
    if (contactGrid) {
      gsap.from('.contact-info', {
        scrollTrigger: {
          trigger: contactGrid,
          start: 'top 85%'
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: 'power3.out'
      });

      gsap.from('.contact-form-container', {
        scrollTrigger: {
          trigger: contactGrid,
          start: 'top 85%'
        },
        opacity: 0,
        x: 30,
        duration: 0.6,
        ease: 'power3.out'
      });
    }
  }

  // --- COUNTERS COUNT-UP ENGINE ---
  function animateCounters() {
    const counterNumbers = document.querySelectorAll('.stat-number');
    counterNumbers.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 1600;
      const stepTime = Math.abs(Math.floor(duration / target));
      let current = 0;
      
      const timer = setInterval(() => {
        const increment = Math.ceil(target / 40);
        current += increment;
        if (current >= target) {
          counter.textContent = target + (target === 50 || target === 100 || target === 10 ? '+' : '');
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, Math.max(stepTime, 20));
    });
  }

  // --- PROJECT SCREENSHOT GALLERIES CAROUSEL LOGIC ---
  const galleryPanes = document.querySelectorAll('.project-gallery-pane');
  galleryPanes.forEach(pane => {
    const track = pane.querySelector('.gallery-carousel-track');
    const slides = Array.from(track.children);
    const prevArrow = pane.querySelector('.left-arrow');
    const nextArrow = pane.querySelector('.right-arrow');
    const bulletsContainer = pane.querySelector('.gallery-bullets');
    
    let currentIdx = 0;
    
    // Generate bullets
    slides.forEach((_, idx) => {
      const bullet = document.createElement('div');
      bullet.classList.add('gallery-bullet');
      if (idx === 0) bullet.classList.add('active');
      bullet.addEventListener('click', () => updateGallery(idx));
      bulletsContainer.appendChild(bullet);
    });
    
    const bullets = Array.from(bulletsContainer.children);
    
    function updateGallery(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      
      currentIdx = index;
      pane.setAttribute('data-current-slide', currentIdx);
      track.style.transform = `translateX(-${currentIdx * 100}%)`;
      
      // Update bullets
      bullets.forEach((bullet, idx) => {
        if (idx === currentIdx) {
          bullet.classList.add('active');
        } else {
          bullet.classList.remove('active');
        }
      });
    }
    
    prevArrow.addEventListener('click', () => updateGallery(currentIdx - 1));
    nextArrow.addEventListener('click', () => updateGallery(currentIdx + 1));
  });

  // --- LIGHTBOX FULLSCREEN PREVIEW SYSTEM ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img-element');
  const lightboxClose = document.getElementById('lightbox-close-btn');
  const galleryImages = document.querySelectorAll('.gallery-slide img');
  
  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop background scroll
    });
  });
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 200);
  }
  
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', e => {
      // Close only if clicked on background overlay, not on the image itself
      if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content')) {
        closeLightbox();
      }
    });
  }
  
  // Close on Esc key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Open Gallery buttons from project details trigger click on the first slide
  const viewScreenshotsButtons = document.querySelectorAll('.open-gallery-btn');
  viewScreenshotsButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      const caseStudy = e.target.closest('.project-case-study');
      if (caseStudy) {
        const firstImg = caseStudy.querySelector('.gallery-slide img');
        if (firstImg) firstImg.click();
      }
    });
  });

  // --- TESTIMONIALS SLIDER CONTROLLER ---
  const tTrack = document.getElementById('testimonials-track');
  const tSlides = Array.from(tTrack ? tTrack.children : []);
  const tNextBtn = document.getElementById('next-btn');
  const tPrevBtn = document.getElementById('prev-btn');
  const tDotsContainer = document.getElementById('slider-dots');
  
  if (tTrack && tSlides.length > 0) {
    let tIndex = 0;
    let tTimer;

    tSlides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => moveToTSlide(idx));
      tDotsContainer.appendChild(dot);
    });

    const tDots = Array.from(tDotsContainer.children);

    function moveToTSlide(index) {
      if (index < 0) index = tSlides.length - 1;
      if (index >= tSlides.length) index = 0;
      
      tIndex = index;
      tTrack.style.transform = `translateX(-${tIndex * 100}%)`;
      
      tDots.forEach((dot, idx) => {
        if (idx === tIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
      resetAutoPlay();
    }

    tNextBtn.addEventListener('click', () => moveToTSlide(tIndex + 1));
    tPrevBtn.addEventListener('click', () => moveToTSlide(tIndex - 1));

    function startAutoPlay() {
      tTimer = setInterval(() => moveToTSlide(tIndex + 1), 6000);
    }

    function resetAutoPlay() {
      clearInterval(tTimer);
      startAutoPlay();
    }

    startAutoPlay();
  }

  // --- SEO DEEP DIVE TABS ---
  const tabButtons = document.querySelectorAll('.seo-tab-btn');
  const tabPanes = document.querySelectorAll('.seo-tab-pane');
  
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(tabId);
      
      if (targetPane) {
        targetPane.classList.add('active');
        gsap.from(targetPane.querySelector('.seo-pane-grid'), {
          opacity: 0,
          y: 15,
          duration: 0.5,
          ease: 'power3.out'
        });
      }
    });
  });

  // --- CONTACT FORM HANDLER ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('#submit-btn');
      const originalBtnHtml = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending... <i data-lucide="loader-2" class="animate-spin"></i>';
      lucide.createIcons();
      
      formStatus.style.display = 'block';
      formStatus.style.color = 'var(--text-muted)';
      formStatus.textContent = 'Processing your inquiry...';

      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        
        formStatus.style.color = '#38bdf8';
        formStatus.innerHTML = `<strong>Thank you, ${name}!</strong> Your message has been sent successfully. MSR will contact you shortly.`;
        
        contactForm.reset();
        
        setTimeout(() => {
          gsap.to(formStatus, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              formStatus.style.display = 'none';
              formStatus.style.opacity = '1';
            }
          });
        }, 8000);
      }, 1500);
    });
  }

  // --- RESUME DOWNLOAD SIMULATOR ---
  const resumeBtn = document.getElementById('download-resume-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      const toast = document.createElement('div');
      toast.style.position = 'fixed';
      toast.style.bottom = '2rem';
      toast.style.right = '2rem';
      toast.style.background = 'rgba(12, 8, 6, 0.95)';
      toast.style.border = '1px solid var(--accent-light)';
      toast.style.padding = '1rem 2rem';
      toast.style.borderRadius = '8px';
      toast.style.color = '#fff';
      toast.style.fontFamily = 'var(--font-header)';
      toast.style.fontSize = '0.95rem';
      toast.style.zIndex = '99999';
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5), 0 0 15px var(--accent-glow)';
      toast.innerHTML = '<i data-lucide="info" style="display:inline-block; vertical-align:middle; margin-right:8px; color:var(--accent-light);"></i> Preparing MSR\'s Curriculum Vitae...';
      document.body.appendChild(toast);
      lucide.createIcons();
      
      gsap.from(toast, { y: 50, opacity: 0, duration: 0.5, ease: 'power3.out' });
      
      setTimeout(() => {
        toast.innerHTML = '<i data-lucide="check-circle-2" style="display:inline-block; vertical-align:middle; margin-right:8px; color:#10b981;"></i> Request logged. Please fill out contact details to obtain PDF.';
        lucide.createIcons();
        
        setTimeout(() => {
          gsap.to(toast, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            onComplete: () => toast.remove()
          });
        }, 4000);
      }, 2000);
    });
  }
});
