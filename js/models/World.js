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

    drawWorld(){

        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        this.addObjectsToMap(backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

        let self = this;
        requestAnimationFrame(function(){
            self.drawWorld();
        });
    }

}