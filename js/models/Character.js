class Character extends MoveableObject {
    height = 90;
    width = 120;
    y = 50;
    x = 20;
    speed = 10;
    coins = 0;
    poisonBottles = 0;
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
        this.animate();
    }

    animate() {
        setInterval(() => {
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
                if (this.world.keyboard.DOWN && this.y < world.canvas.height - this.height -this.world.uiArea) {
                    this.moveDown();
                }
                
                // up movement
                if (this.world.keyboard.UP && this.y > 0) {
                    this.moveUp();
                }

                if (this.world.keyboard.SPACE && this.poisonBottles > 0 && !this.otherDirection){
                    this.attack = true;
                    this.poisonBottles--;
                    this.bubble = new Bubble(this.x + this.width + this.world.cameraX, this.y + this.height/2);
                    this.world.addToMap(this.bubble);
                    this.world.bubblesBar.setPercentage(this.poisonBotles/100/4);
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
        },150)
        
    }
    
    
}