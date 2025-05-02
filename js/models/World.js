class World {

    firstContact = false;
    level = level1;
    backgroundObjects = this.level.backgroundObjects;
    enemies = this.level.enemies;

    character = new Character();
    cameraX = 0;
    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.drawWorld();
        this.setWorld();
        this.checkCollisions();
    }
    
    setWorld(){
        this.character.world = this;
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(object) {
        if (object.otherDirection) {
            //turns around the image
            object.renderFlippedImage(this.ctx);
        } else {
            //normal drawing
            object.renderImage(this.ctx);
            if(object instanceof BackgroundObject === false){
                object.renderHitBox(this.ctx);
            }
        }
    }

    checkCollisions(){
        setInterval(()=>{
                this.level.enemies.forEach(enemy => {
                    if (this.character.isColliding(enemy)) {
                        this.character.hit();
                        console.log(this.character.lives);
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
    
        requestAnimationFrame(() => this.drawWorld());
    }
    

}