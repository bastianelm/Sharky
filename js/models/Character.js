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
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00000.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00001.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00002.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00003.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00004.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00005.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00006.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00007.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00008.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00009.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00010.png',
        'img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
    ];
    world;

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGE_SWIMMING);
        this.loadImages(this.IMAGE_DEATH);
        this.playAnimation(this.IMAGE_SWIMMING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world && this.world.keyboard) {
                // Bewegung nach rechts, nur wenn noch nicht am Level-Ende
                if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
                    this.otherDirection = false;
                    this.x += this.speed;
                }
    
                // Bewegung nach links, nur wenn nicht unter Minimum
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
    
                // Kamera-Logik
                const scrollBorder = this.world.canvas.width / 3; // wie weit links der Char max. stehen darf
                const desiredCameraX = -this.x + scrollBorder;
    
                const maxCameraX = 0; // Kamera darf nicht weiter rechts scrollen
                const minCameraX = -this.world.level.levelEndX + this.world.canvas.width; // nicht über Levelende hinaus
    
                // Begrenzte Kamera
                this.world.cameraX = Math.max(minCameraX, Math.min(maxCameraX, desiredCameraX));
    
                super.chooseAnimation();
            }
        }, 100);
    }
    
    
    
}