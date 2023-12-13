let cables = []
let modules = []
let moduleList = []
let mouseOffset

function setup(){
    createCanvas(900, 600)
    moduleList = [new AND(), new NOT(), new OR(), new XOR(), new SOURCE(), new LOG()]

    for(var i = 0; i < moduleList.length; i++){
        modules.push(moduleList[i])
    }
}

function draw(){

    background(30)
    noStroke()
    for(var i = 0; i < modules.length; i++){
        modules[i].update()
        if(mouseIsPressed){
            if(modules[i].locked == true){
                modules[i].modulePos.sub(createVector((modules[i].modulePos.x - (mouseX - mouseOffset.x))/2, (modules[i].modulePos.y - (mouseY - mouseOffset.y))/2))
            }
        }
    }

    for(var i = 0; i < cables.length; i++){
        cables[i].update()
        if(cables[i].connected == false && i != cables.length-1){
            cables.splice(i, 1)
        }
    }
    

}

function SOURCE(){
    this.modulePos = createVector(random(0, width), random(0, height))
    this.locked = false
    this.label = "SOURCE"
    this.connection

    this.portPos = {
        output : createVector(this.modulePos.x+20, this.modulePos.y)
    }

    this.update = function(){
        this.display()
    }

    this.display = function(){

        this.portPos = {
            //input : createVector(this.modulePos.x-20, this.modulePos.y),
            output : createVector(this.modulePos.x+20, this.modulePos.y)
        }

        rectMode(CENTER)
        fill(200)
        rect(this.modulePos.x, this.modulePos.y, 65, 25, 1000)


        fill(30); noStroke()
        ellipse(this.portPos.output.x, this.portPos.output.y, 15)

        textSize(15);
        textFont('comicsans')
        textAlign(CENTER, CENTER);
        text('Power', this.modulePos.x-8, this.modulePos.y);
    }


    this.run = function(){
        return 1
    }
}



function LOG(input){
    this.modulePos = createVector(random(0, width), random(0, height))
    this.locked = false
    this.label = "LOG"
    this.input = []
    this.connection

    this.portPos = {
        input : createVector(this.modulePos.x-20, this.modulePos.y)
    }

    this.update = function(){
        this.display()
        if(this.connection && this.input){
            this.input = this.connection.send
        }
    }

    this.display = function(){

        this.portPos = {
            //input : createVector(this.modulePos.x-20, this.modulePos.y),
            input : createVector(this.modulePos.x-20, this.modulePos.y)
        }

        rectMode(CENTER)
        fill(200)
        rect(this.modulePos.x, this.modulePos.y, 65, 25, 1000)


        fill(30); noStroke()
        ellipse(this.portPos.input.x, this.portPos.input.y, 15)

        textSize(15);
        textFont('comicsans')
        textAlign(CENTER, CENTER);
        text('LOG', this.modulePos.x+8, this.modulePos.y);
    }


    this.run = function(){
        console.log(this.input)
    }
}



function mousePressed(){
    for(var i = 0; i < modules.length; i++){
        if(modules[i].label != "LOG"){
            if(dist(mouseX, mouseY, modules[i].portPos.output.x, modules[i].portPos.output.y) <= 10){
                cables.push(new Cable(modules[i], [random(0, 255), random(0, 255), random(0, 255)]))
                cables[cables.length-1].send = modules[i].run()
            }
        }

        if(modules[i].locked == false && (modules[i].label == "NOT" || modules[i].label == "SOURCE" || modules[i].label == "LOG")){
            if(dist(mouseX, 0, modules[i].modulePos.x, 0) <= 10){
                if(dist(mouseY, 0, modules[i].modulePos.y, 0) <= 15){
                    mouseOffset = createVector(mouseX-modules[i].modulePos.x, mouseY-modules[i].modulePos.y)
                    // modules[i].modulePos = createVector(modules[i].modulePos.x - mouseOffset.x, modules[i].modulePos.y - mouseOffset.y)
                    modules[i].locked = true
                    
                }
            }
        }
        if(modules[i].locked == false && modules[i].label != "NOT"){
            if(dist(mouseX, 0, modules[i].modulePos.x, 0) <= 10){
                if(dist(mouseY, 0, modules[i].modulePos.y, 0) <= 30){
                    // modules[i].modulePos = createVector(modules[i].modulePos.x - mouseOffset.x, modules[i].modulePos.y - mouseOffset.y)
                    modules[i].locked = true
                }
            }
        }
    }
    
}