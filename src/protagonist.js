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
  
    physics(){
      let self = this;
      //falling
      if(self.ground == false){
        self.speedY += self.gravity;
      } else {
        this.correctPosition("down");
        self.speedY = 0;
      }

      //right
      if (self.right == true){
        self.speedX = self.speed;
      }

      if(self.speedX > 0){
        self.speedX -= self.friction;

        if(self.speedX < 0) {
          self.speedX = 0;
        }
      }

      //left 
      if(self.left == true) {
        self.speedX = -self.speed;
        
      }

      if(self.speedX < 0) {
        self.speedX += self.friction;

        if(self.speedX > 0) {
          self.speedX = 0;
        }
      }


      self.y += self.speedY;
      self.x += self.speedX;

    }

    draw(){
      this.physics();
      this.checkPlatform();
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

    checkPlatform(){
      let collision = this.limits(this.y, this.x);
      
      //platform
      if (collision === "platform"){
        this.ground = true;
      }
    }

    checkCollision(){
      let collisionRight = this.limits(this.y, this.x);
      let collisionLeft = this.limits(this.y, this.x);
      let collisionUp = this.limits(this.y, this.x);
      let collisionDown = this.limits(this.y, this.x);

      this.ground = false;
      
      //platform
      // if (
      //   collisionRight === "platform" || 
      //   collisionLeft === "platform" || 
      //   collisionUp === "platform" || 
      //   collisionDown === "platform"){
      //   this.ground = true;
      // }
      //paper
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
  