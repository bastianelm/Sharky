class Character extends MoveableObject {
    height = 90;
    width = 120;
    y = 50;
    x = 20;
    speed = 10;
    IMAGE_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',
    ];
    IMAGE_DEATH = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',
    ];
    world;

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGE_SWIMMING);
        this.playAnimation(this.IMAGE_SWIMMING);
        this.animate();
    }
    animate() {
        setInterval(() => {
            if (this.world && this.world.keyboard) {
                // Bewegung rechts mit Level-Grenze
                if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
                    this.otherDirection = false;
                    this.x += this.speed;
                }
    
                // Bewegung links mit Grenze
                if (this.world.keyboard.LEFT && this.x > 20) {
                    this.otherDirection = true;
                    this.x -= this.speed;
                }
    
                // Vertikale Bewegung
                if (this.world.keyboard.DOWN) {
                    this.y += this.speed;
                } else if (this.world.keyboard.UP) {
                    this.y -= this.speed;
                }
    
                // Kamera folgt dem Charakter (aber nur Wert setzen!)
                this.world.cameraX = -this.x + 100;
    
                this.playAnimation(this.IMAGE_SWIMMING);
            }
        }, 100);
    }
    
    
}