/**
 * @fileoverview EndScreen class for Game Over and Victory screens
 * Shows appropriate images and Try Again button
 */

/**
 * EndScreen class - manages Game Over / Victory screens
 * 
 * @class EndScreen
 * @description 
 * Creates an end screen with title (Game Over/You Win) and Try Again button.
 * Handles clicks on the Try Again button for game restart.
 */
class EndScreen {

    /**
     * Configuration for Game Over screen
     * @type {Object}
     * @property {string} img - Path to the Game Over image
     * @property {number} width - Width of the image in pixels
     * @property {number} height - Height of the image in pixels
     */
    lostGame = {
        'img' : 'img/6.Botones/Tittles/Game Over/Recurso 9.png',
        'width' : 700,
        'height' : 98,
    };

    /**
     * Configuration for Victory screen
     * @type {Object}
     * @property {string} img - Path to the Victory image
     * @property {number} width - Width of the image in pixels
     * @property {number} height - Height of the image in pixels
     */
    wonGame = {
        'img': 'img/6.Botones/Tittles/You win/Mesa de trabajo 1.png',
        'width' : 520,
        'height' : 205,
    }

    /**
     * Configuration for Try Again button
     * @type {Object}
     * @property {string} img - Path to the button image
     * @property {number} width - Width of the button in pixels
     * @property {number} height - Height of the button in pixels
     */
    reloadButton = {
        'img': 'img/6.Botones/Try again/Recurso 17.png',
        'width' : 557,
        'height' : 106,
    }

    /**
     * Creates a new EndScreen
     * 
     * @constructor
     * @param {boolean} wonGame - true for Victory screen, false for Game Over screen
     * @description
     * - Selects appropriate title image based on wonGame parameter
     * - Positions title image centered at the top
     * - Positions Try Again button centered below the title
     * - Adds both objects to the objects array
     */
    constructor(wonGame) {
        /** @type {DrawableObject[]} Array of all drawable objects */
        this.objects = [];
        
        // Select title image based on game outcome
        const selectedImage = wonGame ? this.wonGame : this.lostGame;
        
        // Create and configure title image
        const screenImage = new DrawableObject();
        screenImage.loadImage(selectedImage.img);
        screenImage.width = selectedImage.width;
        screenImage.height = selectedImage.height;
        // Center horizontally
        screenImage.x = (canvas.width - screenImage.width) / 2;
        screenImage.y = 100; // Fixed Y position from top
        
        // Create and configure Try Again button
        const reloadButton = new DrawableObject();
        reloadButton.loadImage(this.reloadButton.img);
        reloadButton.width = this.reloadButton.width;
        reloadButton.height = this.reloadButton.height;
        // Center horizontally
        reloadButton.x = (canvas.width - reloadButton.width) / 2;
        // Position below the title image (with 20px spacing)
        reloadButton.y = screenImage.y + screenImage.height + 20;
        
        // Add both objects to the array
        // Index 0: Title image, Index 1: Try Again button
        this.objects.push(screenImage, reloadButton);
    }

    /**
     * Handles mouse clicks on the EndScreen
     * 
     * @method handleClick
     * @param {number} clickX - X coordinate of the mouse click
     * @param {number} clickY - Y coordinate of the mouse click
     * @description
     * - Checks if click is within the Try Again button bounds
     * - Uses restartGame() for clean restart with audio management
     * - Fallback to manual initialization if restartGame() is not available
     * - Resets level objects (enemies, coins, poison bottles)
     */
    handleClick(clickX, clickY,) {
        // Try Again button is at index 1 in the objects array
        const reloadButton = this.objects[1];
        
        // Collision detection: Is the click within the button area?
        if (
            clickX >= reloadButton.x &&                           // Left of button
            clickX <= reloadButton.x + reloadButton.width &&     // Right of button  
            clickY >= reloadButton.y &&                           // Above button
            clickY <= reloadButton.y + reloadButton.height        // Below button
        ) {
           // Primary approach: use restartGame() (with audio management)
           if (typeof restartGame === 'function') {
               restartGame();
           } else {
               // Fallback in case restartGame() is not available
               console.warn('restartGame() function not found, using fallback');
               
               // Manual initialization
               init();
               world.level.enemies = [];          // Remove all enemies
               world.level.newCoins();           // Generate new coins  
               world.level.newPoisonBottles();   // Generate new poison bottles
               
               // Manually restart audio (since init() alone is not enough)
               if (sounds && sounds.mainBackground) {
                   sounds.mainBackground.loop = true;
                   sounds.mainBackground.play().catch(error => {
                       console.error('Audio could not be played:', error);
                   });
               }
           }
        }
    }
}