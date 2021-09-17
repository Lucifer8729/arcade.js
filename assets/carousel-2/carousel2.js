'use strict';

const slider2 = function () {
  const aboutSlides = document.querySelectorAll('.about-slide');

  let curAboutSlide = 0;
  const maxAboutSlide = aboutSlides.length;

  // Functions

  const goToAboutSlide = function (slide) {
    aboutSlides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextAboutSlide = function () {
    if (curAboutSlide === maxAboutSlide - 1) {
      curAboutSlide = 0;
    } else {
      curAboutSlide++;
    }

    goToAboutSlide(curAboutSlide);
    setTimeout(nextAboutSlide, 5000);
  };

  const init = function () {
    goToAboutSlide(0);
  };
  init();

  // Event handlers
  nextAboutSlide();

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextAboutSlide();
  });
};
slider2();
