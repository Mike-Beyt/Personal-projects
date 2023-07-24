'use strict';
const menuBtn = document.getElementById('menu-btn');
const sideEl = document.getElementById('nav-el');
let sideActive = false;

//menubtn//
menuBtn.addEventListener('click', function () {
  if (sideActive === false) {
    sideEl.style.display = 'block';
    sideActive = true;
  } else if (sideActive === true) {
    sideEl.style.display = 'none';
    sideActive = false;
  }
});

//links//

const allLinks = document.querySelectorAll('a:link');
allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');
    if (href === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const sectionHeroEl = document.querySelector('.section-hero');

//nav//

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      document.body.classList.add('sticky');
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove('sticky');
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-60px',
  }
);
obs.observe(sectionHeroEl);

//nav-animation//

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav-link')) {
    const link = e.target;
    const sibilings = link.closest('.nav').querySelectorAll('.nav-link');
    sibilings.forEach(el => {
      if (el !== link) {
        el.style.opacity = 0.7;
      }
    });
  }
});

nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav-link')) {
    const link = e.target;
    const sibilings = link.closest('.nav').querySelectorAll('.nav-link');

    sibilings.forEach(el => {
      if (el !== link) {
        el.style.opacity = 1;
      }
    });
  }
});

//reveal//
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//slider//
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.btn-slider-left');
const btnRight = document.querySelector('.btn-slider-right');
let curSlide = 0;
const maxSlide = slides.length;

slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

btnRight.addEventListener('click', function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}% )`)
  );
  console.log(curSlide);
});
btnLeft.addEventListener('click', function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  );
});

//login//
const sectionResumeEl = document.querySelector('.resume-section');
const loginBtn = document.querySelector('.btn-nav');
const loginForm = document.querySelector('.login-section');
const cancelLoginBtn = document.querySelector('.btn-log-2');
const overlay = document.querySelector('.overlay');

overlay.addEventListener('click', function () {
  overlay.classList.add('hide-overlay');
  loginForm.style.display = 'none';
  sectionHeroEl.style.transition = '1500ms';
  sectionResumeEl.style.transition = '1500ms';
});

loginBtn.addEventListener('click', function () {
  loginForm.style.display = 'block';
  overlay.classList.remove('hide-overlay');
  sectionHeroEl.style.opacity = '1';
  sectionResumeEl.style.opacity = '1';
});

cancelLoginBtn.addEventListener('click', function () {
  loginForm.style.display = 'none';
  overlay.classList.add('hide-overlay');
  sectionHeroEl.style.opacity = '1';
  sectionHeroEl.style.transition = '1500ms';
  sectionResumeEl.style.opacity = '1';
  sectionResumeEl.style.transition = '1500ms';
});

const loginObs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === true) return;
    else {
      loginForm.style.display = 'none';
      overlay.classList.add('hide-overlay');
      sectionHeroEl.style.opacity = '1';
      sectionHeroEl.style.transition = '1500ms';
      sectionResumeEl.style.opacity = '1';
      sectionResumeEl.style.transition = '1500ms';
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-150px',
  }
);

loginObs.observe(loginForm);
