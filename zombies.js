let zombie
let zombieSize
let zombieSpeed
let zombieKillCounter

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