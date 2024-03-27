    // this is the class for sprite images, takes in position and assigns image and 
    //sorce of the image. dats the image using a built in canvas method(drawImage)
    //also invokes the draw() function
    // frames elapsed is for how many frames the game is going through
    //frames hold is how many frames elapsed until you loop the current frame
export default class Sprite {
  constructor( obj ) {
      this.c = obj.c
      this.position = obj.position
      this.width = 50
      this.height = 125
      this.image = new Image()
      this.image.src = obj.imageSrc
      this.scale = obj.scale
      this.framesMax = obj.framesMax
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 150
      //offset to recenter sprite
      this.offset = obj.offset
  }
  // takes in image, and splits the image into the max number of frames then multiply
  //it by the number of frames. then scales the image
  //we subtract x, y offset passed in when creating new player because we want to improve position of sprites with large whitespace
//   context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
  draw() {
    this.c.drawImage(
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

    drawHealthBar() {
        // let barColors = ['red', 'orange', 'yellow', 'green'];
        // let randomIdx = Math.floor(Math.random() * barColors.length);
        let barWidth = Math.min((this.health / 71) * 70, 71);
        // x does not change (its the starting point on x axis)
        // y does not change either (its the starting point on y axis)
        // width should be scaled from the health of the player
        // height should be 10 doesnt change 
        this.c.fillRect(this.position.x, this.position.y - 20, 72, 7)
        this.c.fillStyle = 'red';
        this.c.fillRect(this.position.x, this.position.y - 20, barWidth, 7)
        this.c.fillStyle = 'yellow'; 
    }
    
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
  update() {
      this.draw()
      this.animateFrames()
  }
}