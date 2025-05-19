class MoveableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    animationIteration = 0;
    lives = 10;
    isHurt = false;
    isDead = false;
    attack = false;





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

    isColliding(enemy) {
        return this.x + this.width > enemy.x && this.y + this.height > enemy.y && this.x < enemy.x + enemy.width && this.y < enemy.y + enemy.height;
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

    chooseAnimation(){
        if(this.isDead){
            console.log("tot");
            this.playAnimation(this.IMAGE_DEATH);
            console.log(this.y);
            this.y += this.speed;
            console.log(this.y);
        } else{
            this.playAnimation(this.IMAGE_SWIMMING);
            if(this.constructor.name !== 'Character'){
                this.moveLeft()
            }
        }
    }
    moveLeft(){
        setInterval(()=>{
            this.x -= this.speed;
        }, 1000 / 60)
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
                this.chooseAnimation();
            }
        }, 150);
    }
}