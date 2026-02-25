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

// Smooth scroll (+ close mobile menu on nav click)
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    navEl.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

// Language switcher
document.querySelectorAll('.nav-lang a').forEach(link => {
  link.addEventListener('click', function(e) {
    // Only prevent default for hash links
    if (this.getAttribute('href') === '#') {
      e.preventDefault();
    }
  });
});
