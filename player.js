// initializing variables
let player
let playerSize
let playerSpeed
let heading // for direction changes



let updatePlayer = () => {

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