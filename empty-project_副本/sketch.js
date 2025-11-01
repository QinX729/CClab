let mySound;

function preload() {
  mySound = loadSound("assets/beat.mp3");
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  text("Click here to play", 10, 20);
}

function mousePressed() {
  mySound.play();
}