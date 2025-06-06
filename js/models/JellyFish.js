class JellyFish extends MoveableObject{
    speed = 7;
    IMAGE_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png',
    ];
    IMAGE_DEATH = [
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png',
    ]

    constructor(x){
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
        this.loadImages(this.IMAGE_SWIMMING);
        this.loadImages(this.IMAGE_DEATH);
        this.x = x - this.width;
        this.width = 80;
        this.height = 80;
        this.y = Math.max(this.height / 2, Math.min(480 - this.height / 2, Math.random() * (480 - this.height)));
        //this.speed = 0.15 + Math.random()*1.75;
        this.animate(this.IMAGE_SWIMMING);
    }

}