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
        this.playAnimation(this.IMAGE_SWIMMING);
        this.animate();
    }
    animate() {
        setInterval(() => {
            if (this.world && this.world.keyboard) {
                // Right Movement: Move right if not exceeding levelEndX
                if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
                    this.otherDirection = false;
                    this.x += this.speed;
                } 
    
                // Left Movement: Move left only if x > 20
                if (this.world.keyboard.LEFT && this.x > 20) {
                    this.otherDirection = true;
                    this.x -= this.speed;
                }

                this.playAnimation(this.IMAGE_SWIMMING);
    
                // Set camera position to follow the character's x position
                this.world.ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transformations
                this.world.cameraX = -this.x;
                this.world.ctx.translate(this.world.cameraX, 0);
    
                // Up and Down movement (if applicable)
                if (this.world.keyboard.DOWN || this.world.keyboard.UP) {
                    if (this.world.keyboard.DOWN) {
                        this.y += this.speed;
                    } else {
                        this.y -= this.speed;
                    }
                }
            }
        }, 100);
    }
    
}