'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContents = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const initialCoords = section1.getBoundingClientRect();

const header = document.querySelector('.header');

const allSections = document.querySelectorAll('.section');

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

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

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/********** scroll effect **********/

btnScrollTo.addEventListener('click', e => {
  //e.preventDefault();
  const s1coords = section1.getBoundingClientRect(); // get relative position
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); // get current scroll
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight, // get view height
  //   document.documentElement.clientWidth, // get view width
  // );
  /****  Scrolling ****/
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  /****  Scrolling Smooth ****/
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

/********** page nav scroll smoothly  ********/

// basic solution
// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href'); // do not use arrow function when you need to use this key words
//     //console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// event delegation solution
// 1. add event listener to common parent element
// 2. determent what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  //console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    //console.log(this);
    const id = e.target.getAttribute('href');
    //console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/********** tabbed component ******************/
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  // Guard clause
  if (!clicked) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContents.forEach(el =>
    el.classList.remove('operations__content--active'),
  );

  // active tab
  clicked.classList.add('operations__tab--active');

  // active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/********** manu fade animation **************/
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', e => handleHover(e, 0.5));

nav.addEventListener('mouseout', e => handleHover(e, 1));

/*********** sticky nav effect **********/
// basic solution: bad performance (since scroll events fires all the time)
// window.addEventListener('scroll', function (e) {
//   // console.log(this.window.scrollY);
//   if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Intersection Observer API
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries, observer) {
  //entries.forEach(entry => console.log(entry));
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const headObserver = new IntersectionObserver(stickyNav, obsOptions);
headObserver.observe(header);

/********** reveal sections ******/
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry.target);
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
});

/*********** lazy loading image *******/
const imgTarget = document.querySelectorAll('img[data-src]');
// console.log(imgTarget);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObsever = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTarget.forEach(img => imgObsever.observe(img));

/****************** slider ****************/
// slides.forEach(
//   (slide, i) => (slide.style.transform = `translateX(${100 * i}%)`),
// );

let curSlide = 0;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`,
    );
  });
};

const activateDot = function (currentSlide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${currentSlide}"]`)
    .classList.add('dots__dot--active');
};

const goToSlide = function (currentSlide) {
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`),
  );
};

goToSlide(0);
createDots();
activateDot(0);

const nextSlide = function () {
  if (curSlide === slides.length - 1) curSlide = 0;
  else curSlide++;

  goToSlide(curSlide);
  activateDot(curSlide);
};

const preSlide = function () {
  if (curSlide === 0) curSlide = 2;
  else curSlide--;

  goToSlide(curSlide);
  activateDot(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', preSlide);

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') preSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

dotContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    curSlide = e.target.dataset.slide;
    goToSlide(curSlide);
    activateDot(curSlide);
  }
});
