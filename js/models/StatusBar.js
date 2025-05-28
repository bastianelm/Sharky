class StatusBar extends DrawableObject{
    IMAGES = [
        'img/4. Marcadores/green/Life/0_  copia 3.png',
        'img/4. Marcadores/green/Life/20_ copia 4.png',
        'img/4. Marcadores/green/Life/40_  copia 3.png',
        'img/4. Marcadores/green/Life/60_  copia 3.png',
        'img/4. Marcadores/green/Life/80_  copia 3.png',
        'img/4. Marcadores/green/Life/100_  copia 2.png',
    ];
    percentage = 100;
    setPercentage(p) {
        this.percentage = p;
        const index = this.getImageIndex();
        const path = this.IMAGES[index];
        const img = this.imageCache[path];
        this.img = img;
    }

    getImageIndex(){
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }

    }
    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.width = 267.75;
        this.height = 71.1;
        this.y = canvas.height - (this.height - 4);
        this.setPercentage(100);
    }
}