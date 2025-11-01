/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let doudou;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  doudou = new Doudou(width / 2, height / 2, 0);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  doudou.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class Doudou {
  constructor(startX, startY, startT) {
    this.x = startX;
    this.y = startY;
    this.t = startT;
  }
  display() {
    push();
    this.t += 0.05;
    translate (this.x, this.y);
    //body
    noStroke();
    colorMode(HSB);
    for (let i = -60; i < 70; i += 10) {
      for (let j = -80; j < 60; j += 10) {
        //bodycolor
        let d = dist(i, j, -50, -80);
        let dSize = dist(mouseX - this.x, mouseY - this.y, i, j);
        fill(map(d, 0, 200, 0, 360), 80, 100);
        if (dSize < 30) {
          circle(
            i + 5 * sin(this.t * 2),
            j + 5 * cos(this.t * 2),
            map(dSize, 0, 30, 3, 10)
          );
        } else {
          circle(
            i - 5 * sin(this.t * 2),
            j - 5 * cos(this.t * 2),
            10
          );
        }
      }
    }
    colorMode(RGB);

    //eye
    let ex1, ey1, ex2, ey2;
    let d2 = dist(mouseX-this.x, mouseY-this.y, 0, -50);
    noStroke();
    fill(250);
    circle(-15, -50, 30);
    circle(15, -50, 30);
    if (d2 < 150) {
      fill(0);
      ex1 = map(mouseX-this.x, -70, 70, -20, -10);
      ey1 = map(mouseY-this.y, -100, 50, -60, -45);
      ex2 = map(mouseX-this.x, -70, 70, 10, 20);
      ey2 = map(mouseY-this.y, -100, 50, -60, -45);
      circle(ex1, ey1, 10);
      circle(ex2, ey2, 10);
    } else {
      fill(0);
      circle(-10, -50, 10);
      circle(10, -50, 10);
    }

    // limbs
    stroke(255);
    strokeWeight(3);
    noFill();
    curve(
      -40,
      -80,
      -60 - 5 * sin(this.t * 2),
      0 - 5 * cos(this.t * 2),
      -20,
      0,
      -10,
      -80
    );
    curve(
      40,
      -80,
      60 - 5 * sin(this.t * 2),
      0 - 5 * cos(this.t * 2),
      20,
      0,
      10,
      -80
    );
    curve(
      20,
      80,
      -20 - 5 * sin(this.t * 2),
      50 - 5 * cos(this.t * 2),
      -20,
      90,
      20,
      85
    );
    curve(
      -20,
      80,
      20 - 5 * sin(this.t * 2),
      50 - 5 * cos(this.t * 2),
      20,
      90,
      -20,
      85
    );
  this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/