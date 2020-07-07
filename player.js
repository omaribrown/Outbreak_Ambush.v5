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
    if (player.x > width+playerSize/2) {
        player.x = 0-playerSize/2
    }
    if (player.x < 0-playerSize/2) {
        player.x = width+playerSize/2
    }
    if (player.y > height+playerSize/2) {
        player.y = 0-playerSize/2
    }
    if (player.y < 0-playerSize/2) {
        player.y = height+playerSize/2
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