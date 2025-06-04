let characters = ['和', '輪', '話', '環', 'わ', 'Wa', 'ワ', '羽'];
let floatTexts = [];
let maxTexts = 15;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textAlign(CENTER, CENTER);

  for (let i = 0; i < 50; i++) {
    addNonOverlappingText();
  }
}

function draw() {
  clear(); // 背景透明に（canvasを固定にしているので重ね描き防止）
  
  for (let ft of floatTexts) {
    ft.update();
    ft.display();
  }

  if (frameCount % 60 === 0 && floatTexts.length < maxTexts) {
    addNonOverlappingText();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function addNonOverlappingText() {
  let tries = 100;
  while (tries-- > 0) {
    let newText = new FloatingText(random(characters));
    let overlapping = false;

    for (let other of floatTexts) {
      let d = dist(newText.x, newText.y, other.x, other.y);
      if (d < (newText.baseSize + other.baseSize) * 3) {
        overlapping = true;
        break;
      }
    }

    if (!overlapping) {
      floatTexts.push(newText);
      break;
    }
  }
}

class FloatingText {
  constructor(char) {
    this.char = char;
    this.x = random(width);
    this.y = random(height);
    this.baseSize = random(30, 60);
    this.amplitude = random(5, 20);
    this.speed = random(0.005, 0.008);
    this.phase = random(TWO_PI);
    this.color = color(random(150, 255), random(150, 255), random(150, 255), 150);
    this.size = this.baseSize;
  }

  update() {
    this.t = millis() * this.speed + this.phase;
    this.size = this.baseSize + sin(this.t) * this.amplitude;
  }

  display() {
    fill(this.color);
    textSize(this.size);
    text(this.char, this.x, this.y);
  }
}
