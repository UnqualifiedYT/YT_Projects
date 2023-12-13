var grid = []
var rows
var cols
var resolution = 10
var dd
var con
var drop = false
var hm
var wlf
var conways = false
var ma
var maze = false
var wolframs = false
var terrain = false
let next
let tr
var homemade = true
var run = true



const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'nano', // or 'monolith', or 'nano'

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    closeOnScroll: true,
    useAsButton: true,
    autoRepositioning: true,
    comparison: false,
    showAlways: false,
    default: "#640A0A",

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            hsva: true,
            cmyk: true,
            input: true,
        }
    }
});







function preload(){
    dd = loadImage('images/drop down.png')
    hm = loadImage('images/download\ (3).jpg')
    wlf = loadImage('images/download\ (2).png')
    con = loadImage('images/images.jpeg')
    tr = loadImage('images/download.jpg')
    ma = loadImage('images/download.png')
}

function setup(){

    console.log(767.8021978021978/15.054945054945055)
    let canv = createCanvas(1370, 760)
    rows = height/resolution
    cols = width/resolution
    grid = makeGrid(cols, rows)
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j] = floor(random(2))
        }
    }
    
    canv.position(0,0)
    canv.style('z-index', '-1')

    
    pickr.hide()
}
function draw(){
    
    if(tutorial == true){
        Tutorial()
    }
    if(steps == 6){
      
        x=400
        y=600
        w=400
        h=100
        Ttex = 'Click or drag anywhere to\nset conditions for the game'
        rectMode(CENTER)
        textAlign(CENTER, CENTER)
        textSize(20)
        tutorial = false
    }
    
    rectMode(CORNER)
    if(keyIsDown(68)){
        if(steps == 5){
            
            tutorial = true
            steps += 1
            run = true
            console.log("ha")
        }
        for(var i = 0; i < cols; i++){
            for(var j = 0; j < rows; j++){
                run = true
                grid[i][j] = 0
            }
        }
        
    }
    if(run == true){
    background(0)
    
    next = makeGrid(cols, rows)
    
    if(homemade == true){
        HomeMade()
    }else if(conways == true){
        Conways()
    }else if(maze == true){
        Maze()
    }
    else if(wolframs == true){
        Wolframs()
    }
    else if(terrain == true){
        Terrain()
    }

    }

    if(run == true || steps == 8 || steps == 9){
    if(drop == true){
        fill(0)
        stroke(70)
        for(var i = 1; i < 14; i++){
            rect(0, i*20, 20, 20)
        }
        image(con, 0, 20, 19, 19)

        image(ma, 0, 40, 19, 19)
        image(wlf, 0, 60, 19, 19)
        image(hm, 0, 80, 19, 19)
        image(tr, 0, 100, 19, 19)
        fill(pickr.getColor().toRGBA()[0], pickr.getColor().toRGBA()[1], pickr.getColor().toRGBA()[2], pickr.getColor().toRGBA()[3]*255)
        rect(0, 120, 20, 20)
    }

    noStroke()
    fill(70, 70, 150)
    rect(0, 0, 20, 20)
    image(dd, 0, 0, 20, 20)
    if(tutorial == true){
        run = false
    }
    
}
    if(steps == 6 || steps == 7 || steps == 19){
        tutorial = false
        rectMode(CENTER)
        noStroke()
    fill(25)
    rect(x, y, w, h, 10)
    if(dist(mouseX, mouseY, x+(w/2-15), y-(h/2-15)) < 10){
        stroke(150, 10, 10)
        strokeWeight(6)
        line(x+(w/2-10), y-(h/2-10), x+(w/2-20), y-(h/2-20))
        line(x+(w/2-10), y-(h/2-20), x+(w/2-20), y-(h/2-10))
    }
    stroke(100)
    strokeWeight(3)
    line(x+(w/2-10), y-(h/2-10), x+(w/2-20), y-(h/2-20))
    line(x+(w/2-10), y-(h/2-20), x+(w/2-20), y-(h/2-10))
    cc=createVector(x+(w/2), y+(h/2))
    noStroke()
    fill(200) 
    textFont('Courier New')
    text(Ttex, x, y+5)
    noStroke()
    if(steps != 19){
    fill(150, 150, 200)
    rect(x+((w/2)+40), y+((h/2)-20), 70, 30, 5)
    fill(0) 
    textFont('Courier New')
    textSize(20)
    text("Next", x+((w/2)+40), y+((h/2)-20))
    }
        
    }
}

function makeGrid(cols, rows){
    let arr = new Array(cols)
    for(var i = 0; i < arr.length; i++){
        arr[i] = new Array(rows)

    }
    return arr
}


function evaluate(grid, x, y){
    var sum = 0
    for(var i = -1; i < 2; i++){
        for(var j = -1; j < 2; j++){
            let col = (x + i + cols) % cols
            let row = (y + j + rows) % rows
            sum += grid[col][row]
        }
    }
    sum -= grid[x][y]
    return sum
}

function mousePressed(){

    if(drop == true){
        if(dist(mouseX, mouseY, 10, 30) < 10){
            if(grid[round((mouseX)/resolution)][round((mouseY)/resolution)] == 0){
                let Gremove = [round((mouseX)/resolution), round((mouseY)/resolution)]
                console.log(round((mouseX)/resolution), round((mouseY)/resolution))
                
                setTimeout(function(){grid[Gremove[0]][Gremove[1]] = 0}, 60)
            }
            wolframs = false
            maze = false
            homemade = false
            terrain = false
            conways = true
            drop = false
        }
        if(dist(mouseX, mouseY, 10, 50) < 10){
            if(grid[round((mouseX)/resolution)][round((mouseY)/resolution)] == 0){
                let Gremove = [round((mouseX)/resolution), round((mouseY)/resolution)]
                console.log(round((mouseX)/resolution), round((mouseY)/resolution))
                
                setTimeout(function(){grid[Gremove[0]][Gremove[1]] = 0}, 60)
            }
            wolframs = false
            conways = false
            homemade = false
            terrain = false
            maze = true
            drop = false
        }
        if(dist(mouseX, mouseY, 10, 70) < 10){
            if(grid[round((mouseX)/resolution)][round((mouseY)/resolution)] == 0){
                let Gremove = [round((mouseX)/resolution), round((mouseY)/resolution)]
                console.log(round((mouseX)/resolution), round((mouseY)/resolution))
                
                setTimeout(function(){grid[Gremove[0]][Gremove[1]] = 0}, 60)
            }
            maze = false
            conways = false
            homemade = false
            wolframs = true
            terrain = false
            drop = false
        }
        if(dist(mouseX, mouseY, 10, 90) < 10){
            if(grid[round((mouseX)/resolution)][round((mouseY)/resolution)] == 0){
                let Gremove = [round((mouseX)/resolution), round((mouseY)/resolution)]
                console.log(round((mouseX)/resolution), round((mouseY)/resolution))
                
                setTimeout(function(){grid[Gremove[0]][Gremove[1]] = 0}, 60)
            }
            maze = false
            conways = false
            homemade = true
            wolframs = false
            terrain = false
            drop = false
        }
        if(dist(mouseX, mouseY, 10, 110) < 10){
            if(grid[round((mouseX)/resolution)][round((mouseY)/resolution)] == 0){
                let Gremove = [round((mouseX)/resolution), round((mouseY)/resolution)]
                console.log(round((mouseX)/resolution), round((mouseY)/resolution))
                
                setTimeout(function(){grid[Gremove[0]][Gremove[1]] = 0}, 60)
            }
            maze = false
            conways = false
            homemade = false
            wolframs = false
            terrain = true
            drop = false
        }
        if(dist(mouseX, mouseY, 10, 130) < 10){
            
            if(pickr.isOpen()){
                pickr.hide()
            }else{
                pickr.show()
            }
        }
    }

    if(dist(mouseX, mouseY, 0, 0) < 20){
        if(drop == true){
            drop = false
        }else{
            drop = true
            if(steps == 8){
                steps++
                run = true
            }
        }
    }


    if(dist(mouseX, mouseY, x+(w/2-15), y-(h/2-15)) < 10){
        if(tutorial == true || steps == 6 || steps == 7){

            if(steps < 5){
                steps = 5
                run = true
            }
            else if(steps <8){
                steps = 8
                run = true
            }
            else if(steps <14){
                steps = 14
                drop = true
                run = true
            }else if(steps < 16){
                steps = 16
                run = true
            }else if(steps == 16){
                steps = 17
                run = true
            }
            
        }
        if(steps == 19){
            steps = 20
            tutorial = false
            run = true
        }
    }
    if(dist(0, mouseY, 0, y+((h/2)-20)) < 20 && dist(mouseX, 0, x+((w/2)+40), 0) < 40){
        if(tutorial == true || steps == 6 || steps == 7 && steps != 8 && steps != 5 ){
            tutorial = true
            steps += 1
            run = true
        }
    }
    
}
