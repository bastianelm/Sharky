class Character extends MoveableObject {
    height = 100;
    width = 170;
    y = 50;
    x = 20;
    speed = 10;
    coins = 0;
    poisonBottles = 0;
    bubbles = [];
    swimming = false;
    canAttack = false;
    IMAGE_IDLE = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png',
    ];
    IMAGE_SLEEP = [
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/i2.png',
        'img/1.Sharkie/2.Long_IDLE/i3.png',
        'img/1.Sharkie/2.Long_IDLE/i4.png',
        'img/1.Sharkie/2.Long_IDLE/i5.png',
        'img/1.Sharkie/2.Long_IDLE/i6.png',
        'img/1.Sharkie/2.Long_IDLE/i7.png',
        'img/1.Sharkie/2.Long_IDLE/i8.png',
        'img/1.Sharkie/2.Long_IDLE/i9.png',
        'img/1.Sharkie/2.Long_IDLE/i10.png',
        'img/1.Sharkie/2.Long_IDLE/i11.png',
        'img/1.Sharkie/2.Long_IDLE/i12.png',
        'img/1.Sharkie/2.Long_IDLE/i13.png',
        'img/1.Sharkie/2.Long_IDLE/i14.png',
    ]
    IMAGE_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',
    ];
    IMAGE_HURT_POISONED = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png',
    ]
    IMAGE_HURT_SHOCKED = [
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png',
    ]
    IMAGE_DEATH = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png',
    ];

    IMAGE_ATTACK = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
    ];
    
    world;

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGE_IDLE);
        super.loadImages(this.IMAGE_SLEEP);
        this.loadImages(this.IMAGE_SWIMMING);
        this.loadImages(this.IMAGE_HURT_POISONED);
        this.loadImages(this.IMAGE_HURT_SHOCKED);
        this.loadImages(this.IMAGE_DEATH);
        this.loadImages(this.IMAGE_ATTACK);
        window.setStoppableInterval(this.animate.bind(this), 150);
    }

    animate() {
            if (this.world.keyboard) {
                if(this.isDead){
                    this.world.keyboard = false;
                }
                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.DOWN || this.world.keyboard.UP){
                    this.swimming = true;
                    this.sleeping = false;
                } else{
                    this.swimming = false;
                }
                // right movement
                if (this.world.keyboard.RIGHT && this.x + this.width + this.speed < this.world.level.levelEndX) {
                    this.otherDirection = false;
                    this.moveRight();
                }
    
                // left movement
                if (this.world.keyboard.LEFT && this.x > 0) {
                    this.otherDirection = true;
                    this.moveLeft();
                }
    
                // down movment
                if (this.world.keyboard.DOWN && this.y < this.world.canvas.height - this.height -this.world.uiArea) {
                    this.moveDown();
                }
                
                // up movement
                if (this.world.keyboard.UP && this.y > 0) {
                    this.moveUp();
                }
                if (this.world.keyboard.SPACE && this.poisonBottles > 0 && !this.otherDirection && this.canAttack){
                    this.sleeping = false;
                    this.canAttack = false;
                    this.attack = true;
                    let bubble = new Bubble(this.x + this.width + this.world.cameraX, this.y + this.height/2);
                    this.bubbles.push(bubble);
                    this.world.addToMap(this.bubbles[this.bubbles.length-1]);
                    this.poisonBottles--;
                    this.world.bubblesBar.setPercentage(this.poisonBottles/100/4);
                }

    
                // Kamera-Logik
                const scrollBorder = this.world.canvas.width / 3; // wie weit links der Char max. stehen darf
                const desiredCameraX = -this.x + scrollBorder;
    
                const maxCameraX = 0; // Kamera darf nicht weiter rechts scrollen
                const minCameraX = -this.world.level.levelEndX + this.world.canvas.width; // nicht über Levelende hinaus
    
                // Begrenzte Kamera
                this.world.cameraX = Math.max(minCameraX, Math.min(maxCameraX, desiredCameraX));
            }
            super.chooseAnimation();
        
    }

    reset() {
        this.lives = 1000;
        this.isHurt = false;
        this.isDead = false;
        this.poisoned = false;
        this.bubbles = [];
        this.coins = 0;
        this.poisonBottles = 0;
    }
    
    
    
}