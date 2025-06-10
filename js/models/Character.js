class Character extends MoveableObject {
    height = 100;
    width = 170;
    y = 50;
    x = 20;
    speed = 10;
    coins = 0;
    poisonBottles = 0;
    bubbles = [];
    IMAGE_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',
    ];
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
        this.loadImages(this.IMAGE_SWIMMING);
        this.loadImages(this.IMAGE_DEATH);
        this.loadImages(this.IMAGE_ATTACK);
        this.playAnimation(this.IMAGE_SWIMMING);
        window.setStoppableInterval(this.animate.bind(this), 150);
    }

    animate() {
            if (this.world.keyboard) {
                if(this.isDead){
                    this.world.keyboard = false;
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

                if (this.world.keyboard.SPACE && this.poisonBottles > 0 && !this.otherDirection){
                    console.log("attack");
                    this.attack = true;
                    let bubble = new Bubble(this.x + this.width + this.world.cameraX, this.y + this.height/2);
                    this.bubbles.push(bubble);
                    console.log(this.bubbles);
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
    
    
}