"use strict";
import { GAME_DATA } from "./GAME_DATA.js";

document.addEventListener("DOMContentLoaded", () => {
  const aboutSlider = document.querySelector(".about-slider");
  GAME_DATA.map((data) => {
    const html = `<div class="about-slide">
              <div class="about-img-box">
                <img src=${data.aboutPic} alt="image" class="about-img" />
              </div>
              <div class="about-box">
                <h2 class="about-header">ABOUT</h2>
              </div>
              <div class="about-txt-box">
                <p class="about-txt">
                  ${data.about}
                </p>
                <hr class="about-hr" />
              </div>
              <div class="about-links-box">
                <a href=${data.gitLink} target="_blank">
                  <i class="fab fa-github-square fa-2x"></i>
                </a>
                <a href=${data.linkedinLink} target="_blank">
                  <i class="fab fa-linkedin fa-2x"></i>
                </a>
              </div>
            </div>`;

    aboutSlider.insertAdjacentHTML("beforeend", html);
  });
});

const slider2 = function () {
  const aboutSlides = document.querySelectorAll(".about-slide");

  let curAboutSlide = -1;
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

  // document.addEventListener("keydown", function (e) {
  //   if (e.key === "ArrowRight") nextAboutSlide();
  // });
};

setTimeout(() => {
  slider2();
}, 100);
