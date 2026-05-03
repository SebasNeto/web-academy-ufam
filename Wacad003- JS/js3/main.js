const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.querySelector("#themeColor");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function getThemeColor() {
  const base = hexToRgb(colorPicker.value);
  const factor = random(50, 100) / 100;
  return `rgb(${base.r * factor}, ${base.g * factor}, ${base.b * factor})`;
}

function Shape(x, y, velX, velY, color, size, type) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
  this.type = type;
}

Shape.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  if (this.type === 'circle') {
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  } else {
    ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
  }
  ctx.fill();
};

Shape.prototype.update = function() {
  if (this.x + this.size >= width) this.velX = -this.velX;
  if (this.x - this.size <= 0) this.velX = -this.velX;
  if (this.y + this.size >= height) this.velY = -this.velY;
  if (this.y - this.size <= 0) this.velY = -this.velY;
  this.x += this.velX;
  this.y += this.velY;
};

Shape.prototype.collisionDetect = function() {
  for (let j = 0; j < shapes.length; j++) {
    if (!(this === shapes[j])) {
      const dx = this.x - shapes[j].x;
      const dy = this.y - shapes[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.size + shapes[j].size) {
        shapes[j].color = this.color = getThemeColor();
      }
    }
  }
};

let shapes = [];
while (shapes.length < 25) {
  let size = random(10, 20);
  let type = random(0, 1) === 0 ? 'circle' : 'square';
  let shape = new Shape(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    getThemeColor(),
    size,
    type
  );
  shapes.push(shape);
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].draw();
    shapes[i].update();
    shapes[i].collisionDetect();
  }
  requestAnimationFrame(loop);
}

loop();