let bullets = []
let bulletSpeed = []
let minZombieSpeed
let maxZombieSpeed
let zombieHeading


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