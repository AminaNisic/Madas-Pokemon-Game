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
    this.opacity = 1
    this.health = 100 //passed as argument later on since diff enemies will have different health but for the sake of building
    //the skeleton of the game the 100 remains

  }
  draw() {
    context.save()
    context.globalAlpha = this.opacity
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
    context.restore()

    if(!this.animate) return

    if (this.frames.max > 1) {
      this.frames.elapsed++
    }

    if (this.frames.elapsed %this.frames.hold === 0){
      if (this.frames.val < this.frames.max - 1) this.frames.val++
      else this.frames.val=0
    }
  }

  attack({attack, recipient}){
    const tl = gsap.timeline()
    tl.to(this.position, {
      x: this.position.x - 20
    }).to(this.position, {
      x: this.position.x + 40,
      duration: 0.1,
      onComplete: () => {
        //Enemy hit so animating health bar here
        gsap.to('#enemy-full', {
          width: this.health - attack.damage + '%'
        })
        gsap.to(recipient.position, {
          x: recipient.position.x + 10,
          yoyo: true,
          repeat: 5,
          duration: 0.1
        })

        gsap.to(recipient, {
          opacity: 0,
          yoyo: true,
          repeat: 5,
          duration: 0.1
        })
      }
    }).to(this.position, {
      x: this.position.x
    })
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
