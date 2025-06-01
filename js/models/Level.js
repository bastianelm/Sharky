class Level{

    enemies;
    backgroundObjects;
    levelEndX;
    coins;

    constructor(enemies, backgroundObjects, levelEndX, coins, poisonBottles){
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.levelEndX = levelEndX;
        this.coins = coins;
        this.poisonBottles = poisonBottles;
    }
    
}