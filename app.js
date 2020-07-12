// player variables
let player
let playerSize
let playerSpeed
let heading // for direction changes
let force
let size
let health
let score

// Zombie variables
let zombie
let zombieSize
let zombieSpeed
let zombieKillCounter

// Bullet variables 
let bullets = []
let bulletSpeed = []
let minZombieSpeed
let maxZombieSpeed
let zombieHeading

// main variables
let img
let scene
// setting up our p5 js structure
function preload() {
    // loading character image used
    img = loadImage("assets/survivor.png")
    img2 = loadImage("assets/zombie.png")
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight) // creating my canvas
    zombie = [] // zombie cords are to be stored and referenced to inside of an array
    zombieSpeed = [] // speed cords for zombies will be stored inside of an array 
    zombieSize = 100
    player = createVector(width/2, height/2) // creating our player on the cordonates of the canvas
    playerSpeed = createVector(0, 0)
    heading = 0
    size = 60 
    startSpeedMin = 1
    startSpeedMax = 3
    force = createVector(0, 0)
    score = 0
    lifes = 3
    level = 1
    zombieKillCounter = 0
    minZombieSpeed = 1
    maxZombieSpeed = 3
    scene = 1
    zombieHeading = []

    // generate our zombies
    for (i = 0; i < 8; i++) {
        // adding zombies to array with random location
        zombie.push(createVector(random(0, width), random(0, height)))
        // p5.vector.random2d creates vector with random cords... multiplied by our speed range
        zombieSpeed.push(p5.Vector.random2D().mult(random(startSpeedMin, startSpeedMax)))
        // push heading to zombie on spawn
        // zombieHeading.push(radians(zombieHeading))
    }
}

function draw() {
    // setting background color
    if (scene == 1) {
        startScreen() 
    }

    if (scene == 2) {
        background("#00b300")
        // if (zombieKillCounter % 2 == 0) {
        //     background("black")
        // }

        updatePlayer()
        updateZombies()
        updateBullets()
    }
}

function startScreen() {

    push()
    fill("gray")
    rectMode(CENTER)
    rect(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight)
    fill("black")
    rect(window.innerWidth/2, window.innerHeight/2, window.innerWidth-10, window.innerHeight-10, 100)
    pop()

    push()
    translate(window.innerWidth/2, window.innerHeight/2-40)
    textSize(40)
    textAlign(RIGHT)
    fill("#456e25")
    text('Outbreak Ambush', 10, -40)
    textAlign(CENTER)
    fill("#6e722e")
    text('Outbreak Ambush', 10, 0)
    textAlign(LEFT)
    fill("#977638")
    text('Outbreak Ambush', 10, 40)
    textSize(20)
    textAlign(CENTER)
    fill('white')
    text("Move using the directional keys & fire using the Space bar.", 10, 150)
    textSize(30)
    textAlign(CENTER)
    fill("white")
    text("Press ENTER to play...", 10, 300)
    pop()

    if (keyCode === ENTER) {
            scene += 1
        }
}

// updatePlayer

let updatePlayer = () => {


    youDied()
    // make our movements
    if (keyIsDown(LEFT_ARROW)) {
        heading -= 5
    }
    if (keyIsDown(RIGHT_ARROW)) {
        heading += 5
    }
    if (keyIsDown(UP_ARROW)) {
        // describing the accelleration
        // our force is equal to an angle measured 
        force = p5.Vector.fromAngle(radians(heading))
        playerSpeed.add(force.mult(0.3))
    }
    if (keyIsDown(DOWN_ARROW)) {
        
        force = p5.Vector.fromAngle(radians(heading))
        playerSpeed.sub(force.mult(0.2))
    }


    // containing the player
    if (player.x > window.innerWidth) {
        player.x = 0
    }
    if (player.x < 0) {
        player.x = window.innerWidth
    }
    if (player.y > window.innerHeight) {
        player.y = 0
    }
    if (player.y < 0) {
        player.y = window.innerHeight
    }

    //updating the player
    // mult is used as a multiple
    // speed will be slightly slower than max zombie
    playerSpeed.mult(.9)
    player.add(playerSpeed)



    // saving our current state so we can draw our character
    push()
    // making the center of this "drawing" to the cords of our player
    translate(player.x, player.y)

    rotate(radians(heading))
    // making the focal point our image the center
    imageMode(CENTER)
    // calling our imge at 0,0 cords of our focal point
    image(img, 0, 0, size, size)
    // ending our drawing
    pop()


    // display health
    push()
    fill(0)
    noStroke()
    rect(0, 0, width, 20)

    fill(255)
    text(`Life Remaining: ${lifes}`, 10, 15)

    // displaying score
    fill(255)
    text(`Score: ${score}`, 130, 15)

    fill(255)
    text(`Level: ${level}`, width-110, 15)
    pop()

}

// player is dead function
let youDied = () => {
    if (lifes <= 0) {

        background('black')
        // begin drawing text
        push()
        textAlign(CENTER)
        fill('white')
        textSize(40)
        text("YOU DIED...", window.innerWidth/2, window.innerHeight/2+30)
        text(`You finished with ${score} Points!`, window.innerWidth/2, window.innerHeight/2+80)
        pop()   
        // stops running game 
        noLoop()
        // create restart button
        restartBtn = createButton("Play Again")
        restartBtn.position(window.innerWidth/2, window.innerHeight/2+110)
        restartBtn.mousePressed(reset)
    }
}

// function to reset game will go inside you died function 
let reset = () => {
    // hide try again button
    restartBtn.hide()
    // reset stats
    lifes = 3
    score = 0
    minZombieSpeed = 1
    maxZombieSpeed = 3
    level = 1
    zombieKillCounter = 0
    shotCounter = 0
    // reset player location
    player.x = window.innerWidth/2
    player.y = window.innerHeight/2

    loop()
}


// update Zombies
let updateZombies = () => {
    for (i = 0; i < zombie.length; i++) {


        // creating collision with player
        if (dist(zombie[i].x, zombie[i].y, player.x, player.y) < zombieSize/2) {
        // reset position
            resetPosition()
        }        
        
        // update the location
        zombie[i].add(zombieSpeed[i])

        // containing zombies
        if (zombie[i].x > width+zombieSize/2) {
            zombie[i].x = 0-zombieSize/2
        }
        if (zombie[i].x < 0-zombieSize/2) {
            zombie[i].x = width+zombieSize/2
        }
        if (zombie[i].y > height+zombieSize/2) {
            zombie[i].y = 0-zombieSize/2
        }
        if (zombie[i].y < 0-zombieSize/2) {
            zombie[i].y = height+zombieSize/2
        }
    
        // drawing our zombies
        push()
        strokeWeight(0)
        fill("#316c1f")
        ellipse(zombie[i].x, zombie[i].y, zombieSize)
        fill("#456e25")
        ellipse(zombie[i].x, zombie[i].y, zombieSize*.9)
        fill("#5a702a")
        ellipse(zombie[i].x, zombie[i].y, zombieSize*.7)
        fill("#6e722e")
        ellipse(zombie[i].x, zombie[i].y, zombieSize*.5)
        fill("#827434")
        ellipse(zombie[i].x, zombie[i].y, zombieSize*.3)
        fill("#977638")
        ellipse(zombie[i].x, zombie[i].y, zombieSize*.1)
        pop()

        // making zombies images
        // push()
        // imageMode(CENTER)
        // image(img2, zombie[i].x, zombie[i].y, zombieSize, zombieSize)
        // pop()
    }
}
// resetting player position after collision with zombie
let resetPosition = () => {
    player.x = random(0, window.innerWidth)
    player.y = random(0, window.innerHeight)
    // resetting speed
    playerSpeed.mult(0)
    // lets make our hero invincible for 2 seconds
    lifes-= 1
}
// Bullet Functions 


let updateBullets = () => {
    for (i = 0; i < bullets.length; i++) {
        // creating the collision loop
        for (j = 0; j < zombie.length; j++) {
            // if distance between that bullet location and zombie location is less than half the zombie size...
            if (dist(bullets[i].x, bullets[i].y, zombie[j].x, zombie[j].y) < zombieSize/2) {
                // score is icremented
                score+=15
                // counting zombies 
                zombieKillCounter++
                // increasing difficulty
                if (zombieKillCounter > 5 && zombieKillCounter <= 10) {
                    minZombieSpeed = 2
                    maxZombieSpeed = 4
                    level = 2
                } else if (zombieKillCounter > 10) {
                    minZombieSpeed = 3
                    maxZombieSpeed = 5
                    level = 3
                }
                // zombie is going to respawn at random location
                zombie[j] = createVector(random(0, window.innerWidth), random(0, window.innerHeight))
                // zombie speed is going to be reestablished
                zombieSpeed[j] = p5.Vector.random2D().mult(random(minZombieSpeed, maxZombieSpeed))
            }
        }
        bullets[i].add(bulletSpeed[i])
        push()
        // creating color and size of bullets
        fill('black')
        stroke('gray')
        ellipse(bullets[i].x, bullets[i].y, 10, 10)
        pop()   
    }
}

function keyPressed() {
    if (keyCode == 32) {
        // creating bullet at location of player
        bullets.push(createVector(player.x, player.y))
        // creating bullet speed 
        bulletSpeed.push(p5.Vector.fromAngle(radians(heading)).mult(7))
    }
}