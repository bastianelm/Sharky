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

/** @type {Object.<string, HTMLAudioElement>} Audio objects for the game */
let sounds;

/** @type {HTMLElement} Sound control bar element */
let soundBar;

/**
 * Initializes the game - canvas, world and audio
 * This function is called on first start and every restart
 * 
 * @function init
 * @description 
 * - Gets canvas reference and creates world
 * - Creates audio objects (only on first time)
 * - Sets sound button event listener (prevents duplicates)
 * - Initializes all game objects
 */
function init(){
    // Get canvas element and create world
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
    debugger
    // Create audio object only once, if it doesn't exist yet
    // Prevents multiple audio instances on restart
    if (!sounds) {
        sounds = {
            "mainBackground": new Audio("audio/underwater.mp3"),
            "won": new Audio("audio/won.mp3"),
            "lose": new Audio("audio/lose.mp3"),
        };
    }
    
    // Get DOM references for sound controls
    soundBar = document.getElementById('soundBar');
    const soundButton = document.getElementById('soundButton');
    
    // Set event listener only once to avoid duplicates
    // The data-attribute prevents multiple event listener assignments
    if (soundButton && sounds.mainBackground && !soundButton.hasAttribute('data-listener-set')) {
        soundButton.onclick = () => {
            // Toggle mute/unmute
            sounds.mainBackground.muted = !sounds.mainBackground.muted;
            // Change icon accordingly
            soundButton.innerHTML = sounds.mainBackground.muted ? '🔇' : '🔊';
        };
        // Mark that the listener has been set
        soundButton.setAttribute('data-listener-set', 'true');
    }
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
    // Stop previous audio if it's running
    // Important: pause() stops playback, currentTime = 0 resets to beginning
    if (sounds && sounds.mainBackground) {
        sounds.mainBackground.pause();
        sounds.mainBackground.currentTime = 0;
    }
    
    // Initialize game
    init();
    
    // Set audio settings and start
    sounds.mainBackground.loop = true; // Infinite loop
    // .catch() handles errors (e.g. when browser blocks audio)
    sounds.mainBackground.play().catch(error => {
        console.error('Audio could not be played:', error);
    });
    
    // Switch UI elements: hide menu, show canvas and sound bar
    const mainMenu = document.getElementById('mainMenu');
    const canvas = document.getElementById('canvas');
    
    // Ensure soundBar is defined (fallback)
    if (!soundBar) {
        soundBar = document.getElementById('soundBar');
    }
    
    toggleElementsDisplay([canvas, mainMenu, soundBar]);
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
    if (sounds && sounds.mainBackground) {
        sounds.mainBackground.pause();
        sounds.mainBackground.currentTime = 0;
    }
    
    // Reinitialize game
    init();
    
    // Reset level (as required by EndScreen.js)
    world.level.enemies = [];      // Remove all enemies
    world.level.newCoins();        // Generate new coins
    world.level.newPoisonBottles(); // Generate new poison bottles
    
    // Restart audio
    sounds.mainBackground.loop = true;
    sounds.mainBackground.play().catch(error => {
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