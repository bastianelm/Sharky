class Endboss extends moveabelObject{
    IMAGE_SWIMMING = [
        '../../img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        '../../img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        '../../img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        '../../img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        '../../img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        '../../img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        '../../img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        '../../img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
    ];
    constructor(){
        super.loadImage(this.IMAGE_SWIMMING[0]);
        this.loadImages(this.IMAGE_SWIMMING);
    }
}