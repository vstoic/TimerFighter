    // this is the class for sprite images, takes in position and assigns image and 
    //sorce of the image. dats the image using a built in canvas method(drawImage)
    //also invokes the draw() function
    // frames elapsed is for how many frames the game is going through
    //frames hold is how many frames elapsed until you loop the current frame
    //c, position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }
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

  draw() {
    debugger
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