function XOR(input){
    this.modulePos = createVector(random(0, width), random(0, height))
    this.locked = false
    this.label = "XOR"
    this.input = [0, 0]
    this.connection

    this.portPos = {
        input : createVector(this.modulePos.x-20, this.modulePos.y),
        output : createVector(this.modulePos.x+20, this.modulePos.y)
    }

    this.update = function(){
        this.display()
        if(this.connection && this.input){
            this.input = this.connection.send
        }
    }

    this.display = function(){

        this.portPos = {
            input : [createVector(this.modulePos.x-20, this.modulePos.y+15), createVector(this.modulePos.x-20, this.modulePos.y-15)],
            output : createVector(this.modulePos.x+20, this.modulePos.y)
        }

        rectMode(CENTER)
        fill(200)
        rect(this.modulePos.x, this.modulePos.y, 65, 55, 15, 100, 100, 15)


        fill(30); noStroke()
        ellipse(this.portPos.input[0].x, this.portPos.input[0].y, 15)
        ellipse(this.portPos.input[1].x, this.portPos.input[1].y, 15)
        ellipse(this.portPos.output.x, this.portPos.output.y, 15)

        textSize(15);
        textFont('comicsans')
        textAlign(CENTER, CENTER);
        text('X', this.modulePos.x, this.modulePos.y);
    }

    this.run = function(){
        if( this.input[0] == 0 ? this.input[1] != 0 :  this.input[1] == 0) {
            return 1
        }else{
            return 0
        }
    }
}