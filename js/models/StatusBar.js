class StatusBar extends DrawableObject{
    
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
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }

    }
        constructor(x, images) {
        super();
        this.IMAGES = images; // Bilder werden dynamisch gesetzt
        this.loadImages(this.IMAGES);
        this.x = x;
        this.width = 200;
        this.height = 71.1;
        this.y = canvas.height - (this.height - 4);
        this.setPercentage(100);
    }

}