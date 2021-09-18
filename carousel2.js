"use strict";
import { GAME_DATA } from "./GAME_DATA.js";

document.addEventListener("DOMContentLoaded", () => {
  const aboutSlider = document.querySelector(".about-slider");
  GAME_DATA.map((item, i) => {
    const html = `<div class="about-slide">
              <div class="about-img-box">
                <img src="img/aniket.jpg" alt="image" class="about-img" />
              </div>
              <div class="about-box">
                <h2 class="about-header">ABOUT${i}</h2>
              </div>
              <div class="about-txt-box">
                <p class="about-txt">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nost
                </p>
                <hr class="about-hr" />
              </div>
              <div class="about-links-box">
                <i class="fab fa-github-square fa-lg"></i>
                <i class="fas fa-link fa-lg"></i>
              </div>
            </div>`;

    aboutSlider.insertAdjacentHTML("beforeend", html);
  });
});

const slider2 = function () {
  const aboutSlides = document.querySelectorAll(".about-slide");

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
    setTimeout(nextAboutSlide, 3000);
  };

  const init = function () {
    goToAboutSlide(0);
  };
  init();

  // Event handlers
  nextAboutSlide();

  // document.addEventListener("keydown", function (e) {
  //   if (e.key === "ArrowRight") nextAboutSlide();
  // });
};

setTimeout(() => {
  slider2();
}, 100);
