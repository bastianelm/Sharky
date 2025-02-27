class World {
    character = new Character();
    
    enemies = [
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
    ];


    backgroundObjects = [
        new BackgroundObject("../../img/3. Background/Layers/5. Water/D1.png",0),
        new BackgroundObject("../../img/3. Background/Legacy/Layers/4.Fondo 2/D1.png", 0),
        new BackgroundObject("../../img/3. Background/Layers/2. Floor/D1.png",0),
    ];


    canvas;
    ctx;

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    addToMap(mo){
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
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