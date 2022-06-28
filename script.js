'use strict';

// Elements
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const dice = document.querySelector('.dice');

// Buttons
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// Variables
let currentPlayer = 0;
let currentScore = 0;
let gameOver = 0;

// Function

// New Game
const newGame = function () {
  current0.textContent = current1.textContent = 0;
  score0.textContent = score1.textContent = 0;
  currentPlayer = gameOver = 0;
  dice.src = 'http://127.0.0.1:5500/dice-6.png';
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
};

// Roll Dice
const rollDice = function () {
  if (gameOver) return;
  const diceNum = Math.trunc(Math.random() * 6 + 1);
  dice.src = `http://127.0.0.1:5500/dice-${diceNum}.png`;
  if (diceNum == 1) {
    current0.textContent = current1.textContent = 0;
    currentPlayer = 1 - currentPlayer;
    currentScore = 0;
    if (currentPlayer == 0) {
      player1.classList.remove('player--active');
      player0.classList.add('player--active');
    } else {
      player0.classList.remove('player--active');
      player1.classList.add('player--active');
    }
  } else {
    currentScore += diceNum;
    document.querySelector(`#current--${currentPlayer}`).textContent =
      currentScore;
  }
};

// Hold Score
let holdScore = function () {
  if (gameOver) return;
  if (currentPlayer == 0) {
    score0.textContent = Number(score0.textContent) + Number(currentScore);
    if (score0.textContent >= 100) {
      player0.classList.add('player--winner');
      gameOver = 1;
    } else {
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }
  } else {
    score1.textContent = Number(score1.textContent) + Number(currentScore);
    if (score1.textContent >= 100) {
      player1.classList.add('player--winner');
      gameOver = 1;
    } else {
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }
  }
  current0.textContent = current1.textContent = 0;
  currentPlayer = 1 - currentPlayer;
  currentScore = 0;
};

// Main

btnNew.addEventListener('click', newGame);
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
