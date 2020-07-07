let zombie
let zombieSize
let zombieSpeed

let updateZombies = () => {
    for (i = 0; i < zombie.length; i++) {


        // update the location
        
        zombie[i].add(zombieSpeed[i])
        console.log(zombie[i].x, zombie[i].y)

    
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