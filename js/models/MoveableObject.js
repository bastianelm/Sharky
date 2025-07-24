class MoveableObject extends DrawableObject{
    speed;
    otherDirection = false;
    introLoopIteration = 0;
    lives = 1000;
    isHurt = false;
    poisoned = false;
    isDead = false;
    attack = false;
    deathLoopIteration = 0;
    attackLoopIteration = 0;
    sleeping = false;
    swimming = true;

    renderFlippedImage(ctx){
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.scale(-1, 1);
        ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    renderHitBox(ctx){
        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.strokeStyle = "red";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    isColliding(object) {
        return this.x + this.width > object.x && this.y + this.height > object.y && this.x < object.x + object.width && this.y < object.y + object.height;
    }

    hit(damage){
        if(this.lives > 0){
            this.lives -= damage;
            if(this.lives <= 0){
                this.isDead = true;
            }
        }
    }

    playAnimation(images){
        // Animation image handling
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
   }

   chooseAnimation() {
        if (this.isDead) {
            if (this.deathLoopIteration <= this.IMAGE_DEATH.length - 1) {
                this.playAnimation(this.IMAGE_DEATH);
            }
            this.y -= this.speed;
            this.deathLoopIteration++;
        }
        else if(this.isHurt){
            if(this.poisoned){
                this.playAnimation(this.IMAGE_HURT_POISONED);
            } else{
                this.playAnimation(this.IMAGE_HURT_SHOCKED);
            }
        }
        else if (this.attack) {
            if (this.attackLoopIteration <= this.IMAGE_ATTACK.length - 1) {
                this.playAnimation(this.IMAGE_ATTACK);
                this.attackLoopIteration++;
            } else {
                this.attack = false;
                this.attackLoopIteration = 0;
            }
        } else if (this.swimming || this.constructor.name !== 'Character') {
            this.playAnimation(this.IMAGE_SWIMMING);
            if (this.constructor.name !== 'Character' && this.constructor.name !== 'Endboss') {
                this.moveLeft();
            }
        }
        else if(this.sleeping){
            this.playAnimation(this.IMAGE_SLEEP);
        }
        else{
            this.playAnimation(this.IMAGE_IDLE);
            setTimeout(() => {
                this.sleeping = true;
            }, 3000);
        }
    }

    setHurt(duration = 500) {
        if(this.isHurt || this.isDead){
            return;
        }
        this.isHurt = true;
        setTimeout(() => {
            this.isHurt = false;
            this.poisoned = false;
        }, duration);
    }

    moveLeft(){
        this.x -= this.speed;
    }
    moveRight(){
        this.x += this.speed;
    }
    moveUp(){
        this.y -= this.speed;
    }
    moveDown(){
        this.y += this.speed;
    }
   animate() {
            if(this.constructor.name === 'Endboss'){
                this.introLoopIteration++;
                if(this.IMAGE_INTRODUCE.length -1 >= this.introLoopIteration){
                    this.playAnimation(this.IMAGE_INTRODUCE);
                }
                else{
                    this.chooseAnimation();
                }
            } else{
                this.chooseAnimation();
            }
    }
    constructor(){
        super();
        window.setStoppableInterval(() => this.animate(), 150);
    }
}