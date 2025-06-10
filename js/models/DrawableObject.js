class DrawableObject {
    x = 120;
    y = 200;
    img;
    height = 37;
    width = 37;
    imageCache = {}; // Cache for multiple images
    currentImage = 0;
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
        renderImage(ctx){
           ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
}