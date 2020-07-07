let img
// setting up our p5 js structure
function preload() {
    // loading character image used
    img = loadImage("assets/survivor.png")
}

function setup() {
    // creating my canvas
    createCanvas(window.innerWidth, window.innerHeight)
    // creating our player on the cordonates of the canvas
    zombie = [] // zombie cords are to be stored and referenced to inside of an array
    zombieSpeed = [] // speed cords for zombies will be stored inside of an array 
    zombieSize = 50
    player = createVector(width/2, height/2)
    playerSpeed = createVector(0, 0)
    heading = 0
    size = 60 
    startSpeedMin = 1
    startSpeedMax = 3
    force = createVector(0, 0)
    score = 0
    lifes = 3
    zombieKillCounter = 0
    minZombieSpeed = 1
    maxZombieSpeed = 3

    


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
    background("#00b300")

    // generating and running the player
    updatePlayer()
    updateZombies()
    updateBullets()
}