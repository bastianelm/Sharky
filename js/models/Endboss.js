class Endboss extends MoveableObject{
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
    IMAGE_DEATH = [
        'img/2.Enemy/3 Final Enemy/Dead/dead1.png',
        'img/2.Enemy/3 Final Enemy/Dead/dead2.png'
    ]

    move(){
        let tolerance = 20;
        this.moveInterval = setStoppableInterval(() => {
            if(this.isDead){
                clearInterval(this.moveInterval);
                return;
            }
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
        }, 200);
    }

    constructor(){
        super();
        this.loadImage(this.IMAGE_INTRODUCE[0]);
        this.loadImages(this.IMAGE_INTRODUCE);
        this.loadImages(this.IMAGE_SWIMMING);
        this.loadImages(this.IMAGE_DEATH);
        this.x = canvas.width - this.width;
        this.y = 0;
        this.move();
        //window.setStoppableInterval((this.animate(),150));
    }
}