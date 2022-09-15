
const canvas = document.querySelector('canvas')
const context=canvas.getContext('2d')

canvas.width= 1005;//1005
canvas.height = 470;//470

const collisionsMap=[]

for (let i =0; i<collisions.length; i+=140){
  collisionsMap.push(collisions.slice(i,i+140))
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
    context.fillStyle='red'
    context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const boundaries = []

const offset = {
  x: -2590,
  y: -1150
}

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1784)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})


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
    context.drawImage(this.image,this.position.x,this.position.y)
  }
}

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

const keys={
  w:{
    pressed: false
  },
  a:{
    pressed: false
  },
  s:{
    pressed: false
  },
  d:{
    pressed: false
  }
}

function animate() {
  window.requestAnimationFrame(animate)
  //image.onload=()=>{
  background.draw()
  boundaries.forEach(boundary => {
    boundary.draw()
  });

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

  if(keys.w.pressed && lastKey==='w') background.position.y+=3
  else if(keys.s.pressed && lastKey==='s') background.position.y-=3
  else if(keys.a.pressed && lastKey==='a') background.position.x+=3
  else if(keys.d.pressed && lastKey==='d') background.position.x-=3
}

animate()
let lastKey=''

window.addEventListener('keydown',(e)=>{
  switch(e.key) {
    case 'w':
    keys.w.pressed =true
    lastKey='w'
    break
    case 'a':
    keys.a.pressed =true
    lastKey='a'
    break
    case 's':
    keys.s.pressed =true
    lastKey='s'
    break
    case 'd':
    keys.d.pressed =true
    lastKey='d'
    break
  }
})

window.addEventListener('keyup',(e)=>{
  switch(e.key) {
    case 'w':
    keys.w.pressed =false
    break
    case 'a':
    keys.a.pressed =false
    break
    case 's':
    keys.s.pressed =false
    break
    case 'd':
    keys.d.pressed =false
    break
  }
})
