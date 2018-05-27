var emotionTarget = 'init';

const canvas = document.getElementById('animation');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//stand for context
const c = canvas.getContext('2d');
canvas.style.background = "white";
// anger - gravity :
const gravity = 2;

const surpriseColor = [
  [042,099,140],
  [242,163,054],
  [254,204,083],
  [227,134,018],
  [210,077,037]
];

const angerColor = [
  [255,000,000],
  [230,000,000],
  [205,000,000],
  [179,000,000],
  [154,000,000]
];

const happyColor = [
  [138,116,069],
  [227,134,057],
  [241,201,150],
  [216,117,058],
  [214,078,058]
];

const fearColor = [
  [023,051,065],
  [062,097,112],
  [144,169,157],
  [209,221,189],
  [242,242,233]
];
const disguestColor = [
  [161,177,040],
  [140,148,077],
  [199,207,134],
  [115,127,028],
  [069,076,017]
];


window.addEventListener('resize',
  function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    // initEmotionObjects();

});



// Circle Object;
function Circle(x, y, dx, dy, opacity, radius,r,g,b,targetColor){
    this.x = x;
    this.y = y;
    this.velocity = {
      x: dx,
      y: dy
    };
    this.radius = radius;
    // use r g b to store colors
    this.r = r;
    this.g = g;
    this.b = b;
    this.targetColor = [];
    this.emotion = "";
    this.mass = 1;
    this.opacity = opacity;
    this.scale = Math.random()*0.07;
}


Circle.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = 'rgba('+ this.r +','+ this.g +','+ this.b +','+ this.opacity + ')';
    c.fill();
}

Circle.prototype.drawStroke = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.stroke();
    c.closePath();
}

Circle.prototype.drawBoth = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = 'rgba('+ this.r +','+ this.g +','+ this.b +','+ this.opacity + ')';
    c.fill();
    c.strokeStyle = 'black';
    c.stroke();
    c.closePath();
}


/***** 1.Suprise ****/
Circle.prototype.updateToSuprise = function(circles){
   for (var i = 0; i < circles.length; i++) {
     if(this === circles[i]) {
       continue;
     }
     if(getDistance(this.x, this.y, circles[i].x, circles[i].y) < this.radius+circles[i].radius){
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
   this.x += this.velocity.x;
   this.y += this.velocity.y;

   if(this.targetColor[0] > this.r) this.r += 1;
   else if(this.targetColor[0] < this.r) this.r -= 1;
   else ;

   if(this.targetColor[1] > this.g) this.g += 1 ;
   else if(this.targetColor[1] < this.g) this.g -= 1;
   else ;

   if(this.targetColor[2] > this.b) this.b += 1 ;
   else if(this.targetColor[2] < this.b) this.b -= 1;
   else ;

   this.draw();
}
// set to suprise
Circle.prototype.resetToSuprise = function (circles) {
    this.targetColor = randomColor(surpriseColor);
    this.velocity.x = (Math.random() - 0.5)*10;
    this.velocity.y = (Math.random() - 0.5)*10;
    if(this.emotion == "sad") this.radius = randomIntFromRange(2,30);
    this.emotion = "surprise";

}



/***** 2.Anger ****/
Circle.prototype.updateToAnger = function(){
    if(this.y + this.radius + this.velocity.y> canvas.height){
      this.velocity.y = -this.velocity.y;//*0.99
    }else {
      this.velocity.y += gravity;
    }
    if(this.x + this.radius +this.velocity.x > canvas.width||
    this.x - this.radius < 0){
      this.velocity.x = -this.velocity.x;
    }
    this.y += this.velocity.y;
    this.x += this.velocity.x;

    if(this.targetColor[0] > this.r) this.r += 1;
    else if(this.targetColor[0] < this.r) this.r -= 1;
    else ;

    if(this.targetColor[1] > this.g) this.g += 1 ;
    else if(this.targetColor[1] < this.g) this.g -= 1;
    else ;

    if(this.targetColor[2] > this.b) this.b += 1 ;
    else if(this.targetColor[2] < this.b) this.b -= 1;
    else ;

    if(this.radius > 30){
      this.radius -=1;
    } else if(this.radius < 2){
      this.radius +=1;
    } else{
    }
    this.draw();

};

// set to anger
Circle.prototype.resetToAnger = function () {
    this.targetColor = randomColor(angerColor);
    if(this.emotion == "sad") this.radius = randomIntFromRange(2,30);
    this.opacity = 1;
    this.emotion = "anger";
}



/***** 3.Happiness ****/
Circle.prototype.updateToHappiness = function(){
    if(this.x + this.radius > innerWidth ||
      this.x - this.radius < 0){
      this.velocity.x = -this.velocity.x;
    }
    if(this.y + this.radius > innerHeight ||
      this.y - this.radius < 0){
        this.velocity.y = -this.velocity.y;
      }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if(this.targetColor[0] > this.r) this.r += 1;
    else if(this.targetColor[0] < this.r) this.r -= 1;
    else ;

    if(this.targetColor[1] > this.g) this.g += 1 ;
    else if(this.targetColor[1] < this.g) this.g -= 1;
    else ;

    if(this.targetColor[2] > this.b) this.b += 1 ;
    else if(this.targetColor[2] < this.b) this.b -= 1;
    else ;

    if(this.radius > 30){
      this.radius -=1;
    } else if(this.radius < 2){
      this.radius +=1;
    } else{
    }
    this.draw();
};
// set to happiness
Circle.prototype.resetToHappiness = function () {
    this.targetColor = randomColor(happyColor);
    this.velocity.x = (Math.random()-0.5)*3;
    this.velocity.y =(Math.random()-0.5)*3;
    if(this.emotion == "sad") this.radius = randomIntFromRange(2,30);
    this.emotion = "happy";
}


/***** 4.Sadness ****/
Circle.prototype.updateToSadness = function (circles) {
    this.y -= this.velocity.y;
    if(this.y + this.radius< 0){
      this.y = canvas.height+this.radius;
    }
    this.radius += this.scale;
    this.opacity -=0.0002;

    if(this.targetColor[0] > this.r) this.r += 1;
    else if(this.targetColor[0] < this.r) this.r -= 1;
    else ;

    if(this.targetColor[1] > this.g) this.g += 1 ;
    else if(this.targetColor[1] < this.g) this.g -= 1;
    else ;

    if(this.targetColor[2] > this.b) this.b += 1 ;
    else if(this.targetColor[2] < this.b) this.b -= 1;
    else ;

    this.draw();
}
// set to sadness
Circle.prototype.resetToSadness = function () {
    this.targetColor = [255,255,255];
    this.velocity.x = 0;
    this.velocity.y = 0.05+Math.random()*0.5;
    this.opacity = 0.5+Math.random()*0.3;
    this.scale = Math.random()*0.07;
    this.emotion = "sad";
}




/***** 5.Fear ****/
Circle.prototype.updateToFear = function () {
    if(this.velocity.x > 0) this.velocity.x -=0.007;
    else if (this.velocity.x < 0) this.velocity.x +=0.007;
    else ;

    if(this.velocity.y > 0) this.velocity.y -=0.007;
    else if (this.velocity.y < 0) this.velocity.y +=0.007;
    else ;

    this.x += randomFromRange(-1,0)*2;
    this.y += randomFromRange(-1,0)*2;


    if(this.targetColor[0] > this.r) this.r += 1;
    else if(this.targetColor[0] < this.r) this.r -= 1;
    else ;

    if(this.targetColor[1] > this.g) this.g += 1 ;
    else if(this.targetColor[1] < this.g) this.g -= 1;
    else ;

    if(this.targetColor[2] > this.b) this.b += 1 ;
    else if(this.targetColor[2] < this.b) this.b -= 1;
    else ;
    if(this.radius > 30){
      this.radius -=1;
    } else if(this.radius < 2){
      this.radius +=1;
    } else{
    }

    this.drawBoth();
}
Circle.prototype.resetToFear = function (){
    if(this.emotion == "sad") this.radius = randomIntFromRange(2,30);
    this.targetColor = randomColor(fearColor);
    this.emotion = "fear";
}




/***** 6.Disguest ****/

Circle.prototype.updateToDisgust = function () {
    this.x = this.x + randomFromRange(-1,0)*2
    this.y = this.y - randomFromRange(0.1,1);
    if(this.y + this.radius < 0){
      this.y = canvas.height + this.radius;
    }
    if(this.targetColor[0] > this.r) this.r += 1;
    else if(this.targetColor[0] < this.r) this.r -= 1;
    else ;

    if(this.targetColor[1] > this.g) this.g += 1 ;
    else if(this.targetColor[1] < this.g) this.g -= 1;
    else ;

    if(this.targetColor[2] > this.b) this.b += 1 ;
    else if(this.targetColor[2] < this.b) this.b -= 1;
    else ;
    this.drawBoth();
}
Circle.prototype.resetToDisgust = function() {
    this.targetColor = [0,0,0];
    this.opacity = 1;
    if(this.emotion == "sad") this.radius = randomIntFromRange(2,30);
    this.emotion = "disgust";
}


Circle.prototype.stop = function(){
    this.velocity.x = 0;
    this.velocity.y = 0;
}






var circles;

// init the circles
function init() {
    circles = [];

    for (var i = 0; i < 150; i++) {
      var x,y,dx,dy,radius,opacity,color,r, g ,b;
      //console.log(color);
      radius = randomIntFromRange(2,30);
      x = randomIntFromRange(radius, canvas.width-radius);
      y = randomIntFromRange(radius, canvas.height-radius);
      dx = (Math.random() - 0.5)*10;
      dy = (Math.random() - 0.5)*10;
      opacity = 1;
      //color = randomColor(happyColor);
      r = 255;
      g = 255;
      b = 255;

      if(i!=0){
        for (var j = 0; j < circles.length; j++) {
          if(getDistance(x, y, circles[j].x, circles[j].y) < radius*2 ){
            x = randomIntFromRange(radius, canvas.width-radius);
            y = randomIntFromRange(radius, canvas.height-radius);
            j = -1;
          }
        }
      }
     circles.push(new Circle(x, y, dx, dy, opacity, radius, r,g,b));
   }
   circles.forEach(circle => {
     circle.drawBoth();
   });

}


var sadId;
function animateSadness() {
    sadId = requestAnimationFrame(animateSadness);
    // helps us to clear the canvas each time we draw
    c.clearRect(0,0,window.innerWidth, window.innerHeight); // start point, x & y => width & height

    circles.forEach(circle => {
      circle.updateToSadness(circles);
    });

}

var happyId;
function animateHappiness() {
    happyId = requestAnimationFrame(animateHappiness);
    // helps us to clear the canvas each time we draw
    c.clearRect(0,0,window.innerWidth, window.innerHeight); // start point, x & y => width & height
    circles.forEach(circle => {
      circle.updateToHappiness();
    });
}

var angerId;
function animateAnger() {
    angerId = requestAnimationFrame(animateAnger);
    // helps us to clear the canvas each time we draw
    c.clearRect(0,0,window.innerWidth, window.innerHeight); // start point, x & y => width & height
    circles.forEach(circle => {
      circle.updateToAnger();
    });
}

var supriseId;
function animateSuprise() {
    supriseId = requestAnimationFrame(animateSuprise);
    // helps us to clear the canvas each time we draw
    c.clearRect(0,0,window.innerWidth, window.innerHeight); // start point, x & y => width & height
    circles.forEach(circle => {
      circle.updateToSuprise(circles);
    });
}

var fearId;
function animateFear(){
    fearId = requestAnimationFrame(animateFear);
    // helps us to clear the canvas each time we draw
    c.clearRect(0,0,window.innerWidth, window.innerHeight); // start point, x & y => width & height
    circles.forEach(circle => {
      circle.updateToFear();
    });

}
var disguestId;
function animateDisguest(){
    disguestId = requestAnimationFrame(animateDisguest);
    // helps us to clear the canvas each time we draw
    c.clearRect(0,0,window.innerWidth, window.innerHeight); // start point, x & y => width & height
    circles.forEach(circle => {
      circle.updateToDisgust();
    });

}





init();

function sad() {
  cancelAnimationFrame(supriseId);
  cancelAnimationFrame(sadId);
  cancelAnimationFrame(angerId);
  cancelAnimationFrame(happyId);
  cancelAnimationFrame(fearId);
  cancelAnimationFrame(disguestId);
  sweep(canvas, 'background',canvas.style.background, 'black');
  circles.forEach(circle => circle.resetToSadness());
  animateSadness();
}

function happy() {
  cancelAnimationFrame(supriseId);
  cancelAnimationFrame(sadId);
  cancelAnimationFrame(angerId);
  cancelAnimationFrame(happyId);
  cancelAnimationFrame(fearId);
  cancelAnimationFrame(disguestId);
  sweep(canvas, 'background',canvas.style.background, 'white');
  circles.forEach(circle => circle.resetToHappiness());
  animateHappiness();
}

function anger() {
  cancelAnimationFrame(supriseId);
  cancelAnimationFrame(sadId);
  cancelAnimationFrame(angerId);
  cancelAnimationFrame(happyId);
  cancelAnimationFrame(fearId);
  cancelAnimationFrame(disguestId);
  sweep(canvas, 'background',canvas.style.background, 'black');
  circles.forEach(circle => circle.resetToAnger());

  animateAnger();
}

function surprise(){
  cancelAnimationFrame(supriseId);
  cancelAnimationFrame(sadId);
  cancelAnimationFrame(angerId);
  cancelAnimationFrame(happyId);
  cancelAnimationFrame(fearId);
  cancelAnimationFrame(disguestId);
  circles.forEach(circle => circle.resetToSuprise());
  sweep(canvas, 'background',canvas.style.background, 'white');
  animateSuprise();
}

function fear(){
  cancelAnimationFrame(supriseId);
  cancelAnimationFrame(sadId);
  cancelAnimationFrame(angerId);
  cancelAnimationFrame(happyId);
  cancelAnimationFrame(fearId);
  cancelAnimationFrame(disguestId);
  sweep(canvas, 'background',canvas.style.background, 'white');
  circles.forEach(circle => circle.resetToFear());
  animateFear();
}

function disgust() {
  cancelAnimationFrame(supriseId);
  cancelAnimationFrame(sadId);
  cancelAnimationFrame(angerId);
  cancelAnimationFrame(happyId);
  cancelAnimationFrame(fearId);
  cancelAnimationFrame(disguestId);
  sweep(canvas, 'background',canvas.style.background, '#A1B128');
  circles.forEach(circle => circle.resetToDisgust());
  animateDisguest();
}
function stopAll(circles){
  cancelAnimationFrame(supriseId);
  cancelAnimationFrame(sadId);
  cancelAnimationFrame(angerId);
  cancelAnimationFrame(happyId);
  cancelAnimationFrame(fearId);
  cancelAnimationFrame(disguestId);
  circles.forEach(circle => circle.stop());
}

function checkEmotion(){
   if(emotionTarget == 'joy'){
     happy();
     document.getElementById('emotion').innerText = "Glad you are happy!";
   }
   if (emotionTarget == 'sad') {
     sad();
     document.getElementById('emotion').innerText = "Why are you sad?";
   }
   if (emotionTarget == 'disgust'){
     disgust();
     document.getElementById('emotion').innerText = "What disgusts you?";
   }
   if(emotionTarget == 'fear'){
     fear();
     document.getElementById('emotion').innerText = "Don't be scared!";
   }
   if(emotionTarget == 'surprise'){
     surprise();
     document.getElementById('emotion').innerText = "Oh suprise!";
   }
   if(emotionTarget == 'anger'){
     anger();
     document.getElementById('emotion').innerText = "Don't be so angry!";
   }
   if(emotionTarget == ''){
     document.getElementById('emotion').innerText = "To be continued...";
   }
   // console.log(emotionArray);
}

setInterval(checkEmotion, 5000);
