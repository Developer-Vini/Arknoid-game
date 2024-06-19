var w=400, h=600, ballsize=10, brickW=30, brickH=20, batW=100, batH=20
var ballX, ballY, dx, dy, bricks=[], batX=w/2, batY=h-50
var c = document.getElementById("canvas")
var ctx = c.getContext("2d")
c.width = w; c.height = h
//????????????????????


function init() {
  bricks=[], ballX=w/2, ballY=h-100, dx=1, dy=1
  for (var y = 0; y < 4; y++) {
    for (var x = y; x <10-y; x++){
      bricks.push({x: 50+x*brickW, y: 50+y*brickH, active: true})
    }
  }
}

function drawRect(color, x, y, w, h) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.rect(x, y, w, h)
  ctx.fill()
}

function drawCircle(color, x, y, r){
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI*2, false)
  ctx.fill()
}

function draw(){
  drawRect('#eee', 0, 0, w, h)
  drawCircle('#f00', ballX, ballY, ballsize)
  for (var i = 0; i < bricks.length; i++) {
    var b = bricks[i];
    if (!b.active) continue
    drawRect('#0f0', b.x, b.y, brickW, brickH)
  }
  drawRect("#00f", batX-batW/2, batY, batW, batH)
}

function move() {
  if(ballX-ballsize+dx < 0 || ballX+ballsize+dx > w) dx = -dx
  if(ballY-ballsize+dy < 0) dy = -dy
  if(ballY+ballsize > batY && ballX+ballsize > batX-batW/2 && ballX-ballsize < batX+batW/2) dy = -dy
  if(ballY+ballsize > h) return false
  ballX += dx
  ballY += dy
  for (var i = 0; i < bricks.length; i++) {
    var b = bricks[i]
    if(!b.active) continue
    if (ballX+ballsize > b.x && ballX-ballsize < b.x+brickW && ballY+ballsize > b.y && ballY-ballsize < b.y+brickH){
      b.active = false
      dy = -dy
      break
    }
  }
  return true;
}

function game() {
  if (!move()){
    alert("Game over!")
    init()
  }
  draw()
}

document.addEventListener("keydown", function(e) {
  switch (e.keyCode) {
    case 37: if (batX > batW/2) batX-=20; break;
    case 39: if (batX < w-batW/2) batX+=20; break;
  }
})

init()
setInterval(game, 10);
