  
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let FPS = 24;


//IMAGES
let homeImg;
let virusImg;
let paperImg;
let playerImg;


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

//CHANGE HTML CONTENT
const buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
  };

const gameOverScreen = () => {
    buildDom(`
        <div id="end-game" class="game-board-start">
            <div class="card-start">
                <img src="/assets/covid.svg" alt="Covid Odyssey" class="img-intro">
                <h1>Game Over</h1>
            </div>
        </div>
        `);
};

const winScreen = () => {
    buildDom(`
        <div id="end-game" class="end-game">
            <div class="card-start">
                <img src="/assets/covid.svg" alt="Covid Odyssey" class="img-intro">
                <h1>Game Over</h1>
            </div>
        </div>
        `);
};


//////////////////////////////////////////////////////////////////////////////////

window.onload = () => {
    document.getElementById('start-game-button').onclick = () => {
      document.getElementsByClassName('start-game')[0].style.display = "none";
      document.getElementById('game-board').classList.remove('game-board-start');
      document.getElementById('game-board').classList.add('game-board');
      loadImages();
      setInterval(startGame, 1000/FPS);
    };
  
    document.onkeydown = event => {
        switch(event.code){
            case "ArrowRight":
                protagonist.right();
                break;
            case "ArrowLeft":
                protagonist.left();
                break;
            case "ArrowUp":
                protagonist.up();
                break;
            case "ArrowDown":
                protagonist.down();
                break;
        }
       
    };
  
   
  };