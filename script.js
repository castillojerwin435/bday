const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFD700', '#FF33A8'];
const balloons = [];
const letters = 'HAPPY BIRTHDAY!'.split('');

class Balloon {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dy = -Math.random() * 2 - 1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.y += this.dy;
    if (this.y + this.radius < 0) {
      this.y = canvas.height + this.radius;
    }
    this.draw();
  }
}

function drawText() {
  ctx.font = '80px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
  for (let i = 0; i < letters.length; i++) {
    ctx.fillText(
      letters[i],
      canvas.width / 2 - 300 + i * 50,
      canvas.height / 2
    );
  }
}

function initBalloons() {
  for (let i = 0; i < 20; i++) {
    const radius = Math.random() * 15 + 10;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = colors[Math.floor(Math.random() * colors.length)];
    balloons.push(new Balloon(x, y, radius, color));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawText();
  balloons.forEach(balloon => balloon.update());
  requestAnimationFrame(animate);
}

initBalloons();
animate();
