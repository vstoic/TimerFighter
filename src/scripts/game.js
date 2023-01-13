import Player from "./Player.js";
import Sprite from "./Sprite.js";
import Bot from "./Bot.js";
import Krillin from "./Krillin.js";
//   //when a this.player is being invoked it createss a new sprite of a this.player with x, y set.
//     //this.player has x,y velocity of 0,
//     //offset is for the attackbox and which way it faces

export default class Game {
  constructor(c, canvas, width, height) {
    // debugger
    // const decreaseTimer = this.decreaseTimer.bind(this);

    this.c = c;
    this.canvas = canvas;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.gravity = 0.4;
    this.killCount = 0;
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
      dash: {
        pressed: false,
      },
    };


    this.enemy = new Bot({
      c: this.c,
      canvas: this.canvas,
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
      imageSrc: "src/assets/kakashi/idleLeft.png",
      sprites: {
        idleRight: {
          imageSrc: "src/assets/Kakashi/idleRight.png",
          //   scale: 0.75,
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
      health: 100,
    });



    this.player = new Krillin({
      c: this.c,
      canvas: this.canvas,
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
      sprites: {
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
        },
      },
      position: {
        x: 200,
        y: 400,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      offset: {
        x: 0,
        y: -21,
      },
      imageSrc: "src/assets/Krillin/idle/idleRight.png",
      scale: 0.65,
      framesMax: 4,
      attackOffset: {
        x: 0,
        y: 0,
      },
      gravity: this.gravity,
      frameHold: 10,
      canClick: "true",

    });

    this.background = new Sprite({
      c: this.c,
      position: {
        x: 0,
        y: 0,
      },
      imageSrc: "src/assets/village/villageBackground.png",
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
      imageSrc: "src/assets//village/awning.png",
      scale: 1.032,
      framesMax: 3,
      offset: {
        x: 0,
        y: 0,
      },
    });
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
  };

  displayScore() {
    document.querySelector("#displayResults").innerHTML = "Times Up!";
  };

  decreaseTimer(time) {
    // killCount = this.killCount;
    let gameTimer = setInterval(function () {
      time--;
      if (time > -1) {
        document.querySelector(".timer").innerHTML = "Time: " + time;
      } else {
        document.querySelector("#displayResults").innerHTML =
          "Times Up!" + "<br>" + "You killed " + this.killCount + " enemies!";
        // this.displayScore();
        clearInterval(gameTimer);
      }
    }, 1000);
  };


  animateGame() {
    this.background.update();
    this.house.update();

    document.querySelector(".kill-count").innerHTML =
      "Score: " + this.killCount;
    window.requestAnimationFrame(this.animateGame.bind(this));
  };

  animatePlayer() {
    this.player.update();
    this.player.velocity.x = 0;
    //changes sprites and velocity for left and right movement
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

    //colission for player and borders
    if (this.player.position.x <= 0 && this.keys.a.pressed) {
      this.player.velocity.x = 0;
    }; 
    if (this.player.position.x + 65 >= this.canvasWidth && this.keys.d.pressed) {
        this.player.velocity.x = 0;
    };
    

    // changes sprites for jumping
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
    // if  collision/touching is true and is attacking is true
    // the if statement resets the player attacking to false,removes 10 from health
    // and takes away a health width % of the enimmy health id in scss
    if (this.collisionBox() && this.player.isAttacking) {
      this.player.isAttacking = false;
      this.enemy.health -= 3;
      // document.querySelector('#enemyHealth').style.width = this.enemy.health + '%'
      // console.log('player attack successful');
    }
    window.requestAnimationFrame(this.animatePlayer.bind(this));
  }

  animateBot() {
    this.enemy.update();
    this.enemy.velocity.x = 0;
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
    if (this.collisionBox() && this.enemy.isAttacking) {
      this.enemy.isAttacking = false;
      this.player.health -= 10;
    }
    //spawn a new this.enemy when hp turns 0 and increases killcount
    if (this.enemy.health <= 0) {
      this.killCount += 1;
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
        health: 100 + 10 * this.killCount,
      });
    }
    window.requestAnimationFrame(this.animateBot.bind(this));
  }

  eventListener() {
    window.addEventListener("keydown", (event) => {
      let canClick = true;
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
            // this.player.jump();
          if (this.player.velocity.y === 0) this.player.velocity.y = -15;
          break;
        case ",":
          this.player.punch();
          break;
        case ".":
          this.player.kick();
          break;
        case "/":
          this.keys.dash.pressed = true;
          if (this.player.canClick === "true") {
            this.player.dash();
            this.player.canClick = "false";
            setTimeout(() => {
              this.player.canClick = "true";
            }, 300);
          }
          break;
      }
    });

    //tried making a eventlistener for doubleclicking to dash but not working
    window.addEventListener("dblclick", (event) => {
      switch (event.key) {
        case "z":
          // this.keys.a.pressed = true;
          this.player.punch();
          // this.player.lastKey = "a";
          break;
        case "c":
          this.player.punch();
          // this.keys.d.pressed = true;
          // this.player.lastKey = "d";
          // if (this.player.velocity.x === 0) this.player.velocity.x = -5;
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
        case "/":
          this.keys.dash.pressed = false;
          break;
      }
      //   enemys
      //   switch (event.key) {
      //     case "ArrowRight":
      //       this.keys.ArrowRight.pressed = false;
      //       break;
      //     case "ArrowLeft":
      //       this.keys.ArrowLeft.pressed = false;
      //       break;
      //     case "ArrowUp":
      //       this.keys.ArrowUp.pressed = false;
      //       break;
      //   }
      //   console.log(event.key);
    });
  }
}
