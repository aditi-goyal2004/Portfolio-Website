// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
});

// Typed.js typing animation for hero subtitle
const typed = new Typed('.typing', {
  strings: ['Frontend Developer', 'UI Enthusiast', 'React Learner', 'Future Full-Stack Dev'],
  typeSpeed: 100,
  backSpeed: 50,
  backDelay: 2000,
  loop: true,
});
const navbar = document.querySelector('.navbar');
let isDragging = false;
let startX, startY, initialLeft, initialTop;

navbar.style.position = 'fixed'; // ensure fixed positioning

navbar.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  const rect = navbar.getBoundingClientRect();
  initialLeft = rect.left;
  initialTop = rect.top;
  navbar.style.cursor = 'grabbing';
  e.preventDefault();
});

window.addEventListener('mouseup', () => {
  isDragging = false;
  navbar.style.cursor = 'grab';
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  let newLeft = initialLeft + dx;
  let newTop = initialTop + dy;

  // Optional: Keep navbar inside viewport boundaries
  const navWidth = navbar.offsetWidth;
  const navHeight = navbar.offsetHeight;
  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;

  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newLeft + navWidth > winWidth) newLeft = winWidth - navWidth;
  if (newTop + navHeight > winHeight) newTop = winHeight - navHeight;

  navbar.style.left = newLeft + 'px';
  navbar.style.top = newTop + 'px';
});
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.fade-in-section');

  function checkVisibility() {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight - 100) {
        section.classList.add('is-visible');
      }
    });
  }

  window.addEventListener('scroll', checkVisibility);
  // Also check on load
  checkVisibility();
});
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = scrollPercent + '%';
});
const toggle = document.getElementById('theme-toggle');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  
  // Update icon
  toggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';

  // Save theme
  if (document.body.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }
});

// On load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    toggle.textContent = '🌙';
  } else {
    toggle.textContent = '☀️';
  }
});

