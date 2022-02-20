import TileMap from "./TileMap.js";

const canvas = document.getElementById("gameCanvas");

canvas.width = 500;
canvas.height = 500;
const tileCountX = 5;
const tileSizeX = canvas.width / tileCountX - 10;
const gapX = (canvas.width - tileSizeX * tileCountX) / (tileCountX + 1);
const tileCountY = 5;
const tileSizeY = canvas.height / tileCountY - 10;
const gapY = (canvas.height - tileSizeY * tileCountY) / (tileCountY + 1);
const renderSpeed = 10;

const tileMap = new TileMap(tileSizeX, gapX, tileSizeY, gapY);
tileMap.init();

let gameWin = false;
let gameOver = false;
const gameWinSound = new Audio("sounds/gameWin.wav");
const gameOverSound = new Audio("sounds/gameOver.wav");

const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const startButton = document.querySelector(".startButton");
const reloadButton = document.querySelector(".reloadButton");
startButton.addEventListener("click", startGame);
reloadButton.addEventListener("click", reload);

document.getElementById("timerLabel").innerHTML =
  "倒计时 -" + Array(1).fill("\xa0").join("");

let timerActive = false;
let timeArr = [];
let min = 5;
let sec = 0;
if (min < 10) min = "0" + min;
if (sec < 10) sec = "0" + sec;
document.getElementById("timer").innerHTML = min + ":" + sec;

function startGame() {
  startButton.removeEventListener("click", startGame);
  canvas.addEventListener("click", getPos);
  timerActive = true;
  startTimer();
}

gameLoop();

function gameLoop() {
  if (gameOver || gameWin) {
    drawGameEnd();
    return;
  }
  tileMap.draw(ctx);
  checkGameWin();
  checkGameOver();

  setTimeout(gameLoop, 1000 / renderSpeed);
}

function checkGameOver() {
  if (!gameOver) {
    gameOver = isGameOver();
    if (gameOver) {
      gameOverSound.play();
    }
  }
  return gameOver;
}

function checkGameWin() {
  if (!gameWin) {
    gameWin = isGameWin();
    if (gameWin) {
      gameWinSound.play();
    }
  }
  return gameWin;
}

function isGameOver() {
  if (min == 0 && sec == 0) {
    return true;
  } else {
    return false;
  }
}

function isGameWin() {
  if (tileMap.map.flat().toString() == tileMap.mapWin.flat().toString()) {
    return true;
  } else {
    return false;
  }
}

function drawGameEnd() {
  let text = "";
  if (gameWin) {
    // text = "  You Win!";
    document.getElementById("result").innerHTML =
      Array(10).fill("\xa0").join("") +
      Array(3).fill("😎").join("") +
      "成功" +
      Array(3).fill("😎").join("");
    // Array(5).fill("\xa0").join("") + "成功" + Array(5).fill("\xa0").join("");
  } else if (gameOver) {
    // text = "Game Over";
    document.getElementById("result").innerHTML =
      Array(10).fill("\xa0").join("") +
      Array(3).fill("😒").join("") +
      "失败" +
      Array(3).fill("😒").join("");
    // Array(5).fill("\xa0").join("") + "失败" + Array(5).fill("\xa0").join("");
  }

  // ctx.font = "50px Verdana";
  // const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  // gradient.addColorStop("0", "magenta");
  // gradient.addColorStop("0.5", "blue");
  // gradient.addColorStop("1.0", "red");
  // ctx.fillStyle = "white";
  // ctx.fillText(text, canvas.width / 6.5, canvas.height / 1.9);
}

function startTimer() {
  if (timerActive === true) {
    timeArr = document.getElementById("timer").innerHTML.split(":");
    min = timeArr[0];
    sec = timeArr[1];

    if (sec == 0) {
      min--;
      if (min < 10) {
        min = "0" + min;
      }
      sec = "59";
    } else {
      sec--;
      if (sec < 10) {
        sec = "0" + sec;
      }
    }

    document.getElementById("timer").innerHTML = min + ":" + sec;
    if ((min == 0 && sec == 0) || gameWin) return;
    setTimeout(startTimer, 1000);
  }
}

function reload() {
  reload = location.reload();
}

function getPos(e) {
  let column = Math.floor(e.layerX / (tileSizeX + gapX));
  if (column >= tileCountX) column = tileCountX - 1;
  let row = Math.floor(e.layerY / (tileSizeY + gapY));
  if (row >= tileCountY) row = tileCountY - 1;
  // console.log(e.layerX, e.layerY, column, row);
  tileMap.change(row, column);
}
