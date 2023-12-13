var tutorial = true
var steps = 0
var x
var y
var w
var h
let cc
let Ttex

function Tutorial(){



    if(steps == 0){
        x=width/2
        y=height/2
        w=500
        h=100
        Ttex = "Hello"
        rectMode(CENTER)
        textAlign(CENTER, CENTER)
        textSize(100)
    }
    if(steps == 1){
        x=width/2
        y=height/2
        w=900
        h=200
        Ttex = "This is a different game than\nwhat you're probably used to"
        rectMode(CENTER)
        textAlign(CENTER, CENTER)
        textSize(50)
    }
    if(steps == 2){
        x=width/2
        y=height/2
        w=700
        h=200
        Ttex = "It's called a\nCellular Automata"
        rectMode(CENTER)
        textAlign(CENTER, CENTER)
        textSize(50)
    }
    if(steps == 3){
        x=width/2
        y=height/2
        w=700
        h=200
        Ttex = "This game plays itself"
        rectMode(CENTER)
        textAlign(CENTER, CENTER)
        textSize(50)
    }
    if(steps == 4){
        x=width/2
        y=height/2
        w=700
        h=200
        Ttex = "All you do is\nset the conditions"
        rectMode(CENTER)
        textAlign(CENTER, CENTER)
        textSize(50)
    }
    if(steps == 5){
        x=400
        y=200
        w=400
        h=100
        Ttex = 'Press "D" to clear the screen'
        rectMode(CENTER)
        textAlign(CENTER, CENTER)
        textSize(20)
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
    if(steps == 7){
        x=400
        y=600
        w=400
        h=100
        Ttex = 'Hold "T" to play'
        rectMode(CENTER)
        textAlign(CENTER, CENTER)
        textSize(20)
        tutorial = false
    }
    if(steps == 8){
        tutorial = true
        x=250
        y=100
        w=400
        h=100
        Ttex = 'Click this drop down menu\nto select a game type'
        rectMode(CENTER)
        textAlign(CENTER, CENTER)
        textSize(20)
        stroke(150)
        strokeWeight(3)
        line(50, 50, 25, 25)
        line(25, 25, 35, 25)
        line(25, 25, 25, 35)
        
    }
    if(steps == 9){
        
        x=250
        y=30
        w=400
        h=30
        Ttex = "This is Conway's game of life"
        rectMode(CENTER)
        textAlign(CENTER, BASELINE)
        textSize(20)
        stroke(150)
        strokeWeight(3)
        line(45, 30, 25, 30)
        line(25, 30, 30, 25)
        line(25, 30, 30, 35)

    }
    if(steps == 10){
        x=250
        y=50
        w=400
        h=30
        Ttex = 'This is a maze generator'
        rectMode(CENTER)
        textAlign(CENTER, BASELINE)
        textSize(20)
        stroke(150)
        strokeWeight(3)
        line(45, 50, 25, 50)
        line(25, 50, 30, 45)
        line(25, 50, 30, 55)
        tutorial = true
    }
    if(steps == 11){
        x=250
        y=70
        w=400
        h=30
        Ttex = "This is Wolfram's Algorithm"
        rectMode(CENTER)
        textAlign(CENTER, BASELINE)
        textSize(20)
        stroke(150)
        strokeWeight(3)
        line(45, 70, 25, 70)
        line(25, 70, 30, 65)
        line(25, 70, 30, 75)
        tutorial = true
    }
    if(steps == 12){
        x=250
        y=90
        w=400
        h=30
        Ttex = 'This is a Homemade Algorithm'
        rectMode(CENTER)
        textAlign(CENTER, BASELINE)
        textSize(20)
        stroke(150)
        strokeWeight(3)
        line(45, 90, 25, 90)
        line(25, 90, 30, 85)
        line(25, 90, 30, 95)
        tutorial = true
    }
    if(steps == 13){
        x=250
        y=110
        w=420
        h=30
        Ttex = 'And this is a Terrain Generator'
        rectMode(CENTER)
        textAlign(CENTER, BASELINE)
        textSize(20)
        stroke(150)
        strokeWeight(3)
        line(45, 110, 25, 110)
        line(25, 110, 30, 105)
        line(25, 110, 30, 115)
        tutorial = true
    }
    if(steps == 14){
        x=250
        y=130
        w=420
        h=60
        Ttex = 'You can use this to change the\n colours of the game'
        rectMode(CENTER)
        textAlign(CENTER, CENTER)
        textSize(20)
        stroke(150)
        strokeWeight(3)
        line(45, 130, 25, 130)
        line(25, 130, 30, 125)
        line(25, 130, 30, 135)
        tutorial = true
    }
    if(steps == 15){
        x=250
        y=130
        w=420
        h=60
        Ttex = 'And you can press "ESC"\nto exit the colour picker'
        rectMode(CENTER)
        textAlign(CENTER, CENTER)
        textSize(20)
        stroke(150)
        strokeWeight(3)
        line(45, 130, 25, 130)
        line(25, 130, 30, 125)
        line(25, 130, 30, 135)
        tutorial = true
    }
    if(steps == 16){
        x=width/2
        y=height/2
        w=500
        h=100
        Ttex = "HAVE FUN"
        rectMode(CENTER)
        textAlign(CENTER, CENTER)
        textSize(100)
        drop = false
    }
    if(steps == 17){
        x=width/2
        y=height/2
        w=500
        h=100
        Ttex = "OH WAIT!"
        rectMode(CENTER)
        textAlign(CENTER, CENTER)
        textSize(100)
    }
    if(steps == 18){
        x=width/2
        y=height/2
        w=450
        h=100
        Ttex = "one more thing"
        rectMode(CENTER)
        textAlign(CENTER, CENTER)
        textSize(50)
    }
    if(steps == 19){
        x=250
        y=130
        w=420
        h=60
        Ttex = 'You can hold "R" and\nclick/drag to remove cells'
        rectMode(CENTER)
        textAlign(CENTER, CENTER)
        textSize(20)
        stroke(150)
        strokeWeight(3)
        tutorial = false
    }




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
    if(steps != 8 && steps != 16 && steps != 5 && steps != 19){
    fill(150, 150, 200)
    rect(x+((w/2)+40), y+((h/2)-20), 70, 30, 5)
    fill(0) 
    textFont('Courier New')
    textSize(20)
    textAlign(CENTER, CENTER)
    text("Next", x+((w/2)+40), y+((h/2)-20))
    }
}
