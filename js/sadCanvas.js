const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.background = "black";

const mouse = {
  x : undefined,
  y : undefined
};

var maxRadius = 200;
var colorArray = [
  '#FBE7E3',
  '#ECD3D0',
  '#E76042',
  '#B8D1C6',
  '#20344C'
];
window.addEventListener('mousemove',
  function(event){
  mouse.x = event.x;
  mouse.y = event.y;
  //console.log(mouse);
})
window.addEventListener('resize',
  function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();

})
// Inital Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}


// Circle object
function Circle (x, y, dx, dy, radius, maxRadius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.maxRadius = maxRadius;
    this.velocityRadius = 0.2;// the speed of circle gets bigger
  //  this.minRadius = minRadius;
    this.color = color;
    this.opacity = 1;

    this.draw = function(){
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.save();
      c.globalAlpha = this.opacity ;
      c.fillStyle = this.color;
      c.fill();
      c.restore();
      c.strokeStyle = this.color;
      c.stroke();
      c.closePath();
    }

    this.update = function () {

      if(this.x + radius > canvas.width || this.x -radius < 0 ){
        this.dx = -this.dx;
      }
      if(this.y + radius > canvas.height ||this.y -radius < 0){
        this.dy = -this.dy;
      }
      this.x += dx;
      this.y += dy;

      if(this.radius < this.maxRadius){
        this.radius += this.velocityRadius;
        this.opacity -= 0.005;
        this.opacity = Math.max(0, this.opacity);
      }
      if(this.radius > this.maxRadius){
        this.radius = this.maxRadius;
      }

      this.draw();

      // need to detect
    }
}


// using a circleArray to store 100 circle objects;
var circles;

// init the particiles
function init() {
    circles = [];
    for (var i = 0; i < 100; i++) {
      var radius = Math.random()*5;
      var maxRadius = Math.random()*100;
      var x = randomIntFromRange(radius, canvas.width-radius);
      var y = randomIntFromRange(radius, canvas.height-radius);
      // get random speed of the circle
      var dx = (Math.random()-0.5);
      var dy = (Math.random()-0.5);
      circles.push(new Circle(x, y, dx, dy, radius, maxRadius, 'white'));
    }
}

function animate() {
    requestAnimationFrame(animate);
    // helps us to clear the canvas each time we draw
    c.clearRect(0,0,window.innerWidth, window.innerHeight); // start point, x & y => width & height
    for (var i = 0; i < circles.length; i++) {
      //circles[i].draw();
      circles[i].update();
    }




}
init();
animate();
