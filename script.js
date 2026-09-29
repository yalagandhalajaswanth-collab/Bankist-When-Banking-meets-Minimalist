'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const h1 = document.querySelector('h1');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
//tabbed component
const tab = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  console.log(clicked);
  tab.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//link animations

const handleover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(sib => {
      if (sib !== link) {
        sib.style.opacity = this;
        logo.style.opacity = this;
      }
    });
  }
};
nav.addEventListener('mouseover', handleover.bind(0.5));
nav.addEventListener('mouseout', handleover.bind(1));

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const navSticky = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headobserver = new IntersectionObserver(navSticky, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headobserver.observe(header);

const sevReveal = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};
const sectionObserver = new IntersectionObserver(sevReveal, {
  root: null,
  threshold: 0.15,
});
const sections = document.querySelectorAll('.section');
sections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//lazy loiading images
const image = document.querySelectorAll('img[data-src]');
const imgLoad = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
  });
};

const imageObserver = new IntersectionObserver(imgLoad, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
image.forEach(img => {
  imageObserver.observe(img);
});
//slider
const sliders = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const slidelen = slides.length;
  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class = "dots__dot" data-slide="${i}"></button>`,
      );
    });
  };

  const activatedot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide = "${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const gotoslide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`),
    );
  };
  const nextslide = function () {
    if (curSlide === slidelen - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    gotoslide(curSlide);
    activatedot(curSlide);
  };
  const prevslide = function () {
    if (curSlide === 0) {
      curSlide = slidelen - 1;
    } else {
      curSlide--;
    }
    gotoslide(curSlide);
    activatedot(curSlide);
  };
  const init = function () {
    createDots();
    activatedot(curSlide);
    gotoslide(0);
  };
  init();
  btnRight.addEventListener('click', nextslide);
  btnLeft.addEventListener('click', prevslide);
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevslide();
    e.key === 'ArrowRight' && nextslide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      curSlide = e.target.dataset.slide;
      gotoslide(curSlide);
      activatedot(curSlide);
    }
  });
};
sliders();
