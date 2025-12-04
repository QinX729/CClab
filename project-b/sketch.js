let doudous = [];
let ininum = 10;
let maxNum = 80;
let dous = [];
let change = 0;
let handPose;
let hands = [];
let video;
let prevHandX = null;
let prevHandY = null;
let handVelX = 0;
let handVelY = 0;
let handX = null;
let handY = null;

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

// Create & hide the video
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();
  handPose.detectStart(video, gotHands);

  //little doudou
  for (i = 0; i < ininum; i++) {
    doudous.push(new doudou());
  }

  //center dou
  for (let i = 0; i < 300; i++) {
    dous.push(new dou(0.15 * i, i * 0.5));
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  //tell me write me
  textSize(48);
  textFont("Amatic SC");
  fill (0);
  text("tell me, write me", width/2 - 120, height/4);


  //center dou
  for (let i = 0; i < dous.length; i++) {
    dous[i].display();
  }

  change += 0.01;

  // handmovement
  if (hands.length > 0) {
    let kp = hands[0].keypoints[5];
    handX = kp.x;
    handY = kp.y;

    // compute hand movement speed (wind direction)
    if (prevHandX !== null) {
      handVelX = handX - prevHandX;
      handVelY = handY - prevHandY;
    }

    prevHandX = handX;
    prevHandY = handY;
  }

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
        doudous[i].x >= width/2 - 5 &&
        doudous[i].x <= width/2 + 5 &&
        doudous[i].y >= height/2 - 5 &&
        doudous[i].y <= height/2 + 5 &&
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

  //image(video, 0, 0, width, height);
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }
  }
}

class doudou {
  constructor(x, y, s, shade, theta) {
    this.x = random(width/2 - 100, width/2 + 100);
    this.y = random(height/2 - 100, height/2 + 100);
    this.s = random(5, 10);
    this.shade = random(50, 200);
    this.theta = random(0, 0.5 * PI);
    this.speed = sin(frameCount);
  }

  move() {
    this.theta += random(0.01, 0.05);
    this.s += map(cos(this.theta), -1, 1, -0.3, 0.3);

    if (handX !== null) {
      // distance from hand
      let distToHand = dist(this.x, this.y, handX, handY);

      // if hand is close, push doudou away
      if (distToHand < 50) {
        // normalize push direction without vectors
        let dx = this.x - handX;
        let dy = this.y - handY;
        let m = sqrt(dx*dx + dy*dy);
        if (m !== 0) {
          dx /= m;
          dy /= m;
        }
        // push it away
        this.x += dx * 3;
        this.y += dy * 3;
      }

      this.x += handVelX * 0.2;
      this.y += handVelY * 0.2;
    }

    // A tiny random wiggle to keep things lively
    this.x += random(-0.3, 0.3);
    this.y += random(-0.3, 0.3);

    //movement when no hand
    let centerD = dist(width / 2, height / 2, this.x, this.y);

    if (centerD < 3) {
      this.s += map(cos(this.theta), -1, 1, -1.5, 1.5);
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
    translate(width/2, height/2);
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

function gotHands(results) {
  hands = results;
}
