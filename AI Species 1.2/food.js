function food(pos){
    this.pos = pos

    this.update = function(){
        fill(70, 70, 100, 50)
        ellipse(this.pos.x, this.pos.y, detail)
    }
}