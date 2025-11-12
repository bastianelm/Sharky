/**
 * Represents the game world and manages rendering, collisions, UI, and enemy creation.
 */
class World {

    /** @type {boolean} Indicates if the first contact occurred. */
    firstContact = false;

    /** @type {Level} The current level object. */
    level = level1;

    /** @type {Array} Background objects for the current level. */
    backgroundObjects = this.level.backgroundObjects;

    /** @type {Character} The main character of the game. */
    character = new Character();

    /** @type {number} The horizontal camera offset. */
    cameraX = 0;

    /** @type {HTMLCanvasElement} The game canvas. */
    canvas;

    /** @type {CanvasRenderingContext2D} The 2D drawing context. */
    ctx;

    /** @type {Keyboard} The keyboard input handler. */
    keyboard;

    /** @type {number} The start time of the game. */
    startTime = performance.now();

    /** @type {number} The last time an enemy was created. */
    lastEnemyCreation = this.startTime;

    /** @type {boolean} Whether the end boss has been spawned. */
    endbossSpawned = false;

    /** @type {number|undefined} Reference to the current game loop frame. */
    gameLoop;

    /** @type {boolean} Whether the game is over. */
    gameOver = false;


    /**
     * Constructor
     * @param {HTMLCanvasElement} canvas - The canvas element to render on.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.healthBar = new HealthBar(60);
        this.coinsBar = new CoinsBar(this.healthBar.x + this.healthBar.width);
        this.bubblesBar = new BubblesBar(this.healthBar.x + (this.healthBar.width * 2));
        this.keyboard = keyboard;
        this.drawWorld();
        this.setWorld();
        this.checkCollisions();
        this.uiArea = 50;
    }

    /**
     * setWorld => sets world to this (references to the World object)
     */
    setWorld(){
        this.character.world = this;
    }

    /**
     * addObjectsToMap => adds objects to map
     * @param {Array} objects - The objects to be added to the map.
     */
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * addToMap => adds an object to map
     * @param {DrawableObject} object - The object to render on the map.
     */
    addToMap(object){
        if (object.otherDirection) {
            /** turns around the image */
            object.renderFlippedImage(this.ctx);
        } else {
            /** normal drawing */
            object.renderImage(this.ctx);
        }
    }

    /**
     * checkCollisions => checks collisions between a lot of objects on each other and executes methods if they are meeting together
     */
    checkCollisions(){
        this.level.enemies.forEach(enemy => {
            this.character.bubbles.forEach(bubble => {
                if(enemy.isColliding(bubble)) {
                    enemy.hit(2000);
                    let index = this.character.bubbles.indexOf(bubble);
                    this.character.bubbles.splice(index, 1);
                }
            });
        });

        this.level.enemies.forEach(enemy => {
            if(this.character.isColliding(enemy) && !enemy.isDead){
                if(this.character.attack && this.character.attackKey === 68){
                    enemy.hit(20);
                } else{
                    if(enemy.constructor.name === 'PufferFish'){
                        this.character.poisoned = true;
                        this.character.hit(20);
                    } else {
                        this.character.hit(20);
                    }
                    this.character.setHurt();
                    this.healthBar.setPercentage(this.character.lives/(1000/100));
                }
            }
        });

        this.level.coins.forEach(coin => {
            if(this.character.isColliding(coin)){
                this.character.coins++;
                this.coinsBar.setPercentage(this.character.coins/(9/100));
                let index = this.level.coins.indexOf(coin);
                if (index !== -1) {
                    this.level.coins.splice(index, 1);
                }
            }
        });

        this.level.poisonBottles.forEach(bottle=>{
            if(this.character.isColliding(bottle)){
                this.character.poisonBottles++;
                this.bubblesBar.setPercentage(this.character.poisonBottles/(4/100));
                let index = this.level.poisonBottles.indexOf(bottle);
                if (index !== -1) {
                    this.level.poisonBottles.splice(index, 1);
                }
            }
        });
    }

    /**
     * waitForImage => waits for Image to render
     * @param {DrawableObject} drawableObj - The object whose image should be rendered when loaded.
     */
    waitForImage = (drawableObj) => {
        if (drawableObj.img && drawableObj.img.complete) {
            this.addToMap(drawableObj);
        } else {
            setTimeout(() => this.waitForImage(drawableObj), 50);
        }
    };

    /**
     * drawWorld => drawas the world, manages bars (like coinBar for example), creates enemies and endboss
     */
    drawWorld() {
        let wonGame = this.endbossSpawned === true && this.level.enemies[0].isDead === true && this.level.enemies[0].y === 0;
        let lostGame = this.character.isDead === true && this.character.y <= 0;
        this.gameOver = wonGame || lostGame;

        if(this.gameOver){
            window.stopGame();
            window.intervalIds = [];
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.endScreen = new EndScreen(wonGame);
            this.endScreen.objects.forEach(img => {
                this.waitForImage(img);
            });
            cancelAnimationFrame(this.gameLoop);
            this.character.reset();            

            canvas.addEventListener("click", (event) => {
                const rect = canvas.getBoundingClientRect();
                const clickX = event.clientX - rect.left;
                const clickY = event.clientY - rect.top;
                if (typeof world.endScreen !== "undefined") { 
                    world.endScreen.handleClick(clickX, clickY);
                }
            });

            canvas.addEventListener("mousemove", (event) => {
                const rect = canvas.getBoundingClientRect();
                const scaleX = canvas.width / rect.width;
                const scaleY = canvas.height / rect.height;
                const hoverX = (event.clientX - rect.left) * scaleX;
                const hoverY = (event.clientY - rect.top) * scaleY;

                if (typeof world.endScreen !== "undefined") {
                    world.endScreen.handleHover(hoverX, hoverY);
                }
            });
            return;
        }

        if(this.coinsBar.percentage !== 100){
            let enemyCreationInterval = 2.5;
            let now = performance.now();
            if((now - this.lastEnemyCreation) / 1000 >= enemyCreationInterval){
                let randomNumber = Math.floor(Math.random() * 2) + 1;
                let enemy;
                if(randomNumber === 1){
                    enemy = new PufferFish(this.cameraX *-1 + this.canvas.width);
                } else {
                    enemy = new JellyFish(this.cameraX *-1 + this.canvas.width);
                }
                this.level.enemies.push(enemy);
                this.lastEnemyCreation = now;
            }
        } else{
            if (!this.endbossSpawned) {
                if(this.character.otherDirection === true) this.character.otherDirection = false;
                this.character.x = 0;
                this.level.enemies = [];
                this.level.enemies.push(new Endboss());
                this.endbossSpawned = true;
            }
        }

        /**
         * does all the stuff on map
         */
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save(); /** aktuellen Zeichenkontext speichern */
        this.ctx.translate(this.cameraX, 0); /** Kamera anwenden */
        this.addObjectsToMap(backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poisonBottles);
        this.ctx.restore(); /** Zeichenkontext wiederherstellen */
        this.addToMap(this.healthBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bubblesBar);

        if(this.character.bubbles.length !== 0){
            this.addObjectsToMap(this.character.bubbles);
            this.character.bubbles.forEach(bubble => {
                bubble.x += 5;
            });
        }

        this.checkCollisions();

        /**
         * draws on repeat until gameOver is true
         */
        if(!this.gameOver){
            this.gameLoop = requestAnimationFrame(() => this.drawWorld());
        }
    }

}
