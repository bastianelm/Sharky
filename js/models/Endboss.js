class Endboss extends MoveableObject{
    IMAGE_SWIMMING = [
        '../../img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        '../../img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        '../../img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        '../../img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        '../../img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        '../../img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        '../../img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        '../../img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        '../../img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        '../../img/2.Enemy/3 Final Enemy/1.Introduce/10.png',
    ];
    constructor(){
        super().loadImage(this.IMAGE_SWIMMING[0]);
        this.loadImages(this.IMAGE_SWIMMING);
        this.animate();
    }
}