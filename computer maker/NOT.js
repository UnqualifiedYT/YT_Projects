function NOT(input){
    this.modulePos = createVector(random(0, width), random(0, height))
    this.locked = false
    this.label = "NOT"
    this.input = 0
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
            input : createVector(this.modulePos.x-20, this.modulePos.y),
            output : createVector(this.modulePos.x+20, this.modulePos.y)
        }

        rectMode(CENTER)
        fill(200)
        rect(this.modulePos.x, this.modulePos.y, 65, 25, 1000)


        fill(30); noStroke()
        ellipse(this.portPos.input.x, this.portPos.input.y, 15)
        ellipse(this.portPos.output.x, this.portPos.output.y, 15)

        textSize(15);
        textFont('comicsans')
        textAlign(CENTER, CENTER);
        text('N', this.modulePos.x, this.modulePos.y);
    }


    this.run = function(){
        if(this.input == 1){
            return 0;
        }else{
            return 1;
        }
    }
}