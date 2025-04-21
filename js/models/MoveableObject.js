class MoveableObject{
    x = 120;
    y = 200;
    img;
    height = 37;
    width = 37;
    imageCache = {}; // Cache for multiple images
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    animationIteration = 0;
    lives = 10;
    isHurt = false;
    isDead = false;

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

    renderFlippedImage(ctx){
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.scale(-1, 1);
        ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    renderImage(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    renderHitBox(ctx){
        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.strokeStyle = "red";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    isColliding(enemy) {
        const tolerance = 1; // Erlaubt kleine Ungenauigkeiten
    
        const touchingLeft = Math.abs(this.x + this.width - enemy.x) <= tolerance &&
                             this.y < enemy.y + enemy.height &&
                             this.y + this.height > enemy.y;
    
        const touchingRight = Math.abs(this.x - (enemy.x + enemy.width)) <= tolerance &&
                              this.y < enemy.y + enemy.height &&
                              this.y + this.height > enemy.y;
    
        const touchingTop = Math.abs(this.y + this.height - enemy.y) <= tolerance &&
                            this.x < enemy.x + enemy.width &&
                            this.x + this.width > enemy.x;
    
        const touchingBottom = Math.abs(this.y - (enemy.y + enemy.height)) <= tolerance &&
                               this.x < enemy.x + enemy.width &&
                               this.x + this.width > enemy.x;
    
        return touchingLeft || touchingRight || touchingTop || touchingBottom;
    }

    hit(){
        this.lives > 0 ? this.lives-- : this.isDead = true;
    }

   playAnimation(images){
                    // Animation image handling
                    let i = this.currentImage % images.length;
                    let path = images[i];
                    this.img = this.imageCache[path];
                    this.currentImage++;
   }

   animate() {
        setInterval(() => {
            if(this.constructor.name === 'Endboss'){
                this.animationIteration++;
                if(this.IMAGE_INTRODUCE.length -1 >= this.animationIteration){
                    this.playAnimation(this.IMAGE_INTRODUCE);
                }
                else{
                    this.playAnimation(this.IMAGE_SWIMMING);
                    this.moveLeft();
                }
            } else{
                if(this.isDead){
                    this.playAnimation(this.IMAGE_DEATH);
                } else{
                    this.playAnimation(this.IMAGE_SWIMMING);
                    this.moveLeft();
                }
            }
        }, 150);
    }
    moveLeft(){
        setInterval(()=>{
            this.x -= this.speed;
        }, 1000 / 60)
    }
}