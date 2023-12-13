let bcells = []
let foods = []
let button
let walls = []
let temps = []
let cell
var mos = []
var load = false
var loading = 0
var play = true
var togglePlay = false
var optimize = false
var migration = 100
var mcount = 0
var dna
var descell = []
var dnap
var extinctCount = 0
var extinctP
var cursor = 0
var dGrid = []
var des = [[0,0,0],
           [0,0,0],
           [0,0,0],]

function setup() {
  createCanvas(600, 400);
  dnap = createP()
  extinctP = createP()
  for(var i = 0; i < 100; i++){
    bcells[i] = new bcell()
  }
  dGrid = Grid(3, 3)
  for(var i = 0; i < 3; i++){
    mos[i] = (new moss(createVector(random(width), random(height))))
  }
  for(var i = 0; i < 9; i++){
    temps[i] = (new temperature(createVector(random(width), random(height)), floor(random(1,3))))
  }
  
  
}






function mouseWheel(event){
  if(keyIsDown(68)){
    
    for(var i = 0; i < (mw/2+mh/2)/100; i++){
      mos[i] = (new moss(createVector(random(width), random(height))))
    }
    for(var i = 0; i < (mw/2+mh/2)/25; i++){
      temps[i] = new temperature(createVector(random(width), random(height)), floor(random(1, 3)))
    }
    mw += event.delta
    mh += event.delta
    createCanvas(mw, mh)
    background(45)
    load = true
  }
  if(event.delta == 0){
    load = false
  }
}





function draw() {
  mcount += 1
  
  
  if(bcells.length <= 2){
    if(button != "ka" && button != "w" && button != "d"){
    extinctCount += 1
    extinctP.html("Times Extinct: " + extinctCount)
    for(var i = 0; i < 100; i++){
      bcells[i] = new bcell()
    }
    for(var i = 0; i < 3; i++){
      mos[i] = (new moss(createVector(random(width), random(height))))
    }
    for(var i = 0; i < 9; i++){
      temps[i] = (new temperature(createVector(random(width), random(height)), floor(random(1,3))))
    }
  
  if(optimize== true){
    if(document.getElementById("popslide").value > 100){
      document.getElementById("popslide").value = 80
    }
  }
  }
  }
  
  document.getElementById("tempsize").innerHTML = "Temperature Size: " + document.getElementById("tempslide").value
    document.getElementById("cellsize").innerHTML = "Cell Size: " + document.getElementById("cellslide").value
    document.getElementById("simspeed").innerHTML = "Simulation Speed: " + document.getElementById("simslide").value
    document.getElementById("tosize").innerHTML = "Temperature Opacity: " + document.getElementById("toslide").value
    document.getElementById("popsize").innerHTML = "Maximum Population: " + document.getElementById("popslide").value
    
  background(45);
  stroke(60, 60, 255, 100)
  strokeWeight(4)
  line(mouseX, mouseY, pmouseX, pmouseY)
  

  if(keyIsDown(80)){
    togglePlay = true
  }

  for(var i = 0; i < mos.length; i++){
    mos[i].show()
    if(mos[i].die == true){
      mos.splice(i, 1)
    }
  }
  
  if(button == "bo"){
    
      document.getElementById("produce").style.display = "block"
    
  }else{
    
      
        document.getElementById("produce").style.display = "none"
      
  }
  
  

  if(mouseIsPressed){
    
    if(mouseX < width && mouseY > 0){
      
      if(button == "i"){
      bcells.push(new bcell(2, [2, 4], createVector(mouseX, mouseY)))
    }
    if(button == "dna"){
      for(var i = 0; i < bcells.length; i++){
        if(dist(mouseX, mouseY, bcells[i].pos.x, bcells[i].pos.y) < 15){
          dna = bcells[i].dna
          dnap.html(dna)
        }
      }
    }
    if(button == "bo"){
      
        for(var i = 0; i < bcells.length; i++){
          if(dist(mouseX, mouseY, bcells[i].pos.x, bcells[i].pos.y) < 15){
            bcells[i].isOrganism = true
          }
        }
      
    }
    if(button == "ic"){
      bcells.push(new bcell(4, [2, 4, 10, 12], createVector(mouseX, mouseY)))
    }
    if(button == "ij"){
      bcells.push(new bcell(3, [2, 14, 4], createVector(mouseX, mouseY)))
    }
    if(button == "ka"){
      bcells = []
      walls = []
      foods = []
      temps = []
      mos = []
    }
    if(button == "d"){
      bcells.push(new bcell(undefined, undefined, createVector(mouseX, mouseY)))
    }
    if(button == "a"){
      bcells.push(new bcell(2, [2, 8], createVector(mouseX, mouseY)))
    }
    if(button == "c"){
      temps.push(new temperature(createVector(mouseX, mouseY), 1))
    }
    if(button == "h"){
      temps.push(new temperature(createVector(mouseX, mouseY), 2))
    }
    if(button == "p"){
      bcells.push(new bcell(4, [2, 4, 6, 8], createVector(mouseX, mouseY)))
    }
    if(button == "n"){
      bcells.push(new bcell(2, [6, 8], createVector(mouseX, mouseY)))
    }
    if(button == "w"){
      walls.push(new wall(mouseX, mouseY))
    }
    if(button == "r"){
      for(var i = 0; i < walls.length; i++){
        if(dist(mouseX, mouseY, walls[i].pos.x, walls[i].pos.y) < 15){
          walls.splice(i, 1)
        }
      }
    }
    if(button == "f"){
      foods.push(new food(createVector(mouseX, mouseY)))
    }
    if(button == "k"){
      for(var i = 0; i < bcells.length; i++){
        if(dist(mouseX, mouseY, bcells[i].pos.x, bcells[i].pos.y) < 20){
          bcells.splice(i, 1)
        }
      }
    }
    if(button == "dro"){
      for(var i = 0; i < bcells.length; i++){
        if(dist(mouseX, mouseY, bcells[i].pos.x, bcells[i].pos.y) < 10){
          bcells[i].vel = createVector()
          bcells[i].pos = createVector(mouseX, mouseY)
        }
      }
    }
    }
    
  }
  

  if(mouseIsPressed){
    if(dist(mouseX, mouseY, width, height) < 70 && dist(mouseX, mouseY, width, height) > 0){
      createCanvas(mouseX, mouseY)
      background(45)
      for(var i = 0; i < (mouseX/2+mouseY/2)/100; i++){
        mos[i] = (new moss(createVector(random(width), random(height))))
      }
      for(var i = 0; i < (mouseX/2+mouseY/2)/25; i++){
        temps[i] = (new temperature(createVector(random(width), random(height)), floor(random(1, 3))))
      }
      load = true
    }
  }


  for(var i = 0; i < walls.length; i++){
    walls[i].update()
  }
  
  for(var i = 0; i < foods.length; i++){
    foods[i].update()
    
  }

  for(var i = 0; i < bcells.length; i++){
    bcells[i].update()
    
    
    
    
  }
  if(bcells.length >= document.getElementById("popslide").value){
    bcells.splice(bcells.length-1, 1)
  }
  for(var i = 0; i < bcells.length; i++){
    if(bcells[i].hunger){
      if(bcells[i].hunger >= bcells[i].hungerspan){
      bcells.splice(i, 1)
    }
  }
  }
  for(var i = 0; i < temps.length; i++){
    temps[i].update()
  }


  
    
  
  if(load == true){

    

      fill(45)
      rect(0, 0, width, height)
      fill(170, 200)
      textSize(15)
      text("loading terrain...", (width/2)-100, height/2)

  }
  
  if(button == "de"){
    fill(70)
    rect((width/2)-100, (height/2)-100, 210, 210)
    fill(120, 70, 10)
    rect((width/2)+100, (height/2)-100, 10, 10)
    fill(120, 0, 0)
    rect((width/2)+100, (height/2)-90, 10, 10)
    fill(0, 120, 0)
    rect((width/2)+100, (height/2)-80, 10, 10)
    fill(120, 0, 120)
    rect((width/2)+100, (height/2)-70, 10, 10)
    fill(200)
    rect(width/2, height/2, 10, 10)
    
    if(mouseIsPressed){
      console.log(1)
      if(dist(mouseX, mouseY, (width/2)+100, (height/2)-85) < 10){
        cursor = 1
        console.log(2)
        
        
      }
      if(dist(mouseX, mouseY, (width/2)+100, (height/2)-75) < 10){
        cursor = 2
        console.log(4)
        
        
      }
      if(cursor == 1){
          fill(120, 70, 10)
          rect(Math.round(mouseX / 10) * 10, Math.round(mouseY / 10) * 10, 10, 10)
          console.log(3)
        }if(cursor == 2){
          fill(120, 0, 0)
          rect(Math.round(mouseX / 10) * 10, Math.round(mouseY / 10) * 10, 10, 10)
          console.log(3)
        }
    }
  }
  for(var i = 0; i < dGrid.length; i++){
    for(var j = 0; j < dGrid.length; j++){
      if(dGrid[i][j] == 1){
        fill(120, 70, 10)
        rect(((width/2))+(i*10), ((height/2-20))+(j*10), 10, 10)
      }
    }
  }
  
}



function bcell(organism, ca, cells, pos, connected, isOrganism, dnaf, dnas){
  this.cells = []
  this.connected = []
  this.onceL = [0, 0, 0, 0 , 0, 0, 0]
  var x = []
  var y = []
  this.neighbours = []
  if(dnaf){
    this.firs = dnaf
    this.secon = dnas
    this.dna = `${dnaf}x${dnas}`
  }else{
    this.firs = floor(random(9))
    this.secon = floor(random(0, 99999))
    this.dna = `${this.firs}x${this.secon}`
  }
  this.hot = 0
  this.cold = 0
  this.thermia = 200-(document.getElementById("simslide").value*2)
  if(organism){
    this.organism = organism
  }else{
  this.organism = Grid(3, 3)
  }
    
  if(ca){
    this.ca = ca
  }
  else{
    this.ca = floor(random(1, 20))
  }
  if(pos){
    this.pos = pos
  } else{
    this.pos = createVector(random(width, 0), random(height, 0))
  }
  if(cells){
    this.cells = cells
      
    
    
  } else{
    for(var i = 0; i < this.ca; i++){
      this.cells[i] = floor(random(1, 20))
    }
    
  }
if(isOrganism){
  this.isOrganism = isOrganism
}else{
  this.isOrganism = false
}


  if(connected){
    this.connected[1] = connected
    bcells.push(new bcell(this.connected.length, this.connected[1], createVector(this.pos.x-10, this.pos.y+10), undefined, false, this.dna))
  }
  else{
    this.connected = []
  }
  this.acc = createVector()
  this.vel = createVector()
  this.hungerspan = random(180,270)-(document.getElementById("simslide").value*2)
  this.mutate = floor(random(1, 7))
  this.hunger = 0
  this.rotation = floor(random(0, 3))
  this.pRate = 200-(document.getElementById("simslide").value*1.5)
  this.fin = 0
  this.jside = floor(random(1, 3))
  this.once = 0
  this.life = 0
  this.lifespan = 700-(document.getElementById("simslide").value*4)
  
  this.gin = 0
  this.esr = floor(random(150-(document.getElementById("simslide").value*2), 300-(document.getElementById("simslide").value*2)))
  this.genspan = floor(random(400-(document.getElementById("simslide").value*3), 500-(document.getElementById("simslide").value*3)))
  this.eri = 0
  
  this.update = function(){
    if(play == true){
    //this.organism[1][1] = 1
    this.life++
    if(this.life >= this.lifespan){
      this.hunger = this.hungerspan
    }
    
    // console.log(this.hunger)
    //console.log(this.cold)
    // console.table(this.organism)

    for(var i = 0; i < temps.length; i++){
      if(dist(this.pos.x, this.pos.y, temps[i].pos.x, temps[i].pos.y) < temps[i].size*2){
        if(temps[i].temp == 1){
          this.cold += 1
          //console.log(this.cold)
        }
        if(temps[i].temp == 2){
          this.hot += 1
        }
      }
      
    }

    if(this.cells.includes(8)){
      this.hunger += 1.5
    }
    else{
      this.hunger += 1
    }
  
    
    
    if(this.cold > this.thermia){
      this.hunger = this.hungerspan
      
    }
    if(this.hot > this.thermia){
      this.hunger = this.hungerspan
    }
    this.cell()
    this.move()
    
    
      this.gin += 1
      if(this.gin >= this.genspan){

        for(var i = 0; i < random(1, 3); i++){
          if(this.mutate == 5){
            bcells.push(new bcell(floor(random(1, 20)), [floor(random(1, 20))], createVector(this.pos.x, this.pos.y)))
            this.mutate = random(1, 7)
          }else{
            
            bcells.push(new bcell(this.ca, this.cells, createVector(this.pos.x, this.pos.y), this.connected[1], false, this.firs, this.secon+i))
          }
          

        }
        
        this.genspan = floor(random(600-(document.getElementById("simslide").value*2), 700-(document.getElementById("simslide").value*2)))
        this.gin = 0
        this.mutate = floor(random(1, 7))
      }
      
  }
    noStroke()
    fill(Math.round((this.secon/(this.secon/130))/10)*10, this.firs*50)
    rect(this.pos.x, this.pos.y, (document.getElementById("cellslide").value/5), +(document.getElementById("cellslide").value/5))
  }
  
  this.move = function(){


    if(this.isOrganism == true){
      if(keyIsDown(LEFT_ARROW)){
        this.vel.x -= 0.5
      }
      if(keyIsDown(RIGHT_ARROW)){
        this.vel.x += 0.5
      }
      if(keyIsDown(UP_ARROW)){
        this.vel.y -= 0.5
      }
      if(keyIsDown(DOWN_ARROW)){
        this.vel.y += 0.5
        
      }
      if(!keyIsDown(DOWN_ARROW) && !keyIsDown(UP_ARROW)){
        this.vel.y = 0
      }
      if(!keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)){
        this.vel.x = 0
      }
      
    }


    if(this.isOrganism == false){
      if(this.cells.includes(8)){
      this.acc = createVector(random((document.getElementById("simslide").value/500), -(document.getElementById("simslide").value/500)), random((document.getElementById("simslide").value/500), -(document.getElementById("simslide").value/500)))
    }
    else{
      this.acc = createVector(random((document.getElementById("simslide").value/100), -(document.getElementById("simslide").value/100)), random((document.getElementById("simslide").value/100), -(document.getElementById("simslide").value/100)))
    }
    }
    
      this.vel.add(this.acc)
    
    
    this.pos.add(this.vel)
    this.acc = createVector()
    
    if(this.pos.x+(document.getElementById("cellslide").value/5) > width){
      this.vel.x = -(document.getElementById("simslide").value/50)
    }
    if(this.pos.x-(document.getElementById("cellslide").value/5) < 0){
      this.vel.x = (document.getElementById("simslide").value/50)
    }
    if(this.pos.y+(document.getElementById("cellslide").value/5) > height){
      this.vel.y = -(document.getElementById("simslide").value/50)
    }
    if(this.pos.y-(document.getElementById("cellslide").value/5) < 0){
      this.vel.y = (document.getElementById("simslide").value/50)
    }
    

    for(var i = 0; i < walls.length; i++){
      if(dist(this.pos.x, this.pos.y, walls[i].pos.x, walls[i].pos.y) < 15+(document.getElementById("cellslide").value/5)){
        this.vel = createVector()

      }

    }


  }
  
  
  this.cell = function(){
      noStroke()
    
      if(this.cells.includes(2)){

        
        if(this.onceL[0] == 0){
          x[0] = floor(random(0, this.organism.length))
          y[0] = floor(random(0, this.organism.length))
          
          while((x[0] == 1 && y[0]==1) || this.organism[x[0]][y[0]] == 1){
            x[0] = floor(random(0, this.organism.length))
            y[0] = floor(random(0, this.organism.length))
          }

          


          this.organism[y[0]][x[0]] = 1
          this.onceL[0] = 1 

          x[0] = x[0]-1
          y[0] = y[0]-1
        }
        
        
        
        //console.table(this.organism)
        

        fill(120, 70, 10, 120)
        
        rect(this.pos.x+((x[0]*10)), this.pos.y+((y[0]*10)), (document.getElementById("cellslide").value/5), (document.getElementById("cellslide").value/5))
        for(var i = 0; i < foods.length; i++){
          if(dist(this.pos.x, this.pos.y, foods[i].pos.x, foods[i].pos.y) < 3+(document.getElementById("cellslide").value/5)){
            foods.splice(i, 1)
            this.hunger = 0
          }
        }
        for(var i = 0; i < mos.length; i++){
          if(dist(this.pos.x,this.pos.y, mos[i].position.x, mos[i].position.y) < 50){
          mos[i].pos.splice(0, 1)
          this.hunger = 0 
        }
        }
        
      }

      if(this.cells.includes(14)){
        
        if(this.jside == 1){
          
          fill(0,0 ,0 , 100)
        
          rect(this.pos.x-(document.getElementById("cellslide").value/5), this.pos.y+(document.getElementById("cellslide").value/5), (document.getElementById("cellslide").value/5), -5+(document.getElementById("cellslide").value/5))
          fill(100, 100, 240, 120)
          rect(this.pos.x-(document.getElementById("cellslide").value/5), this.pos.y+5+(document.getElementById("cellslide").value/5), (document.getElementById("cellslide").value/5), -5+(document.getElementById("cellslide").value/5))

          for(var i = 0; i < bcells.length; i++){
            if(dist(this.pos.x-(document.getElementById("cellslide").value/5), this.pos.y+(document.getElementById("cellslide").value/5), bcells[i].pos.x, bcells[i].pos.y) < -5+(document.getElementById("cellslide").value/5)){
              this.vel = bcells[i].vel
              if(this.once == 0){
                this.hungerspan = 350-(document.getElementById("simslide").value*2)
                this.once = 1
              }
              this.pos = createVector(bcells[i].pos.x+(document.getElementById("cellslide").value/5), bcells[i].pos.y-(document.getElementById("cellslide").value/5))
              this.connected[1] = bcells[i].cells
            }
          }
        }
        if(this.jside == 2){
    
          fill(0,0 ,0 , 100)
        
          rect(this.pos.x+(document.getElementById("cellslide").value/5), this.pos.y+(document.getElementById("cellslide").value/5), (document.getElementById("cellslide").value/5), -5+(document.getElementById("cellslide").value/5))
          fill(100, 100, 240, 120)
          rect(this.pos.x+(document.getElementById("cellslide").value/5), this.pos.y+5+(document.getElementById("cellslide").value/5), (document.getElementById("cellslide").value/5), -5+(document.getElementById("cellslide").value/5))

          for(var i = 0; i < bcells.length; i++){
            if(dist(this.pos.x+(document.getElementById("cellslide").value/5), this.pos.y+(document.getElementById("cellslide").value/5), bcells[i].pos.x, bcells[i].pos.y) < -5+(document.getElementById("cellslide").value/5)){
              this.vel = bcells[i].vel
              this.pos = createVector(bcells[i].pos.x-(document.getElementById("cellslide").value/5), bcells[i].pos.y-(document.getElementById("cellslide").value/5))
              this.connected[1] = bcells[i].cells
            }
          }
        }
        
        
      }
        
      
    
    
    if(this.cells.includes(4)){
      if(this.onceL[1] == 0){
        x[1] = floor(random(0, this.organism.length))
        y[1] = floor(random(0, this.organism.length))
        
        while((x[1] == 1 && y[1]==1) || this.organism[x[1]][y[1]] == 1){
          x[1] = floor(random(0, this.organism.length))
          y[1] = floor(random(0, this.organism.length))
        }
        this.organism[y[1]][x[1]] = 1
        this.onceL[1] = 1 
        x[1] = x[1]-1
        y[1] = y[1]-1
      }

      fill(30, 140, 10, 120)
      rect(this.pos.x+((x[1]*10)), this.pos.y+((y[1]*10)), (document.getElementById("cellslide").value/5), (document.getElementById("cellslide").value/5))
      for(var i = 0; i < mos.length; i++){
        if(dist(this.pos.x,this.pos.y, mos[i].position.x, mos[i].position.y) < 50){
        this.fin += 100
      }
      }
      
      this.fin ++
      if(this.fin >= this.pRate){
        for(var i = 0; i < random(2, 6); i++){
          foods.push(new food(this.pos))
          this.hunger = 0
        }
        
        this.fin = 0
      } 
    }
    if(this.cells.includes(6)){
      this.eri ++
      if(this.eri >= this.esr){
        this.rotation = floor(random(0, 3))
        this.eri = 0
      }



      fill(120, 0, 110, 120)
      rect(this.pos.x, this.pos.y-(document.getElementById("cellslide").value/5), (document.getElementById("cellslide").value/5), (document.getElementById("cellslide").value/5))

      
      if(this.rotation == 0){
        fill(0)
        rect(this.pos.x+3, this.pos.y-(document.getElementById("cellslide").value/5), 2.5, 5.5)
      }
      if(this.rotation == 2){
        fill(0)
        rect(this.pos.x-1.5, this.pos.y+2.5-(document.getElementById("cellslide").value/5), 5.5, 2.5)
      }
      if(this.rotation == 1){
        fill(0)
        rect(this.pos.x+7.5, this.pos.y+2.5-(document.getElementById("cellslide").value/5), 5.5, 2.5)
      }



      for(var i = 0; i < bcells.length; i++){
        if(dist(this.pos.x, this.pos.y, bcells[i].pos.x, bcells[i].pos.y) < 30+(document.getElementById("cellslide").value/5) && dist(this.pos.x, this.pos.y, bcells[i].pos.x, bcells[i].pos.y) > (document.getElementById("cellslide").value/5)){
          if(bcells.length > 0){
          if(bcells[i].cells.includes(8)){
            if(this.rotation = 0){
              if(bcells[i].pos.y < this.pos.y){
                this.vel.y = 0.7
              }
            }
            if(this.rotation = 2){
              if(bcells[i].pos.x < this.pos.x){
                this.vel.x = 0.7
              }
            }
            if(this.rotation = 1){
              if(bcells[i].pos.x > this.pos.x){
                this.vel.y = -0.7
              }
            }
            
          }
        }
        }
      }
    }
    if(this.cells.includes(8)){

      if(this.onceL[2] == 0){
        x[2] = floor(random(0, this.organism.length))
        y[2] = floor(random(0, this.organism.length))
        
        while((x[2] == 1 && y[2]==1) || this.organism[x[2]][y[2]] == 1){
          x[2] = floor(random(0, this.organism.length))
          y[2] = floor(random(0, this.organism.length))
        }
        this.organism[y[2]][x[2]] = 1
        this.onceL[2] = 1 
        x[2] = x[2]-1
        y[2] = y[2]-1
      }

      fill(140, 10, 10, 120)
      rect(this.pos.x+((x[2]*10)), this.pos.y+((y[2]*10)), (document.getElementById("cellslide").value/5), (document.getElementById("cellslide").value/5))
      for(var i = 0; i < bcells.length; i++){
        if(dist(this.pos.x, this.pos.y, bcells[i].pos.x, bcells[i].pos.y) < 15+(document.getElementById("cellslide").value/5) && dist(this.pos.x, this.pos.y, bcells[i].pos.x, bcells[i].pos.y) > 5+(document.getElementById("cellslide").value/5)){
          if(this.pos != bcells[i].pos){
            bcells[i].hunger = bcells[i].hungerspan
            this.hunger = 0
            
          }
          
        }
      }
    }
    if(this.cells.includes(10)){
      if(this.onceL[3] == 0){
        x[3] = floor(random(0, this.organism.length))
        y[3] = floor(random(0, this.organism.length))
        
        while((x[3] == 1 && y[3]==1) || this.organism[x[3]][y[3]] == 1){
          x[3] = floor(random(0, this.organism.length))
          y[3] = floor(random(0, this.organism.length))
        }
        this.organism[y[3]][x[3]] = 1
        this.onceL[3] = 1 
        x[3] = x[3]-1
        y[3] = y[3]-1
      }

      fill(70, 70, 230, 120)
      rect(this.pos.x+((x[3]*10)), this.pos.y+((y[3]*10)), (document.getElementById("cellslide").value/5), (document.getElementById("cellslide").value/5))
      this.hot = 0
    }
    if(this.cells.includes(12)){
      if(this.onceL[4] == 0){
        x[4] = floor(random(0, this.organism.length))
        y[4] = floor(random(0, this.organism.length))
        
        while((x[4] == 1 && y[4]==1) || this.organism[x[4]][y[4]] == 1){
          x[4] = floor(random(0, this.organism.length))
          y[4] = floor(random(0, this.organism.length))
        }
        this.organism[y[4]][x[4]] = 1
        this.onceL[4] = 1 
        x[4] = x[4]-1
        y[4] = y[4]-1
      }

      fill(230, 70, 70, 120)
      rect(this.pos.x+(document.getElementById("cellslide").value/5), this.pos.y-(document.getElementById("cellslide").value/5), (document.getElementById("cellslide").value/5), (document.getElementById("cellslide").value/5))
      this.cold = 0
    }
    
  }
  
}
function i(){
  button = "i"
}
function n(){
  button = "n"
}
function p(){
  button = "p"
}
function w(){
  button = "w"
}
function k(){
  button = "k"
}
function r(){
  button = "r"
}
function a(){
  button = "a"
}
function c(){
  button = "c"
}
function h(){
  button = "h"
}
function ic(){
  button = "ic"
}
function d(){
  button = "d"
}
function ka(){
  button = "ka"
}
function de(){
  button = "de"
}
function ij(){
  button = "ij"
}
function dro(){
  button = "dro"
}
function bo(){
  button = "bo"
}





function temperature(pos, temp){
  if(pos){
    this.pos = pos
  }
  else{
    this.pos = createVector(random(width, 0), random(height, 0))
  }
  this.vel = createVector()
  
  this.size = 0
  this.expand = 0
  
  if(temp){
    this.temp = temp
  } else{
    this.temp = random(0, 3)
  }
  

  this.update = function(){
    if(this.pos.x < width && this.pos.x > 0 && this.pos.y < height && this.pos.y > 0){
      for(var i = 0; i < walls.length; i++){
        this.vel.add(createVector(random(-0.01, 0.01), random(-0.01, 0.01)))
      if(dist(this.pos.x, this.pos.y, walls[i].pos.x, walls[i].pos.y) < 50){
        this.vel = createVector()
      }
  }
    }else{
      if(this.pos.x >= width){
        this.vel.x = -0.04
      }
      if(this.pos.x <= 0){
        this.vel.x = 0.04
      }
      if(this.pos.y >= height){
        this.vel.y = -0.04
      }
      if(this.pos.y <= 0){
        this.vel.y = 0.04
      }
      
      
    }
    
    




    

    this.pos.add(this.vel)
    
      
      if(this.expand < 90){
        this.expand += (document.getElementById("simslide").value/50)
        this.size = this.expand/(1/(document.getElementById("tempslide").value/60))
      }
    if(this.size < 200){
      this.size += 0.1
    }
    
    if(this.temp == 1){
      noStroke()
      if(optimize == false){
      fill(70, 70, 230, (document.getElementById("toslide").value/2))}
      else{
        fill(70, 70, 230, (document.getElementById("toslide").value/0.5))
      }
    }
    if(this.temp == 2){
      noStroke()
      if(optimize == false){
      fill(230, 70, 70, (document.getElementById("toslide").value/2))
      }
      else{
        fill(230, 70, 70, (document.getElementById("toslide").value/0.6))
      }
    }
    
    if(document.getElementById("toslide").value > 1){

    
    var i = 0;
    if(optimize == false){
      while(i < 300){
        var radius = random(this.size);
        var a = random(TWO_PI);
        ellipse(this.pos.x+cos(a)*radius, this.pos.y+sin(a)*radius, this.size/1.2, this.size/1.2)
        i++
      }
    }else{
      while(i < 100){
        var radius = random(this.size);
        var a = random(TWO_PI);
        ellipse(this.pos.x+cos(a)*radius, this.pos.y+sin(a)*radius, this.size/1.2, this.size/1.2)
        i++
      }
    }
  }
  if(mcount == migration){
    mcount = 0
  }
  }
}


function produce(){

  for(var i = 0; i < bcells.length; i++){

    if(bcells[i].isOrganism == true){
      for(var j = 0; j < floor(random(5, 15)); i++){
        foods.push(new food(bcells[i].pos))
      }
      
    }
  }
}

var mw = 1100
var mh = 400



function moss(pos){

  this.pos = []
  this.position = pos
  this.die = false

  for(var i = -5; i < 5; i++){
    for(var j = -5; j < 5; j++){

        this.pos.push(createVector(pos.x-(i*random(5,13)), pos.y-(j*random(5,13))))
      }
    }
  
  
  this.show = function(){
    noStroke()
    var i = 0
    if(optimize == false){
      while(i < this.pos.length){
        fill(0, 70, 0)
        ellipse(this.pos[i].x, this.pos[i].y, 3, 3)
        i++
      }
    }else{
      while(i < this.pos.length/2){
        fill(0, 70, 0)
        ellipse(this.pos[i].x, this.pos[i].y, 6, 6)
        i++
      }
    }
    
    if(this.pos.length <= 0){
      this.die = true
    }
  }
  
  
}

function keyReleased(){
  if(togglePlay == true){
    if(play == true){
      play = false
    }else{
      play = true
    }
  }
  
} 
function mouseReleased(){
  load = false
  
  if(cursor == 1){
    des[(Math.round(mouseY / 10)-19)][(Math.round(mouseX / 10) - 29)] = 1
    dGrid[(Math.round(mouseY / 10)-19)][(Math.round(mouseX / 10) - 29)] = 1
    descell.push(2)
    
  }
  if(cursor == 2){
    des[(Math.round(mouseY / 10)-19)][(Math.round(mouseX / 10) - 29)] = 1
    dGrid[(Math.round(mouseY / 10)-19)][(Math.round(mouseX / 10) - 29)] = 2
    descell.push(8)
    
  }
  cursor = 0
}

function keyPressed(){
  if(keyCode == 68){
    bcells.push(new bcell(des, 9, descell, createVector(0,0)))
  }
}