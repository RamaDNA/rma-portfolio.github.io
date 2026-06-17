gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ─── Particle Network ─── */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null, radius: 120 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.5;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 10;
    this.color = `rgba(127, 200, 255, ${Math.random() * 0.3 + 0.1})`;
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    if (mouse.x !== null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius) {
        let force = (mouse.radius - distance) / mouse.radius;
        let dirX = dx / distance;
        let dirY = dy / distance;
        this.x -= dirX * force * this.density * 0.05;
        this.y -= dirY * force * this.density * 0.05;
      }
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 150) {
        let opacity = (1 - distance / 150) * 0.15;
        ctx.strokeStyle = `rgba(127, 200, 255, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    p.update();
    p.draw();
  }
  connectParticles();
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

/* ─── Typing Effect ─── */
const textEl = document.querySelector('.animated-text');
const messages = [
  'Rama Dona Ariyatma',
  'AI Engineer',
  'Data Scientist',
  'Full-Stack AI Dev'
];
let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  if (!textEl) return;
  const currentText = messages[messageIndex];
  const current = currentText.substring(0, charIndex);
  textEl.textContent = current;

  if (!isDeleting && charIndex < currentText.length) {
    charIndex++;
    setTimeout(type, 80);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 30);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(type, 2000);
    } else {
      isDeleting = false;
      messageIndex = (messageIndex + 1) % messages.length;
      setTimeout(type, 500);
    }
  }
}

gsap.from('.animated-text', {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.5,
  ease: 'power2.out',
  onComplete: type,
});

/* ─── Navbar Hide/Show ─── */
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > lastScroll && current > 100) {
    navbar.classList.add('hidden');
  } else {
    navbar.classList.remove('hidden');
  }
  lastScroll = current;
});

/* ─── Smooth Scroll Nav ─── */
document.querySelectorAll('.navbar a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      gsap.to(window, { duration: 1, scrollTo: target, ease: 'power3.inOut' });
    }
  });
});

document.querySelectorAll('.btn-primary[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      gsap.to(window, { duration: 1, scrollTo: target, ease: 'power3.inOut' });
    }
  });
});

/* ─── Hero Content ─── */
gsap.from('.hero-subtitle', {
  opacity: 0,
  y: 20,
  duration: 0.8,
  delay: 0.2,
  ease: 'power2.out',
});

gsap.from('.hero-desc', {
  opacity: 0,
  y: 20,
  duration: 0.8,
  delay: 0.7,
  ease: 'power2.out',
});

gsap.from('.hero-actions', {
  opacity: 0,
  y: 20,
  duration: 0.8,
  delay: 1,
  ease: 'power2.out',
});

/* ─── About Section ─── */
gsap.from('#about .section-label', {
  scrollTrigger: { trigger: '#about', start: 'top 85%', once: true },
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: 'power2.out',
});

gsap.from('#about .section-title', {
  scrollTrigger: { trigger: '#about', start: 'top 80%', once: true },
  y: 40,
  opacity: 0,
  duration: 0.8,
  delay: 0.15,
  ease: 'power2.out',
});

gsap.from('.about-desc', {
  scrollTrigger: { trigger: '#about', start: 'top 75%', once: true },
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.3,
  ease: 'power2.out',
});

gsap.from('.stat-item', {
  scrollTrigger: { trigger: '#about', start: 'top 70%', once: true },
  y: 30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.15,
  delay: 0.4,
  ease: 'power2.out',
});

/* ─── Work Section ─── */
gsap.from('#work .section-label', {
  scrollTrigger: { trigger: '#work', start: 'top 85%', once: true },
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: 'power2.out',
});

gsap.from('#work .section-title', {
  scrollTrigger: { trigger: '#work', start: 'top 80%', once: true },
  y: 40,
  opacity: 0,
  duration: 0.8,
  delay: 0.15,
  ease: 'power2.out',
});

gsap.utils.toArray('.work-item').forEach((item) => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
      once: true,
    },
  });

  tl.from(item, {
    y: 40,
    duration: 0.8,
    ease: 'power2.out',
  })
    .from(
      item.querySelector('.work-icon'),
      { scale: 0, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.4'
    )
    .from(
      item.querySelector('h2'),
      { opacity: 0, x: -30, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    .from(
      item.querySelector('.work-date'),
      { opacity: 0, y: 10, duration: 0.4 },
      '-=0.2'
    )
    .from(
      item.querySelector('.work-desc'),
      { opacity: 0, y: 20, duration: 0.6 },
      '-=0.1'
    )
    .from(
      item.querySelectorAll('.work-list-detail li'),
      { opacity: 0, x: -20, duration: 0.4, stagger: 0.1 },
      '-=0.1'
    );
});

/* ─── Projects Section ─── */
const projectCards = gsap.utils.toArray('.project-card');

if (projectCards.length > 1) {
  gsap.to('.projects-horizontal', {
    xPercent: -100 * (projectCards.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.projects-wrapper',
      pin: true,
      scrub: 1,
      snap: 1 / (projectCards.length - 1),
      start: 'top top',
      end: () => '+=' + document.querySelector('.projects-wrapper').offsetWidth,
      invalidateOnRefresh: true,
    },
  });
}

gsap.from('.projects-header .section-label', {
  scrollTrigger: { trigger: '.projects-header', start: 'top 85%', once: true },
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: 'power2.out',
});

gsap.from('.projects-header .section-title', {
  scrollTrigger: { trigger: '.projects-header', start: 'top 80%', once: true },
  y: 40,
  opacity: 0,
  duration: 0.8,
  delay: 0.15,
  ease: 'power2.out',
});

projectCards.forEach((card, i) => {
  gsap.from(card.querySelector('.project-img-wrapper'), {
    scrollTrigger: {
      trigger: card,
      start: 'top 70%',
      once: true,
    },
    x: -50,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.1,
    ease: 'power2.out',
  });

  gsap.from(card.querySelector('.project-tag'), {
    scrollTrigger: {
      trigger: card,
      start: 'top 70%',
      once: true,
    },
    y: 15,
    opacity: 0,
    duration: 0.4,
    delay: i * 0.1 + 0.2,
    ease: 'power2.out',
  });

  gsap.from(card.querySelector('.project-info h2'), {
    scrollTrigger: {
      trigger: card,
      start: 'top 70%',
      once: true,
    },
    y: 20,
    opacity: 0,
    duration: 0.6,
    delay: i * 0.1 + 0.3,
    ease: 'power2.out',
  });

  gsap.from(card.querySelector('.project-info p'), {
    scrollTrigger: {
      trigger: card,
      start: 'top 70%',
      once: true,
    },
    y: 20,
    opacity: 0,
    duration: 0.6,
    delay: i * 0.1 + 0.4,
    ease: 'power2.out',
  });

  gsap.from(card.querySelector('.project-tech'), {
    scrollTrigger: {
      trigger: card,
      start: 'top 70%',
      once: true,
    },
    y: 15,
    opacity: 0,
    duration: 0.5,
    delay: i * 0.1 + 0.5,
    ease: 'power2.out',
  });

  gsap.from(card.querySelector('.project-link'), {
    scrollTrigger: {
      trigger: card,
      start: 'top 70%',
      once: true,
    },
    y: 15,
    opacity: 0,
    duration: 0.5,
    delay: i * 0.1 + 0.6,
    ease: 'power2.out',
  });
});

/* ─── Footer ─── */
gsap.from('#contact .section-label', {
  scrollTrigger: { trigger: '#contact', start: 'top 85%', once: true },
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: 'power2.out',
});

gsap.from('.footer-tagline', {
  scrollTrigger: { trigger: '#contact', start: 'top 80%', once: true },
  y: 40,
  opacity: 0,
  duration: 0.8,
  delay: 0.15,
  ease: 'power2.out',
});

gsap.from('.footer-sub', {
  scrollTrigger: { trigger: '#contact', start: 'top 75%', once: true },
  y: 30,
  opacity: 0,
  duration: 0.8,
  delay: 0.3,
  ease: 'power2.out',
});

gsap.from('.footer-social a', {
  scrollTrigger: { trigger: '#contact', start: 'top 70%', once: true },
  y: 20,
  opacity: 0,
  duration: 0.5,
  stagger: 0.1,
  delay: 0.4,
  ease: 'power2.out',
});

gsap.from('.footer-bottom', {
  scrollTrigger: { trigger: '#contact', start: 'top 65%', once: true },
  opacity: 0,
  duration: 0.6,
  delay: 0.7,
  ease: 'power2.out',
});
