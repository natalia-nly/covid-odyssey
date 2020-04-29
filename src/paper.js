class Paper {
    constructor(x, y){
      this.x = x;
      this.y = y;
    }
  
    draw(){
      ctx.drawImage(paperImg, this.x, this.y, 20, 20); 
    }
  }
  