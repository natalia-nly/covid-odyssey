//PROTAGONIST
class Protagonist {
    constructor(x, y){
      this.x = x;
      this.y = y;
      this.speedX = widthBox;
      this.speedY = heightBox;
      this.lives = 3;
      this.paper = 0;
      this.infoLives = document.getElementById('number-lifes');
      this.infoPaper = document.getElementById('number-paper');
    }
  
    draw(){
      ctx.drawImage(playerImg, this.x*widthBox, this.y*heightBox, widthBox, heightBox);
    }
  
    limits(newY, newX){
      let collision = 'nothing';
  
      if (scenario[newY][newX] == 1){
        collision = 'platform';
      } else if (scenario[newY][newX] == 2) {
        collision = 'paper';
      } else if (scenario[newY][newX] == 3) {
        collision = 'virus';
      }
  
      return collision;
    }
    
  
    right(){
      if (this.limits(this.y, this.x +1) === "nothing"){
        ++this.x;
      } 
      //paper
      else if (this.limits(this.y, this.x +1) === "paper"){
        ++this.x;
        if(this.paper < 2){
          ++this.paper;
        } else if(this.paper === 2){
          this.paper = 0;
          ++this.lives;
        }
  
        scenario[this.y][this.x] = 0;
      }
      //virus
      else if (this.limits(this.y, this.x +1) === "virus"){
        ++this.x;
        if(this.lives > 0){
          --this.lives;
  
        } if(this.lives == 0) {
        
          setTimeout(gameOverScreen, 500);
        }
      }
  
    }
  
    left(){
      if (this.limits(this.y, this.x -1) === "nothing"){
        --this.x;
      } 
      //paper
      else if (this.limits(this.y, this.x -1) === "paper"){
        --this.x;
        if(this.paper < 2){
          ++this.paper;
        } else if(this.paper === 2){
          this.paper = 0;
          ++this.lives;
        }
  
        scenario[this.y][this.x] = 0;
      }
      //virus
      else if (this.limits(this.y, this.x -1) === "virus"){
        --this.x;
        if(this.lives > 0){
          --this.lives;
  
        } if(this.lives == 0) {
          setTimeout(gameOverScreen, 500);
        }
      }
    }
  
    up(){
      if (this.limits(this.y -1, this.x) === "nothing"){
        --this.y;
      } 
      //paper
      else if (this.limits(this.y -1, this.x) === "paper"){
        --this.y;
        if(this.paper < 2){
          ++this.paper;
        } else if(this.paper === 2){
          this.paper = 0;
          ++this.lives;
        }
  
        scenario[this.y][this.x] = 0;
      }
      //virus
      else if (this.limits(this.y -1, this.x) === "virus"){
        --this.y;
        if(this.lives > 0){
          --this.lives;
  
        } if(this.lives == 0) {
          setTimeout(gameOverScreen, 500);
        }
      }
    }
  
    down(){
      if (this.limits(this.y +1, this.x) === "nothing"){
        ++this.y; 
      } 
      //paper
      else if (this.limits(this.y +1, this.x) === "paper"){
        ++this.y; 
        if(this.paper < 2){
          ++this.paper;
        } else if(this.paper === 2){
          this.paper = 0;
          ++this.lives;
        }
  
        scenario[this.y][this.x] = 0;
      }
      //virus
      else if (this.limits(this.y +1, this.x) === "virus"){
        ++this.y; 
        if(this.lives > 0){
          --this.lives;
  
        } if(this.lives == 0) {
          setTimeout(gameOverScreen, 500);
        }
      }
    }
  }
  