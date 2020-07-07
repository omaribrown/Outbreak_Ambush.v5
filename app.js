
// setting up our p5 js structure
function preload() {
    // loading character image used
    img = loadImage("assets/survivor.png")
}

function setup() {
    // creating my canvas
    createCanvas(window.innerWidth, window.innerHeight)
    // creating our player on the cordonates of the canvas
    player = createVector(width/2, height/2)
    playerSpeed = createVector(0, 0)
    heading = 0
    size = 60 
}

function draw() {
    // setting background color
    background("#00b300")

    // generating and running the player
    updatePlayer()
}