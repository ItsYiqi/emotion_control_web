
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//stand for context
const c = canvas.getContext('2d');
//canvas.style.background = "";
const mouse = {
   x: undefined,
   y: undefined
};
// anger - gravity :
const gravity = 1;

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
})
window.addEventListener('resize',
  function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();

})
window.addEventListener('update',
  function(){


})
function changeRadius(orginRadius, targetRadius){

}


// Object
function Circle(x, y, dx, dy,radius, minRadius,color){
    this.x = x;
    this.y = y;
    this.velocity = {
      x: dx,
      y: dy
    };
    this.radius = radius;
    this.color = color;
    this.mass = 1;
    this.opacity = 1;


    this.draw = function(){
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.save();
      c.globalAlpha = this.opacity;
      c.fillStyle = this.color;
      c.fill();
      c.restore();
      c.strokeStyle = this.color;
      c.stroke();
      c.closePath();
    };


    this.updateToSuprise = function(circles){
       for (var i = 0; i < circles.length; i++) {
         if(this === circles[i]) {
           continue;
         }
         if(getDistance(this.x, this.y, circles[i].x, circles[i].y) < this.radius*2 ){

           resolveCollision(this, circles[i]);
           if(this.opacity < 1 ){
              this.opacity +=0.1;
           }

         }
         if(this.opacity >=1){
           this.opacity -= 0.3;
           this.opacity = Math.max(0, this.opacity);
         }
         if(this.x - this.radius < 0 || this.x + this.radius > canvas.width){
           this.velocity.x = -this.velocity.x;
         }
         if(this.y - this.radius < 0 || this.y + this.radius > canvas.height){
           this.velocity.y = -this.velocity.y;
         }
       }
       // mouse colision detection
         // if(getDistance(mouse.x, mouse.y, this.x, this.y) < 150 && this.opacity < 1){
         //   this.opacity += 0.05;
         // }else if(this.opacity > 0){
         //   this.opacity -= 0.05;
         //   this.opacity = Math.max(0, this.opacity);
         // }

         this.x += this.velocity.x;
         this.y += this.velocity.y;
    };

    this.updateToAnger = function(){
      if(this.y + this.radius + this.velocity.y> canvas.height){
        this.velocity.y = -this.velocity.y * 0.99;
      }else {
        this.velocity.y +=gravity;
      }
      if(this.x + this.radius +this.velocity.x > canvas.width||
      this.x - this.radius < 0){
        this.velocity.x = -this.velocity.x;
      }
      this.y += this.velocity.y;
      this.x += this.velocity.x;
      //this.draw();

    };

    this.updateToHappiness = function(){

    }

}




var circles;
// init the particiles
function init() {
    circles = [];

    for (var i = 0; i < 100; i++) {
      var radius = 30;
      var x = randomIntFromRange(radius, canvas.width-radius);
      var y = randomIntFromRange(radius, canvas.height-radius);
      var dx = (Math.random() - 0.5)*10;
      var dy = (Math.random() - 0.5)*10;
      var color = randomColor(colorArray);

      if(i!=0){
        for (var j = 0; j < circles.length; j++) {
          if(getDistance(x, y, circles[j].x, circles[j].y) < radius*2 ){
            x = randomIntFromRange(radius, canvas.width-radius);
            y = randomIntFromRange(radius, canvas.height-radius);
            j = -1;
          }
        }
      }

     circles.push(new Circle(x, y, dx, dy, radius, color));

   }

}

var globalID;
function animate() {
    globalID = requestAnimationFrame(animate);
    // helps us to clear the canvas each time we draw
    c.clearRect(0,0,window.innerWidth, window.innerHeight); // start point, x & y => width & height

    circles.forEach(circle => {
      circle.draw();
      circle.updateToAnger(circles);
    });

    // if(mouse.x < innerWidth/2 && mouse.y < innerHeight/2){
    //   cancelAnimationFrame(globalID);
    // }
    // if(mouse.x > innerWidth/2 && mouse.y > innerHeight/2){
    //   globalID = requestAnimationFrame();
    // }
    // circles.forEach(circle => {
    //   circle.updateToAnger();
    // });
}


init();
animate();
