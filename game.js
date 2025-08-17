let canvas;
let world;
let keyboard = new Keyboard();
let sounds;

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
    sounds = {
        "mainBackground":new Audio("audio/underwater.mp3"),
    };
    const soundBar = document.getElementById('soundBar');
    const soundButton = document.getElementById('soundButton');
    if (soundButton && sounds.mainBackground) {
        soundButton.onclick = () => {
            sounds.mainBackground.muted = !sounds.mainBackground.muted;
            soundButton.innerHTML = sounds.mainBackground.muted ? '🔇' : '🔊';
        };
    }
}

function toggleElementsDisplay(array) {
    array.forEach(element => {
        element.classList.toggle('hidden');
    });
}

function startNewGame() {
    init();
    sounds.mainBackground.loop = true;
    sounds.mainBackground.play();
    const mainMenu = document.getElementById('mainMenu');
    const canvas = document.getElementById('canvas');
    toggleElementsDisplay([canvas, mainMenu, soundBar]);
}

console.log(soundBar);

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
    if (e.keyCode === 32) {
        keyboard.SPACE = true;
        world.character.canAttack = true;
        world.character.attackKey = 32;
    }
    if (e.keyCode === 68) {
        keyboard.D = true;
        world.character.canAttack = true;
        world.character.attackKey = 68;
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
        keyboard.SPACE = false;
    }
    if(e.keyCode === 68){
        keyboard.D = false;
        world.character.canAttack = false;
    }
});