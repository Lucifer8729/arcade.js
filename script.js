import { GAME_DATA } from "./GAME_DATA.js";

class TypeWriter {
  constructor(textElement, words, wait) {
    this.textElement = textElement;
    this.words = words;
    this.wait = wait;
    this.txt = "";
    this.i = 0;
    this.isDeleting = false;

    this.type();
  }

  type() {
    const current = this.i % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.textElement.textContent = this.txt;

    let typeSpeed = 300;
    if (this.isDeleting) typeSpeed /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;

      if (this.i === 0) blinkCursor();
      if (this.i == 1) {
        const cursor = document.querySelector(".msg-cursor");
        setInterval(() => {
          cursor.classList.toggle("blink");
        }, 500);

        return;
      }
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.i = 1;
      this.isDeleting = false;
      typeSpeed = 300;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

const blinkCursor = () => {
  const cursor = document.querySelector(".msg-cursor");
  const blink = setInterval(() => {
    cursor.classList.toggle("blink");
  }, 500);

  setTimeout(() => {
    clearInterval(blink);
  }, 3000);
};

document.addEventListener("DOMContentLoaded", () => {
  blinkCursor();
  setTimeout(init, 3500);
});

const init = () => {
  const textElement = document.querySelector(".home-msg-txt");
  const words = JSON.parse(textElement.getAttribute("data-words"));
  const wait = parseInt(textElement.getAttribute("data-wait"));

  new TypeWriter(textElement, words, wait);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const randomGameDiv1Image = document.querySelector(
  ".random-game-div1 .game-img"
);
// randomGameDiv1.style.backgroundImage = `url("assets/MWjbWaQ.png")`;
randomGameDiv1Image.innerHTML = `<img src="assets/MWjbWaQ.png" alt="game" />`;
// console.log(randomGameDiv1Image);
