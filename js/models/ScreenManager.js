class ScreenManager {
    constructor(gameOver) {
        this.menu = document.getElementById("menu");
        toggleElementsDisplay([this.menu, canvas]);
        this.reloadButton = "<img src='img/6.Botones/Try again/Recurso 17.png' alt='Try Again'>";
        console.log(gameOver);
        if(gameOver === true) {
            this.menu.innerHTML = `
                <button><img src='img/6.Botones/Tittles/Game Over/Recurso 9.png' alt='Game Over'></button>
                <button onclick='restartGame()'>${this.reloadButton}</button>
            `;
        } else if (gameOver === false) {
            this.menu.innerHTML = `
                <button><img src='img/6.Botones/Tittles/You win/Mesa de trabajo 1.png' alt='You Win'></button>
                <button onclick='restartGame();startNewGame()'>${this.reloadButton}</button>
            `;
        } else {
            console.log("dritte option");
        }
    }
}