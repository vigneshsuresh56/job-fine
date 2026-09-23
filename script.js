const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 10));

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
}));

// reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// animated match counter
const matchNum = document.querySelector('.match-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.count, 10);
      let startTimestamp = null;
      const duration = 2000;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        entry.target.textContent = Math.floor(progress * target);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });
if (matchNum) counterObserver.observe(matchNum);

// search form
const form = document.getElementById('searchForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = form.querySelector('input').value.trim();
  form.querySelector('input').placeholder = value ? `Searching “${value}”…` : 'Search job';
  form.querySelector('input').value = '';
});

// demo modal
const demoModal = document.getElementById('demoModal');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.btn-primary').forEach(btn => {
  if (btn.textContent.trim() === 'Book A Demo') {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      demoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
});

modalClose.addEventListener('click', () => {
  demoModal.classList.remove('active');
  document.body.style.overflow = '';
});
demoModal.addEventListener('click', (e) => {
  if (e.target === demoModal) {
    demoModal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

const demoForm = document.getElementById('demoForm');
demoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = demoForm.querySelector('input[type="text"]').value.trim();
  alert(`Thank you ${name}! We'll contact you shortly to schedule your demo.`);
  demoForm.reset();
  demoModal.classList.remove('active');
  document.body.style.overflow = '';
});
