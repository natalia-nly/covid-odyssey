class Virus {
    constructor(x, y, speedX, speedY){
      this.x = x;
      this.y = y;
      this.speedX = speedX;
      this.speedY = speedY;
      this.right = true;
    }
  
    draw(){
      ctx.drawImage(virusImg, this.x, this.y, 20, 20); 
    }
  
    move(){
      if(this.right == true){
        if (this.y < canvas.height - 30){
          this.y += this.speedY;
        } else {
          this.right = false;
        }
      } else {
        if (this.y > 30){
          this.y -= this.speedY;
        } else {
          this.right = true;
        }
      }
    }
  }