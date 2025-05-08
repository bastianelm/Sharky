alert("asdfsss");
class StatusBar extends DrawableObject{
    IMAGES = [
        'img/4. Marcadores/green/Life/0_ copia 3.png',
        'img/4. Marcadores/green/Life/20_ copia 4.png',
        'img/4. Marcadores/green/Life/40_ copia 3.png',
        'img/4. Marcadores/green/Life/60_ copia 3.png',
        'img/4. Marcadores/green/Life/80 copia 3.png',
        'img/4. Marcadores/green/Life/100_ copia 2.png',
    ];
    constructor(){
        this.loadImages(IMAGES);
    }
    percentage = 100;
    setPercentage(p){
        this.percentage = p;
    }
}