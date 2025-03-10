class Character extends MoveableObject {
    height = 250;
    width = 250;
    y = 50;
    x = 20;
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

        this.animate(); // animate() is called correctly
    }

    animate() {
        setInterval(() => {
            if (this.world && this.world.keyboard) {
                if (this.world.keyboard.RIGHT) {
                    let i = this.currentImage % this.IMAGE_SWIMMING.length;
                    let path = this.IMAGE_SWIMMING[i];
                    if (this.imageCache[path]) {
                        this.img = this.imageCache[path];
                        this.currentImage++;
                    }
                }
            }
        }, 150);
    }
    
}