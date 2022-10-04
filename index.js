
const canvas = document.querySelector('canvas')
const context=canvas.getContext('2d')



canvas.width= 1005;//1005
canvas.height = 470;//470

const collisionsMap=[]

for (let i =0; i<collisions.length; i+=140){
  collisionsMap.push(collisions.slice(i,i+140))
}

const battlezonesMap=[]

for (let i =0; i<battlezonesData.length; i+=140){
  battlezonesMap.push(battlezonesData.slice(i,i+140))
}
//console.log(battlezonesMap)

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

const battlezones = []

battlezonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1784)
      battlezones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})

//console.log(battlezones)

const image= new Image();
image.src='./images/MadasMap.png'

const foregroundImg = new Image();
foregroundImg.src='./images/foreground1.png'

const playerDownImage = new Image();
playerDownImage.src='./images/PlayerDown.png'

const playerUpImage = new Image();
playerUpImage.src='./images/PlayerUp.png'

const playerLeftImage = new Image();
playerLeftImage.src='./images/PlayerLeft.png'

const playerRightImage = new Image();
playerRightImage.src='./images/PlayerRight.png'

//playerImage.onload=()=>{
  //while img isnt loaded
  //the arguments: the image ref,4 coordinates for cropping character sprite,then two for width
  //and height the usual
//}

//animate()
/*image.onload=()=>{
context.drawImage(image,-2580,-1100)
}*/



//canvas.width / 2 - this.image.width / 4 / 2,
//canvas.height / 2 - this.image.height / 2,

const player = new Sprite({
  position:{
    x:canvas.width / 2 - 192 / 4 / 2,
    y:canvas.height / 2 - 68 / 2
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 15
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage
  }
})

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImg
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

const movables=[background, ...boundaries, foreground, ...battlezones] //,testBoundary

function rectangularCollision({rectangle1, rectangle2}){
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x
    && rectangle1.position.x <= rectangle2.position.x + rectangle2.width
    && rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    && rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}

const battle = {
  initiated: false
}

function animate() {
  const animationId= window.requestAnimationFrame(animate)
  //image.onload=()=>{
  background.draw()
  //testBoundary.draw()
  battlezones.forEach(battlezone => {
    battlezone.draw()
  });

  boundaries.forEach(boundary => {
    boundary.draw()
  });

  player.draw()
  foreground.draw()
  //}
  //playerImage.onload=()=>{
  //////////
//}
let moving = true
player.animate=false

//console.log(animationId)
if (battle.initiated) return

//activating a battle code
if(keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
  for(let i = 0; i < battlezones.length; i++){
    const battlezone = battlezones [i]
    //overlapping area so that the battle doesnt activate immediately but rather when the player walks way into the battle patch
    const overlappingArea =
    (Math.min(player.position.x + player.width , battlezone.position.x + battlezone.width
    ) -
    Math.max(player.position.x, battlezone.position.x)) *
    (Math.min(
      player.position.y + player.height,
     battlezone.position.y + battlezone.height
   ) -
    Math.max(player.position.y, battlezone.position.y))

    if(rectangularCollision({
      rectangle1: player,
      //rectangle2: testBoundary
      rectangle2: battlezone
    })
    &&
      overlappingArea > (player.width*player.height)/2
      && Math.random() < 0.01 //added random so that a battle does not occur on every single frame
     )
     {
      //console.log('battle activate')
      window.cancelAnimationFrame(animationId) //canceling old animation to start animation for battle sequence
      battle.initiated = true
      gsap.to('#transition', {
        opacity: 1,
        repeat: 5,
        yoyo: true,
        duration: 0.3,
        onComplete() {
          gsap.to('#transition', {
            opacity: 1,
            duration: 0.3,
            onComplete(){
              //activate new animation loop for battle sequence
              animateBattle()
              gsap.to('#transition', {
                opacity: 0,
                duration: 0.7
              })
            }
          })

        }
      })
      break
     }
  }
}

  if(keys.w.pressed && lastKey==='w') {
    player.animate=true
    player.image = player.sprites.up
    for(let i = 0; i < boundaries.length; i++){
      const boundary = boundaries [i]
      if(rectangularCollision({
        rectangle1: player,
        //rectangle2: testBoundary
        rectangle2: {...boundary, position: {
          x:boundary.position.x,
          y: boundary.position.y + 3
        } }
      })
       ){
        //console.log('colliding')
        moving = false
        break
       }
    }
    if(moving)
    movables.forEach(movable =>{
      movable.position.y+=2
    })
  }
  //  movables.forEach(movable =>{
    //movable.position.y-=3}
  else if(keys.s.pressed && lastKey==='s') {
    player.animate=true
    player.image=player.sprites.down
    for(let i = 0; i < boundaries.length; i++){
      const boundary = boundaries [i]
      if(rectangularCollision({
        rectangle1: player,
        //rectangle2: testBoundary
        rectangle2: {...boundary, position: {
          x:boundary.position.x,
          y: boundary.position.y-2
        } }
      })
       ){
        //console.log('colliding')
        moving = false
        break
       }
    }
    if(moving)
    movables.forEach(movable =>{
    movable.position.y-=2
  })
  }

  else if(keys.a.pressed && lastKey==='a'){
    player.animate=true
    player.image=player.sprites.left
    for(let i = 0; i < boundaries.length; i++){
      const boundary = boundaries [i]
      if(rectangularCollision({
        rectangle1: player,
        //rectangle2: testBoundary
        rectangle2: {...boundary, position: {
          x:boundary.position.x+2,
          y: boundary.position.y
        } }
      })
       ){
        //console.log('colliding')
        moving = false
        break
       }
    }
    if(moving)
    movables.forEach(movable =>{
    movable.position.x+=3
  })
}
  else if(keys.d.pressed && lastKey==='d') {
    player.animate=true
    player.image=player.sprites.right
    for(let i = 0; i < boundaries.length; i++){
      const boundary = boundaries [i]
      if(rectangularCollision({
        rectangle1: player,
        //rectangle2: testBoundary
        rectangle2: {...boundary, position: {
          x:boundary.position.x-3,
          y: boundary.position.y
        } }
      })
       ){
        //console.log('colliding')
        moving = false
        break
       }
    }
    if(moving)
    movables.forEach(movable =>{
    movable.position.x-=3
  })
}
}

animate()

const battleBackgroundImg= new Image()
battleBackgroundImg.src='./images/battleBackground.png'
const battleBackground = new Sprite({
  position:{
    x:0,
    y:0
  },
  image: battleBackgroundImg
})

const draggleImg= new Image()
draggleImg.src='./images/draggleSprite.png'
const draggle = new Sprite({
  //here the position should remain the same but once I add new Pokemon from the madas region it will
  //select a random one from an array of images with sprites and frames and use that animation
  //draggle is placeholder monster
  position: {
    x: 750,
    y: 100
  },
  image: draggleImg,
  frames: {
    max: 4,
    hold : 60
  },
  animate : true
})

const embyImg= new Image()
embyImg.src='./images/embySprite.png'
const emby = new Sprite({
  //player's pokemon will also be changeable eventually
  position: {
    x: 300,
    y: 330
  },
  image: embyImg,
  frames: {
    max: 4,
    hold : 40
  },
  animate : true
})

function animateBattle() {
  window.requestAnimationFrame(animateBattle)

  battleBackground.draw()
  draggle.draw()
  emby.draw()
}
//animateBattle()

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
