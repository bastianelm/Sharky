class Character extends MoveableObject {
    height = 250;
    width = 250;
    y = 50;
    x = 20;
    speed = 10;
    IMAGE_SWIMMING = [
        '../../img/1.Sharkie/3.Swim/1.png',
        '../../img/1.Sharkie/3.Swim/2.png',
        '../../img/1.Sharkie/3.Swim/3.png',
        '../../img/1.Sharkie/3.Swim/4.png',
        '../../img/1.Sharkie/3.Swim/5.png',
        '../../img/1.Sharkie/3.Swim/6.png',
    ];
    world;

    constructor() {
        super().loadImage('../../img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGE_SWIMMING);
        this.animate();
    }
    animate() {
        setInterval(() => {
            if (this.world && this.world.keyboard) {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    if(this.world.keyboard.RIGHT){
                        this.otherDirection = false;
                        this.x += this.speed;
                    } else{
                        this.otherDirection = true;
                        this.x -= this.speed;                        
                    }
                    let i = this.currentImage % this.IMAGE_SWIMMING.length;
                    let path = this.IMAGE_SWIMMING[i];
                    if (this.imageCache[path]) {
                        this.img = this.imageCache[path];
                        this.currentImage++;
                    }
                    //sets camera position to opposite of character x
                    this.world.cameraX = -this.x;
                    this.world.ctx.translate(this.world.cameraX, 0);
                }
                if(this.world.keyboard.DOWN || this.world.keyboard.UP){
                    if(this.world.keyboard.DOWN){
                        this.y += this.speed;
                    } else{
                        this.y -= this.speed;                        
                    }
                }
            }    
        }, 100);
    }
    
}