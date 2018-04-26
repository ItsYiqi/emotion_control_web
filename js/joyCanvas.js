const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//stand for context
 var c = canvas.getContext('2d');

var mouse = {
   x: undefined,
   y: undefined
};
var maxRadius = 80;
var minRadius = 15;
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

})

function Circle(x, y, dx, dy, radius, minRadius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];

    this.draw = function(){
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.strokeStyle = 'blue';
      c.fillStyle = this.color;
      c.fill();
    };
    this.update = function(){
      if(this.x + radius > innerWidth ||
        this.x - radius < 0){
        this.dx = -this.dx;
      }
      if(this.y + radius > innerHeight ||
        this.y -radius < 0){
          this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interactivity
       if(mouse.x - this.x < 80 && mouse.x-this.x >-80
        &&mouse.y - this.y < 80 && mouse.y-this.y>-80){
        if(this.radius< maxRadius){
          this.radius +=2;
        }

      }else if(this.radius>this.minRadius){
         this.radius -=1;
       }

       //this.draw();

    };
}

// using a circleArray to store 100 circle objects;
var circleArray = [];

// using a for loop to create 100 circle objectsl
for (var i = 0; i < 800; i++) {
    var x = Math.random() * innerWidth;
    var y = Math.random() * innerHeight;
    var dx = (Math.random()-0.5)*3; // get negtive or positive value
    var dy = (Math.random()-0.5)*3;
    var radius = Math.random() * 3 + 1;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate);
    // helps us to clear the canvas each time we draw
    c.clearRect(0,0,window.innerWidth, window.innerHeight); // start point, x & y => width & height
    for (var i = 0; i < circleArray.length; i++) {
      circleArray[i].draw();
      circleArray[i].update();
    }
}

animate();



console.log(canvas);
