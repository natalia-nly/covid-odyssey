//PAPER ROLL
class Paper {
    constructor(x, y){
      this.x = x;
      this.y = y;
    }
  
    draw(){
      ctx.drawImage(paperImg, this.x, this.y, 20, 20); 
    }
  }
  
//HOME
class Home {
    constructor(x, y){
      this.x = x;
      this.y = y;
    }
  
    draw(){
      ctx.drawImage(homeImg, this.x, this.y, 50, 50); 
    }
}
  
//THERMOMETER
class Thermometer {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  draw(){
    ctx.drawImage(thermImg, this.x, this.y, 20, 20); 
  }
}

//VIRUS
class Virus {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  draw(){
    ctx.drawImage(virusImg, this.x, this.y, 20, 20); 
  }
}