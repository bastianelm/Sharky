let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
}
function startNewGame(){
    console.log("new game");
    let mainMenu = document.getElementById('mainMenu');
    toggleElementsDisplay(canvas, mainMenu);
}

function toggleElementsDisplay(e1, e2){
    console.log(e1 + " " + e2);
	e1.style.display === "hidden" ? e1.style.display = 'flex' : e1.style.display = 'hidden';
	e2.style.display === "hidden" ? e2.style.display = 'flex' : e2.style.display = 'hidden';
}

window.addEventListener('keydown',(e)=>{
    if(e.keyCode === 39){
        keyboard.RIGHT = true;
    }
    if(e.keyCode === 37){
        keyboard.LEFT = true;
    }
    if(e.keyCode === 38){
        keyboard.UP = true;
    }
    if(e.keyCode === 40){
        keyboard.DOWN = true;
    }
    if(e.keyCode === 32){
        keyboard.SPACE = true;
        world.character.canAttack = false;
    }
});

window.addEventListener('keyup',(e)=>{
    if(e.keyCode === 39){
        keyboard.RIGHT = false;
    }
    if(e.keyCode === 37){
        keyboard.LEFT = false;
    }
    if(e.keyCode === 38){
        keyboard.UP = false;
    }
    if(e.keyCode === 40){
        keyboard.DOWN = false;
    }
    if(e.keyCode === 32){
        keyboard.SPACE = true;
        world.character.canAttack = true;
        world.character.attack = true;
    }
});