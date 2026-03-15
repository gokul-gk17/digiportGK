// Add hidden class first so content shows by default, animate on scroll
const fadeEls = document.querySelectorAll('.fade-up');
fadeEls.forEach(el => el.classList.add('hidden'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

fadeEls.forEach(el => observer.observe(el));

// Force show elements already in viewport on load
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

fadeEls.forEach(el => {
  if (isElementInViewport(el)) {
    el.classList.add('visible');
    observer.unobserve(el);
  }
});

// ── TYPING ANIMATION ─────────────────────────────────
const phrases = [
  "Data Science & ML Enthusiast 🤖",
  "Python Developer 🐍",
  "Data Analytics Engineer 📊",
  "Power BI Dashboard Builder 📈",
  "OCR & Computer Vision Explorer 👁️",
  "Open to Internships 🚀",
];
const typedEl = document.getElementById('typed-text');
let pIdx = 0, cIdx = 0, deleting = false;

if (!typedEl) {
  console.warn('Hero typing target missing: #typed-text');
} else {
  typedEl.textContent = '';
  function type() {
    const phrase = phrases[pIdx];
    if (!deleting) {
      typedEl.textContent = phrase.slice(0, cIdx + 1);
      cIdx++;
      if (cIdx === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
      setTimeout(type, 60);
    } else {
      typedEl.textContent = phrase.slice(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; setTimeout(type, 300); return; }
      setTimeout(type, 35);
    }
  }
  type();
}

// Active nav link highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let c = window.pageYOffset + 120; // offset to trigger a little early
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (c >= top && c <= bottom) {
      navLinks.forEach(link => link.classList.remove('active'));
      const id = section.getAttribute('id');
      const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
});

// PARTICLE TRAIL EFFECT
if (window.innerWidth >= 768) {
  const darkSections = ['about', 'certificates'];

  // Particle colors — blue for dark bg, navy for light bg
  function getParticleColor(x, y) {
    const section = document.elementFromPoint(x, y)?.closest('section');
    const isDark = section && darkSections.includes(section.id);
    return isDark
      ? ['rgba(79,142,247,', 'rgba(168,197,250,', 'rgba(255,255,255,']
      : ['rgba(10,22,40,', 'rgba(79,142,247,', 'rgba(30,58,95,'];
  }

  function spawnParticle(x, y) {
    const colors = getParticleColor(x, y);
    const color = colors[Math.floor(Math.random() * colors.length)];

    const p = document.createElement('div');
    const size = Math.random() * 8 + 4; // 4px to 12px
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 40 + 20;
    const dx = Math.cos(angle) * speed;
    const dy = Math.sin(angle) * speed;
    const duration = Math.random() * 500 + 400; // 400–900ms

    p.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color}0.85);
      left: ${x}px;
      top: ${y}px;
      transform: translate(-50%, -50%);
      transition: transform ${duration}ms ease-out,
                  opacity ${duration}ms ease-out,
                  width ${duration}ms ease-out,
                  height ${duration}ms ease-out;
    `;

    document.body.appendChild(p);

    // Trigger animation on next frame
    requestAnimationFrame(() => {
      p.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
      p.style.opacity = '0';
      p.style.width = '2px';
      p.style.height = '2px';
    });

    setTimeout(() => p.remove(), duration + 50);
  }

  let lastX = 0, lastY = 0, frame = 0;

  document.addEventListener('mousemove', (e) => {
    // Only spawn every 2nd frame to avoid too many particles
    frame++;
    if (frame % 2 !== 0) return;

    // Only spawn if mouse moved enough
    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    if (dist < 8) return;

    lastX = e.clientX;
    lastY = e.clientY;

    // Spawn 2–3 particles per move
    const count = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < count; i++) {
      spawnParticle(e.clientX, e.clientY);
    }
  });
}