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
 
    move(direction){
      let collision;
      let movement;
      let self = this;

      switch(direction) {
        case "ArrowRight":
          collision = this.limits(this.y, this.x + this.speedX);
          movement = function(){self.x += self.speedX;};
          break;
        case "ArrowLeft":
          collision = this.limits(this.y, this.x - this.speedX);
          movement = function(){self.x -= self.speedX;};
          break;
        case "ArrowUp":
          collision = this.limits(this.y - this.speedY, this.x);
          movement = function(){self.y -= self.speedY;};
          break;
        case "ArrowDown":
          collision = this.limits(this.y + this.speedY, this.x);
          movement = function(){self.y += self.speedY;};
          break;
      }

      if (collision === "nothing"){
        movement(); 
      } 
      //paper
      else if (collision === "paper"){
        movement();
        if(this.paper < 2){
          ++this.paper;
        } else if(this.paper === 2){
          this.paper = 0;
          ++this.lives;
        }
  
        scenario[parseInt(this.y/heightBox)][parseInt(this.x/widthBox)] = 0;
      }
      //virus
      else if (collision === "virus"){
        movement();
        if(this.lives > 0){
          --this.lives;
        } 
        else if(this.lives == 0) {
          setTimeout(gameOverScreen, 500);
        }
      }
      //home
      else if (collision === "home"){
        setTimeout(winScreen, 500);
      }

    }
  }
  