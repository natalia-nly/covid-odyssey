//PROTAGONIST
class Protagonist {
    constructor(x, y){
      this.x = x;
      this.y = y;
      this.speedX = 0;
      this.speedY = 0;
      this.gravity = 0.5;
      this.friction = 0.3;
      this.jump = 10;
      this.speed = 3;
      this.maxSpeed = 2;
      this.ground = true;
      this.lives = 3;
      this.paper = 0;
      this.right = false;
      this.left = false;
      this.virusActive = true;
      this.win = false;
      this.infoLives = document.getElementById('number-lifes');
      this.infoPaper = document.getElementById('number-paper');
    }

    correctPosition(direction){
      switch(direction){
        case "down":
          this.y = parseInt(this.y/heightBox) * heightBox;
          break;
        case "up":
          this.y = (parseInt(this.y/heightBox) + 1) * heightBox;
          break;
        case "left":
          this.x = (parseInt(this.x/widthBox)) * widthBox;
          break;
        case "right":
          this.x = (parseInt(this.x/widthBox) + 1) * widthBox;
          break;
      }
    }

    collision(x,y){
      let collision = false;

      if(scenario[parseInt(y/heightBox)][parseInt(x/widthBox)] == 1){
        collision = true;
      }

      return collision;
    }

  
    physics(){
      let self = this;
      //gravity
      if(self.ground == false){
        self.speedY += self.gravity;
      } else {
        this.correctPosition("down");
        self.speedY = 0;
      }

      //ground collision
      if(self.speedY > 0){
        if(self.collision(self.x + 1, self.y + heightBox) == true || self.collision(self.x + widthBox -1, self.y + heightBox) == true){
          self.ground = true;
          self.speedY = 0;
          self.correctPosition("down");
        } else {
          self.ground = false;
        }
      }

      //top collision
      if(self.speedY < 0){
        if(self.collision(self.x + 1, self.y) == true || self.collision(self.x + widthBox -1, self.y) == true){
          self.speedY = 0;
          self.correctPosition("up");
        }
      }

      //right collision
      if(self.speedX > 0) {
        if(
          self.collision(self.x + widthBox + self.speedX, self.y + 1) == true || 
          self.collision(self.x + widthBox + self.speedX, self.y + heightBox -1) == true ){
            if(self.x != parseInt(self.x/widthBox) * widthBox){
              self.correctPosition("right");
              self.right = false;
            }
            self.right = false;
            self.speedX = 0;
            
        }
      }

      //left collision
      if(self.speedX < 0) {
        if(
          self.collision(self.x + self.speedX, self.y + 1) || 
          self.collision(self.x + self.speedX, self.y + heightBox - 1)){
            if(self.x != parseInt(self.x/widthBox) * widthBox){
              self.correctPosition("left");
              self.left = false;
            }
            self.left = false;
            self.speedX = 0;
            
        }
      }

      //right
      if (self.right == true && 
        self.speedX <= self.maxSpeed){
        self.speedX += self.speed;
        
      }

      if(self.speedX > 0){
        self.speedX -= self.friction;
        self.ground = false;

        if(self.speedX < 0) {
          self.speedX = 0;
          self.ground = false;
        }
      }

      //left 
      if(self.left == true && self.speedX >= 0-self.maxSpeed) {
        self.speedX -= self.speed;
        
      }

      if(self.speedX < 0) {
        self.speedX += self.friction;
        self.ground = false;

        if(self.speedX > 0) {
          self.speedX = 0;
          self.ground = false;
        }
      }


      self.y += self.speedY;
      self.x += self.speedX;


      //collision paper
      if(scenario[parseInt(self.y/heightBox)][parseInt(self.x/widthBox)] == 2){
        if(self.paper < 2){
          ++self.paper;
          paperSound.play();
        } else if(self.paper === 2){
          self.paper = 0;
          ++self.lives;
          paperSound.play();
        }
  
        scenario[parseInt(self.y/heightBox)][parseInt(self.x/widthBox)] = 0;
      }

      //collision thermometer
      if(scenario[parseInt(self.y/heightBox)][parseInt(self.x/widthBox)] == 5){
        ++self.lives;
        thermometerSound.play();

        scenario[parseInt(self.y/heightBox)][parseInt(self.x/widthBox)] = 0;
      }

      //collision home
      if(scenario[parseInt(self.y/heightBox)][parseInt(self.x/widthBox)] == 4 && self.win == false){
        self.win = true;
        winSound.play();
        setTimeout(winScreen, 500);
      }

      //collision virus  
      
      if(scenario[parseInt(self.y/heightBox)][parseInt(self.x/widthBox)] == 3 && self.virusActive == true){
        if(self.lives > 1){
          --self.lives;
          self.virusActive = false;
          virusSound.play();
          setTimeout(function(){
            self.virusActive = true;
          }, 1000);
        } 
        else if(self.lives == 1) {
          gameOverSound.play();
          setTimeout(gameOverScreen, 500);
        }
      }

    }

    moveUp() {
      if(this.ground == true){
        this.speedY -= this.jump;
        this.ground = false;
      }
    }

    moveRight() {
      let self = this;
      if(
        self.collision(self.x + widthBox + self.speedX, self.y + 1) == true || 
        self.collision(self.x + widthBox + self.speedX, self.y + heightBox -1) == true ){
          self.right = false;
      } else {
        this.right = true;
      }
    }

    moveLeft() {
      let self = this;

      if(
        self.collision(self.x + self.speedX, self.y + 1) == true || 
        self.collision(self.x + self.speedX, self.y + heightBox - 1) == true){
          self.left = false;
      } else {
        self.left = true;
      }

    }

    stopRight(){
      this.right = false;
    }

    stopLeft(){
      this.left = false;
    }

    draw(){
      this.physics();
      ctx.drawImage(playerImg, this.x, this.y, widthBox, heightBox);

      if (this.y >= canvas.height - 25){
        this.ground = true;
      }

    }

  }
  