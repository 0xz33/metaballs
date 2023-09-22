const canvas = document.getElementById("metaballCanvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

// Define some metaballs
const metaballs = [
  { x: 100, y: 100, r: 50, vx: 2, vy: 2 },
  { x: 300, y: 300, r: 60, vx: -2, vy: -2 },
  // Add more metaballs as needed
];

function f(x, y) {
  let sum = 0;
  for (let ball of metaballs) {
    let dx = x - ball.x;
    let dy = y - ball.y;
    let distSq = dx * dx + dy * dy;
    sum += (ball.r * ball.r) / distSq;
  }
  return sum;
}

function updateMetaballs() {
  for (let ball of metaballs) {
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.x < ball.r || ball.x > width - ball.r) ball.vx = -ball.vx;
    if (ball.y < ball.r || ball.y > height - ball.r) ball.vy = -ball.vy;
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  for (let y = 0; y < height; y += 5) {
    for (let x = 0; x < width; x += 5) {
      if (f(x, y) > 1) {
        ctx.fillRect(x, y, 5, 5);
      }
    }
  }

  updateMetaballs();
  requestAnimationFrame(draw);
}

draw();
