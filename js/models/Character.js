class Character extends MoveableObject {
    height = 250;
    width = 250;
    y = 200;
    IMAGE_SWIMMING = [
        '../../img/1.Sharkie/3.Swim/1.png',
        '../../img/1.Sharkie/3.Swim/2.png',
        '../../img/1.Sharkie/3.Swim/3.png',
        '../../img/1.Sharkie/3.Swim/4.png',
        '../../img/1.Sharkie/3.Swim/5.png',
        '../../img/1.Sharkie/3.Swim/6.png',
    ];

    currentImage = 0;

    constructor() {
        super().loadImage('../../img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGE_SWIMMING);

        this.animate(); // animate() is called correctly
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGE_SWIMMING.length;
            let path = this.IMAGE_SWIMMING[i]; // Use the correct index
            this.img = this.imageCache[path]; // Update the current image
            this.currentImage++;
            this.x += 15;
        }, 250);
    }
}