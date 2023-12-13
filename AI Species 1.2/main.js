let popsize = 5
let orgs = []
let deathPixels = []
let detail = 4
let foods = []

function setup(){
    createCanvas(600, 400)
    for(var i = 0; i < popsize; i++){
        orgs.push(new org);
    }

    frameRate(60);
}

function draw(){

    background(35, 35, 50)
    noStroke()

    textSize(10);
    fill(255);
    text(round(frameRate()), 10, 15)

    fill(255, 30)

    for(var j = 0; j < deathPixels.length; j++){
        foods[j] = (new food(deathPixels[j]))
    }
    for(var i = 0; i < foods.length; i++){
        foods[i].update()
    }

    for(var i = 0; i < popsize; i++){
        orgs[i].update();
        if(orgs[i].lifespan <= 1){
            
            for(var j = 0; j < orgs[i].cellpos.length/5; j++){
                deathPixels.push(orgs[i].cellpos[j])
            }
            for(var j = 0; j < popsize; j++){
                if(orgs[j].connectList.includes(orgs[i])){
                    for(var k = 0; k < orgs[j].connectList.length; k++){
                        if(orgs[j].connectList[k] == orgs[i]){
                            orgs[j].connectList.splice(k, 1);
                        }
                        
                        //console.log(orgs[j].connectList)
                    }
                }
            }
            popsize -= 1
            orgs.splice(i, 1)
            
        }
    }
    

    
}
