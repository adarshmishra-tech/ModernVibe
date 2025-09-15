// Theme Toggle with Local Storage Persistence
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
let currentTheme = localStorage.getItem('theme') || 'light-mode';

// Apply saved theme on page load
function applyTheme(theme) {
  body.classList.remove('light-mode', 'dark-mode');
  body.classList.add(theme);
  localStorage.setItem('theme', theme);
}

// Initialize theme and animations
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  initAnimations();
});

// Toggle between light and dark mode
themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode';
  applyTheme(currentTheme);
});

// Mobile Navigation Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
mobileMenuToggle.addEventListener('click', () => {
  body.classList.toggle('nav-open');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      body.classList.remove('nav-open');
    }
  });
});

// Scroll Animations with Intersection Observer
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections and cards
  document.querySelectorAll('.service-card, .section, .portfolio-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Parallax Effect for Hero Section
function initParallax() {
  const hero = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  });
}

// Form Submission Handler (Placeholder)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your inquiry! We\'ll respond within 24 hours.');
      form.reset();
    });
  }
});

// Initialize parallax for larger screens
if (window.innerWidth > 768) {
  initParallax();
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.header')) {
    body.classList.remove('nav-open');
  }
});
