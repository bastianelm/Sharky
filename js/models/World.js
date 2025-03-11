class World {

    enemies = level1.enemies;
    backgroundObjects = level1.backgroundObjects;

    cameraX = 0;

    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard){
        console.log(this);
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

    addToMap(mo) {
        console.log(mo);
        if (mo.otherDirection) {
            //turns around the image
            this.ctx.save();
            this.ctx.translate(mo.x + mo.width / 2, mo.y + mo.height / 2);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(mo.img, -mo.width / 2, -mo.height / 2, mo.width, mo.height);
            this.ctx.restore();
        } else {
            //normal drawing
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }
    }

    draw(){

        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        this.addObjectsToMap(level1.backgroundObjects);
        console.log(this.character);
        this.addToMap(this.character);
        this.addObjectsToMap(level1.enemies);

        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

}