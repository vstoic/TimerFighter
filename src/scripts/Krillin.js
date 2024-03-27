import Sprite from "./Sprite.js";
//velocity and position are wrapped together because you cant through velocity first and cant put position second.
// within the draw method we are taking arguments built in the new sprite and filling it with given arguements.
export default class Krillin extends Sprite {
  constructor(obj) {
    super({
      imageSrc: obj.imageSrc,
      scale: obj.scale,
      framesMax: obj.framesMax,
      offset: obj.offset,
    });
    this.c = obj.c;
    this.canvasW = obj.canvasWidth;
    this.canvasH = obj.canvasHeight;
    this.canvas = obj.canvas;
    this.position = obj.position;
    this.velocity = obj.velocity;
    this.width = 50;
    this.height = 65;
    this.lastKey = "";
    this.isPunching;
    this.isKicking;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 15;
    this.sprites = obj.sprites;
    this.offset = obj.offset;
    this.gravity = obj.gravity;
    this.scale = 0.65,
    this.sprites = {
        idleRight: {
          imageSrc: "src/assets/Krillin/idle/idleRight.png",
          scale: 0.65,
          framesMax: 4,
          image: new Image(),
          framesHold: 15,
        },
        idleLeft: {
          imageSrc: "src/assets/Krillin/idle/idleLeft.png",
          scale: 0.65,
          framesMax: 4,
          image: new Image(),
          framesHold: 15,
        },
        runRight: {
          imageSrc: "src/assets/Krillin/run/runRight.png",
          scale: 0.65,
          framesMax: 4,
          image: new Image(),
          framesHold: 15,
        },
        runLeft: {
          imageSrc: "src/assets/Krillin/run/runLeft.png",
          scale: 0.65,
          framesMax: 4,
          image: new Image(),
          framesHold: 15,
        },
        jump: {
          imageSrc: "src/assets/Krillin//jump/jump.png",
          scale: 0.65,
          framesMax: 4,
          image: new Image(),
          framesHold: 15,
        },
        drop: {
          imageSrc: "src/assets/Krillin/jump/drop.png",
          scale: 0.65,
          framesMax: 2,
          image: new Image(),
          framesHold: 15,
        },
        jumpLeft: {
          imageSrc: "src/assets/Krillin/jump/jumpLeft.png",
          scale: 0.65,
          framesMax: 2,
          image: new Image(),
          framesHold: 15,
        },
        dropLeft: {
          imageSrc: "src/assets/Krillin/jump/dropLeft.png",
          scale: 0.65,
          framesMax: 2,
          image: new Image(),
          framesHold: 15,
        },
        punchRight: {
          imageSrc: "src/assets/Krillin/punch/punchRight.png",
          scale: 1.28,
          framesMax: 4,
          image: new Image(),
          framesHold: 15,
        },
        punchLeft: {
          imageSrc: "src/assets/Krillin/punch/punchLeft.png",
          scale: 1.28,
          framesMax: 4,
          image: new Image(),
          framesHold: 15,
        },
        kickRight: {
          imageSrc: "src/assets/Krillin/kick/kickRight.png",
          scale: 1.28,
          framesMax: 7,
          image: new Image(),
          framesHold: 9,
        },
        kickLeft: {
          imageSrc: "src/assets/Krillin/kick/kickLeft.png",
          scale: 1.28,
          framesMax: 7,
          image: new Image(),
          framesHold: 9,
        },
        dashRight: {
          imageSrc: "src/assets/Krillin/dash/dashRight.png",
          scale: 1.28,
          framesMax: 5,
          image: new Image(),
          framesHold: 9,
        },
        dashLeft: {
          imageSrc: "src/assets/Krillin/dash/dashLeft.png",
          scale: 1.28,
          framesMax: 5,
          image: new Image(),
          framesHold: 1,
        }
      },
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: obj.attackOffset,
      width: 65,
      height: 25,
    };
    this.canDash = "true";
    this.canJump = "true";
    //this for loop resets the sprite to the new object/hash
    for (const sprite in this.sprites) {
      this.sprites[sprite].image = new Image();
      this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
    }
  }
  //the update method adds the drop speed(gravity) to y for each time the frame is loaded through draw
  update() {
    this.draw();
    this.animateFrames();
    //sets the position of the attack box to the characters position
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    //if the top of the character is at the bottom of the board then set drop to 0
    //else keep dropping
    // -18 from the bottom of the canvas so its not leveled on the border of canvas
    if (this.position.y + this.height + this.velocity.y >= this.canvasH - 18) {
      this.velocity.y = 0;
      this.position.y = 493;
    } else {
      this.velocity.y += this.gravity;
    }
  }
  // when invoked attacking is character/bots isAttacking value set to true for 100ms then changed back to false
  punch() {
    if (this.image === this.sprites.idleRight.image) {
      this.playerSwitchSprite("punchRight");
    } else if (this.image === this.sprites.idleLeft.image) {
      this.playerSwitchSprite("punchLeft");
    }
    this.isPunching = true;
  };
  kick() {
    if (this.image === this.sprites.idleRight.image) {
      this.playerSwitchSprite("kickRight");
    } else if (this.image === this.sprites.idleLeft.image) {
      this.playerSwitchSprite("kickLeft");
    }
    this.isKicking = true;
  };
  dash() {
    if (this.image === this.sprites.idleRight.image) {
      this.playerSwitchSprite("dashRight");
      setTimeout(() => {  
        if (this.position.x + 185 >= this.canvasW) {
          this.position.x = this.canvasW - this.width;
          return;
        } else {
        this.velocity.x = 185;
        }
      }, 350);
    } else if (this.image === this.sprites.idleLeft.image) {
      this.playerSwitchSprite("dashLeft");
      setTimeout(() => {
        if (this.position.x - 185 <= 0) {
          this.position.x = 0;
          return;
        } else {
          this.velocity.x = -185;
        }
      }, 350);
    }
  };
  // jump() {
  //   if (this.image === this.sprites.idleLeft.image) {
  //     this.playerSwitchSprite("jumpLeft");
  //     if (this.velocity.y === 0) this.velocity.y = -15;
  //   } else if (this.velocity.y > 0 && this.image === this.sprites.idleLeft.image) {
  //     this.playerSwitchSprite("dropLeft");
  //   }
  //   if ( this.image === this.sprites.idleRight.image) {
  //     this.playerSwitchSprite("jump");
  //     if (this.velocity.y === 0) this.velocity.y = -15;
  //   } else if (this.velocity.y > 0 && this.image === this.sprites.idleRight.image) {
  //     this.playerSwitchSprite("drop");
  //   }
  // };

  playerSwitchSprite(sprites) {
    if (
      this.image === this.sprites.punchRight.image &&
      this.framesCurrent < this.sprites.punchRight.framesMax - 1
    )
      return;

    if (
      this.image === this.sprites.punchLeft.image &&
      this.framesCurrent < this.sprites.punchLeft.framesMax - 1
    )
      return;
    if (
      this.image === this.sprites.kickRight.image &&
      this.framesCurrent < this.sprites.kickRight.framesMax - 1
    )
      return;

    if (
      this.image === this.sprites.kickLeft.image &&
      this.framesCurrent < this.sprites.kickLeft.framesMax - 1
    )
      return;

    if (
      this.image === this.sprites.dashRight.image &&
      this.framesCurrent < this.sprites.dashRight.framesMax - 1
    )
      return;
      
    if (
      this.image === this.sprites.dashLeft.image &&
      this.framesCurrent < this.sprites.dashLeft.framesMax - 1
    )
      return;
    switch (sprites) {
      case "idleRight":
        if (this.image !== this.sprites.idleRight.image) {
          this.image = this.sprites.idleRight.image;
          this.framesMax = this.sprites.idleRight.framesMax;
          this.scale = this.sprites.idleRight.scale;
          this.framesCurrent = 0;
        }
        break;
      case "idleLeft":
        if (this.image !== this.sprites.idleLeft.image) {
          this.image = this.sprites.idleLeft.image;
          this.framesMax = this.sprites.idleLeft.framesMax;
          this.scale = this.sprites.idleLeft.scale;
          this.framesCurrent = 0;
        }
        break;
      case "runRight":
        if (this.image !== this.sprites.runRight.image) {
          this.image = this.sprites.runRight.image;
          this.framesMax = this.sprites.runRight.framesMax;
          this.scale = this.sprites.runRight.scale;
          this.framesCurrent = 0;
        }
        break;
      case "runLeft":
        if (this.image !== this.sprites.runLeft.image) {
          this.image = this.sprites.runLeft.image;
          this.framesMax = this.sprites.runLeft.framesMax;
          this.scale = this.sprites.runLeft.scale;
          this.framesCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image && this.lastKey === "d") {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.scale = this.sprites.jump.scale;
          this.framesCurrent = 0;
        }
        break;
      case "drop":
        if (this.image !== this.sprites.drop.image && this.lastKey === "d") {
          this.image = this.sprites.drop.image;
          this.framesMax = this.sprites.drop.framesMax;
          this.scale = this.sprites.drop.scale;
          this.framesCurrent = 0;
        }
        break;
      case "jumpLeft":
        if (
          this.image !== this.sprites.jumpLeft.image &&
          this.lastKey === "a"
        ) {
          this.image = this.sprites.jumpLeft.image;
          this.framesMax = this.sprites.jumpLeft.framesMax;
          this.scale = this.sprites.jumpLeft.scale;
          this.framesCurrent = 0;
        }
        break;
      case "dropLeft":
        if (
          this.image !== this.sprites.dropLeft.image &&
          this.lastKey === "a"
        ) {
          this.image = this.sprites.dropLeft.image;
          this.framesMax = this.sprites.dropLeft.framesMax;
          this.scale = this.sprites.dropLeft.scale;
          this.framesCurrent = 0;
        }
        break;
      case "punchRight":
        if (this.image !== this.sprites.punchRight.image) {
          this.image = this.sprites.punchRight.image;
          this.framesMax = this.sprites.punchRight.framesMax;
          this.scale = this.sprites.punchRight.scale;
          this.framesCurrent = 0;
        }
        break;
      case "punchLeft":
        if (this.image !== this.sprites.punchLeft.image) {
          this.image = this.sprites.punchLeft.image;
          this.framesMax = this.sprites.punchLeft.framesMax;
          this.scale = this.sprites.punchLeft.scale;
          this.framesCurrent = 0;
        }
        break;
        case "kickRight":
        if (this.image !== this.sprites.kickRight.image) {
          this.image = this.sprites.kickRight.image;
          this.framesMax = this.sprites.kickRight.framesMax;
          this.scale = this.sprites.kickRight.scale;
          this.framesHold = this.sprites.kickRight.framesHold;
          this.framesCurrent = 0;
        }
        break;
      case "kickLeft":
        if (this.image !== this.sprites.kickLeft.image) {
          this.image = this.sprites.kickLeft.image;
          this.framesMax = this.sprites.kickLeft.framesMax;
          this.scale = this.sprites.kickLeft.scale;
          this.framesHold = this.sprites.kickLeft.framesHold;
          this.framesCurrent = 0;
        }
        break;
      case "dashRight":
        if (
          this.image !== this.sprites.dashRight.image &&
          this.lastKey === "d"
        ) {
          this.image = this.sprites.dashRight.image;
          this.framesMax = this.sprites.dashRight.framesMax;
          this.scale = this.sprites.dashRight.scale;
          this.framesCurrent = 0;
        }
        break;
      case "dashLeft":
        if (
          this.image !== this.sprites.dashLeft.image &&
          this.lastKey === "a"
        ) {
          this.image = this.sprites.dashLeft.image;
          this.framesMax = this.sprites.dashLeft.framesMax;
          this.scale = this.sprites.dashLeft.scale;
          this.framesCurrent = 0;
        }
        break;
    }
  }
};
