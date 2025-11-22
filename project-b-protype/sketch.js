let doudous = [];
let ininum = 5;
let maxNum = 40;
let dous = [];
let change = 0;

function setup() {
  createCanvas(800, 500);
  for (i = 0; i < ininum; i++) {
    doudous.push(new doudou());
  }
  for (let i = 0; i < 300; i++) {
    dous.push(new dou(0.15 * i, i * 0.5));
  }
}

function draw() {
  clear();
  for (let i = 0; i < dous.length; i++) {
    dous[i].display();
  }

  change += 0.01;

  //add new doudou
  if (doudous.length < maxNum && frameCount % 20 == 0) {
    doudous.push(new doudou());
  }

  // remove doudou
  if (doudous.length >= maxNum) {
    for (let i = doudous.length - 1; i >= 0; i--) {
      // remove if outside canvas
      if (
        doudous[i].x < 0 ||
        doudous[i].x > width ||
        doudous[i].y < 0 ||
        doudous[i].y > height
      ) {
        doudous.splice(i, 1);
        continue;
      }

      if (
        doudous[i].x >= 395 &&
        doudous[i].x <= 405 &&
        doudous[i].y >= 245 &&
        doudous[i].y <= 255 &&
        doudous[i].s < 0.5
      ) {
        doudous.splice(i, 1);
      }
    }
  }

  //console.log(doudous.length);
  for (i = 0; i < doudous.length; i++) {
    doudous[i].move();
    doudous[i].display();
  }
}

class doudou {
  constructor(x, y, s, shade, theta) {
    this.x = random(300, 500);
    this.y = random(150, 350);
    this.s = random(5, 10);
    this.shade = random(50, 200);
    this.theta = random(0, 0.5 * PI);
    this.speed = sin(frameCount);
  }

  /*move() {
  this.s += map(noise(frameCount * 0.05 + this.x), 0, 1, -0.5, 0.5);
  this.shade += map(noise(frameCount * 0.05 + this.y), 0, 1, -3, 3);
}*/
  move() {
    //this.speed += sin(frameCount);

    let centerD = dist(width / 2, height / 2, this.x, this.y);

    if (centerD < 3) {
      this.s += map(cos(this.theta), -1, 1, -2, 2);
      //console.log('some particle is in the middle');
    } else if (this.x < width / 2 && this.y < height / 2) {
      this.x -= this.speed;
      this.y -= this.speed;
      this.s += map(cos(this.theta), -1, 1, -0.8, 0.8);
    } else if (this.x > width / 2 && this.y < height / 2) {
      this.x += this.speed;
      this.y -= this.speed;
      this.s += map(cos(this.theta), -1, 1, -0.8, 0.8);
    } else if (this.x < width / 2 && this.y > height / 2) {
      this.x -= this.speed;
      this.y += this.speed;
      this.s += map(cos(this.theta), -1, 1, -0.8, 0.8);
    } else if ((this.x > width / 2, this.y > height / 2)) {
      this.x += this.speed;
      this.y += this.speed;
      this.s += map(cos(this.theta), -1, 1, -0.8, 0.8);
    }
    this.theta += random(0.01, 0.05);
    //this.s += map(cos(this.theta), -1, 1, -0.8, 0.8);
    //this.shade += map(sin(this.theta), -1, 1, -20, 20);
  }

  display() {
    fill(0, this.shade);
    noStroke();
    circle(this.x, this.y, this.s);
  }
}

class dou {
  constructor(radius, roughness) {
    this.radius = radius;
    this.roughness = roughness;
    this.alpha = 1;
  }

  display() {
    push();
    translate(400, 250);
    noStroke();
    if (this.alpha <= 8) {
      this.alpha += 0.01;
    } else {
      this.alpha = 8;
    }
    fill(0, this.alpha);

    beginShape();
    let off = 0;
    for (let a = 0; a < TWO_PI; a += 0.2) {
      let offset = map(
        noise(off, change),
        0,
        1,
        -this.roughness,
        this.roughness
      );
      let r = this.radius + offset;
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
      off += 0.1;
    }
    endShape(CLOSE);
    pop();
  }
}
