// ── Navbar scroll behaviour ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile menu ──
function openMobile() {
  document.getElementById('mobileMenu').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('mobileClose').addEventListener('click', closeMobile);

// ── IntersectionObserver for fade-up ──
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings slightly
      const siblings = [...entry.target.parentElement.querySelectorAll('.fade-up')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => observer.observe(el));

// ── FAQ accordion ──
function toggleFAQ(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── Form submit ──
function handleSubmit(btn) {
  btn.textContent = 'Request Sent! We\'ll contact you shortly. ✓';
  btn.style.background = '#2D8A4E';
  btn.style.color = '#fff';
  btn.disabled = true;
}

// ── Stat pill counter animation ──
function animateCounter(el, target, suffix) {
  let current = 0;
  const step = target / 40;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.round(current) + suffix;
    if (current >= target) clearInterval(timer);
  }, 35);
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pills = document.querySelectorAll('.stat-pill .num');
      const data = [['4', ''], ['1K', '+'], ['98', '%']];
      pills.forEach((pill, i) => {
        const [val, suf] = data[i];
        if (!isNaN(parseInt(val))) {
          animateCounter(pill, parseInt(val), suf);
        }
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const heroSection = document.getElementById('hero');
if (heroSection) statsObserver.observe(heroSection);