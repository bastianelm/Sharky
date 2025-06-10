class Level{

    enemies;
    backgroundObjects;
    levelEndX;
    coins;
    poisonBottles;

    constructor(enemies, backgroundObjects, levelEndX, coins, poisonBottles){
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.levelEndX = levelEndX;
        this.coins = coins;
        this.poisonBottles = poisonBottles;
    }

    newCoins(){
        this.coins = [
            new Coin(200, 100),
            new Coin(300, 100),
            new Coin(450, 100),
            new Coin(500, 300),
            new Coin(550, 200),
            new Coin(600, 100),
            new Coin(650, 300),
            new Coin(700, 150),
            new Coin(800, 150),
        ];
    }
    newPoisonBottles(){
        this.poisonBottles = [
            new PoisonBottle(200, 350),
            new PoisonBottle(300, 400),
            new PoisonBottle(400, 350),
            new PoisonBottle(620, 380),
        ];
    }
}