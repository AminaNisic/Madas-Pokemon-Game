
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

//canvas.width / 2 - this.image.width / 4 / 2,
//canvas.height / 2 - this.image.height / 2,

const player = new Sprite({
  position:{
    x:canvas.width / 2 - 192 / 4 / 2,
    y:canvas.height / 2 - 68 / 2
  },
  image: playerImage,
  frames: {
    max: 4
  }
})

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

/*const testBoundary= new Boundary({
  position: {
    x: 400,
    y: 400
  }
})*/

const movables=[background, ...boundaries] //,testBoundary

function rectangularCollision({rectangle1, rectangle2}){
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x
    && rectangle1.position.x <= rectangle2.position.x + rectangle2.width
    && rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    && rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}

function animate() {
  window.requestAnimationFrame(animate)
  //image.onload=()=>{
  background.draw()
  //testBoundary.draw()
  boundaries.forEach(boundary => {
    boundary.draw()
    if(rectangularCollision({
      rectangle1: player,
      //rectangle2: testBoundary
      rectangle2: boundary
    })
     ){
      console.log('colliding')
     }
  });
  player.draw()
  //}
  //playerImage.onload=()=>{
  //////////
//}



  if(keys.w.pressed && lastKey==='w') {
    movables.forEach(movable =>{
      movable.position.y+=3
    })
  }
  else if(keys.s.pressed && lastKey==='s') movables.forEach(movable =>{
    movable.position.y-=3
  })
  else if(keys.a.pressed && lastKey==='a') movables.forEach(movable =>{
    movable.position.x+=3
  })
  else if(keys.d.pressed && lastKey==='d') movables.forEach(movable =>{
    movable.position.x-=3
  })
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
