class Endboss extends MoveableObject {
    speed = 5;
    width = 200;
    height = 200;
    lives = 6000;
    attackTime = 0;

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

    /**
     * @param {number} toleranceX - Horizontal tolerance in pixels
     * @param {number} toleranceY - Vertical tolerance in pixels
     * @returns {boolean} True if Endboss is within distance of character
     */
    isLowDistance(toleranceX, toleranceY) {
        const lowX = this.x === world.character.x - toleranceX;
        const lowY = this.y === world.character.y - toleranceY;
        return lowX && lowY;
    }

    /**
     * Moves the Endboss toward the player based on current position and lives.
     * @returns {void}
     */
    followCharacter() {
        const tolerance = this.lives >= 2000 ? 250 : 50;
        if (this.y < world.character.y - tolerance) this.moveDown();
        else this.moveUp();

        if (this.x < world.character.x - tolerance) {
            this.otherDirection = true;
            this.moveRight();
        } else {
            this.otherDirection = false;
            this.moveLeft();
        }
    }
    /**
     * Handles movement and attack behavior over time.
     * @returns {void}
     */
    move() {
        this.moveInterval = setInterval(() => {
            if (this.isDead) {
                clearInterval(this.moveInterval);
                return;
            }
            this.attackTime += 200;
            this.followCharacter();
            if(this.attackTIme % 1000 === 0){
                this.playAnimation(this.IMAGE_ATTACK);
            }
        }, 200);
    }

    /**
     * Initializes the Endboss with all assets loaded and behavior started.
     */
    constructor() {
        super();
        //this.attack = this.attack.bind(this);
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
