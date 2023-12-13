function Wolframs(){ 
    noStroke()
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            if(grid[i][j] == 1){
                fill(pickr.getColor().toRGBA()[0], pickr.getColor().toRGBA()[1], pickr.getColor().toRGBA()[2], pickr.getColor().toRGBA()[3]*255)
            }else{
                fill(0)
            }
            ellipse(i*resolution+5, j*resolution+5, resolution, resolution)
        }
    }



    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){


            
            let neighbours = evaluate(grid, i, j)
            let state = grid[i][j]

            if(neighbours <= 0){
                next[i][j] = 0
            } else if(state == 0 && neighbours == 1){
                next[i][j] = 1
            } else{
                next[i][j] = grid[i][j]
            }
            
        }
    }

    if(keyIsDown(84) && tutorial == false){
        grid = next
    }

    if(mouseIsPressed && drop == false && run == true && dist(mouseX, mouseY, 0, 0) > 20 && (tutorial == false || steps == 6)){
        if(keyIsDown(82)){
            grid[round((mouseX/resolution)/1)*1][round((mouseY/resolution)/1)*1] = 0
        }else{
        grid[round((mouseX/resolution)/1)*1][round((mouseY/resolution)/1)*1] = 1
        }
    }
}