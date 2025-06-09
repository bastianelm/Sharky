class StartScreen extends DrawableObject {
    lostGame = {
        'img' : 'img/6.Botones/Tittles/Game Over/Recurso 9.png',
        'width' : 700,
        'height' : 98,
    };
    wonGame = {
        'img': 'img/6.Botones/Tittles/You win/Mesa de trabajo 1.png',
        'width' : 720,
        'height' : 405,
    }
    constructor(wonGame) {
        super();
        const selectedImage = wonGame ? this.wonGame : this.lostGame;
        this.width = selectedImage.width;
        this.height = selectedImage.height;
        this.x = (canvas.width - selectedImage.width) / 2;
        this.y = (canvas.height - selectedImage.height) / 2;
        this.loadImage(selectedImage.img);
    }
}