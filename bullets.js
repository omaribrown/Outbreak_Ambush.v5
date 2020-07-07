let bullets = []
let bulletSpeed = []

let updateBullets = () => {
    for (i = 0; i < bullets.length; i++) {



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