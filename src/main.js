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
let tileImg;

//SOUND

let paperSound = new Howl({
    src: ['assets/paper.wav'],
    loop: false
});

let virusSound = new Howl({
    src: ['assets/virus.wav'],
    loop: false
});

let thermometerSound = new Howl({
    src: ['assets/thermometer.wav'],
    loop: false
});

let winSound = new Howl({
    src: ['assets/win.wav'],
    loop: false
});

let gameOverSound = new Howl({
    src: ['assets/gameover.wav'],
    loop: false
});



//CHANGE HTML CONTENT
const buildDom = (html) => {
    const main = document.querySelector("#main");
    main.innerHTML = html;
  };


const startScreen = () => {
    buildDom(`
        <div class="start-game">
            <div class="card-start">
            <img src="assets/Covid-Odyssey.png" alt="Covid Odyssey" class="img-intro">
            <p class="mobile-instructions">Oops! This game is only available for computer</p>
                <button id="start-button" class="start-game-button">Start game</button>
                <button id="help-button" class="button-instructions">Need help?</button>
            </div>
        </div>
        `);

        document.getElementById("start-button").onclick = gameBoardScreen;
        document.getElementById("help-button").onclick = instructions;

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

    newGame();
};


const winScreen = () => {
    buildDom(`
        <div class="start-game">
            <div class="card-start">
                <img src="assets/player.svg" alt="Covid Odyssey" class="img-win">
                <p class="nebula">You win!</p>
                <button id="play-again" class="start-game-button">Play again</button>
            </div>
        </div>
        `);

    scenario = JSON.parse(JSON.stringify(resetScenario));
    document.getElementById("play-again").onclick = gameBoardScreen;
};

const gameOverScreen = () => {
    buildDom(`
        <div id="end-game" class="end-game">
            <div class="card-start">
            <p class="nebula">Game over!</p>
            <button id="play-again2" class="start-game-button">Play again</button>
            </div>
        </div>
        `);
    scenario = JSON.parse(JSON.stringify(resetScenario));
    document.getElementById("play-again2").onclick = gameBoardScreen;
};

const instructions = () => {
    buildDom(`
    <div class="start-game">
        <div id="instructions-card">
            <button onclick="startScreen()" class="close"><img src="assets/close.svg" alt="Close Button"></button>
            <div class="intro-instructions">
                <img src="assets/Covid-Odyssey.png" alt="Covid Odyssey" class="logo-instructions">
                <p>😷😷<br>You have to go to the supermarket. During covid quarantine it can be an odyssey... In your way home you should avoid virus and collect as many paper toilet rolls as you can.</p> 
            </div>
            <div id="col-instructions">
                <div class="obj-group">
                    <div class="obj-desc">
                        <img src="assets/covid.svg" alt="Covid Odyssey" class="logo-instructions">
                        <p>💖You start the game with 3 lives. A virus will remove one life! 🦠</p>
                    </div>
                    <div class="obj-desc">
                        <img src="assets/paper.svg" alt="Covid Odyssey" class="logo-instructions">
                        <p>🧻 Try to collect them! Every toilet paper roll, you will have an extra life.</p>    
                    </div>
                    
                </div>
                <div class="obj-group">
                    <div class="obj-desc">
                        <img src="assets/home.svg" alt="Covid Odyssey" class="logo-instructions">
                        <p>🏠That's your goal. You have to arrive home to win!</p>    
                    </div>
                    <div class="obj-desc">
                        <img src="assets/termometro.svg" alt="Covid Odyssey" class="logo-instructions">
                        <p>🌡️ Extra bonus: since you have no fever you win an extra life!</p>
                    </div>
                </div>
            </div>
            <div class="intro-instructions">
                <button onclick="startScreen()" class="start-game-button">Let's go!</button>  
            </div>
                      
        </div>
    </div>
        `);
};

function newGame(){

    createCanvas();
    loadImages();
    setInterval(startGame, 1000/FPS);
}

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

    tileImg = new Image();
    tileImg.src = "assets/tile.png";
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