function Cable(sp, colour){
    this.sp = sp
    this.ep = sp
    this.eCon = []
    this.connected = false;
    this.send = 0


    

    this.update = function(){
        this.display()
        if(this.connected == false){
            this.ep = createVector(mouseX, mouseY)
        }else{
            if(this.eCon[1] == "NOT"){
                
            }else{
                this.ep = this.eCon[0].portPos.input[this.eCon[2]]
            }
            if(this.eCon[1] == "LOG"){
                this.ep = this.eCon[0].portPos.input
                this.eCon[0].run()
            }
        }

        this.send = sp.run()
        

    }

    this.display = function(){
        this.sp = sp.portPos.output
        stroke(colour)
        strokeWeight(2)
        line(this.sp.x, this.sp.y, this.ep.x, this.ep.y)
    }

}

function mouseReleased(){
    for(var i = 0; i < modules.length; i++){
        if(modules[i].label != "SOURCE"){
            if(dist(mouseX, mouseY, modules[i].portPos.input.x, modules[i].portPos.input.y) <= 15 && (modules[i].label == "NOT" || modules[i].label == "LOG")){
                cables[cables.length-1].connected = true
                modules[i].connection = cables[cables.length-1]
                
                cables[cables.length-1].eCon = [modules[i], modules[i].label]
                if(modules[i].label == "LOG"){
                    modules[i].input.push(cables[cables.length-1].send)
                    
                }else{
                    modules[i].input = cables[cables.length-1].send
                }
                
            }
        }
        

        if(modules[i].label != "NOT" && modules[i].label != "SOURCE" && modules[i].label != "LOG"){
            if(dist(mouseX, mouseY, modules[i].portPos.input[0].x, modules[i].portPos.input[0].y) <= 15){
                cables[cables.length-1].connected = true
                modules[i].connection.push(cables[cables.length-1])
                cables[cables.length-1].eCon = [modules[i], modules[i].label, 0]
                modules[i].input[0] = cables[cables.length-1].send
            }
            if(dist(mouseX, mouseY, modules[i].portPos.input[1].x, modules[i].portPos.input[1].y) <= 15){
                cables[cables.length-1].connected = true
                modules[i].connection.push(cables[cables.length-1])
                cables[cables.length-1].eCon = [modules[i], modules[i].label, 1]
                modules[i].input[1] = cables[cables.length-1].send
            }
        }
        
        //else{
        //     cables.splice(cables.length-1, 1)
        // }

        modules[i].locked = false
    }
    
}