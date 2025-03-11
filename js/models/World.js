class World {
    character = new Character();

    enemies = [
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
    ];


    backgroundObjects = [
        new BackgroundObject("../../img/3. Background/Layers/5. Water/D1.png",-719),
        new BackgroundObject("../../img/3. Background/Legacy/Layers/4.Fondo 2/D1.png", -719),
        new BackgroundObject("../../img/3. Background/Layers/2. Floor/D1.png",-719),
        new BackgroundObject("../../img/3. Background/Layers/5. Water/D2.png",0),
        new BackgroundObject("../../img/3. Background/Legacy/Layers/4.Fondo 2/D2.png", 0),
        new BackgroundObject("../../img/3. Background/Layers/2. Floor/D2.png",0),
        new BackgroundObject("../../img/3. Background/Layers/5. Water/D1.png",719),
        new BackgroundObject("../../img/3. Background/Legacy/Layers/4.Fondo 2/D1.png", 719),
        new BackgroundObject("../../img/3. Background/Layers/2. Floor/D1.png",719),
    ];

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

    addToMap(mo) {
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

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

}