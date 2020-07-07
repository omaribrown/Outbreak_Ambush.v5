// initializing variables
let player
let playerSize
let playerSpeed
let heading // for direction changes
let force
let size
let health
let score



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

    playerSpeed.mult(.9)
    player.add(playerSpeed)



    // saving our current state so we can draw our character
    push()
    // making the center of this "drawing" to the cords of our player
    translate(player.x, player.y)
    // ========================== EXPLAIN HEADING IN RADIANS
    rotate(radians(heading))
    // making the focal point our image the center
    imageMode(CENTER)
    // calling our imge at 0,0 cords of our focal point
    image(img, 0, 0, size, size)
    // ending our drawing
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