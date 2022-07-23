
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//setting canvas on weidth and height to 1024/576
canvas.width = 1024
canvas.height = 576


//using canvas api (.fillRect draws a rectangle) to fill up canvas at starting from  0,0
c.fillRect(0, 0, canvas.width, canvas.height)


// added a const gravity for the game 
const gravity  = 0.6
// using for object oriented programing to create a sprite class that will take a position, when called on. 
//velocity and position are wrapped together because you cant through velocity first and cant put position second.
// within the draw method we are taking arguments built in the new sprite and filling it with given arguements.
//lastkey for each player

class Sprite {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.height = 125
        this.lastKey
    }
    
    draw() {
        c.fillStyle = "orange"
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }
    
    //the update method adds the drop speed(gravity) to y for each time the frame is loaded through draw
    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        //if the top of the character is at the bottom of the board then set drop to 0
        //else keep dropping
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
}


//when a player is being invoked it createss a new sprite of a player with x, y set.
//player has x,y velocity of 0,
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }

})


const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }

})


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    }
}



let lastKey
//creating a constant loop where we request the window to have a animation 
//by taking in the argument of itself
//updates the canvas with a fillrect after each loop and setting it to black 
//update draws and moves the object
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0


    //player movement
    if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -1
    } else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 1 
    } 

    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -1
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 1
    } 
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            break


        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -20
            break
    }
 console.log(event.key)
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
    }

    //enemys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
    }
    console.log(event.key)
})

