import Player from "./Player.js";
import Sprite from "./Sprite.js";
import Bot from "./Bot.js";
//   //when a this.player is being invoked it createss a new sprite of a this.player with x, y set.
//     //this.player has x,y velocity of 0,
//     //offset is for the attackbox and which way it faces

export default class Game {
  constructor(c, canvas, width, height) {
    // debugger
    this.c = c;
    this.canvas = canvas;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.gravity = 0.4;
    // this.timerId = setTimeout(this.decreaseTimer(), 10000);
    // this.time = 100;
    // window.requestAnimationFrame(this.animate.bind(this))
    this.enemy = new Bot({
      c: this.c,
      canvas: this.canvas,
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
      imageSrc: "src/assets/kakashi/idleLeft.png",
      sprites: {
        idleRight: {
          imageSrc: "src/assets/Kakashi/idleRight.png",
          // scale: 0.75,
          framesMax: 4,
        },
        idleLeft: {
          imageSrc: "src/assets/kakashi/idleLeft.png",
          // scale: 0.75,
          framesMax: 4,
        },
        runRight: {
          imageSrc: "src/assets/kakashi/runRight.png",
          // scale: 0.75,
          framesMax: 6,
          // image: new Image()
        },
        runLeft: {
          imageSrc: "src/assets/kakashi/runLeft.png",
          // scale: 0.75,
          framesMax: 6,
          // image: new Image()
        },
        jump: {
          imageSrc: "src/assets/kakashi/jumpRight.png",
          // scale: 0.75,
          framesMax: 2,
          // image: new Image()
        },
        drop: {
          imageSrc: "src/assets/kakashi/dropRight.png",
          // scale: 0.75,
          framesMax: 2,
          // image: new Image()
        },
        jumpLeft: {
          imageSrc: "src/assets/kakashi/jumpLeft.png",
          // scale: 0.75,
          framesMax: 2,
          // image: new Image()
        },
        dropLeft: {
          imageSrc: "src/assets/kakashi/dropLeft.png",
          // scale: 0.75,
          framesMax: 2,
          // image: new Image()
        },
      },
      position: {
        x: 800,
        y: 400,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      offset: {
        x: 0,
        y: 12,
      },
      scale: 1.15,
      framesMax: 4,
      attackOffset: {
        x: 0,
        y: 0,
      },
      gravity: this.gravity,
      frameHold: 10,
    });
    this.player = new Player({
      c: this.c,
      canvas: this.canvas,
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
      imageSrc: "src/assets/Krillin/idleRight.png",
      sprites: {
        idleRight: {
          imageSrc: "src/assets/Krillin/idleRight.png",
          // scale: 0.75,
          framesMax: 4,
        },
        idleLeft: {
          imageSrc: "src/assets/Krillin/idleLeft.png",
          // scale: 0.75,
          framesMax: 4,
        },
        runRight: {
          imageSrc: "src/assets/Krillin/runRight.png",
          // scale: 0.75,
          framesMax: 4,
          // image: new Image()
        },
        runLeft: {
          imageSrc: "src/assets/Krillin/runLeft.png",
          // scale: 0.75,
          framesMax: 4,
          // image: new Image()
        },
        jump: {
          imageSrc: "src/assets/Krillin/jump.png",
          // scale: 0.75,
          framesMax: 4,
          // image: new Image()
        },
        drop: {
          imageSrc: "src/assets/Krillin/drop.png",
          // scale: 0.75,
          framesMax: 2,
          // image: new Image()
        },
        jumpLeft: {
          imageSrc: "src/assets/Krillin/jumpLeft.png",
          // scale: 0.75,
          framesMax: 2,
          // image: new Image()
        },
        dropLeft: {
          imageSrc: "src/assets/Krillin/dropLeft.png",
          // scale: 0.75,
          framesMax: 2,
          // image: new Image()
        },
        punchRight: {
          imageSrc: "src/assets/Krillin/punchRight.png",
          // scale: 0.6,
          framesMax: 3.7,
          // image: new Image()
        },
        punchLeft: {
          imageSrc: "src/assets/Krillin/punchLeft.png",
          // scale: 1,
          framesMax: 3.8,
          // image: new Image()
        },
      },
      position: {
        x: 50,
        y: 400,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      offset: {
        x: 0,
        y: -28,
      },
      scale: 0.6,
      framesMax: 4,
      attackOffset: {
        x: 0,
        y: 0,
      },
      gravity: this.gravity,
      frameHold: 10,
    });
    this.background = new Sprite({
      c: this.c,
      position: {
        x: 0,
        y: 0,
      },
      imageSrc: "src/assets/village_2 copy.png",
      scale: 1,
      framesMax: 1,
      offset: {
        x: 0,
        y: 0,
      },
    });
    this.house = new Sprite({
      c: this.c,
      position: {
        x: 351,
        y: 111,
      },
      imageSrc: "src/assets/spritesheet.png",
      scale: 1.032,
      framesMax: 3,
      offset: {
        x: 0,
        y: 0,
      },
    });
    this.keys = {
      a: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
      w: {
        pressed: false,
      },
      ArrowRight: {
        pressed: false,
      },
      ArrowLeft: {
        pressed: false,
      },
      ArrowUp: {
        pressed: false,
      },
    };
    this.eventListener();
  }

  // collision for attackboxes and this.enemy
  //if the players x to width position is within enemys position and vise versa &&
  // players y to height is within enemys height and vise versa
  collisionBox() {
    if (
      this.player.attackBox.position.x + this.player.attackBox.width >=
        this.enemy.position.x &&
      this.player.attackBox.position.x <=
        this.enemy.position.x + this.enemy.width &&
      this.player.attackBox.position.y + this.player.attackBox.height >=
        this.enemy.position.y &&
      this.player.attackBox.position.y <=
        this.enemy.position.y + this.enemy.height
    ) {
      return true;
    }
    {
      false;
    }
  }

  //needs to be changed to when time is 0 then display the score
  determineWinner(enemy) {
    if (0 > enemy.health) {
      document.querySelector("#displayResults").innerHTML = "GG, You Win!";
    } else {
      document.querySelector("#displayResults").innerHTML =
        "Times Up! You Lose :)";
    }
  }

    decreaseTimer(time) {
      let gameTimer = setInterval(function () {
        time--;
        if (time > -1) {
          document.querySelector(".timer").innerHTML = time;
        }
        else {
          this.determineWinner(this.enemy);
          clearInterval(gameTimer);
        }
      }, 1000);
    }


  animate() {
    this.c.fillStyle = "black";
    this.c.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.background.update();
    this.house.update();
    this.enemy.update();
    this.player.update();
    this.player.velocity.x = 0;
    this.enemy.velocity.x = 0;
    //player movement
    //if last key is pressed then player will move in that direction by altering velocity
    //also the players sprite image is set to the correct animation sprite
    if (this.keys.a.pressed && this.player.lastKey === "a") {
      this.player.playerSwitchSprite("runLeft");
      this.player.velocity.x = -7;
    } else if (this.keys.d.pressed && this.player.lastKey === "d") {
      this.player.playerSwitchSprite("runRight");
      this.player.velocity.x = 7;
    } else if (this.player.lastKey === "d" && this.player.velocity.x === 0) {
      this.player.playerSwitchSprite("idleRight");
    } else if (this.player.lastKey === "a" && this.player.velocity.x === 0) {
      this.player.playerSwitchSprite("idleLeft");
    }
    if (this.player.velocity.y < 0 && this.player.lastKey === "a") {
      this.player.playerSwitchSprite("jumpLeft");
    } else if (this.player.velocity.y > 0 && this.player.lastKey === "a") {
      this.player.playerSwitchSprite("dropLeft");
    }
    if (this.player.velocity.y < 0 && this.player.lastKey === "d") {
      this.player.playerSwitchSprite("jump");
    } else if (this.player.velocity.y > 0 && this.player.lastKey === "d") {
      this.player.playerSwitchSprite("drop");
    }
    //enemy movement
    if (this.keys.ArrowLeft.pressed && this.enemy.lastKey === "ArrowLeft") {
      this.enemy.enemySwitchSprite("runLeft");
      this.enemy.velocity.x = -2;
    } else if (
      this.keys.ArrowRight.pressed &&
      this.enemy.lastKey === "ArrowRight"
    ) {
      this.enemy.enemySwitchSprite("runRight");
      this.enemy.velocity.x = 2;
    } else if (
      this.enemy.lastKey === "ArrowRight" &&
      this.enemy.velocity.x === 0
    ) {
      this.enemy.enemySwitchSprite("idleRight");
    } else if (
      this.enemy.lastKey === "ArrowLeft" &&
      this.enemy.velocity.x === 0
    ) {
      this.enemy.enemySwitchSprite("idleLeft");
    }

    if (this.enemy.velocity.y < 0 && this.enemy.lastKey === "ArrowLeft") {
      this.enemy.enemySwitchSprite("jumpLeft");
    } else if (
      this.enemy.velocity.y > 0 &&
      this.enemy.lastKey === "ArrowLeft"
    ) {
      this.enemy.enemySwitchSprite("dropLeft");
    }

    if (this.enemy.velocity.y < 0 && this.enemy.lastKey === "ArrowRight") {
      this.enemy.enemySwitchSprite("jump");
    } else if (
      this.enemy.velocity.y > 0 &&
      this.enemy.lastKey === "ArrowRight"
    ) {
      this.enemy.enemySwitchSprite("drop");
    }

    // if  collision/touching is true and is attacking is true
    // the if statement resets the player attacking to false,removes 10 from health
    // and takes away a health width % of the enimmy health id in scss
    if (this.collisionBox() && this.player.isAttacking) {
      this.player.isAttacking = false;
      this.enemy.health -= 5;
      // document.querySelector('#enemyHealth').style.width = this.enemy.health + '%'
      // console.log('player attack successful');
    }

    //enemy
    if (this.collisionBox() && this.enemy.isAttacking) {
      this.enemy.isAttacking = false;
      this.player.health -= 10;
      // document.querySelector('#player-health').style.width = this.player.health + '%'
      // console.log('enemy attack successful');
    }

    //end game by health
    // change this to spawn a new this.enemy
    if (this.player.health <= 0 || this.enemy.health <= 0) {
      this.determineWinner(this.player, this.enemy, this.timerId);
    }
    window.requestAnimationFrame(this.animate.bind(this));
  }
  eventListener() {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "d":
          this.keys.d.pressed = true;
          this.player.lastKey = "d";
          break;
        case "a":
          this.keys.a.pressed = true;
          this.player.lastKey = "a";
          break;
        case "w":
          if (this.player.velocity.y === 0) this.player.velocity.y = -15;
          break;
        case ",":
          this.player.attack();
          break;
        case "ArrowRight":
          this.keys.ArrowRight.pressed = true;
          this.enemy.lastKey = "ArrowRight";
          break;
        case "ArrowLeft":
          this.keys.ArrowLeft.pressed = true;
          this.enemy.lastKey = "ArrowLeft";
          break;
        case "ArrowUp":
          if (this.enemy.velocity.y === 0) this.enemy.velocity.y = -15;
          break;
        case "ArrowDown":
          this.enemy.attack();
          break;
      }
    });
    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "d":
          this.keys.d.pressed = false;
          break;
        case "a":
          this.keys.a.pressed = false;
          break;
        case "w":
          this.keys.w.pressed = false;
          break;
      }
      //enemys
      switch (event.key) {
        case "ArrowRight":
          this.keys.ArrowRight.pressed = false;
          break;
        case "ArrowLeft":
          this.keys.ArrowLeft.pressed = false;
          break;
        case "ArrowUp":
          this.keys.ArrowUp.pressed = false;
          break;
      }
      //    console.log(event.key)
    });
  }
}
