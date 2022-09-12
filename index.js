const canvas = document.querySelector('canvas')
const context=canvas.getContext('2d')

canvas.width= 1024;
canvas.height = 576;

context.fillStyle='#f8a6ff';
context.fillRect(0,0, canvas.width, canvas.height);

const image= new Image();
image.src='./images/MadasMap.png'

const playerImage = new Image();
playerImage.src='./images/PlayerDown.png'

//playerImage.onload=()=>{
  //while img isnt loaded
  //the arguments: the image ref,4 coordinates for cropping character sprite,then two for width
  //and height the usual

//}
//animate()
/*image.onload=()=>{
context.drawImage(image,-2580,-1100)
}*/

class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position
    this.image = image
  }

  draw() {
    context.drawImage(this.image,-2580,-1100)
  }

}

const background = new Sprite({
  position: {
    x: -2580,
    y: -1100
  },
  image: image
})

function animate() {
  window.requestAnimationFrame(animate)

  //image.onload=()=>{
  background.draw()
  //}
  //playerImage.onload=()=>{
  context.drawImage(
    playerImage,
    0,
    0,
    playerImage.width/4,
    playerImage.height,
    canvas.width/2-playerImage.width/4/2,
    canvas.height/2-playerImage.height/2,
    playerImage.width/4,
    playerImage.height
  )
//}
}
animate()
window.addEventListener('keydown',(e)=>{
  switch(e.key) {
    case 'w':
    console.log('w')
    break
    case 'a':
    console.log('a')
    break
    case 's':
    console.log('s')
    break
    case 'd':
    console.log('d')
    break
  }
})
