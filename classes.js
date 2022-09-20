class Sprite {
  constructor({ position, velocity, image, frames = {max : 1}}) {
    this.position = position
    this.image = image
    this.frames = frames

    this.image.onload = () =>{
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
    }

  }
  draw() {
    context.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    )
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