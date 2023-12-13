function wall(x, y){
    this.pos = createVector(x, y)

    this.update = function(){
        noStroke()
        fill(150)
        rect(this.pos.x, this.pos.y, 20, 20)
    }
}