class MoveableObject{
    x = 120;
    y = 200;
    img;
    height = 56;
    width = 56;
    imageCache = {}; // Cache for multiple images
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    /**
     * Loads a single image and sets it as the current image.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        const img = new Image();
        img.src = path;
        this.imageCache[path] = img; // Corrected to use imageCache
        this.img = img; // Set the current image
    }

    /**
     * Loads multiple images and stores them in the cache.
     * @param {string[]} paths - An array of image paths.
     */
    loadImages(paths) {
        paths.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    /*
    moveLeft(){
        setInterval(()=>{
            this.x -= this.speed;
        }, 100)        
    }
    */
   playAnimation(images){
                    // Animation image handling
                    let i = this.currentImage % images.length;
                    let path = images[i];
                    this.img = this.imageCache[path];
                    this.currentImage++;
   }

   animate(images) {
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(images);
        }, 150);
    }
    moveLeft(){
        setInterval(()=>{
            this.x -= this.speed;
        }, 1000 / 60)
    }
}

//var first contact (bool) wird auf true wenn der abstand so und so ist
//zähler der zählt wie oft..
    //dann spiele startanimation ab aber nur einmal
// dann animation ab