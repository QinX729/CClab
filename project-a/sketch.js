/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let theta = 0;
let col;
let speed = 0.02;
let row;
let r;

let fish1X;
let fish1Y;
let fish2X;
let fish2Y;
let fish3X;
let fish3Y;
let fish1Rand;
let fish2Rand;
let fish3Rand;
let theta2 = 0;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  
  //sky
  noStroke();
  for (let y = 0; y < height; y++) {
    fill(lerpColor(color(58, 212, 232), color(5, 172, 206), y/50));
    rect(0, y*5, width, 5);
  }
  
  //sea1
  noStroke();
  fill(75, 209, 212, 60);
  beginShape();
  vertex(0, 3*height/7);
    for (let col = 0, row = 3*height/7; col < width + 20; col = col + 3) {
      wave = sin(col * 0.01 + theta) * 10;
      vertex(col, row + wave);
    }  vertex(width, 3*height/7)
  vertex(width, height);
  vertex(0, height);
  endShape();
  
  //sea2
  noStroke();
  fill(0, 232, 211, 80);
  beginShape();
  vertex(0, 3*height/7);
    for (let col = 0, row = 3*height/7; col < width + 20; col = col + 3) {
      wave = sin(col * 0.03 + theta) * 10;
      vertex(col, row + wave);
    }  vertex(width, 3*height/7)
  vertex(width, height);
  vertex(0, height);
  endShape();
  
  //sea3
  noStroke();
  fill(3, 139, 140, 50);
  beginShape();
  vertex(0, 3*height/7);
    for (let col = 0, row = 3*height/7; col < width + 20; col = col + 3) {
      wave = cos(col * 0.01 + theta) * 20;
      vertex(col, row + wave);
    }  vertex(width, 3*height/7)
  vertex(width, height);
  vertex(0, height);
  endShape();
  
  //advance angle
  theta += speed;
  
  //shore
  noStroke();
  fill(209, 161, 84);
  triangle(0,height/4, 0, height, width/10, height);
  
  //sun
  for (let r = 10; r > 0; r--) {
    let alpha = map(r, 1, 10, 100, 0);
    fill(255, 204, 0, alpha);
    circle(5*width/7, 2*height/11, r * 50);
  }
  fill(255);
  circle(5*width/7, 2*height/11,30);
  
  //cloud1
  stroke(130);
  fill(130);
  rect(width/6 + 30, height/7 - 25, 90, 50);
  rect(width/6 - 5, height/7 + 25, 180, 60);
  arc(width/6 + 30, height/7, 50, 50, 0.5*PI, -0.5*PI);
  arc(width/6 + 120, height/7, 50, 50, -0.5*PI, 0.5*PI);
  arc(width/6 - 5, height/7 + 55, 60, 60, 0.5*PI, -0.5*PI);
  arc(width/6 + 175, height/7 + 55, 60, 60, -0.5*PI, 0.5*PI);
  
  //cloud2
  stroke(150);
  fill(150);
  rect(width/6, height/7 - 10, 80, 40);
  rect(width/6 - 30, height/7 + 30, 140, 45);
  arc(width/6, height/7 + 10, 40, 40, 0.5*PI, -0.5*PI);
  arc(width/6 + 80, height/7 + 10, 40, 40, -0.5*PI, 0.5*PI);
  arc(width/6 - 30, height/7 + 52.5, 45, 45, 0.5*PI, -0.5*PI);
  arc(width/6 + 110, height/7 + 52.5, 45, 45, -0.5*PI, 0.5*PI);
  // AFTER YOUR CODE HAS RUN:
  //saveCanvas('yourName', 'png'); // saves the canvas as a png image
  
  fish1Rand = random(20, 30);
  fish2Rand = random(20, 30);
  fish3Rand = random(20, 30);

  // start positions
  fish1X = random(width/10, width-20);
  fish1Y = random(height/2, height -20);
  fish2X = random(width/10, width-20);
  fish2Y = random(height/2, height -20);
  fish3X = random(width/10, width-20);
  fish3Y = random(height/2, height -20);  
}

function draw() {
  background(220);

  //sky
  noStroke();
  for (let y = 0; y < height; y++) {
    fill(lerpColor(color(58, 212, 232), color(5, 172, 206), y/50));
    rect(0, y*5, width, 5);
  }
  
  //sea1
  noStroke();
  fill(75, 209, 212, 60);
  beginShape();
  vertex(0, 3*height/7);
    for (let col = 0, row = 3*height/7; col < width + 20; col = col + 3) {
      wave = sin(col * 0.01 + theta) * 10;
      vertex(col, row + wave);
    }  vertex(width, 3*height/7)
  vertex(width, height);
  vertex(0, height);
  endShape();
  
  //sea2
  noStroke();
  fill(0, 232, 211, 80);
  beginShape();
  vertex(0, 3*height/7);
    for (let col = 0, row = 3*height/7; col < width + 20; col = col + 3) {
      wave = sin(col * 0.03 + theta) * 10;
      vertex(col, row + wave);
    }  vertex(width, 3*height/7)
  vertex(width, height);
  vertex(0, height);
  endShape();
  
  //sea3
  noStroke();
  fill(3, 139, 140, 50);
  beginShape();
  vertex(0, 3*height/7);
    for (let col = 0, row = 3*height/7; col < width + 20; col = col + 3) {
      wave = cos(col * 0.01 + theta) * 20;
      vertex(col, row + wave);
    }  vertex(width, 3*height/7)
  vertex(width, height);
  vertex(0, height);
  endShape();
  
  //advance angle
  theta += speed;
  
  //shore
  noStroke();
  fill(209, 161, 84);
  triangle(0,height/4, 0, height, width/10, height);
  
  //sun
  for (let r = 10; r > 0; r--) {
    let alpha = map(r, 1, 10, 100, 0);
    fill(255, 204, 0, alpha);
    circle(5*width/7, 2*height/11, r * 50);
  }
  fill(255);
  circle(5*width/7, 2*height/11,30);
  
  //cloud1
  stroke(130);
  fill(130);
  rect(width/6 + 30, height/7 - 25, 90, 50);
  rect(width/6 - 5, height/7 + 25, 180, 60);
  arc(width/6 + 30, height/7, 50, 50, 0.5*PI, -0.5*PI);
  arc(width/6 + 120, height/7, 50, 50, -0.5*PI, 0.5*PI);
  arc(width/6 - 5, height/7 + 55, 60, 60, 0.5*PI, -0.5*PI);
  arc(width/6 + 175, height/7 + 55, 60, 60, -0.5*PI, 0.5*PI);
  
  //cloud2
  stroke(150);
  fill(150);
  rect(width/6, height/7 - 10, 80, 40);
  rect(width/6 - 30, height/7 + 30, 140, 45);
  arc(width/6, height/7 + 10, 40, 40, 0.5*PI, -0.5*PI);
  arc(width/6 + 80, height/7 + 10, 40, 40, -0.5*PI, 0.5*PI);
  arc(width/6 - 30, height/7 + 52.5, 45, 45, 0.5*PI, -0.5*PI);
  arc(width/6 + 110, height/7 + 52.5, 45, 45, -0.5*PI, 0.5*PI);
  // AFTER YOUR CODE HAS RUN:
  //saveCanvas('yourName', 'png'); // saves the canvas as a png image
  
  moveFish1();
  moveFish2();
  moveFish3();
}

// fish1
function moveFish1() {
  let d = dist(mouseX, mouseY, fish1X, fish1Y);

  if (d < 100) {
    fish1X = lerp(fish1X, mouseX, 0.03);
    fish1Y = lerp(fish1Y, mouseY, 0.03);
  } else {
    fish1X = map(noise(frameCount / (fish1Rand*10)), 0, 1, width/10, width-20);
    fish1Y = map(noise((frameCount + 100) / (fish1Rand *10)), 0, 1, height/2, height-20);
  } 

  drawFish(fish1X, fish1Y, 5, fish1Rand);
}

// fish2
function moveFish2() {
  let d = dist(mouseX, mouseY, fish2X, fish2Y);

  if (d < 100) {
    fish2X = lerp(fish2X, mouseX, 0.01);
    fish2Y = lerp(fish2Y, mouseY, 0.01);
  } else {
    fish2X = map(noise(frameCount / (fish2Rand*8)), 0, 1, width/10, width-20);
    fish2Y = map(noise((frameCount + 100) / (fish2Rand *8)), 0, 1, height/2, height-20);
  }

  drawFish(fish2X, fish2Y, 10, fish2Rand);
}

// fish3
function moveFish3() {
  let d = dist(mouseX, mouseY, fish3X, fish3Y);

  if (d < 100) {
    fish3X = lerp(fish3X, mouseX, 0.05);
    fish3Y = lerp(fish3Y, mouseY, 0.05);
  } else {
    fish3X = map(noise(frameCount / (fish3Rand*5)), 0, 1, width/10, width-20);
    fish3Y = map(noise((frameCount + 100) / (fish3Rand *5)), 0, 1, height/2, height-20);
  }

  drawFish(fish3X, fish3Y, 15, fish3Rand);
}

function drawFish(x, y, num, rand) {
  push();
  
  // color
  let col = map(sin(frameCount/(num * 20)), -1, 1, 0, 1);
  fill(lerpColor(color(255, 71, 101), color(19, 227, 53), col));
  noStroke();

  // body
  circle(x, y, 40);
  fishTail(x, y, num);

  //eyes
  translate(x, y);
  fill(0);
  circle(-5, -5, 10);
  fill(255);
  circle(-5, -5, 3);

  pop();
}

function fishTail(x, y, num) {
  push();
  translate(x + 5, y);
  theta2 += 0.03;

  let col2 = map(sin(frameCount / (num * 20)), -1, 1, 0, 1);
  let tailColor = lerpColor(color(255, 71, 101), color(19, 227, 53), col2);
  tailColor.setAlpha(100);
  stroke(tailColor);
  fill(tailColor);

  rotate(map(sin(frameCount * 0.002 * num), -1, 1, -PI/4, PI/4));
  beginShape();
  for (let column = 0; column < 80; column += 0.5) {
    let wave = sin(column * 0.1 + theta2) * 10;
    vertex(column, wave);
  }
  endShape();
  pop();
}


