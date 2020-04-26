const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let FPS = 24;


//IMAGES
let homeImg;
let virusImg;
let paperImg;
let playerImg;


//HOME
class Home {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  draw(){
    ctx.drawImage(homeImg, this.x, this.y, 100, 76); 
  }
}


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
    }
    //virus
    else if (this.limits(this.y, this.x +1) === "virus"){
      ++this.x;
      if(this.lives > 0){
        --this.lives;

      } if(this.lives == 0) {
      
        setTimeout(function(){
          document.getElementById('end-game').classList.remove('game-board-start');
          document.getElementById('end-game').classList.add('end-game');
        }, 1000);
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
    }
    //virus
    else if (this.limits(this.y, this.x -1) === "virus"){
      --this.x;
      if(this.lives > 0){
        --this.lives;

      } if(this.lives == 0) {
      
        setTimeout(function(){
          document.getElementById('end-game').classList.remove('game-board-start');
          document.getElementById('end-game').classList.add('end-game');
        }, 1000);
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
    }
    //virus
    else if (this.limits(this.y -1, this.x) === "virus"){
      --this.y;
      if(this.lives > 0){
        --this.lives;

      } if(this.lives == 0) {
      
        setTimeout(function(){
          document.getElementById('end-game').classList.remove('game-board-start');
          document.getElementById('end-game').classList.add('end-game');
        }, 1000);
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
    }
    //virus
    else if (this.limits(this.y +1, this.x) === "virus"){
      ++this.y; 
      if(this.lives > 0){
        --this.lives;

      } if(this.lives == 0) {
      
        setTimeout(function(){
          document.getElementById('end-game').classList.remove('game-board-start');
          document.getElementById('end-game').classList.add('end-game');
        }, 1000);
      }
    }
  }
}


//VIRUS

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


//WC PAPER
class Paper {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  draw(){
    ctx.drawImage(paperImg, this.x, this.y, 20, 20); 
  }
}




//SCENARIO

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
*/

let scenario = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //0
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //1
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //2
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //3
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //4
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //5
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //6
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //7
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //8
  [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //10
  [0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //11
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //12
  [0, 0, 1, 1, 0, 0, 0, 3, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4], //13
  [0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4], //14
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4], //15
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
          ctx.fillStyle = brown;
          ctx.fillRect(x*widthBox, y*heightBox, widthBox, heightBox);
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
     }
    }
  }
}

//CREATE OBJECTS
let home = new Home(canvas.width - 100, canvas.height - 76);

let protagonist = new Protagonist(0, 15);


//UPDATE CANVAS
function updateCanvas(){
  canvas.width = 800;
  canvas.height = 400;
}

//LOAD ALL THE IMAGES
function loadImages(){
  homeImg = new Image();
  homeImg.src = "../assets/home.png";

  playerImg = new Image();
  playerImg.src = "../assets/player.svg";

  virusImg = new Image();
  virusImg.src = "../assets/covid.svg";

  paperImg = new Image();
  paperImg.src = "../assets/paper.svg";
}

//START THE GAME
function startGame(){
  updateCanvas();
  home.draw();
  drawScenario();
  protagonist.draw();
  protagonist.infoLives.innerHTML = protagonist.lives;
  protagonist.infoPaper.innerHTML = protagonist.paper;
  
}



