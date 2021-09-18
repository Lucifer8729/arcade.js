'use strict';

let num = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};
const changeBackgroudColor = function (color) {
  document.querySelector('body').style.backgroundColor = color;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage(`⛔ No Number!`);
  } else if (guess === num) {
    displayMessage(`🎉 Correct Number!`);
    changeBackgroudColor('#60b347');
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = num;

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = score;
    }
  } else if (guess !== num) {
    if (score > 1) {
      let message;
      if (guess <= num - 5) {
        message = `📉 Too Low!`;
      } else if (guess < num) {
        message = `📉 Low!`;
      } else if (guess >= num + 5) {
        message = `📈 Too High!`;
      } else if (guess > num) {
        message = `📈 High!`;
      }
      displayMessage(message);
      score--;
      displayScore(score);
    } else {
      displayMessage(`💥 You Lose`);
      displayScore(0);
      changeBackgroudColor('rgb(255, 49, 49)');
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  num = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('.guess').value = '';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  displayMessage('Start guessing...');
  displayScore(score);
  changeBackgroudColor('#222');
});
