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
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 15
        this.sprites = obj.sprites
        this.offset = obj.offset
        this.gravity = obj.gravity
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: obj.attackOffset,
            width: 65,
            height: 25
        }
        
        
        

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

        //if the top of the character is at the bottom of the board then set drop to 0
        //else keep dropping
        // -18 from the bottom of the canvas so its not leveled on the border of canvas
        if (this.position.y + this.height + this.velocity.y >= this.canvasH - 18) {
            this.velocity.y = 0
            this.position.y = 493
        } else {this.velocity.y += this.gravity} 
    }
    // when invoked attacking is character/bots isAttacking value set to true for 100ms then changed back to false
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }

    playerSwitchSprite(sprites) {
        switch (sprites) {
            case 'idleRight':
                if (this.image !== this.sprites.idleRight.image) {
                    this.image = this.sprites.idleRight.image
                    this.framesMax = this.sprites.idleRight.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'idleLeft':
                if (this.image !== this.sprites.idleLeft.image) {
                    this.image = this.sprites.idleLeft.image
                    this.framesMax = this.sprites.idleLeft.framesMax
                    this.framesCurrent = 0
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
                if ((this.image !== this.sprites.jump.image) && this.lastKey === 'd') {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'drop':
                if ((this.image !== this.sprites.drop.image) && this.lastKey === 'd') {
                    this.image = this.sprites.drop.image
                    this.framesMax = this.sprites.drop.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jumpLeft':
                if ((this.image !== this.sprites.jumpLeft.image) && this.lastKey === 'a') {
                    this.image = this.sprites.jumpLeft.image
                    this.framesMax = this.sprites.jumpLeft.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'dropLeft':
                if ((this.image !== this.sprites.dropLeft.image) && this.lastKey === 'a') {
                    this.image = this.sprites.dropLeft.image
                    this.framesMax = this.sprites.dropLeft.framesMax
                    this.framesCurrent = 0
                }
                break
        }
    }

    enemySwitchSprite(sprites) {
        switch (sprites) {
            case 'idleRight':
                if (this.image !== this.sprites.idleRight.image) {
                    this.image = this.sprites.idleRight.image
                    this.framesMax = this.sprites.idleRight.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'idleLeft':
                if (this.image !== this.sprites.idleLeft.image) {
                    this.image = this.sprites.idleLeft.image
                    this.framesMax = this.sprites.idleLeft.framesMax
                    this.framesCurrent = 0
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
                if ((this.image !== this.sprites.jump.image) && this.lastKey === 'ArrowRight') {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'drop':
                if ((this.image !== this.sprites.drop.image) && this.lastKey === 'ArrowRight') {
                    this.image = this.sprites.drop.image
                    this.framesMax = this.sprites.drop.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jumpLeft':
                if ((this.image !== this.sprites.jumpLeft.image) && this.lastKey === 'ArrowLeft') {
                    this.image = this.sprites.jumpLeft.image
                    this.framesMax = this.sprites.jumpLeft.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'dropLeft':
                if ((this.image !== this.sprites.dropLeft.image) && this.lastKey === 'ArrowLeft') {
                    this.image = this.sprites.dropLeft.image
                    this.framesMax = this.sprites.dropLeft.framesMax
                    this.framesCurrent = 0
                }
                break
        }
    }
}