class Endboss extends MoveableObject {
    speed = 5;
    width = 200;
    height = 200;
    lives = 6000;
    attackTime = 0;
    animationFrameCounter = 0;
    animationFrameSkip = 5;

    IMAGE_INTRODUCE = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ];

    IMAGE_SWIMMING = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];

    IMAGE_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png'
    ];

    IMAGE_DEATH = [
        'img/2.Enemy/3 Final Enemy/Dead/dead1.png',
        'img/2.Enemy/3 Final Enemy/Dead/dead2.png'
    ];

    playAnimation(images) {
        this.animationFrameCounter++;
        if (this.animationFrameCounter % this.animationFrameSkip === 0) {
            super.playAnimation(images);
        }
    }    

    followCharacter() {
        if (this.y < world.character.y && this.y < world.canvas.height - this.height - world.uiArea) {
            this.moveDown();
        } else if (this.y > world.character.y) {
            this.moveUp();
        }
        this.playAnimation(this.IMAGE_ATTACK);
        /*
        if (this.x < world.character.x) {
            this.otherDirection = true;
            this.moveRight();
        } else if (this.x > world.character.x) {
            this.otherDirection = false;
            this.moveLeft();
        }
        */
    }

    move() {
        // Starte ein Intervall, das alle 50ms aufgerufen wird (für flüssige Bewegung)
        this.moveInterval = setInterval(() => {
            if (this.isDead) {
                clearInterval(this.moveInterval);
                return;
            }
            this.followCharacter();
        }, 50); // 50ms für flüssige Bewegung
    }
    

    constructor() {
        super();
        this.loadImage(this.IMAGE_INTRODUCE[0]);
        this.loadImages(this.IMAGE_INTRODUCE);
        this.loadImages(this.IMAGE_SWIMMING);
        this.loadImages(this.IMAGE_ATTACK);
        this.loadImages(this.IMAGE_DEATH);
        this.x = canvas.width - this.width;
        this.y = 0;
        this.move();
    }
}
