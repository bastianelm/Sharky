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
    endBoss;

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
        if (object.otherDirection) {
            object.renderFlippedImage(this.ctx);
        } else {
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
        if(this.endbossSpawned === true){
            this.endBoss.bubbles.forEach(bubble => {
                if(this.character.isColliding(bubble)){
                    this.character.hit(10);
                    this.character.setHurt();
                    this.healthBar.setPercentage(this.character.lives/(1000/100));
                }
            })
        }
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
                window.sounds.coinCollected.currentTime = 0;
                window.sounds.coinCollected.play();
                this.coinsBar.setPercentage(this.character.coins/(3/100));
                let index = this.level.coins.indexOf(coin);
                if (index !== -1) {
                    this.level.coins.splice(index, 1);
                }
            }
        });

        this.level.poisonBottles.forEach(bottle=>{
            if(this.character.isColliding(bottle)){
                this.character.poisonBottles++;
                window.sounds.poisonCollected.currentTime = 0;
                window.sounds.poisonCollected.play();
                this.bubblesBar.setPercentage(this.character.poisonBottles/(4/100));
                let index = this.level.poisonBottles.indexOf(bottle);
                if (index !== -1) {
                    this.level.poisonBottles.splice(index, 1);
                }
            }
        });
    }

    waitForImage = (drawableObj) => {
        if (drawableObj.img && drawableObj.img.complete) {
            this.addToMap(drawableObj);
        } else {
            setTimeout(() => this.waitForImage(drawableObj), 50);
        }
    };

    drawBubbles(){
        if(this.character.bubbles.length !== 0){
            this.addObjectsToMap(this.character.bubbles);
            this.character.bubbles.forEach(bubble => {
                bubble.x += 5;
            });
        }
        if(this.endbossSpawned){
            if(this.endBoss && this.endBoss.bubbles && this.endBoss.bubbles.length !== 0){
                this.addObjectsToMap(this.endBoss.bubbles);
                this.endBoss.bubbles.forEach(bubble => {
                    bubble.x -= 5;
                });
            }
        }
    }

    drawWorld() {
        let wonGame = this.endbossSpawned === true && this.level.enemies[0].isDead === true && this.level.enemies[0].y <= 0;
        let lostGame = this.character.isDead === true && this.character.y <= 0;
        this.gameOver = wonGame || lostGame;
        
        if(this.gameOver){
            cancelAnimationFrame(this.gameLoop);
            this.character.reset();
            window.stopGame();
            window.intervalIds = [];
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.endScreen = new EndScreen(wonGame);
            this.endScreen.objects.forEach(img => {
                this.waitForImage(img);
            });          
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
        } else{
            if(this.coinsBar.percentage !== 100){
                let enemyCreationInterval = 2.5;
                let now = performance.now();
                let timeDiff = (now - this.lastEnemyCreation) / 1000;
                if(timeDiff >= enemyCreationInterval){
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
                    this.endBoss = new Endboss();
                    this.level.enemies.push(this.endBoss);
                    this.endbossSpawned = true;
                }
            }

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.save(); 
            this.ctx.translate(this.cameraX, 0); 
            this.addObjectsToMap(backgroundObjects);
            this.addToMap(this.character);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.poisonBottles);
            this.ctx.restore();
            this.addToMap(this.healthBar);
            this.addToMap(this.coinsBar);
            this.addToMap(this.bubblesBar);

            this.drawBubbles();

            this.checkCollisions();

            if(!this.gameOver){
                this.gameLoop = requestAnimationFrame(() => this.drawWorld());
            }
        }
    }
}