import Sprite from './sprite.js'
    // using for object oriented programing to create a sprite class that will take a position, when called on. 
    //velocity and position are wrapped together because you cant through velocity first and cant put position second.
    // within the draw method we are taking arguments built in the new sprite and filling it with given arguements.
    //lastkey movement for each player
    //added an attackbox for the character
    //added an is attacking value for each player
    //extends takes functions from sprite
    //in super you select inheritance from parent(Sprite) properties

export default class Fighter extends Sprite {
    constructor(obj) {
        super( {imageSrc: obj.imageSrc,scale: obj.scale,framesMax: obj.framesMax,offset: obj.offset} )
        this.c = obj.c
        this.canvasW = obj.canvasWidth
        this.canvasH = obj.canvasHeight
        this.canvas = obj.canvas
        this.position = obj.position
        this.velocity = obj.velocity
        this.color = obj.color
        this.width = 50
        this.height = 65
        this.lastKey = ""
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: obj.attackOffset,
            width: 65,
            height: 25
        }
        this.isAttacking
        this.health = 100
        //same as in spriteclass but we dont want to overkill and put in into constructor argument
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.sprites = obj.sprites
        this.offset = obj.offset
        this.gravity = obj.gravity
        
        

        //this sets the sprite to the new object/hash

        for (const sprite in this.sprites) {
            this.sprites[sprite].image = new Image()
            this.sprites[sprite].image.src = this.sprites[sprite].imageSrc
        }
    }



    //the update method adds the drop speed(gravity) to y for each time the frame is loaded through draw
    update() {
        
        this.draw()
        this.animateFrames()
        //sets the position of the x box to the characters position 
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        debugger
        //if the top of the character is at the bottom of the board then set drop to 0
        //else keep dropping
        // -18 from the bottom of the canvas so its not leveled on the border of canvas
        if (this.position.y + this.height + this.velocity.y >= this.canvasH - 18) {
            this.velocity.y = 0
        } else {this.velocity.y += this.gravity
        debugger} 

    }
    // when invoked attacking is character/bots isAttacking value set to true for 100ms then changed back to false
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }

    switchSprite(sprites) {
        switch (sprites) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
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