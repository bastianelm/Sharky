class World {
    constructor(canvas, keyboard) {
        this.firstContact = false;
        this.level = level1;
        this.backgroundObjects = this.level.backgroundObjects;
        this.character = new Character();
        this.cameraX = 0;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.startTime = performance.now();
        this.lastEnemyCreation = this.startTime;
        this.endbossSpawned = false;
        this.gameLoop = null;
        this.gameOver = false;
        this.healthBar = new HealthBar(60);
        this.coinsBar = new CoinsBar(this.healthBar.x + this.healthBar.width);
        this.bubblesBar = new BubblesBar(this.healthBar.x + (this.healthBar.width * 2));
        this.uiArea = 50;

        this.setWorld();
        this.startGameLoop();
    }

    /**
     * Links the character to the current world instance.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the main game loop by requesting the first animation frame.
     */
    startGameLoop() {
        this.gameLoop = requestAnimationFrame(() => this.drawWorld());
    }

    /**
     * Determines whether the game is over based on win or loss conditions.
     * @returns {boolean} True if the game is over, false otherwise.
     */
    returnGameOverState() {
        const wonGame = this.endbossSpawned && this.level.enemies[0].isDead && this.level.enemies[0].y === 0;
        const lostGame = this.character.isDead && this.character.y <= 0;
        return wonGame || lostGame;
    }

    /**
     * Main rendering and update function for the game world.
     * Handles game state, drawing, collisions, and loop continuation.
     */
    drawWorld() {
        this.gameOver = this.returnGameOverState();
        if (this.gameOver) {
            this.handleGameOver();
            return;
        }

        this.spawnEnemies();
        this.renderScene();
        this.updateBubbles();
        this.checkCollisions();

        if (!this.gameOver) {
            this.startGameLoop();
        }
    }

    /**
     * Handles the game over sequence including stopping the loop,
     * clearing the canvas, and rendering the end screen.
     */
    handleGameOver() {
        window.stopGame();
        window.intervalIds = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const wonGame = this.endbossSpawned && this.level.enemies[0].isDead;
        this.endScreen = new EndScreen(wonGame);
        this.endScreen.objects.forEach(img => this.waitForImage(img));
        cancelAnimationFrame(this.gameLoop);
        this.character.reset();
        this.setupEndScreenEvents();
    }

    /**
     * Sets up mouse click and hover listeners for the end screen.
     */
    setupEndScreenEvents() {
        this.canvas.addEventListener("click", (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top;
            if (this.endScreen) this.endScreen.handleClick(clickX, clickY);
        });

        this.canvas.addEventListener("mousemove", (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const hoverX = (event.clientX - rect.left) * scaleX;
            const hoverY = (event.clientY - rect.top) * scaleY;
            if (this.endScreen) this.endScreen.handleHover(hoverX, hoverY);
        });
    }

    /**
     * Spawns regular enemies or the endboss depending on game progress.
     */
    spawnEnemies() {
        if (this.coinsBar.percentage !== 100) {
            const now = performance.now();
            const interval = 2.5;
            if ((now - this.lastEnemyCreation) / 1000 >= interval) {
                const enemy = Math.random() < 0.5
                    ? new PufferFish(this.cameraX * -1 + this.canvas.width)
                    : new JellyFish(this.cameraX * -1 + this.canvas.width);
                this.level.enemies.push(enemy);
                this.lastEnemyCreation = now;
            }
        } else if (!this.endbossSpawned) {
            this.character.otherDirection = false;
            this.character.x = 0;
            this.level.enemies = [new Endboss()];
            this.endbossSpawned = true;
        }
    }

    /**
     * Renders all game objects including background, character,
     * enemies, collectibles, and UI elements.
     */
    renderScene() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poisonBottles);
        this.ctx.restore();
        this.addToMap(this.healthBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bubblesBar);
    }

    /**
     * Updates and renders character's bubbles if any are active.
     */
    updateBubbles() {
        if (this.character.bubbles.length > 0) {
            this.addObjectsToMap(this.character.bubbles);
            this.character.bubbles.forEach(bubble => bubble.x += 5);
        }
    }

    /**
     * Adds multiple drawable objects to the canvas.
     * @param {Array} objects - List of drawable objects.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    /**
     * Adds a single drawable object to the canvas.
     * Handles flipped rendering if needed.
     * @param {Object} object - Drawable object to render.
     */
    addToMap(object) {
        if (object.otherDirection) {
            object.renderFlippedImage(this.ctx);
        } else {
            object.renderImage(this.ctx);
        }
    }

    /**
     * Waits until the image of a drawable object is loaded
     * before rendering it to the canvas.
     * @param {Object} drawableObj - Object with image to wait for.
     */
    waitForImage(drawableObj) {
        if (drawableObj.img && drawableObj.img.complete) {
            this.addToMap(drawableObj);
        } else {
            setTimeout(() => this.waitForImage(drawableObj), 50);
        }
    }

    /**
     * Checks and handles all collision interactions between
     * character and enemies, coins, poison bottles, and bubbles.
     */
    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            this.character.bubbles.forEach(bubble => {
                if (enemy.isColliding(bubble)) {
                    enemy.hit(2000);
                    const index = this.character.bubbles.indexOf(bubble);
                    this.character.bubbles.splice(index, 1);
                }
            });
        });

        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && !enemy.isDead) {
                if (this.character.attack && this.character.attackKey === 68) {
                    enemy.hit(20);
                } else {
                    if (enemy.constructor.name === 'PufferFish') {
                        this.character.poisoned = true;
                    }
                    this.character.hit(20);
                    this.character.setHurt();
                    this.healthBar.setPercentage(this.character.lives / (1000 / 100));
                }
            }
        });

        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.character.coins++;
                this.coinsBar.setPercentage(this.character.coins / (9 / 100));
                const index = this.level.coins.indexOf(coin);
                if (index !== -1) this.level.coins.splice(index, 1);
            }
        });

        this.level.poisonBottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.character.poisonBottles++;
                this.bubblesBar.setPercentage(this.character.poisonBottles / (4 / 100));
                const index = this.level.poisonBottles.indexOf(bottle);
                if (index !== -1) this.level.poisonBottles.splice(index, 1);
            }
        });
    }
}