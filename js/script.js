// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');
menuToggle.addEventListener('click', () => navList.classList.toggle('active'));

// Smooth Scroll
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    navList.classList.remove('active');
  });
});

// Fade-in on Scroll
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

// Typed Hero Animation
const typedText = document.querySelector('.typed');
const fullText = typedText.textContent;
typedText.textContent = '';
let index = 0;
function type() {
  if (index < fullText.length) {
    typedText.textContent += fullText[index];
    index++;
    setTimeout(type, 80);
  }
}
window.addEventListener('load', type);

// Skills Bar Animation
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

// Active Nav Link Highlight
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

// Projects Carousel
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

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxDesc = document.querySelector('.lightbox-desc');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
let currentIndex = 0;
const projects = document.querySelectorAll('.project-card');

function openLightbox(index){
  currentIndex = index;
  const card = projects[currentIndex];
  lightboxImg.src = card.dataset.image;
  lightboxTitle.textContent = card.dataset.title;
  lightboxDesc.textContent = card.dataset.description;
  lightbox.style.display = 'flex';
}

projects.forEach((card,i)=>card.addEventListener('click',()=>openLightbox(i)));
lightboxClose.addEventListener('click',()=>lightbox.style.display='none');
lightbox.addEventListener('click',e=>{if(e.target===lightbox) lightbox.style.display='none';});
lightboxPrev.addEventListener('click',()=>{currentIndex=(currentIndex-1+projects.length)%projects.length;openLightbox(currentIndex);});
lightboxNext.addEventListener('click',()=>{currentIndex=(currentIndex+1)%projects.length;openLightbox(currentIndex);});

// Counters
const counters = document.querySelectorAll('.counter');
const counterSection = document.getElementById('experience');
const counterObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      counters.forEach(counter=>{
        const updateCount=()=>{
          const target=+counter.getAttribute('data-target');
          const count=+counter.innerText;
          const increment=Math.ceil(target/200);
          if(count<target){counter.innerText=count+increment;setTimeout(updateCount,20);} 
          else{counter.innerText=target;}
        };
        updateCount();
      });
      counterObserver.unobserve(counterSection);
    }
  });
},{threshold:0.5});
counterObserver.observe(counterSection);

// =====================
// EmailJS Contact Form Fixed
// =====================
emailjs.init('oKiMYahq-jcUHrFZB'); // User ID

const contactForm=document.getElementById('contact-form');
const formMsg=document.querySelector('.form-msg');

contactForm.addEventListener('submit',function(e){
  e.preventDefault();
  const formData={
    name:contactForm.querySelector('input[name="name"]').value,
    email:contactForm.querySelector('input[name="email"]').value,
    message:contactForm.querySelector('textarea[name="message"]').value
  };
  emailjs.send('service_jkz24uj','template_ckkn8rl',formData)
    .then(response=>{
      formMsg.style.color="#88d3ce";
      formMsg.innerText="Message Sent Successfully!";
      contactForm.reset();
      console.log('SUCCESS!',response.status,response.text);
    },err=>{
      formMsg.style.color="red";
      formMsg.innerText="Failed to send message. Try again later.";
      console.error('FAILED...',err);
    });
});
