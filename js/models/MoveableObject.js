class MoveableObject extends DrawableObject{
    speed;
    otherDirection = false;
    introLoopIteration = 0;
    lives = 1000;
    isHurt = false;
    isDead = false;
    attack = false;
    deathLoopIteration = 0;
    attackLoopIteration = 0;

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

    hit(){
        this.lives > 0 ? this.lives -= 20 : this.isDead = true;
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
            if(this.deathLoopIteration <= this.IMAGE_DEATH.length-1){
                this.playAnimation(this.IMAGE_DEATH);
            }
            this.y -= this.speed;
            this.deathLoopIteration++;
        }
        else if(this.attack){
            if(this.attackLoopIteration <= this.IMAGE_ATTACK.length-1){
                this.playAnimation(this.IMAGE_ATTACK);
                this.attackLoopIteration++;
            } else{
                this.attack = false;
                this.attackLoopIteration = 0;
            }
        } else{
            this.playAnimation(this.IMAGE_SWIMMING);
            if(this.constructor.name !== 'Character'){
                this.moveLeft();
            }
        }
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
        setInterval(() => {
            if(this.constructor.name === 'Endboss'){
                this.introLoopIteration++;
                if(this.IMAGE_INTRODUCE.length -1 >= this.introLoopIteration){
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