'use strict';

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const games = document.querySelectorAll('.game-description-box');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions

  const fadeIn = function (element) {
    var op = 1;
    var timer = setInterval(function () {
      if (op <= 0.1) {
        clearInterval(timer);
        element.style.display = 'none';
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ')';
      op -= op * 0.1;
    }, 40);
  };

  const fadeOut = function (element) {
    var op = 0.1; // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
      if (op >= 1) {
        clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ')';
      op += op * 0.1;
    }, 10);
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const goToGame = function (slide) {
    games.forEach((g) => {
      if (!g.classList.contains(`game-${slide}`)) {
        fadeIn(g);
      } else {
        fadeOut(g);
      }
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    goToGame(curSlide);
  };

  const init = function () {
    goToSlide(0);
    goToGame(0);
  };
  init();

  // Event handlers
  btnLeft.addEventListener('click', nextSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
  });
};
slider();
