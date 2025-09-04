// ================== Language Data ==================
const texts = {
  en: {
    heroTitle: "Hi, I'm Sri Parakramabahu Patabandi Gedara Dulshan Kokila Senavirathna",
    heroSubtitle: "Undergraduate at LNBTI | BSc (Hons) Computing",
    about: "Hello! I'm ... pursuing a BSc (Hons) in Computing.",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact Me",
    footer: "© 2025 Sri Dulshan Kokila Senavirathna. All rights reserved."
  },
  si: {
    heroTitle: "මම ශ්‍රී පරාක්‍රමබාහු පටබන්දි ගෙදර දුල්ශන් කොකිල සේනාවිරත්න",
    heroSubtitle: "LNBTI හි උපාධි අධ්‍යයන ශිෂ්‍යය | BSc (Hons) Computing",
    about: "ආයුබෝවන්! මම ... BSc (Hons) Computing අධ්‍යයනය කරනවා.",
    skills: "කොඩ් යාන්ත්‍රණ හැකියාවන්",
    experience: "අත්දැකීම්",
    projects: "ව්‍යාපෘති",
    contact: "මාව සම්බන්ධ කරන්න",
    footer: "© 2025 ශ්‍රී දුල්ශන් කොකිල සේනාවිරත්න. සියලුම හිමිකම් ඇවිරිණි."
  },
  jp: {
    heroTitle: "こんにちは、私はスリ・パラクリマバフ・パタバンディ・ゲダラ・ドゥルシャン・コキラ・セナヴィラトナです",
    heroSubtitle: "LNBTIの学部生 | BSc (Hons) Computing",
    about: "こんにちは！私は ... BSc (Hons) Computingを勉強しています。",
    skills: "スキル",
    experience: "経験",
    projects: "プロジェクト",
    contact: "お問い合わせ",
    footer: "© 2025 スリ・ドゥルシャン・コキラ・セナヴィラトナ. All rights reserved."
  }
};

// ================== Language Switch ==================
function setLanguage(lang){
  document.body.className = lang; // change font-family
  typedText.textContent = '';
  fullText = texts[lang].heroTitle;
  index = 0;
  type(); // start typing
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

// ================== Hero Typed Animation ==================
const typedText = document.querySelector('.typed');
let fullText = texts.en.heroTitle;
let index = 0;
function type() {
  if(index < fullText.length){
    typedText.textContent += fullText[index];
    index++;
    setTimeout(type, 80);
  }
}
window.addEventListener('load', type);

// ================== Existing Portfolio JS ==================
// Mobile Menu, Smooth Scroll, Fade-in, Skills, Counters, Carousel, Lightbox, EmailJS...
// (Use your previous script.js code here, only replace hero typing and section texts dynamically)
