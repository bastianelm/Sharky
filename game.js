/**
 * @fileoverview Main game logic for the 2D Sharky game
 * Manages canvas, world, audio and keyboard input
 */

/** @type {HTMLCanvasElement} Canvas element for the game */
let canvas;

/** @type {World} Main game world object */
let world;

/** @type {Keyboard} Keyboard input handler */
let keyboard = new Keyboard();

/**
 * Initializes the game - canvas, world and audio
 * This function is called on first start and every restart
 * 
 * @function init
 * @description 
 * - Gets canvas reference and creates world
 * - Initializes all game objects
 */
function init(){
    // Get canvas element and create world
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
}

/**
 * Toggles visibility of DOM elements
 * 
 * @function toggleElementsDisplay
 * @param {HTMLElement[]} array - Array of DOM elements
 * @description Adds/removes the 'hidden' CSS class for each element
 */
function toggleElementsDisplay(array) {
    array.forEach(element => {
        element.classList.toggle('hidden');
    });
}

/**
 * Starts a new game from the main menu
 * 
 * @function startNewGame
 * @description
 * - Stops previous audio cleanly
 * - Reinitializes the game
 * - Starts background music
 * - Switches from menu to game view
 */
function startNewGame() {
    
    // Initialize game
    init();
    const mainMenu = document.getElementById('mainMenu');
    const canvas = document.getElementById('canvas');
    
    toggleElementsDisplay([canvas, mainMenu]);
}

/**
 * Restarts the game after Game Over/Win
 * 
 * @function restartGame
 * @description
 * - Stops and resets audio completely
 * - Reinitializes game
 * - Resets level objects
 * - Restarts audio
 * 
 * This function is called by EndScreen.js
 */
function restartGame() {
    // Reset audio - important for clean restart
    if (window.sounds && window.sounds.mainBackground) {
        window.sounds.mainBackground.pause();
        window.sounds.mainBackground.currentTime = 0;
    }
    
    // Reinitialize game
    init();
    
    // Reset level (as required by EndScreen.js)
    world.level.enemies = [];      // Remove all enemies
    world.level.newCoins();        // Generate new coins
    world.level.newPoisonBottles(); // Generate new poison bottles
    
    // Restart audio
    window.sounds.mainBackground.loop = true;
    window.sounds.mainBackground.play().catch(error => {
        console.error('Audio could not be played:', error);
    });
}

// Debug output for development
console.log('Game initialized');

/**
 * Event listener for keyboard input (keys pressed)
 * 
 * @event keydown
 * @description Sets corresponding keyboard flags to true and activates attacks
 */
window.addEventListener('keydown',(e)=>{
    // Arrow keys for movement
    if(e.keyCode === 39){        // Right arrow
        keyboard.RIGHT = true;
    }
    if(e.keyCode === 37){        // Left arrow
        keyboard.LEFT = true;
    }
    if(e.keyCode === 38){        // Up arrow
        keyboard.UP = true;
    }
    if(e.keyCode === 40){        // Down arrow
        keyboard.DOWN = true;
    }
    
    // Attack keys - only set if world and character exist
    if (e.keyCode === 32) {      // Spacebar
        keyboard.SPACE = true;
        if (world && world.character) {
            world.character.canAttack = true;
            world.character.attackKey = 32;
        }
    }
    if (e.keyCode === 68) {      // D key
        keyboard.D = true;
        if (world && world.character) {
            world.character.canAttack = true;
            world.character.attackKey = 68;
        }
    }
});

/**
 * Event listener for keyboard input (keys released)
 * 
 * @event keyup
 * @description Sets corresponding keyboard flags to false and deactivates attacks
 */
window.addEventListener('keyup',(e)=>{
    // Reset movement keys
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
    
    // Reset attack keys
    if(e.keyCode === 32){
        e.preventDefault();
        keyboard.SPACE = false;
    }
    if(e.keyCode === 68){
        keyboard.D = false;
        // Only completely deactivate attack on D key release
        if (world && world.character) {
            world.character.canAttack = false;
        }
    }
});