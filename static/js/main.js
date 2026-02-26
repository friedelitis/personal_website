// Vollgas toggle
const toggle = document.querySelector('.color-toggle');
let vollgas = false;
toggle.addEventListener('click', () => {
  vollgas = !vollgas;
  document.body.classList.toggle('vollgas', vollgas);
  const flash = document.createElement('div');
  flash.className = 'color-flash-overlay';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 550);
});

// Fade in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navEl = document.querySelector('nav');
hamburger.addEventListener('click', () => {
  const open = navEl.classList.toggle('nav-open');
  hamburger.setAttribute('aria-expanded', open);
});

// Close mobile menu on any nav click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navEl.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Smooth scroll for anchor links (works on homepage and from subpages)
document.querySelectorAll('nav a[href*="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    const hashIndex = href.indexOf('#');
    const path = href.substring(0, hashIndex);
    const hash = href.substring(hashIndex);

    // Check if we're already on the target page
    const currentPath = window.location.pathname;
    const isHomepage = path === '/' || path === '/en/' || path === '';
    const onHomepage = currentPath === '/' || currentPath === '/en/';

    if (isHomepage && onHomepage) {
      e.preventDefault();
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Otherwise let the browser navigate normally (path + hash)
  });
});

// Overscroll Easter Egg
let overscrollTimer = null;
const overscrollMsg = document.getElementById('overscrollMsg');

window.addEventListener('scroll', () => {
  const scrollBottom = window.innerHeight + window.scrollY;
  const docHeight = document.documentElement.scrollHeight;
  
  if (scrollBottom >= docHeight - 5) {
    if (!overscrollTimer) {
      overscrollTimer = setTimeout(() => {
        overscrollMsg.classList.add('visible');
      }, 600);
    }
  } else {
    if (overscrollTimer) {
      clearTimeout(overscrollTimer);
      overscrollTimer = null;
    }
    if (scrollBottom < docHeight - 100) {
      overscrollMsg.classList.remove('visible');
    }
  }
});

// Font Easter Egg
const fontEgg = document.getElementById('fontEasterEgg');
const fontOverlay = document.getElementById('fontOverlay');
const fontOverlayClose = document.getElementById('fontOverlayClose');

fontEgg.addEventListener('click', () => {
  fontOverlay.classList.add('visible');
});

fontOverlayClose.addEventListener('click', () => {
  fontOverlay.classList.remove('visible');
});

fontOverlay.addEventListener('click', (e) => {
  if (e.target === fontOverlay) fontOverlay.classList.remove('visible');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') fontOverlay.classList.remove('visible');
});

// Language switcher
document.querySelectorAll('.nav-lang a').forEach(link => {
  link.addEventListener('click', function(e) {
    // Only prevent default for hash links
    if (this.getAttribute('href') === '#') {
      e.preventDefault();
    }
  });
});
