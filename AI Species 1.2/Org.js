function org(celltype, moveCount, lifespan, seeFood, aggression, pos){
    if(pos){
        this.pos = pos
    }else{
        this.pos = createVector(random(50, 550), random(50, 350))
    }
    this.passive = random(0, 15)
    this.acc = createVector()
    this.vel = createVector()
    this.mutation = []
    this.mutationList = []
    this.cellpos = []
    this.celltype = []
    this.scaling = 5
    this.locking = 2
    this.locked = false;
    if(aggression){
        this.aggression
    }else{
        this.aggression = round(random(1, 25))
    }
    
    

    this.vel = createVector(0, 0)
    this.connectList = []
    if(seeFood){
        this.seeFood = seeFood
    }else{
        this.seeFood = round(random(1, 2))
    }

    this.moveCount = 0;
    this.produceCount = 0;
    this.killCount = 0;
    this.mouthCount = 0;

    if(lifespan){
        this.lifespan = lifespan
    }else{
        this.lifespan = 250+random(-70, 70);
        this.origLifespan = lifespan
    }    
    
    
    this.orgTypeList = ["consumer", "producer"]
    this.orgType = this.orgTypeList[round(random(0, 1))]
    
    if(celltype){
        this.celltype = celltype
        this.moveCount = moveCount
    }else{
        for(var i = 0; i < 600/detail; i++){
            if(this.orgType == "producer"){
                this.celltype.push(round(random(2, 4)))
            }
            else if(this.orgType == "consumer"){
                this.celltype.push(round(random(1, 3)))
                this.truce = 0;
            }
            if(this.celltype[i] == 1){
                this.moveCount++;
            }
            if(this.celltype[i] == 2){
                this.killCount++;
            }
            if(this.celltype[i] == 4){
                this.produceCount++;
            }
    }
    }

    this.genFood = 0;
    
    
    this.genCount = 250;
    

    this.update = function(){
        this.move();
        this.create();
        this.live();
        this.scaling = 5+(this.connectList.length);
        //console.log(this.connectList)
    }

    this.create = function(){
        for(var i = 0; i < 600/detail; i++){
        
            this.cellpos.push(createVector(this.pos.x+random(-random(0, 3), random(0, 3)), this.pos.y+random(-random(0, 3), random(0, 3))))

            
            if(i !== floor(this.cellpos.length/2)){
                if(dist(this.cellpos[i].x, this.cellpos[i].y, this.pos.x, this.pos.y) <= (this.scaling*2)+3.5){
                    this.cellpos[i].add(random((-1), (1)), random((-1), (1)))
                }
                else{
                    this.cellpos[i].add((this.pos.x - this.cellpos[i].x), (this.pos.y - this.cellpos[i].y))
                }
            }
            
            

            if(this.celltype[i] == 1){
                fill(255, 30)
            }
            if(this.celltype[i] == 2){
                fill(255, 0, 0, 30)
            }
            
            if(this.celltype[i] == 3){
                fill(240, 133, 11, 30)
            }
            if(this.celltype[i] == 4){
                fill(0, 235, 0, 30)
            }
            //console.log(this.celltype)

            ellipse(this.cellpos[i].x, this.cellpos[i].y, detail)

            
            
        }
        if(this.cellpos.length > 700/detail){
            this.cellpos.splice(this.cellpos.length-(600/detail), 600/detail)
        }
    }

    this.move = function(){
        // if(keyIsDown(LEFT_ARROW)){
        //     this.pos.x -= 1
        //     this.pos.y += random(0.5, -0.5)
        // }
        // if(keyIsDown(RIGHT_ARROW)){
        //     this.pos.x += 1
        //     this.pos.y += random(0.5, -0.5)
        // }
        // if(keyIsDown(UP_ARROW)){
        //     this.pos.y -= 1
        //     this.pos.x += random(0.5, -0.5)
        // }
        // if(keyIsDown(DOWN_ARROW)){
        //     this.pos.y += 1
        //     this.pos.x += random(0.5, -0.5)
        // }

        this.acc.add(createVector((random(-0.01, 0.01))*(this.moveCount/10)+0.0001, random(-0.01, 0.01)*(this.moveCount/10)+0.0001))
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0)


        if(this.pos.x >= width-3){
            this.vel.x *= -1;
        }
        if(this.pos.x <= 3){
            this.vel.x *= -1;
        }
        if(this.pos.y >= height-3){
            this.vel.y *= -1;
        }
        if(this.pos.y <= 3){
            this.vel.y *= -1;
        }


        if(mouseIsPressed){

            if(this.locked == false){
                if(dist(this.pos.x, this.pos.y, mouseX, mouseY) < 5*this.scaling){
                    this.pos.x -= (this.pos.x-mouseX)/this.locking
                    this.pos.y -= (this.pos.y-mouseY)/this.locking


                    if(dist(this.pos.x, this.pos.y, mouseX, mouseY) < 2*this.scaling){
                        this.locked = true;
                    }
                }
            }else{
                if(dist(this.pos.x, this.pos.y, mouseX, mouseY) < 1000*this.scaling){
                    this.pos.x -= (this.pos.x-mouseX)/this.locking
                    this.pos.y -= (this.pos.y-mouseY)/this.locking


                    if(dist(this.pos.x, this.pos.y, mouseX, mouseY) < 2*this.scaling){
                        this.locked = true;
                    }
                }else{
                    this.locked = false;
                }
            }
        }else{
            this.locked = false;
        }

        for(i = 0; i < popsize; i++){
            if(orgs[i] !== this){
                if(dist(this.pos.x, this.pos.y, orgs[i].pos.x, orgs[i].pos.y) < 5*(this.scaling)){
                    this.pos.x -= (this.pos.x - orgs[i].pos.x)*0.025
                    this.pos.y -= (this.pos.y - orgs[i].pos.y)*0.025
                    if(this.connectList.includes(orgs[i]) == false){
                        this.connectList.push(orgs[i])
                        this.scaling = (this.connectList.length*2)+5
                        //console.log(this.scaling)
                    }
                }
            }
        }


        this.live = function(){
            this.lifespan--;
            this.genCount--;
            if(this.genCount <= 0){
                popsize += 1
                for(var i = 0; i < random(0, 5); i++){
                    this.mutationList.push(([this.celltype, this.moveCount, this.origLifespan, this.seeFood, this.aggression])[round(random(0, 4))])
                }
                if(this.mutationList.includes(this.celltype)){
                    this.mutation[0] = this.celltype
                }else{
                    this.mutation[0] = undefined
                }
                if(this.mutationList.includes(this.moveCount)){
                    this.mutation[1] = this.moveCount
                }
                else{
                    this.mutation[1] = undefined
                }
                if(this.mutationList.includes(this.origLifespan)){
                    this.mutation[2] = this.origLifespan
                }
                else{
                    this.mutation[2] = undefined
                }
                if(this.mutationList.includes(this.seeFood)){
                    this.mutation[3] = this.seeFood
                }
                else{
                    this.mutation[3] = undefined
                }
                if(this.mutationList.includes(this.aggression)){
                    this.mutation[4] = this.aggression
                }
                else{
                    this.mutation[4] = undefined
                }
                orgs.push(new org(this.mutation[0], this.mutation[1], this.mutation[2], this.mutation[3], this.mutation[4], this.pos.add(createVector(random(-5*(this.scaling), 5*(this.scaling)), random(-5*(this.scaling), 5*(this.scaling))))));
                this.genCount = 250;
            }

            if(this.celltype.includes(2) && random(0, 30) > 29.9){
                for(var i = 0; i < orgs.length; i++){
                    if(orgs[i] != this){
                        
                        if(dist(this.pos.x, this.pos.y, orgs[i].pos.x, orgs[i].pos.y) <= 4*(this.scaling)){
                            //console.log("killed")
                            orgs[i].lifespan -= this.killCount*5
                            this.lifespan += this.killCount*8
                            
                            // console.log(orgs[i])
                            
                        }

                        if(dist(this.pos.x, this.pos.y, orgs[i].pos.x, orgs[i].pos.y) <= 500 && random(0, this.aggression) > this.aggression/1.3 && this.killCount > orgs[i].killCount){
                            this.pos.x += ((orgs[i].pos.x - this.pos.x)/(dist(orgs[i].pos.x, 0, this.pos.x, 0)))/10
                            this.pos.y += ((orgs[i].pos.y - this.pos.y)/(dist(orgs[i].pos.y, 0, this.pos.y, 0)))/10

                            //console.log("Im goin in")
                        }

                    }
                }
            }


            if(this.celltype.includes(3)){
                for(var j = 0; j < this.cellpos.length; j++){
                    if(this.celltype[j] == 3){
                        for(var i = 0; i < foods.length; i++){

                            if(this.celltype.includes(4) == false){
                                if(this.seeFood == 1 && random(0, 1000) > 5){
                                    if(dist(this.pos.x, this.pos.y, foods[i].pos.x, foods[i].pos.y) < 500){
                                        this.pos.x += ((foods[i].pos.x - this.pos.x)/(dist(foods[i].pos.x, 0, this.pos.x, 0)))/900
                                        this.pos.y += ((foods[i].pos.y - this.pos.y)/(dist(foods[i].pos.y, 0, this.pos.y, 0)))/900
                                    }
                                }
                            }


                            if(dist(this.cellpos[j].x, this.cellpos[j].y, foods[i].pos.x, foods[i].pos.y) < detail+2){
                                foods.splice(i, 1);
                                deathPixels.splice(i, 1)
                                this.lifespan += 5
                            }
                        }
                    }
                }
            }

            if(this.celltype.includes(4)){
                this.genFood--;
                if(this.genFood <= 0){
                    for(var i = 0; i < 15; i++){
                        foods.push(new food(createVector(this.pos.x+random(-15, 15), this.pos.y+random(-15, 15))))
                    }
                    this.genFood = 250-(this.produceCount*2)
                    //console.log("done")
                }
            }

                
        }
    }

}