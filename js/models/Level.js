class Level{

    enemies;
    backgroundObjects;

    constructor(enemies, backgroundObjects){
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        console.log('level created:' , this, this.parent);
    }

}