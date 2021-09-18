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
  getRandomGames();
});

const init = () => {
  const textElement = document.querySelector(".home-msg-txt");
  const words = JSON.parse(textElement.getAttribute("data-words"));
  const wait = parseInt(textElement.getAttribute("data-wait"));

  new TypeWriter(textElement, words, wait);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getRandomGames = () => {
  const randomGames = document.querySelector(".random-games");

  const randomNums = [];
  while (randomNums.length < 3) {
    const r = Math.floor(Math.random() * 7);
    if (randomNums.indexOf(r) === -1) randomNums.push(r);
  }

  randomNums.forEach((num, i) => {
    const html = `<div class="random-game random-game-div${i + 1}">
                  <div class="game-img">
                    <img src=${GAME_DATA[num].games[0].image} alt="game" />
                  </div>
                  <div class="game-des">
                    <div class="img-div">
                      <img src=${GAME_DATA[num].profilePic} alt='profilePic' />
                    </div>
                    <span>${GAME_DATA[num].games[0].title}</span>
                    <hr />
                    <div class="game-description">${
                      GAME_DATA[num].games[0].shortDescription
                    }</div>
                  </div>
                  <a href=${GAME_DATA[num].games[0].link} target="_blank">
                  <div class="game-link" >
                    <i class="fas fa-play-circle fa-2x play-icon"></i>
                    <span>PLAY NOW</span>
                  </div>
                  </a>
                </div>`;

    randomGames.insertAdjacentHTML("beforeend", html);
  });
};
