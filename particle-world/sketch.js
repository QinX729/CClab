// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 8; 
let MAX_OF_PARTICLES = 20;
let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // at the beginning
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    let yPos;
    let speedY;
    if (random(1) < 0.5) {
      yPos = -100;
      speedY = random(1, 2);
    } else {
      yPos = 600;
      speedY = random(-2, -1);
    }
    particles.push(new Umbrella(random(100, width - 100), yPos, speedY));
  }
}

function draw() {
  background(50);

  // zebra crossing
  for (let l = 10; l < 500; l += 80) {
    fill(255);
    rect(100, l, 600, 40);
  }

  // add new umbrellas
  if (frameCount % 40 === 0 && particles.length < MAX_OF_PARTICLES) {
    let yPos;
    let speedY;

    if (random(1) < 0.5) {
      yPos = -100;
      speedY = random(1, 2);
    } else {
      yPos = 600;
      speedY = random(-2, -1);
    }

    let newUmbrella = new Umbrella(random(100, width - 100), yPos, speedY);
    particles.push(newUmbrella);
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.move();
    p.display();

    // remove umbrella if off screen
    if (p.y < -200 || p.y > height + 200) {
      particles.splice(i, 1);
    }
  }
}

class Umbrella {
  constructor(x, y, speedY) {
    this.x = x;
    this.y = y;
    this.dia = random(70, 100);
    this.speedY = speedY;
    this.speedX = random(-0.3, 0.3);
    this.color = color(random(200, 255), random(150, 255), random(150, 255));
    this.rotation = random(PI);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += 0.005 * this.speedY; // tiny spin

    // stay safe
    if (this.x < 100 || this.x > width - 100) {
      this.speedX = -this.speedX;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    fill(this.color);
    noStroke();

    // draw umbrella
    beginShape();
    for (let i = 0; i < 8; i++) {
      let angle = TWO_PI / 8 * i;
      let x = cos(angle) * this.dia / 2;
      let y = sin(angle) * this.dia / 2;
      vertex(x, y);
    }
    endShape(CLOSE);
    
    fill (0);
    circle (0, 0, 3);

    for (let i = 0; i < 8; i++) {
      let angle = TWO_PI / 8 * i;
      let x = cos(angle) * this.dia / 2;
      let y = sin(angle) * this.dia / 2;
      vertex(x, y);
      fill (0);
      stroke (2);
      line (0, 0, x, y);
    }

    pop();
  }
}