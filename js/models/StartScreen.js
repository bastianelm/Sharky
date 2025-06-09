class StartScreen {
    lostGame = {
        'img' : 'img/6.Botones/Tittles/Game Over/Recurso 9.png',
        'width' : 700,
        'height' : 98,
    };
    wonGame = {
        'img': 'img/6.Botones/Tittles/You win/Mesa de trabajo 1.png',
        'width' : 520,
        'height' : 205,
    }
    reloadButton = {
        'img': 'img/6.Botones/Try again/Recurso 17.png',
        'width' : 557,
        'height' : 106,
    }

    constructor(wonGame) {
        console.log(canvas);
        
        this.objects = [];

        const selectedImage = wonGame ? this.wonGame : this.lostGame;
        const screenImage = new DrawableObject();

        screenImage.loadImage(selectedImage.img);
        screenImage.width = selectedImage.width;
        screenImage.height = selectedImage.height;
        screenImage.x = (canvas.width - screenImage.width) / 2;
        screenImage.y = 100;

        const reloadButton = new DrawableObject();
        reloadButton.loadImage(this.reloadButton.img);
        reloadButton.width = this.reloadButton.width;
        reloadButton.height = this.reloadButton.height;
        reloadButton.x = (canvas.width - reloadButton.width) / 2;
        reloadButton.y = screenImage.y + screenImage.height + 20;

        this.objects.push(screenImage, reloadButton);
    }

}