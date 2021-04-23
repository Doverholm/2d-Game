const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const img = document.getElementById("img");
const img2 = document.getElementById("img2");

let playerPosX = 100;
let playerPosY = 100;

let playerLength = 80;
let playerWidth = 30;

let playerVelocityX = 0;
let playerVelocityY = 0;

let playerJumping = true;
let speed = 0;
let playerWallRideVar = false;


let obsticleWidth = 200;
let obsticleHeight = 50;

let obsticlePosX = 400;
let obsticlePosY = canvas.height - obsticleHeight;


let upPressed = false;
let leftPressed = false;
let rightPressed = false;



function drawGame() {
  window.requestAnimationFrame(drawGame);
  clearScreen();
  inputs();
  playerMovement();
  playerCollision();
  playerWallRide();
  drawPlayer();
  drawObsticle();

}



function clearScreen() {
  c.fillStyle = "cyan";
  c.fillRect(0, 0, canvas.width, canvas.height);
}

function inputs() {
  if (rightPressed) {
    playerVelocityX = playerVelocityX + 1.2;
  }
  if (leftPressed) {
    playerVelocityX = playerVelocityX - 1.2;
  }
  if (upPressed && playerJumping == false) {
    playerVelocityY = playerVelocityY - 20;
    playerJumping = true;
  }
}

function playerMovement() {

  playerPosY = playerPosY + playerVelocityY;
  playerPosX = playerPosX + playerVelocityX;

  if (rightPressed == false || leftPressed == false) {
      playerVelocityX = playerVelocityX * 0.85;
  }

  playerVelocityY = playerVelocityY + 1;

  if (playerWallRideVar && upPressed && playerPosX <= 0) {
    playerVelocityY = 0;
    playerVelocityY = playerVelocityY - 20;
    leftPressed = false;
    playerWallRideVar = false;
  }

  if (playerWallRideVar && upPressed && playerPosX <= 0) {
    playerVelocityY = 0;
    playerVelocityY = playerVelocityY - 20;
    leftPressed = false;
    playerWallRideVar = false;
  }

  if (playerWallRideVar && upPressed && playerPosX + playerWidth >= canvas.width) {
    playerVelocityY = 0;
    playerVelocityY = playerVelocityY - 20;
    rightPressed = false;
    playerWallRideVar = false;
  }

}

function playerCollision() {
  if (playerPosY + playerLength >= canvas.height) {
    playerVelocityY = 0;
    playerPosY = canvas.height - playerLength;
    playerJumping = false;
  }

  if (playerPosX <= 0) {
    playerPosX = 0;
    playerVelocityX = 0;
  }

  if (playerPosX + playerWidth >= canvas.width) {
    playerPosX = canvas.width - playerWidth;
    playerVelocityX = 0;
  }

  if (playerPosX + playerWidth > obsticlePosX && playerPosY + playerLength == canvas.height && playerPosX < obsticlePosX + obsticleWidth / 2) {
    playerPosX = obsticlePosX - playerWidth;
    playerVelocityX = 0;
  }

  if (playerPosX < obsticlePosX + obsticleWidth && playerPosX > obsticlePosX + obsticleWidth / 2 && playerPosY + playerLength == canvas.height) {
    playerPosX = obsticlePosX + obsticleWidth;
    playerVelocityX = 0;
  }

  if (playerPosY + playerLength >= obsticlePosY && playerPosX + playerWidth > obsticlePosX && playerPosX < obsticlePosX + obsticleWidth) {
    playerVelocityY = 0;
    playerPosY = obsticlePosY - playerLength;
    playerJumping = false;
  }


}

function playerWallRide() {
  if (playerPosX <= 0 && leftPressed && playerVelocityY > 0 || playerPosX + playerWidth >= canvas.width && rightPressed && playerVelocityY > 0) {
    playerVelocityY = 2.5;
    playerWallRideVar = true;
  }

}

function drawPlayer() {
    c.drawImage(img, playerPosX, playerPosY, 50, 100);
  //  c.drawImage(img2, playerPosX, playerPosY, 50, 100);
}

function drawObsticle() {
  c.fillStyle = "red";
  c.fillRect(obsticlePosX, obsticlePosY, obsticleWidth, obsticleHeight);
}

//ArrowKeys EventListeners-------------------------------------

document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

function keyDown(event) {
  //Right
  if (event.keyCode == 39) {
    rightPressed = true;
  }
  //Left
  if (event.keyCode == 37) {
    leftPressed = true;
  }
  //Up
  if (event.keyCode == 38 || event.keyCode == 32) {
    upPressed = true;
  }
}

function keyUp(event) {
  //Right
  if (event.keyCode == 39) {
    rightPressed = false;
  }
  //Left
  if (event.keyCode == 37) {
    leftPressed = false;
  }
  //up
  if (event.keyCode == 38 || event.keyCode == 32) {
    upPressed = false;
  }
}




drawGame();
