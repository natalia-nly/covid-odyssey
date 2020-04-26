


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
  