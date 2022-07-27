import Fighter from "./fighter.js"
import Sprite from './sprite.js'
//   //when a this.player is being invoked it createss a new sprite of a this.player with x, y set.
//     //this.player has x,y velocity of 0,
//     //offset is for the attackbox and which way it faces

export default class Game {
  constructor(c, canvas, width, height){
    // debugger
    this.c = c
    this.canvas = canvas
    this.canvasWidth = width
    this.canvasHeight = height
    this.gravity = 1.3
    // window.requestAnimationFrame(this.animate.bind(this))
    
    this.enemy = new Fighter({
        c: this.c,
        canvas: this.canvas,
        canvasWidth: this.canvasWidth,
        canvasHeight: this.canvasHeight,
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
        attackOffset: {
            x: 0,
            y: 0
        },
        imageSrc: './src/assets/Krillin/idle.png',
        scale: 1.1,
        framesMax: 1
    })
    this.player = new Fighter({
        c: this.c,
        canvas: this.canvas,
        canvasWidth: this.canvasWidth,
        canvasHeight: this.canvasHeight,
        imageSrc: 'src/assets/Krillin/idle.png',
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
        },
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
        scale: 0.75,
        framesMax: 4,
        attackOffset: {
            x: 0,
            y: 0
        },
        gravity: this.gravity
    })
    

    this.background = new Sprite({
        c: this.c,
        position: {
            x: 0,
            y: 0
        },
        imageSrc: 'src/assets/village_2 copy.png',
        scale: 1,
        framesMax: 1,
        offset: {
            x: 0,
            y: 0
        },
    })

    this.house = new Sprite({
        c: this.c,
        position: {
            x: 351,
            y: 111
        },
        imageSrc: 'src/assets/spritesheet.png',
        scale: 1.032,
        framesMax: 3,
        offset: {
            x: 0,
            y: 0
        },
    })

    this.keys = {
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
    this.eventListener()
  }
    // // collision for attackboxes and this.enemy
    // //if the players x to width position is past enemys position and vise versa &&
    // // players y to height is with in enemys height and vise versa 
    // collisionBox({ rectangle1, rectangle2 }) {
    //   return (
    //       rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
    //       rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
    //       rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
    //       rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    //   )
    // } 

    determineWinner({ player, enemy, timerId }) {
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

    timer = 15
    timerId

    decreaseTimer() {
      if (timer > 0) {
          timerId = setTimeout(decreaseTimer, 1000)
          timer--
          document.querySelector('#timer').innerHTML = timer
      }

      if (timer === 0) {
          determineWinner({ player, enemy, timerId })
      }

      this.decreaseTimer()
    }
 animate() {
    
    this.c.fillStyle = "black"
    this.c.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.background.update()
    this.house.update()
    this.player.update()
    // this.enemy.update()

    this.player.velocity.x = 0
    // this.enemy.velocity.x = 0


    //player movement 
    //if last key is pressed then player will move in that direction by altering velocity
    //also the players sprite image is set to the correct animation sprite
    this.player.switchSprite('idle')
    
    if (this.keys.a.pressed && this.player.lastKey === 'a') {
        this.player.switchSprite('runLeft')
        this.player.velocity.x = -7
    } else if (this.keys.d.pressed && this.player.lastKey === 'd') {
        this.player.switchSprite('runRight')
        this.player.velocity.x = 7
    }
    // } else if {
    //     player.switchSprite('idle')
    // }

    if (this.player.velocity.y < 0) {
        this.player.switchSprite('jump')
    }


    //enemy movement same as players
    if (this.keys.ArrowLeft.pressed && this.enemy.lastKey === 'ArrowLeft') {
        this.enemy.velocity.x = -7
    } else if (this.keys.ArrowRight.pressed && this.enemy.lastKey === 'ArrowRight') {
        this.enemy.velocity.x = 7
    }

    //collision detect
    // if  collisionBox is true and is attacking is true
    //the if statement resets the player attacking to false,removes 10 from health
    //and takes away a health width % of the enimmy health id in scss 
    // if (collisionBox({
    //     rectangle1: this.player,
    //     rectangle2: this.enemy
    // }) && player.isAttacking) {
    //     this.player.isAttacking = false
    //     this.enemy.health -= 10
    //     document.querySelector('#enemy-health').style.width = this.enemy.health + '%'
    //     console.log('player attack successful');
    // }

    // if (collisionBox({
    //     rectangle1: this.enemy,
    //     rectangle2: this.player
    // }) && this.enemy.isAttacking) {
    //     this.enemy.isAttacking = false
    //     this.player.health -= 10
    //     document.querySelector('#player-health').style.width = this.player.health + '%'
    //     console.log('enemy attack successful');
    // }

    //end game by health
    if (this.player.health <= 0 || this.enemy.health <= 0) {
        determineWinner({ player, enemy, timerId })
    }
     window.requestAnimationFrame(this.animate.bind(this))
}
    eventListener() {
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'd':
                debugger
                this.keys.d.pressed = true
                this.player.lastKey = 'd'
                break
            case 'a':
                this.keys.a.pressed = true
                this.player.lastKey = 'a'
                break
            case 'w':
                this.player.velocity.y = -25
                break
            case ',':
                this.player.attack()
                break

            case 'ArrowRight':
                this.keys.ArrowRight.pressed = true
                this.enemy.lastKey = 'ArrowRight'
                break
            case 'ArrowLeft':
                this.keys.ArrowLeft.pressed = true
                this.enemy.lastKey = 'ArrowLeft'
                break
            case 'ArrowUp':
                this.enemy.velocity.y = -25
                break
            case 'ArrowDown':
                this.enemy.attack()
                break
        }
        })

        window.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'd':
                this.keys.d.pressed = false
                break
            case 'a':
                this.keys.a.pressed = false
                break
            case 'w':
                this.keys.w.pressed = false
                break
        }

        //enemys
        switch (event.key) {
            case 'ArrowRight':
                this.keys.ArrowRight.pressed = false
                break
            case 'ArrowLeft':
                this.keys.ArrowLeft.pressed = false
                break
            case 'ArrowUp':
                this.keys.ArrowUp.pressed = false
                break
        }
        //    console.log(event.key)
        })

    } 


}

