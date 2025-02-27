class MoveableObject {
    x = 120;
    y = 200;
    img;
    height = 150;
    width = 100;
    imageCache = {}; // Cache for multiple images

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

    /**
     * Moves the object horizontally.
     * @param {number} distance - The distance to move the object.
     */
    moveRight(distance) {
        this.x += distance;
    }

    /**
     * Moves the object vertically.
     * @param {number} distance - The distance to move the object.
     */
    moveDown(distance) {
        this.y += distance;
    }
}