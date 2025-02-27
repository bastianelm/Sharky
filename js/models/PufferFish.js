class PufferFish extends MoveableObject{
    y = 350;
    height = 60;
    width = 86;
    
    constructor(){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = 720 - this.width;
        this.y = Math.max(this.height / 2, Math.min(480 - this.height / 2, Math.random() * (480 - this.height)));
    }
}