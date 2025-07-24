class World {
    firstContact = false;
    level = level1;
    backgroundObjects = this.level.backgroundObjects;
    character = new Character();
    cameraX = 0;
    canvas;
    ctx;
    keyboard;
    startTime = performance.now();
    lastEnemyCreation = this.startTime;
    endbossSpawned = false;
    gameLoop;
    gameOver = false;

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
    
    setWorld(){
        this.character.world = this;
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(object){
        if(object instanceof BackgroundObject === false){
                //object.renderHitBox(this.ctx);
        }
        if (object.otherDirection) {
            //turns around the image
            object.renderFlippedImage(this.ctx);
        } else {
            //normal drawing
            object.renderImage(this.ctx);
        }
    }

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
                        if(enemy.constructor.name === 'PufferFish'){
                            this.character.poisoned = true;
                            this.character.hit(20);
                        }else {
                            this.character.hit(20);
                        }
                        this.character.setHurt();
                        this.healthBar.setPercentage(this.character.lives/(1000/100));
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
                })
                this.level.poisonBottles.forEach(bottle=>{
                    if(this.character.isColliding(bottle)){
                        this.character.poisonBottles++;
                        this.bubblesBar.setPercentage(this.character.poisonBottles/(4/100));
                        let index = this.level.poisonBottles.indexOf(bottle);
                        if (index !== -1) {
                            this.level.poisonBottles.splice(index, 1);
                        }
                    }
                })
    }

    waitForImage = (drawableObj) => {
        if (drawableObj.img && drawableObj.img.complete) {
            this.addToMap(drawableObj);
        } else {
            setTimeout(() => this.waitForImage(drawableObj), 50);
        }
    };

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
        if(this.endbossSpawned){
            
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save(); // aktuellen Zeichenkontext speichern
        this.ctx.translate(this.cameraX, 0); // Kamera anwenden
        this.addObjectsToMap(backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poisonBottles);
        this.ctx.restore(); // Zeichenkontext wiederherstellen
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
        if(!this.gameOver){
            this.gameLoop = requestAnimationFrame(() => this.drawWorld());
        }
    }
    

}