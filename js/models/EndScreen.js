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
        'height' : 107,
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
    homeButton = {
        'img':'img/6.Botones/home.svg',
        'width':150,
        'height':100,
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
        // Select sound based on game outcome
        const selectedSound = wonGame ? sounds.won : sounds.lose;
        selectedSound.play();
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

        //Create and configutare home image
        const homeButton = new DrawableObject();
        homeButton.loadImage(this.homeButton.img);
        homeButton.width = this.homeButton.width;
        homeButton.height = this.homeButton.height;
        homeButton.x = (canvas.width - homeButton.width) / 2;
        homeButton.y = reloadButton.y + reloadButton.height + 20;

        // Add objects

        this.objects.push(screenImage, reloadButton, homeButton);
    }

    /**
     * Handles mouse clicks on the EndScreen.
     *
     * @method handleClick
     * @param {number} clickX - X coordinate of the mouse click relative to the canvas.
     * @param {number} clickY - Y coordinate of the mouse click relative to the canvas.
     * @description
     * Checks whether the user clicked within the bounds of the "Try Again" button.
     * If so, it calls {@link restartGame} to restart the game.
     */

    handleClick(clickX, clickY) {
        const reloadButton = this.objects[1];
        const homeButton = this.objects[2];
    
        if (
            clickX >= reloadButton.x &&
            clickX <= reloadButton.x + reloadButton.width &&
            clickY >= reloadButton.y &&
            clickY <= reloadButton.y + reloadButton.height
        ) {
            restartGame();
        }

        if (
            clickX >= homeButton.x &&
            clickX <= homeButton.x + reloadButton.width &&
            clickY >= homeButton.y &&
            clickY <= homeButton.y + reloadButton.height

        ) {
            location.reload();
        }


    }
    
    handleHover(hoverX, hoverY) {
        const buttons = [this.objects[1], this.objects[2]]; // Reload + Home
        let hoveringAny = false;
    
        for (const btn of buttons) {
            if (
                hoverX >= btn.x &&
                hoverX <= btn.x + btn.width &&
                hoverY >= btn.y &&
                hoverY <= btn.y + btn.height
            ) {
                hoveringAny = true;
                break;
            }
        }
    
        canvas.style.cursor = hoveringAny ? "pointer" : "default";
    }    
}