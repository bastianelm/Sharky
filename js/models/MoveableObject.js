class MoveableObject {
    x = 0;
    y = 250;
    img;
    width = 150;
    height = 100;


    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    moveRight(){
        console.log("Moving right");
    }

    moveLeft(){
        console.log("Moving left");
    }

    moveUp(){
        console.log("Moving up");
    }

    moveDown(){
        console.log("Moving down");
    }

}