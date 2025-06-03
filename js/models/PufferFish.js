class PufferFish extends MoveableObject{
    speed = 7;
    IMAGE_SWIMMING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];
    IMAGE_DEATH = [
        'img/2.Enemy/1.Puffer fish(3 color options)/DIE/1.Dead.png',
    ]

    constructor(){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGE_SWIMMING);
        this.x = 720 - this.width;
        this.y = Math.max(this.height / 2, Math.min(480 - this.height / 2, Math.random() * (480 - this.height)));
        //this.speed = 0.15 + Math.random()*1.75;
        this.animate(this.IMAGE_SWIMMING);
    }

}