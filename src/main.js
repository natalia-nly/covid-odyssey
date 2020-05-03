let canvas;
let ctx;
let FPS = 60;
let home;
let protagonist;

//IMAGES
let homeImg;
let virusImg;
let paperImg;
let playerImg;
let thermImg;

//CHANGE HTML CONTENT
const buildDom = (html) => {
    const main = document.querySelector("#main");
    main.innerHTML = html;
  };


function refreshPage(){
    window.location.reload();
} 

const startScreen = () => {
    buildDom(`
        <div class="start-game">
            <div class="card-start">
            <img src="assets/Covid-Odyssey.png" alt="Covid Odyssey" class="img-intro">
                <button onclick="gameBoardScreen();" class="start-game-button">Start game</button>
                <button onclick="instructions();" class="button-instructions">Need help?</button>
            </div>
        </div>
        `);
};


const gameBoardScreen = () => {

    buildDom(`
        <div id="game-board" class="game-board">
            <div class="info-game">
                <div class="info-life info">
                    <img src="assets/heart.svg" alt="lives" value="lives">
                    <p id="number-lifes"></p>
                </div>
                <div>
                <img src="assets/Covid-Odyssey.png" alt="Covid Odyssey" class="logo-board">
                </div>
                <div class="info-paper info">
                    <img src="assets/paper.svg" alt="Paper" value="paper">
                    <p id="number-paper"></p>
                </div>
            </div>
            <canvas id="canvas" width="800" height="400"></canvas>
        </div>
        `);

    createCanvas();
    loadImages();
    setInterval(startGame, 1000/FPS);

};

const winScreen = () => {
    buildDom(`
        <div id="end-game" class="end-game">
            <div class="card-start">
                <img src="assets/player.svg" alt="Covid Odyssey" class="img-intro">
                <h1>You win!!</h1>
                <button onclick="window.location.reload();" class="start-game-button">Play again</button>
            </div>
        </div>
        `);
};

const gameOverScreen = () => {
    buildDom(`
        <div id="end-game" class="end-game">
            <div class="card-start">
            <img src="assets/GameOver.png" alt="Covid Odyssey" class="game-over">
            <button onclick="refreshPage();" class="start-game-button">Play again</button>
            </div>
        </div>
        `);
};

const instructions = () => {
    buildDom(`
    <div class="start-game">
        <div id="instructions-card">
            <button onclick="startScreen()" class="close"><img src="assets/close.svg" alt="Close Button"></button>
            <div class="intro-instructions">
                <img src="assets/Covid-Odyssey.png" alt="Covid Odyssey" class="logo-instructions">
                <p>😷😷Te toca hacer la compra semanal. Llegar a casa en tiempos de cuarentena se puede convertir en toda una odisea... Por el camino tienes que esquivar el virus y recoger rollos de papel de váter.</p> 
            </div>
            <div id="col-instructions">
                <div class="obj-group">
                    <div class="obj-desc">
                        <img src="assets/covid.svg" alt="Covid Odyssey" class="logo-instructions">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ratione tempora quidem odio eveniet</p>
                    </div>
                    <div class="obj-desc">
                        <img src="assets/paper.svg" alt="Covid Odyssey" class="logo-instructions">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ratione tempora quidem odio eveniet</p>    
                    </div>
                    
                </div>
                <div class="obj-group">
                    <div class="obj-desc">
                        <img src="assets/home.svg" alt="Covid Odyssey" class="logo-instructions">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ratione tempora quidem odio eveniet</p>    
                    </div>
                    <div class="obj-desc">
                        <img src="assets/termometro.svg" alt="Covid Odyssey" class="logo-instructions">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ratione tempora quidem odio eveniet</p>
                    </div>
                </div>
            </div>
            <div class="intro-instructions">
                <button onclick="startScreen()" class="start-game-button">Start game</button>  
            </div>
                      
        </div>
    </div>
        `);
};

function createCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");


    //CREATE OBJECTS
    home = new Home(canvas.width - 50, canvas.height - 75);
    protagonist = new Protagonist(0, 350);
}

//UPDATE CANVAS
function updateCanvas(){
    canvas.width = 800;
    canvas.height = 400;
}

//LOAD ALL THE IMAGES
function loadImages(){
    homeImg = new Image();
    homeImg.src = "assets/home.svg";

    playerImg = new Image();
    playerImg.src = "assets/player.svg";

    virusImg = new Image();
    virusImg.src = "assets/covid.svg";

    paperImg = new Image();
    paperImg.src = "assets/paper.svg";

    thermImg = new Image();
    thermImg.src = "assets/termometro.svg";
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

    document.onkeydown = event => {
        switch(event.code) {
            case "ArrowRight":
                protagonist.moveRight();
                break;
            case "ArrowLeft":
                protagonist.moveLeft();
                break;
            case "ArrowUp":
                protagonist.moveUp();
                break;
        }
    };

    document.onkeyup = event => {
        
        switch(event.code) {
            case "ArrowRight":
                protagonist.stopRight();
                break;
            case "ArrowLeft":
                protagonist.stopLeft();
                break;
        }
    };
  
   
  };