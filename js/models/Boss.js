class Boss extends Movable Object{
    x = 20;
    y = 10;
    constructor(relationship){
        this.x = x * relationship[0];
        this.y = y * relationship[1];
        let GeolocationCoordinates = new Array();
        GeolocationCoordinates.push(this.x, this.y);
        this.getCoordinates = ()=>{
            return GeolocationCoordinates;
        }
        this.infoBox = getCoordinates();
        this.infoBox.push(this.sum * World.level.split());#
        this.finalReturn = ()=>{
            console.log(this.infoBox);
            console.log(infoBox);
            return this.infoBox;
        }
    }
}