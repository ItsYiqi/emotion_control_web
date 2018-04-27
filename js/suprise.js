
$(document).ready(function(){

    const canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //stand for context
    const c = canvas.getContext('2d');
    canvas.style.background = "white";
    const mouse = {
       x: undefined,
       y: undefined
    };
    // anger - gravity :
    const gravity = 2;

    var colorArray = [
      'rgba(042,099,140,',
      'rgba(242,163,054,',
      'rgba(254,204,083,',
      'rgba(227,134,018,',
      'rgba(210,077,037,'
    ];
    const angerColor = [
      'rgba(255,121,031,',
      'rgba(232,066,012,',
      'rgba(255,022,000,',
      'rgba(156,024,057,',
      'rgba(071,000,056,'
    ];

    const happyColor = [
      'rgba(138,116,069,',
      'rgba(227,134,057,',
      'rgba(241,201,150,',
      'rgba(216,117,058,',
      'rgba(214,078,058,'
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



    // Circle Object;
    function Circle(x, y, dx, dy, opacity, radius,color){
        this.x = x;
        this.y = y;
        this.velocity = {
          x: dx,
          y: dy
        };
        this.radius = radius;
        this.color = color;
        this.mass = 1;
        this.opacity = opacity;
        this.scale = Math.random()*0.07;
    }

    Circle.prototype.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        //c.save();
        //c.globalAlpha = this.opacity;
        //var len = this.color.length;
        c.fillStyle = this.color+ this.opacity + ')';
        c.fill();
        //c.restore();
        //c.strokeStyle = this.color;
        //c.stroke();
        //c.closePath();
    }

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
       this.draw();
       // mouse colision detection
         // if(getDistance(mouse.x, mouse.y, this.x, this.y) < 150 && this.opacity < 1){
         //   this.opacity += 0.05;
         // }else if(this.opacity > 0){
         //   this.opacity -= 0.05;
         //   this.opacity = Math.max(0, this.opacity);
         // }
    }

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
        this.draw();

    };

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
        //interactivity
       //  if(mouse.x - this.x < 80 && mouse.x-this.x >-80
       //   &&mouse.y - this.y < 80 && mouse.y-this.y>-80){
       //   if(this.radius< 40){
       //     this.radius +=2;
       //   }
       //
       // }else if(this.radius> 4){
       //    this.radius -=1;
       //  }
        this.draw();
    };

    Circle.prototype.updateToSadness = function (circles) {
        //this.opacity = Math.random()*0.3 + 0.1;
        this.y -= this.velocity.y;
        //this.velocity.y -= Math.random()*0.0003;
        this.radius += this.scale;

        this.opacity -=0.0002;
        this.draw();
    }


    /************** Reset Functions *******************/
    // set to sadness
    Circle.prototype.resetToSadness = function () {

      this.velocity.x = 0;
      this.velocity.y = 0.05+Math.random()*0.5;
      //this.radius = this.radius;
      this.color = 'rgba(255,255,255,';
      this.opacity = 0.5+Math.random()*0.3;
      this.scale = Math.random()*0.07;
    }

    // set to happiness
    Circle.prototype.resetToHappiness = function () {
      this.velocity.x = (Math.random()-0.5)*3;
      this.velocity.y =(Math.random()-0.5)*3;
      this.color = randomColor(happyColor);
      //this.opacity = 0.5+Math.random()*0.3;
      //this.scale = Math.random()*0.07;
    }

    // set to anger
    Circle.prototype.resetToAnger = function () {
      this.radius = randomIntFromRange(8,30);
      this.velocity.x = randomIntFromRange(-2,2);
      this.velocity.y = randomIntFromRange(-2,2);
      this.color = randomColor(angerColor);
      //this.radius = this.radius;
      //this.color = 'rgba(255,255,255,';
      this.opacity = 1;
    //  this.scale = Math.random()*0.07;

    }

    Circle.prototype.resetToSuprise = function (circles) {
      const radius = randomIntFromRange(2,10);
      let x = randomIntFromRange(radius, canvas.width-radius);
      let y = randomIntFromRange(radius, canvas.height-radius);
      // if(i!=0){
      //   for (var j = 0; j < circles.length; j++) {
      //     if(getDistance(x, y, circles[j].x, circles[j].y) < radius*2 ){
      //       x = randomIntFromRange(radius, canvas.width-radius);
      //       y = randomIntFromRange(radius, canvas.height-radius);
      //       j = -1;
      //     }
      //   }
      // }
      //this.radius = radius;
      this.color = randomColor(colorArray);
      this.x = x;
      this.y = y;
      this.velocity.x = (Math.random() - 0.5)*10;
      this.velocity.y = (Math.random() - 0.5)*10;
    }




    var circles;
    // init the particiles

    function init() {
        circles = [];

        for (var i = 0; i < 200; i++) {
          var x,y,dx,dy,radius,opacity,color;
          //console.log(color);
          radius = randomIntFromRange(10,30);
          x = randomIntFromRange(radius, canvas.width-radius);
          y = randomIntFromRange(radius, canvas.height-radius);
          dx = (Math.random() - 0.5)*10;
          dy = (Math.random() - 0.5)*10;
          opacity = 1;
          color = randomColor(colorArray);
          if(i!=0){
            for (var j = 0; j < circles.length; j++) {
              if(getDistance(x, y, circles[j].x, circles[j].y) < radius*2 ){
                x = randomIntFromRange(radius, canvas.width-radius);
                y = randomIntFromRange(radius, canvas.height-radius);
                j = -1;
              }
            }
          }
         circles.push(new Circle(x, y, dx, dy, opacity, radius, color));

       }


    }
    // origin state;
    function animate() {
        requestAnimationFrame(animate);
        // helps us to clear the canvas each time we draw
        c.clearRect(0,0,window.innerWidth, window.innerHeight); // start point, x & y => width & height

        circles.forEach(circle => {
          circle.draw();
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


    // function resetCircles(circles) {
    //   for(var i = 0; i < circles.length; i++){
    //     var radius = randomIntFromRange(1,10);
    //     circles[i].x = randomIntFromRange(radius, canvas.width-radius);
    //     circles[i].y = randomIntFromRange(radius, canvas.height-radius);
    //     circles[i].velocity.x = (Math.random() - 0.5)*10;
    //     circles[i].velocity.y = (Math.random() - 0.5)*10
    //     circles[i].radius = radius;
    //     //circle[i].color =
    //
    //   }
    // }

    init();
    circles.forEach(circle => {
      circle.draw();
    });


    $('#sadness').click(function(){
      cancelAnimationFrame(supriseId);
      cancelAnimationFrame(angerId);
      cancelAnimationFrame(happyId);
      if(canvas.style.background != 'black'){
        canvas.style.background = 'black'
      }
       circles.forEach(circle => circle.resetToSadness());
       animateSadness();
    })

    $('#happiness').click(function(){
      cancelAnimationFrame(supriseId);
      cancelAnimationFrame(angerId);
      cancelAnimationFrame(sadId);
      if(canvas.style.background != 'white'){
        canvas.style.background = 'white';
      //  c.clearRect(0,0,window.innerWidth, window.innerHeight);
        //init();
      }
      circles.forEach(circle => circle.resetToHappiness());
      //circles.forEach(circle => circle.reset());
      animateHappiness();
    })
    $('#anger').click(function () {
      if(canvas.style.background != 'black'){
        canvas.style.background = 'black'
      }
      cancelAnimationFrame(supriseId);
      cancelAnimationFrame(sadId);
      cancelAnimationFrame(happyId);
      circles.forEach(circle => circle.resetToAnger());

      animateAnger();
      //animateAnger();
    })
    $('#suprise').click(function(){
      //c.clearRect(0,0,window.innerWidth, window.innerHeight);
      if(canvas.style.background != 'white'){
        canvas.style.background = 'white'
      }
      cancelAnimationFrame(sadId);
      cancelAnimationFrame(angerId);
      cancelAnimationFrame(happyId);
      if(canvas.style.background == 'black'){
        canvas.style.background = 'white'
      }
       circles.forEach(circle => circle.resetToSuprise());
       console.log(circles[0]);
       animateSuprise();
    })


});
