const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

let playerPosX = 100;
let playerPosY = 100;

let playerLength = 100;
let playerWidth = 50;

let playerVelocityX = 0;
let playerVelocityY = 0;

let playerJumping = true;
let speed = 0;
let playerWallRideVar = false;

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

}



function clearScreen() {
  c.fillStyle = "cyan";
  c.fillRect(0, 0, canvas.width, canvas.height);
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
}

function playerWallRide() {
  if (playerPosX <= 0 && leftPressed && playerVelocityY > 0 || playerPosX + playerWidth >= canvas.width && rightPressed && playerVelocityY > 0) {
    playerVelocityY = 2.5;
    playerWallRideVar = true;
  }

}

function drawPlayer() {
  c.fillStyle = "green";
  c.fillRect(playerPosX, playerPosY, playerWidth, playerLength);
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

//ArrowKayes movement------------------------------

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

drawGame();
