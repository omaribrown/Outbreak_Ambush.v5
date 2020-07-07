let img
let scene
// setting up our p5 js structure
function preload() {
    // loading character image used
    img = loadImage("assets/survivor.png")
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight) // creating my canvas
    zombie = [] // zombie cords are to be stored and referenced to inside of an array
    zombieSpeed = [] // speed cords for zombies will be stored inside of an array 
    zombieSize = 50
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

    // generate our zombies
    for (i = 0; i < 8; i++) {
        // adding zombies to array with random location
        zombie.push(createVector(random(0, width), random(0, height)))
        // giving zombies a speed between 1-3

        zombieSpeed.push(p5.Vector.random2D().mult(random(startSpeedMin, startSpeedMax)))
    }
}

function draw() {
    // setting background color
    if (scene == 1) {
        startScreen() 
    }

    if (scene == 2) {
        background("#00b300")

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
    textSize(30)
    textAlign(CENTER)
    fill("white")
    text("Press ENTER to play...", 10, 300)
    pop()

    if (keyCode === ENTER) {
            scene += 1
        }
}