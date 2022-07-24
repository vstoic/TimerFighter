
document.addEventListener('DOMContentLoaded', () => {

// const canvas = document.querySelector('canvas')
const canvas = document.getElementById('timer-fighter');
console.log(canvas)
const c = canvas.getContext('2d')

// new Sprite(canvas);

//setting canvas on weidth and height to 1024/576
canvas.width = 1024
canvas.height = 576


//using canvas api (.fillRect draws a rectangle) to fill up canvas at starting from  0,0
c.fillRect(0, 0, canvas.width, canvas.height)


// added a const gravity for the game 
const gravity  = 1.3

// using for object oriented programing to create a sprite class that will take a position, when called on. 
//velocity and position are wrapped together because you cant through velocity first and cant put position second.
// within the draw method we are taking arguments built in the new sprite and filling it with given arguements.
//lastkey movement for each player
//added an attackbox for the character
//added an is attacking value for each player

class Sprite {
    constructor({ position, velocity, color = "orange", offset}) {
        this.position = position
        this.velocity = velocity
        this.color = color
        this.width = 50
        this.height = 125
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.isAttacking
        this.health = 100
    }
    
    draw() {
        //characters animation
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, 50, this.height)

        //attackbox animation
        //if statement allows draw to only show when isAttacking is true 
       
        if (this.isAttacking){
        c.fillStyle = "red"
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }}
    
    //the update method adds the drop speed(gravity) to y for each time the frame is loaded through draw
    update() {
        this.draw()
        //sets the position of the x box to the characters position 
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        //if the top of the character is at the bottom of the board then set drop to 0
        //else keep dropping
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
    // when invoked attacking is character/bots isAttacking value set to true for 100ms then changed back to false
    attack() {
        this.isAttacking = true 
        setTimeout (() => {
            this.isAttacking = false
        }, 100)
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
    },
    offset: {
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
    },
    color: "blue",
    offset: {
        x: -50,
        y: 0
    }
})

//these are the keys for the players / bots
//stops movement if false
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
    
}



// collision for attackboxes and enemy
//if the players x to width position is past enemys position and vise versa &&
// players y to height is with in enemys height and vise versa 
function rectangleCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height 
    )
}

// has there if statements for what end game displays. 
// resets the html id of displayTie display from hidden to flex and changes the innerHTML content
// stops the timeout timer
function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId)
    document.querySelector('#displayTie').style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector('#displayTie').innerHTML = 'Tie'
    } else if (player.health > enemy.health) {
        document.querySelector('#displayTie').innerHTML = 'Player 1 Wins!'
    } else if (player.health < enemy.health) {
        document.querySelector('#displayTie').innerHTML = 'Player 2 Wins!'
    }
}

// this is the clock function that sets and counts down the clock
let timer = 99
let timerId
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    if (timer === 0) {
        determineWinner({player, enemy, timerId})
    }
}

decreaseTimer()


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
    enemy.velocity.x = 0


    //player movement 
    //if last key is pressed then player will move in that direction by altering velocity
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -7
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 7 
    } 

    //enemy movement same as players
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -7
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 7
    } 

    //collision detect
    // if rectanglecollision is true and is attacking is true
    if (rectangleCollision({
        rectangle1: player,
        rectangle2: enemy
        }) && player.isAttacking) {
        player.isAttacking = false    
        enemy.health -= 10
        document.querySelector('#enemy-health').style.width = enemy.health + '%'
        console.log('player attack successful');
    }

    if (rectangleCollision({ 
        rectangle1: enemy,
        rectangle2: player 
        }) && enemy.isAttacking) {
        enemy.isAttacking = false
        player.health -= 10
        document.querySelector('#player-health').style.width = player.health + '%'
        console.log('enemy attack successful');
    }

    //end game by health
    if (player.health <= 0 || enemy.health <= 0) {
        determineWinner({player, enemy, timerId})
    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -25
            break
        case ',':
            player.attack()
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
            enemy.velocity.y = -25
            break
        case 'ArrowDown':
            enemy.attack()
            break
    }
// console.log(event.key)
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
//    console.log(event.key)
})


})
