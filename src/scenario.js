class Home {
    constructor(x, y){
      this.x = x;
      this.y = y;
    }
  
    draw(){
      ctx.drawImage(homeImg, this.x, this.y, 50, 50); 
    }
  }
  

let widthBox = 25;
let heightBox = 25;

let transparent = "rgba(255, 255, 255, 0)";
let brown = "#ca592e";

/*
0 -> NOTHING
1 -> PLATFORM
2 -> PAPER
3 -> VIRUS
4 -> HOME
5 -> THERMOMETER
*/

let scenario = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //1
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //2
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //3
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //4
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //5
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //6
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //7
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //8
  [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //10
  [0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], //11
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0], //12
  [0, 0, 1, 1, 0, 0, 0, 3, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], //13
  [0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 4, 4], //14
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 4, 4], //15
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //15
];


function drawScenario(){
  let color;
  for(let y = 0; y < 16; y++){
    for(let x = 0; x < 33; x++){
     
     switch(scenario[y][x]){
        //NOTHING
        case 0:
          color = transparent;
          break;
        //PLATFORM
        case 1:
          // ctx.fillStyle = brown;
          // ctx.fillRect(x*widthBox, y*heightBox, widthBox, heightBox);
          ctx.drawImage(tileImg, x*widthBox, y*heightBox, widthBox, heightBox); 
          break;
        //PAPER
        case 2:
          let paper1 = new Paper(x*widthBox, y*heightBox);
          paper1.draw();
          break;
        //VIRUS
        case 3:
          let virus1 = new Virus(x*widthBox, y*heightBox, 1, 5);
          virus1.draw();
          break;
        //THERMOMETER
        case 5:
          let therm1 = new Thermometer(x*widthBox, y*heightBox);
          therm1.draw();
          break;
     }
    }
  }
}
