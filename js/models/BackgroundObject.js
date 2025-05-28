class BackgroundObject extends MoveableObject {
    width = 720;
    height = 480;
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x;
        console.log(this.height);
        this.y = 480-this.height;
    }
}