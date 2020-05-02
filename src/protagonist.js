//PROTAGONIST
class Protagonist {
    constructor(x, y){
      this.x = x;
      this.y = y;
      this.speedX = 0;
      this.speedY = 0;
      this.gravity = 0.5;
      this.friction = 0.3;
      this.jump = 12;
      this.speed = 3;
      this.maxSpeed = 2;
      this.ground = true;
      this.lives = 3;
      this.paper = 0;
      this.right = false;
      this.left = false;
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
          self.collision(self.x + widthBox + self.speedX, self.y + 1) || 
          self.collision(self.x + widthBox + self.speedX, self.y + heightBox -1)){
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

    }

    moveUp() {
      if(this.ground == true){
        this.speedY -= this.jump;
        this.ground = false;
      }
    }

    moveRight() {
      this.right = true;
    }

    moveLeft() {
      this.left = true;
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

    
    limits(y, x){
      let collision = 'nothing';
      let newY = parseInt(y/heightBox);
      let newX = parseInt(x/widthBox);
      let self = this;
  
      if (scenario[newY][newX] == 1){
        collision = 'platform';
        self.ground = true;
      } else if (scenario[newY][newX] == 2) {
        collision = 'paper';
        self.ground = false;
      } else if (scenario[newY][newX] == 3) {
        collision = 'virus';
        self.ground = false;
      } else if (scenario[newY][newX] == 4) {
        collision = 'home';
        self.ground = false;
      }
  
      return collision;
    }
 
    move(direction){
      let self = this;

      if(direction === "ArrowRight") {
        self.right = true;
        self.checkCollision();
      } else if (direction === "ArrowLeft") {
        self.left = true;
        self.checkCollision();
      } else if (direction === "ArrowUp") {
        if(self.ground == true){
          self.speedY -= self.jump;
          self.ground = false;
        }
        self.checkCollision();
      } else if (direction === "ArrowDown") {
        if(self.ground == false){
          self.y += 25;
          self.checkCollision();
        }
      }

    }

    checkCollision(){
      let collisionRight = this.limits(this.y, this.x);
      let collisionLeft = this.limits(this.y, this.x);
      let collisionUp = this.limits(this.y, this.x);
      let collisionDown = this.limits(this.y, this.x);

      this.ground = false;
      
      if (
        collisionRight === "paper" || 
        collisionLeft === "paper" || 
        collisionUp === "paper" || 
        collisionDown === "paper"){
        if(this.paper < 2){
          ++this.paper;
        } else if(this.paper === 2){
          this.paper = 0;
          ++this.lives;
        }
  
        scenario[parseInt(this.y/heightBox)][parseInt(this.x/widthBox)] = 0;
      }
      //virus
      else if (
        collisionRight === "virus" || 
        collisionLeft === "virus" || 
        collisionUp === "virus" || 
        collisionDown === "virus"
        ){
        if(this.lives > 0){
          --this.lives;
        } 
        else if(this.lives == 0) {
          setTimeout(gameOverScreen, 500);
        }
      }
      //home
      else if (
        collisionRight === "home" || 
        collisionLeft === "home" || 
        collisionUp === "home" || 
        collisionDown === "home"
      ){
        setTimeout(winScreen, 500);
      }
    }
  }
  