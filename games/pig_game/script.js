'use strict';

// selecting elements
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');

const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.querySelector('#score--1');

const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
};

const newGame = function () {
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;

  current0.textContent = 0;
  current1.textContent = 0;

  currentScore = 0;
  activePlayer = 0;
  score[0] = score[1] = 0;
  playing = true;

  diceEl.classList.add('hidden');

  playerEl0.classList.remove('player--winner');
  playerEl1.classList.remove('player--winner');

  playerEl0.classList.add('player--active');
  playerEl1.classList.remove('player--active');
};

// starting conditions
newGame();

btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // add to current score, switching player
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add(`hidden`);

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', newGame);
