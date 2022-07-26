
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
// c.fillRect(0, 0, canvas.width, canvas.height)


// added a const gravity for the game 
const gravity  = 1.3



// this is the class for sprite images, takes in position and assigns image and 
//sorce of the image. dats the image using a built in canvas method(drawImage)
//also invokes the draw() function 
// frames elapsed is for how many frames the game is going through
//frames hold is how many frames elapsed until you loop the current frame

class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0} }) {
        this.position = position
        this.width = 50
        this.height = 125
        this.image = new Image()
        this.image.src = imageSrc 
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 150

        //offset to recenter sprite
        this.offset = offset
    }
    // takes in image, and splits the image into the max number of frames then multiply
    //it by the number of frames. then scales the image
    //we subtract x, y offset passed in when creating new player because we want to improve position of sprites with large whitespace

    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
            )
        
    }
    //to the current frame. 
    // if the frames is less than the max frame then add one. 
    //if it is at max frames then loop back to the start.
    animateFrames() {
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }

    //draws the script and adds a frame 
    update() {
        this.draw()
        this.animateFrames()
    }
}




// using for object oriented programing to create a sprite class that will take a position, when called on. 
//velocity and position are wrapped together because you cant through velocity first and cant put position second.
// within the draw method we are taking arguments built in the new sprite and filling it with given arguements.
//lastkey movement for each player
//added an attackbox for the character
//added an is attacking value for each player
//extends takes functions from sprite
//in super you select inheritance from parent(Sprite) properties
class Fighter extends Sprite{
    constructor({ position, velocity, color = "white", imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }, sprites }) {
        super({position, imageSrc, scale, framesMax, offset})
        this.velocity = velocity
        this.color = color
        this.width = 50
        this.height = 65
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 65,
            height: 25
        }
        this.isAttacking
        this.health = 100
        //same as in spriteclass but we dont want to overkill and put in into constructor argument
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.sprites = sprites


        //this sets the sprite to the new object/hash

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

        console.log(this.sprites)
    }
    
    
    
    //the update method adds the drop speed(gravity) to y for each time the frame is loaded through draw
    update() {
        this.draw()
        this.animateFrames()
        //sets the position of the x box to the characters position 
        // this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        // this.attackBox.position.y = this.position.y

        // this.position.y += this.velocity.y
        // this.position.x += this.velocity.x
        //if the top of the character is at the bottom of the board then set drop to 0
        //else keep dropping
        // -18 from the bottom of the canvas so its not leveled on the border of canvas
        if (this.position.y + this.height + this.velocity.y >= canvas.height -18) {
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

    switchSprite (sprite) {
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image === this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 1
                }
                break
            case 'runRight':
                if (this.image !== this.sprites.runRight.image) {
                    this.image = this.sprites.runRight.image
                    this.framesMax = this.sprites.runRight.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'runLeft':
                if (this.image !== this.sprites.runLeft.image) {
                    this.image = this.sprites.runLeft.image
                    this.framesMax = this.sprites.runLeft.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                this.image = this.sprites.jump.image
                this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
            }
            break
        }
    }
}



//this consts create new sprites that start at the positions x,y
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: 'src/assets/village_2 copy.png'
})

const house = new Sprite({
    position: {
        x: 351,
        y: 111
    },
    imageSrc: 'src/assets/spritesheet.png',
    scale: 1.032,
    framesMax: 3
})



//when a player is being invoked it createss a new sprite of a player with x, y set.
//player has x,y velocity of 0,
//offset is for the attackbox and which way it faces
const player = new Fighter({
    position: {
        x: 50,
        y: 400
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: 'src/assets/Krillin/idle.png',
    scale: 0.75,
    framesMax: 4,
    offset: {
        x: 0,
        y: 0
    },
    sprites: {
        idle: {
            imageSrc: 'src/assets/Krillin/idle.png',
            // scale: 0.75,
            framesMax: 4,
        },
        runRight: {
            imageSrc: 'src/assets/Krillin/runRight.png',
            // scale: 0.75,
            framesMax: 4,
            image: new Image()
        },
        runLeft: {
            imageSrc: 'src/assets/Krillin/runLeft.png',
            // scale: 0.75,
            framesMax: 4,
            image: new Image()
        },
        jump: {
            imageSrc: 'src/assets/Krillin/jump.png',
            // scale: 0.75,
            framesMax: 2,
            image: new Image()
        }
    }
})

const enemy = new Fighter({
    position: {
        x: 924,
        y: 400
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: "white",
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: 'src/assets/Krillin/idle.png',
    scale: 1.1,
    framesMax: 1
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
function collisionBox({rectangle1, rectangle2}) {
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
let timer = 15
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
    background.update()
    house.update()
    player.update()
    // enemy.update()

    // player.velocity.x = 0
    // enemy.velocity.x = 0


    //player movement 
    //if last key is pressed then player will move in that direction by altering velocity
    //also the players sprite image is set to the correct animation sprite
    player.switchSprite('idle')
    if (keys.a.pressed && player.lastKey === 'a') {
        player.switchSprite('runLeft')
        player.velocity.x = -7
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.switchSprite('runRight')
        player.velocity.x = 7 
    }
    // } else if {
    //     player.switchSprite('idle')
    // }

    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    }
    
    
    //enemy movement same as players
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -7
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 7
    } 

    //collision detect
    // if  collisionBox is true and is attacking is true
    //the if statement resets the player attacking to false,removes 10 from health
    //and takes away a health width % of the enimmy health id in scss 
    if (collisionBox({
        rectangle1: player,
        rectangle2: enemy
        }) && player.isAttacking) {
        player.isAttacking = false    
        enemy.health -= 10
        document.querySelector('#enemy-health').style.width = enemy.health + '%'
        console.log('player attack successful');
    }

    if (collisionBox({ 
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
