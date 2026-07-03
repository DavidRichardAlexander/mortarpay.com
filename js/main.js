// Mobile nav menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('nav-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeMenu();
  });
}

document.querySelectorAll('.role-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Section reveals with stagger
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); } });
}, { threshold: 0.1 });
document.querySelectorAll('.section, .testimonial-section, .prelaunch, .cta-box, .ticker-wrap').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Stagger child cards inside sections
document.querySelectorAll('.steps .step, .trades-grid .trade:not(.trade-dup), .who-grid .who-card, .testimonial-grid .quote-card, .security-badges .sec-badge').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
  el.classList.add('reveal');
  observer.observe(el);
});

// Count-up animation for prelaunch stats
const animateCounter = (el) => {
  const target = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const duration = 1800;
  const start = performance.now();
  const tick = (now) => {
    const elapsed = now - start;
    const p = Math.min(elapsed / duration, 1);
    // easeOutCubic
    const eased = 1 - Math.pow(1 - p, 3);
    const value = target * eased;
    el.textContent = decimals > 0
      ? value.toFixed(decimals)
      : Math.floor(value).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = decimals > 0 ? target.toFixed(decimals) : target.toLocaleString();
  };
  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = 'true';
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// Subtle mouse parallax on hero mockup
const mockup = document.querySelector('.mockup');
const heroSection = document.querySelector('.hero');
if (mockup && heroSection && window.matchMedia('(min-width: 900px)').matches) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mockup.style.transform = `perspective(1200px) rotateX(${y * -1.2}deg) rotateY(${x * 1.2}deg) translateZ(0)`;
  });
  heroSection.addEventListener('mouseleave', () => {
    mockup.style.transform = 'perspective(1200px) rotateX(0) rotateY(0)';
  });
  mockup.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
}
