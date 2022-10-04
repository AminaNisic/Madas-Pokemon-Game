class Sprite {
  constructor({ position, velocity, image, frames = {max : 1, hold: 10}, sprites, animate = false}) {
    this.position = position
    this.image = image
    this.frames = {...frames, val: 0, elapsed: 0 }

    this.image.onload = () =>{
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
    }
    this.animate = animate
    this.sprites = sprites

  }
  draw() {
    context.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    )
    if(!this.animate) return

    if (this.frames.max > 1) {
      this.frames.elapsed++
    }
    if (this.frames.elapsed %this.frames.hold === 0){

    if (this.frames.val < this.frames.max - 1){
      this.frames.val++
    }
    else {
      this.frames.val=0
        }
      }

  }
}

class Boundary{
  static width=60
  static height=60
  constructor({position}){
    this.position=position
    this.width=60
    this.height=60
  }
  draw(){
    context.fillStyle='rgba(255,0,0,0)'
    context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
