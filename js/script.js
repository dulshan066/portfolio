// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.3, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// Typing animation
const typedText = document.querySelector('.typed');
const fullText = typedText.textContent;
typedText.textContent = '';
let index = 0;
function type() {
  if (index < fullText.length) {
    typedText.textContent += fullText[index];
    index++;
    setTimeout(type, 100);
  }
}
window.addEventListener('load', type);

// Active nav link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 70;
    if (scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => link.classList.remove('active'));
  navLinks.forEach(link => {
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});
