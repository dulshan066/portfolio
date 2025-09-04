// ================== Language Data ==================
const texts = {
  en: {
    heroTitle: "Hi, I'm Sri Parakramabahu Patabandi Gedara Dulshan Kokila Senavirathna",
    heroSubtitle: "Undergraduate at LNBTI | BSc (Hons) Computing",
    about: "Hello! I'm an undergraduate pursuing a BSc (Hons) in Computing at LNBTI. Passionate about coding, innovation, and building real-world solutions.",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact Me",
    footer: "© 2025 Sri Dulshan Kokila Senavirathna. All rights reserved."
  },
  si: {
    heroTitle: "මම ශ්‍රී පරාක්‍රමබාහු පටබන්දි ගෙදර දුල්ශන් කොකිල සේනාවිරත්න",
    heroSubtitle: "LNBTI හි උපාධි අධ්‍යයන ශිෂ්‍යය | BSc (Hons) Computing",
    about: "ආයුබෝවන්! මම LNBTI හි BSc (Hons) Computing උපාධිය අධ්‍යයනය කරන ශිෂ්‍යයෙකි. කේතනය, නවෝත්පාදන හා නව නිර්මාණශීලී විසඳුම් පිළිබඳව උනන්දුවක් ඇත.",
    skills: "කෞශල්‍ය",
    experience: "අත්දැකීම්",
    projects: "ව්‍යාපෘති",
    contact: "සම්බන්ධ වන්න",
    footer: "© 2025 ශ්‍රී දුල්ශන් කොකිල සේනාවිරත්න. සියලුම හිමිකම් ඇවිරිණි."
  },
  jp: {
    heroTitle: "こんにちは、私はスリ・パラクリマバフ・パタバンディ・ゲダラ・ドゥルシャン・コキラ・セナヴィラトナです",
    heroSubtitle: "LNBTIの学部生 | BSc (Hons) Computing",
    about: "こんにちは！私はLNBTIでBSc (Hons) Computingを専攻している学生です。コーディング、イノベーション、実用的なソリューションの開発に情熱を持っています。",
    skills: "スキル",
    experience: "経験",
    projects: "プロジェクト",
    contact: "お問い合わせ",
    footer: "© 2025 スリ・ドゥルシャン・コキラ・セナヴィラトナ. All rights reserved."
  }
};

// ================== Hero Typed Animation ==================
const typedText = document.querySelector('.typed');
let fullText = texts.en.heroTitle;
let index = 0;

function type() {
  if (index < fullText.length) {
    typedText.textContent += fullText[index];
    index++;
    setTimeout(type, 80);
  }
}
window.addEventListener('load', type);

// ================== Language Switch ==================
function setLanguage(lang) {
  document.body.className = lang;

  // Reset typing effect
  typedText.textContent = '';
  fullText = texts[lang].heroTitle;
  index = 0;
  type();

  document.querySelector('.typed-subtitle').textContent = texts[lang].heroSubtitle;
  document.querySelector('#about h2').textContent = texts[lang].about;
  document.querySelector('#skills h2').textContent = texts[lang].skills;
  document.querySelector('#experience h2').textContent = texts[lang].experience;
  document.querySelector('#projects h2').textContent = texts[lang].projects;
  document.querySelector('#contact h2').textContent = texts[lang].contact;
  document.querySelector('footer p').textContent = texts[lang].footer;
}

document.getElementById('en-btn').addEventListener('click', () => setLanguage('en'));
document.getElementById('si-btn').addEventListener('click', () => setLanguage('si'));
document.getElementById('jp-btn').addEventListener('click', () => setLanguage('jp'));

// ================== Mobile Menu ==================
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');
mobileMenu.addEventListener('click', () => {
  navList.classList.toggle('active');
});

// ================== Smooth Scroll ==================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    navList.classList.remove('active'); // close mobile menu
  });
});

// ================== Section Fade-in ==================
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight * 0.8;
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < triggerBottom) section.classList.add('appear');
  });
});

// ================== Skills Animation ==================
const skillFills = document.querySelectorAll('.skill-fill');
window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight * 0.9;
  skillFills.forEach(fill => {
    const top = fill.getBoundingClientRect().top;
    if (top < triggerBottom) {
      const width = fill.getAttribute('data-width');
      fill.style.width = width;
    }
  });
});

// ================== Experience Counters ==================
const counters = document.querySelectorAll('.counter');
let counterStarted = false;
window.addEventListener('scroll', () => {
  const sectionTop = document.querySelector('#experience').getBoundingClientRect().top;
  if (!counterStarted && sectionTop < window.innerHeight * 0.8) {
    counters.forEach(counter => {
      let target = +counter.getAttribute('data-target');
      let count = 0;
      const step = target / 200;
      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          counter.textContent = target;
          clearInterval(interval);
        } else {
          counter.textContent = Math.floor(count);
        }
      }, 10);
    });
    counterStarted = true;
  }
});

// ================== Projects Carousel ==================
const track = document.querySelector('.carousel-track');
const leftBtn = document.querySelector('.carousel-btn.left');
const rightBtn = document.querySelector('.carousel-btn.right');
let indexCarousel = 0;

rightBtn.addEventListener('click', () => {
  const cardWidth = document.querySelector('.project-card').offsetWidth + 20;
  indexCarousel++;
  track.style.transform = `translateX(${-cardWidth * indexCarousel}px)`;
});

leftBtn.addEventListener('click', () => {
  if (indexCarousel > 0) indexCarousel--;
  const cardWidth = document.querySelector('.project-card').offsetWidth + 20;
  track.style.transform = `translateX(${-cardWidth * indexCarousel}px)`;
});

// ================== Lightbox ==================
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxDesc = document.querySelector('.lightbox-desc');
const lightboxClose = document.querySelector('.lightbox-close');
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = card.querySelector('img').src;
    lightboxTitle.textContent = card.querySelector('h3').textContent;
    lightboxDesc.textContent = card.querySelector('p').textContent;
  });
});

lightboxClose.addEventListener('click', () => lightbox.style.display = 'none');
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.style.display = 'none'; });

// ================== Contact Form (EmailJS Example) ==================
const contactForm = document.getElementById('contact-form');
const formMsg = document.querySelector('.form-msg');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  formMsg.textContent = "Sending...";

  // Example: EmailJS (replace with real config if you use it)
  // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', '#contact-form')
  //   .then(() => formMsg.textContent = "Message sent successfully!")
  //   .catch(() => formMsg.textContent = "Failed to send. Try again later.");

  setTimeout(() => { formMsg.textContent = "Message sent successfully!"; }, 1000);
});
