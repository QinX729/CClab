// backgrounds
let ruinImgs = [];
let scrollProgress = 0;
let ruinY = 0;

// 3 modes
let mode = "show";
let isListening = false;

// particles
let doudous = [];
let ininum = 10;
let maxNum = 80;
let dous = [];
let change = 0;

// hand interaction
let handPose;
let hands = [];
let video;
let prevHandX = null;
let prevHandY = null;
let handVelX = 0;
let handVelY = 0;
let handX = null;
let handY = null;

// typing
let words = ["show me", "write me", "tell me"];
let currentIndex = -1;
let wordY;
let transparency = 0;
let state = "rest";
let typedChars = [];
let typedTextObj;
let typeState = "rest";

// voice recognition
let speechRecognition;

// special return
let emojiMap = {
  "water": "💧",
  "fire": "🔥",
  "sun": "☀️",
  "tree": "🌳",
  "love": "❤️",
  "rain": "🌧️"
};


function preload() {
  handPose = ml5.handPose();

  // load ruin images
  ruinImgs[0] = loadImage("ruins-1.png");
  ruinImgs[1] = loadImage("ruins-2.png");
  ruinImgs[2] = loadImage("ruins-3.png");
}

// backgrounds
let activeRuinIndex = 0;
let ruinOpacity = 255;
let ruinYOffset = 0;

function mouseWheel(event) {
  // scroll upward fades ruins upward
  ruinYOffset += event.delta / 4; 
  if (event.delta > 0) {
  ruinOpacity -= event.delta * 0.2;
}

  // When one ruin fades completely, move to next
  if (ruinOpacity <= 0 && activeRuinIndex < ruinImgs.length - 1) {
    activeRuinIndex++;
    ruinOpacity = 255;
    ruinYOffset = 0;
  }

  // Prevent page scrolling
  return false;
}


function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  
  typedTextObj = new RisingTypes();

  textFont("Amatic SC");
  wordY = height/4;

// create & hide the video
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();
  handPose.detectStart(video, gotHands);

  // little doudou
  for (i = 0; i < ininum; i++) {
    doudous.push(new doudou());
  }

  // center dou
  for (let i = 0; i < 300; i++) {
    dous.push(new dou(0.15 * i, i * 0.5));
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  // backgrounds
if (activeRuinIndex < ruinImgs.length) {
  push();
  tint(255, ruinOpacity);
  imageMode(CENTER);
  image(ruinImgs[activeRuinIndex], width/2, height/2 + ruinYOffset, width, height);
  pop();

  fill(50, ruinOpacity);
  textAlign(CENTER);
  textSize(24);
  text("scroll down", width/2, height - 80);

  // Stop drawing rest of creature world until ruins are done
  if (activeRuinIndex < ruinImgs.length - 1) {
    return;
  }
}
  // click for more
  textSize(24);
  fill(0);
  text("click for more", 55, 20);

  // show me write me tell me
  textAlign(CENTER, CENTER);
  textSize(48);

  // hint
  textSize(20);
fill(0);
textAlign(CENTER);

if (mode === "show") {
  text("wave your hand in front of the camera", width/2, height - 100);
}
else if (mode === "write") {
  text("type something; press ENTER to erase", width/2, height - 100);
}
else if (mode === "tell") {
  text("say something; press SPACE to start/stop recording", width/2, height - 100);
}


  // animation
if (state === "fadeIn") {
  transparency += 5;
  wordY -= 0.5;
  if (transparency >= 255) {
    transparency = 255;
    state = "rest";
  }
}

else if (state === "fadeOut") {
  transparency -= 5;
  wordY -= 1;
  if (transparency <= 0) {
    transparency = 0;
    currentIndex = (currentIndex + 1) % words.length;
    wordY = height/4;
    state = "fadeIn";
  }
}
fill(0, transparency);
text(words[currentIndex], width/2, wordY);

  // center dou
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

  // add new doudou
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

  // display typed text
if (typeState === "fadeIn") {
  typedTextObj.fadeIn();
  typedTextObj.display(typedChars);
}

else if (typeState === "fadeOut") {
  typedTextObj.fadeOut();
  typedTextObj.display(typedChars);

  // clear previous word
  if (typedTextObj.transparency <= 0) {
    typedChars = [];   
    typeState = "rest";
    typedTextObj = new RisingTypes();
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

    this.x += random(-0.3, 0.3);
    this.y += random(-0.3, 0.3);

    // movement when no hand
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

class RisingTypes {
  constructor() {
    this.y = height/4;
    this.transparency = 0;

    this.targetY = 3*height/8;  // resting place
    this.fadeOutSpeed = 5;
  }

  fadeIn() {
    this.transparency += 10;
    this.y = lerp(this.y, this.targetY, 0.05);  // smooth rise

    if (this.transparency >= 255) {
      this.transparency = 255;
    }
  }

  fadeOut() {
    this.transparency -= this.fadeOutSpeed;

    if (this.transparency <= 0) {
      this.transparency = 0;
    }
  }

  display(chars) {
    fill(0, this.transparency);
    textAlign(CENTER, CENTER);
    textSize(48);

    // Draw the entire typed string at once
    text(chars.join(""), width/2, this.y);
  }
}


function keyTyped() {
  if (mode !== "write") return; // could only type in write me mode

  typedChars.push(key.toLowerCase());
  typeState = "fadeIn";
}


function gotHands(results) {
  hands = results;
}

function mousePressed() {
  // cycle mode
  currentIndex = (currentIndex + 1) % words.length;

  if (currentIndex === 0) mode = "show";
  if (currentIndex === 1) mode = "write";
  if (currentIndex === 2) mode = "tell";

  // reset states when switching
  typedChars = [];
  typeState = "rest";
  typedTextObj = new RisingTypes();

  // stop voice if switching away from tell
  if (mode !== "tell" && isListening) {
    speechRecognition.stop();
    isListening = false;
  }

  console.log("Mode:", mode);
}

function setupSpeechRecognition() {
  if (speechRecognition)
    return; // already set up
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  speechRecognition = new SpeechRecognition();
  speechRecognition.lang = "en-US";
  // speechRecognition.lang = "zh-CN";
  speechRecognition.continuous = false;
  speechRecognition.interimResults = false;
  speechRecognition.onresult = gotRecognitionResult;
}

function loadRecognizedText(str) {

  let words = str.toLowerCase().split(" ");
  let result = words.map(w => emojiMap[w] ? emojiMap[w] : w);
  let finalText = result.join(" ");

  typedChars = finalText.split(""); 
  typedTextObj = new RisingTypes();
  typeState = "fadeIn";
}

function gotRecognitionResult(event) {
  let speechText = event.results[0][0].transcript;
  console.log("Recognized:", speechText);
  loadRecognizedText(speechText);
}

function keyPressed() {

  // ENTER = erase / emoji
  if (keyCode === ENTER) {
    if (typedChars.length > 0) {
      processTypedWord();
    }
  }

  // SPACE = voice toggle
  if (key === " ") {
    if (mode === "tell") toggleVoice();
  }
}


function processTypedWord() {
  let typedString = typedChars.join("");
  typedString = typedString.toLowerCase();

  typeState = "fadeOut";

  setTimeout(() => {
    let words = typedString.split(" ");
    let result = words.map(w => emojiMap[w] ? emojiMap[w] : w);
    let finalText = result.join(" ");

    typedChars = finalText.split(""); 
    typedTextObj = new RisingTypes();
    typeState = "fadeIn";
  }, 300);
}

function toggleVoice() {
  if (!isListening) {
    setupSpeechRecognition();
    speechRecognition.start();
    isListening = true;
  } else {
    speechRecognition.stop();
    isListening = false;
  }
}