// Mobile menu toggle
const menuToggle = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');
menuToggle.addEventListener('click', () => navList.classList.toggle('active'));

// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    navList.classList.remove('active');
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

// Typed animation
const typedText = document.querySelector('.typed');
const fullText = typedText.textContent;
typedText.textContent = '';
let index = 0;
function type() { if(index < fullText.length) { typedText.textContent += fullText[index]; index++; setTimeout(type, 80); } }
window.addEventListener('load', type);

// Skills animation
const skillFills = document.querySelectorAll('.skill-fill');
const skillsSection = document.getElementById('skills');
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      skillFills.forEach(fill => fill.style.width = fill.dataset.fill);
      skillObserver.unobserve(skillsSection);
    }
  });
}, { threshold: 0.5 });
skillObserver.observe(skillsSection);

// Active nav link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (scrollY >= sectionTop) current = section.getAttribute('id');
  });
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(link => {
    if(link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// Projects carousel
const track = document.querySelector('.carousel-track');
const btnLeft = document.querySelector('.carousel-btn.left');
const btnRight = document.querySelector('.carousel-btn.right');
let position = 0;
const slideWidth = 320;
btnRight.addEventListener('click', () => {
  if(position > -(track.children.length - 3) * slideWidth) position -= slideWidth;
  track.style.transform = `translateX(${position}px)`;
});
btnLeft.addEventListener('click', () => {
  if(position < 0) position += slideWidth;
  track.style.transform = `translateX(${position}px)`;
});

// Lightbox functionality with navigation
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxDesc = document.querySelector('.lightbox-desc');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentIndex = 0;
const projects = document.querySelectorAll('.project-card');

function openLightbox(index) {
  currentIndex = index;
  const card = projects[currentIndex];
  lightboxImg.src = card.dataset.image;
  lightboxTitle.textContent = card.dataset.title;
  lightboxDesc.textContent = card.dataset.description;
  lightbox.style.display = 'flex';
}

projects.forEach((card, i) => card.addEventListener('click', () => openLightbox(i)));
lightboxClose.addEventListener('click', () => lightbox.style.display = 'none');
lightbox.addEventListener('click', e => { if(e.target === lightbox) lightbox.style.display = 'none'; });

lightboxPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + projects.length) % projects.length;
  openLightbox(currentIndex);
});
lightboxNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % projects.length;
  openLightbox(currentIndex);
});
