
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//stand for context
const c = canvas.getContext('2d');
//canvas.style.background = "";
const mouse = {
   x: 10,
   y: 10
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
})
window.addEventListener('resize',
  function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();

})

// Object
function Particle(x, y,radius, color){
    this.x = x;
    this.y = y;
    this.velocity = {
      x: (Math.random() - 0.5)*10,// [-0.5, 0.5]
      y: (Math.random() - 0.5)*10
    };
    this.radius = radius;
    this.color = color;
    this.mass = 1;
    this.opacity = 0;


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


      //c.fill();
    };
    this.update = function(particles){
       this.draw();
       // need to detect collision of each of the rest particle

       for (var i = 0; i < particles.length; i++) {
         if(this === particles[i]) {
           continue;
         }
         if(getDistance(this.x, this.y, particles[i].x, particles[i].y) < this.radius*2 ){
           //console.log('collision');
           // this.velocity.x = -this.velocity.x;
           // this.velocity.y = -this.velocity.y;
           resolveCollision(this, particles[i]);
           if(this.opacity < 1 ){
              this.opacity +=0.1;
           }
           //this.radius ++;
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
};



let particles;
// init the particiles
function init() {
    particles = []

    for (var i = 0; i < 100; i++) {
      const radius = 30;
      let x = randomIntFromRange(radius, canvas.width-radius);
      let y = randomIntFromRange(radius, canvas.height-radius);
      const color = randomColor(colorArray);
      if(i!=0){
        for (var j = 0; j < particles.length; j++) {
          if(getDistance(x, y, particles[j].x, particles[j].y) < radius*2 ){
            x = randomIntFromRange(radius, canvas.width-radius);
            y = randomIntFromRange(radius, canvas.height-radius);
            j = -1;
          }
        }
      }
     particles.push(new Particle(x, y, radius, color));

   }

}

function animate() {
    requestAnimationFrame(animate);
    // helps us to clear the canvas each time we draw
    c.clearRect(0,0,window.innerWidth, window.innerHeight); // start point, x & y => width & height

    particles.forEach(particle => {
      particle.update(particles);
    });

}


init();
animate();
