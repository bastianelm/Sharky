class World {
    firstContact = false;
    level = level1;
    backgroundObjects = this.level.backgroundObjects;
    enemies = this.level.enemies;
    character = new Character();
    cameraX = 0;
    canvas;
    ctx;
    keybaord;

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
        setInterval(()=>{
                this.level.enemies.forEach(enemy => {
                    if (this.character.isColliding(enemy)) {
                        this.character.hit();
                        this.healthBar.setPercentage(this.character.lives/(1000/100));
                    }
                });                
        }, 1000/60)
    }

    drawWorld() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save(); // aktuellen Zeichenkontext speichern
        this.ctx.translate(this.cameraX, 0); // Kamera anwenden
        this.addObjectsToMap(backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.restore(); // Zeichenkontext wiederherstellen
        this.addToMap(this.healthBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bubblesBar);
        requestAnimationFrame(() => this.drawWorld());
    }
    

}