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
        this.draw();
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
            this.ctx.save();
            this.ctx.translate(object.x + object.width / 2, object.y + object.height / 2);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(object.img, -object.width / 2, -object.height / 2, object.width, object.height);
            this.ctx.restore();
        } else {
            //normal drawing
            this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
            if(object instanceof BackgroundObject === false){
                this.ctx.beginPath();
                this.ctx.lineWidth = "6";
                this.ctx.strokeStyle = "red";
                this.ctx.rect(object.x, object.y, object.width, object.height);
                this.ctx.stroke();
            }
        }
    }

    draw(){

        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        this.addObjectsToMap(backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

}