class Endboss extends MoveableObject {
    speed = 5;
    width = 200;
    height = 200;
    lives = 6000;

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
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png',
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
        'img/2.Enemy/3 Final Enemy/2.floating/13.png',
    ];

    IMAGE_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png',
    ];

    IMAGE_DEATH = [
        'img/2.Enemy/3 Final Enemy/Dead/dead1.png',
        'img/2.Enemy/3 Final Enemy/Dead/dead2.png'
    ];

    /**
     * Determines if the Endboss and the character occupy the same position
     * within the given tolerances.
     *
     * @param {number} toleranceX - Allowed horizontal tolerance in pixels.
     * @param {number} toleranceY - Allowed vertical tolerance in pixels.
     * @returns {boolean} True if both X and Y positions are within tolerance, otherwise false.
     */
    isLowDistance(toleranceX, toleranceY) {
        const lowX = this.x === world.character.x - toleranceX;
        const lowY = this.y === world.character.y - toleranceY;
        return lowX && lowY;
    }

    /**
     * Moves the Endboss towards the player's character based on its current position
     * and a tolerance value that depends on the Endboss's remaining lives.
     *
     * @returns {void}
     */
    followCharacter() {
        const tolerance = this.lives >= 2000 ? 250 : 50;
        if (this.y < world.character.y - tolerance) {
            this.moveDown();
        } else {
            this.moveUp();
        }
        if (this.x < world.character.x - tolerance) {
            this.otherDirection = true;
            this.moveRight();
        } else {
            this.otherDirection = false;
            this.moveLeft();
        }
    }

    /**
     * Plays the attack animation for the Endboss.
     *
     * @returns {void}
     */
    attack() {
        this.playAnimation(this.IMAGE_ATTACK);
    }

    /**
     * Starts the movement loop of the Endboss, following the character
     * and triggering attack animations.
     *
     * @returns {void}
     */
    move() {
        this.moveInterval = setStoppableInterval(() => {
            if (this.isDead) {
                clearInterval(this.moveInterval);
                return;
            }
            this.followCharacter();
            this.attack();
        }, 200);
    }

    /**
     * Creates a new Endboss instance, loads all required images,
     * and starts its movement behavior.
     */
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
