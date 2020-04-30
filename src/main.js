let canvas;
let ctx;
let FPS = 24;
let home;
let protagonist;

//IMAGES
let homeImg;
let virusImg;
let paperImg;
let playerImg;


//CHANGE HTML CONTENT
const buildDom = (html) => {
    const main = document.querySelector("#main");
    main.innerHTML = html;
  };


const startScreen = () => {
    buildDom(`
        <div class="start-game">
            <div class="card-start">
                <img src="/assets/covid.svg" alt="Covid Odyssey" class="img-intro">
                <h1>Covid<br>Odyssey</h1>
                <button id="start-game-button" class="start-game-button">Start game</button>
            </div>
        </div>
        `);
};


const gameBoardScreen = () => {

    buildDom(`
        <div id="game-board" class="game-board">
            <div class="info-game">
                <div class="info-life info">
                    <img src="/assets/heart.svg" alt="lives" value="lives">
                    <p id="number-lifes"></p>
                </div>
                <div class="info-paper info">
                    <img src="/assets/paper.svg" alt="Paper" value="paper">
                    <p id="number-paper"></p>
                </div>
            </div>
            <canvas id="canvas" width="800" height="400"></canvas>
        </div>
        `);

};

const winScreen = () => {
    buildDom(`
        <div id="end-game" class="end-game">
            <div class="card-start">
                <img src="/assets/covid.svg" alt="Covid Odyssey" class="img-intro">
                <h1>You win!!</h1>
            </div>
        </div>
        `);
};

const gameOverScreen = () => {
    buildDom(`
        <div id="end-game" class="end-game">
            <div class="card-start">
                <img src="/assets/covid.svg" alt="Covid Odyssey" class="img-intro">
                <h1>Game Over</h1>
            </div>
        </div>
        `);
};

function createCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");


    //CREATE OBJECTS
    home = new Home(canvas.width - 100, canvas.height - 76);
    protagonist = new Protagonist(0, 375);
}

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

//////////////////////////////////////////////////////////////////////////////////

window.onload = () => {
    startScreen();
    document.getElementById('start-game-button').onclick = () => {
        gameBoardScreen();
        createCanvas();
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