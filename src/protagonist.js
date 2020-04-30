//PROTAGONIST
class Protagonist {
    constructor(x, y){
      this.x = x;
      this.y = y;
      this.speedX = widthBox;
      this.speedY = heightBox;
      this.gravity = 0.5;
      this.friction = 0;
      this.speed = 0;
      this.lives = 3;
      this.paper = 0;
      this.infoLives = document.getElementById('number-lifes');
      this.infoPaper = document.getElementById('number-paper');
    }
  
    draw(){
      ctx.drawImage(playerImg, this.x, this.y, widthBox, heightBox);
    }
  
    limits(y, x){
      let collision = 'nothing';
      let newY = parseInt(y/heightBox);
      let newX = parseInt(x/widthBox);
  
      if (scenario[newY][newX] == 1){
        collision = 'platform';
      } else if (scenario[newY][newX] == 2) {
        collision = 'paper';
      } else if (scenario[newY][newX] == 3) {
        collision = 'virus';
      } else if (scenario[newY][newX] == 4) {
        collision = 'home';
      }
  
      return collision;
    }
 
  
    right(){
      let collisionRight = this.limits(this.y, this.x + this.speedX);
      if (collisionRight === "nothing"){
        this.x += this.speedX;
      } 
      //paper
      else if (collisionRight === "paper"){
        this.x += this.speedX;
        if(this.paper < 2){
          ++this.paper;
        } else if(this.paper === 2){
          this.paper = 0;
          ++this.lives;
        }
  
        scenario[parseInt(this.y/heightBox)][parseInt(this.x/widthBox)] = 0;
      }
      //virus
      else if (collisionRight === "virus"){
        this.x += this.speedX;
        if(this.lives > 0){
          --this.lives;
  
        } if(this.lives == 0) {
        
          setTimeout(gameOverScreen, 500);
        }
      }
      //home
      else if (collisionRight === "home"){
        setTimeout(winScreen, 500);
      }
  
    }
  
    left(){
      let collisionLeft = this.limits(this.y, this.x - this.speedX);
      if (collisionLeft === "nothing"){
        this.x -= this.speedX;
      } 
      //paper
      else if (collisionLeft === "paper"){
        this.x -= this.speedX;
        if(this.paper < 2){
          ++this.paper;
        } else if(this.paper === 2){
          this.paper = 0;
          ++this.lives;
        }
  
        scenario[parseInt(this.y/heightBox)][parseInt(this.x/widthBox)] = 0;
      }
      //virus
      else if (collisionLeft === "virus"){
        this.x -= this.speedX;
        if(this.lives > 0){
          --this.lives;
  
        } if(this.lives == 0) {
          setTimeout(gameOverScreen, 500);
        }
      }
      //home
      else if (collisionLeft === "home"){
        setTimeout(winScreen, 500);
      }
    }
  
    up(){
      let collisionUp = this.limits(this.y - this.speedY, this.x);
      if (collisionUp === "nothing"){
        this.y -= this.speedY;
      } 
      //paper
      else if (collisionUp === "paper"){
        this.y -= this.speedY;
        if(this.paper < 2){
          ++this.paper;
        } else if(this.paper === 2){
          this.paper = 0;
          ++this.lives;
        }
  
        scenario[parseInt(this.y/heightBox)][parseInt(this.x/widthBox)] = 0;
      }
      //virus
      else if (collisionUp === "virus"){
        this.y -= this.speedY;
        if(this.lives > 0){
          --this.lives;
  
        } if(this.lives == 0) {
          setTimeout(gameOverScreen, 500);
        }
      }
      //home
      else if (collisionUp === "home"){
        setTimeout(winScreen, 500);
      }
    }
  
    down(){
      let collisionDown = this.limits(this.y + this.speedY, this.x);
      if (collisionDown === "nothing"){
        this.y += this.speedY; 
      } 
      //paper
      else if (collisionDown === "paper"){
        this.y += this.speedY; 
        if(this.paper < 2){
          ++this.paper;
        } else if(this.paper === 2){
          this.paper = 0;
          ++this.lives;
        }
  
        scenario[parseInt(this.y/heightBox)][parseInt(this.x/widthBox)] = 0;
      }
      //virus
      else if (collisionDown === "virus"){
        this.y += this.speedY; 
        if(this.lives > 0){
          --this.lives;
  
        } if(this.lives == 0) {
          setTimeout(gameOverScreen, 500);
        }
      }
      //home
      else if (collisionDown === "home"){
        setTimeout(winScreen, 500);
      }
    }
  }
  