

const moveSprite = (event) => {
  debugger
}

document.addEventListener("DOMContentLoaded", () => {

  const sprite = document.getElementById('sprite')

  let spriteLeftEdge = positionToInteger(sprite.style.left)
  let spriteBottomEdge = positionToInteger(sprite.style.bottom)
  let speed = 10
  let gameInterval = 1

  // Block 1
  const block = document.getElementById('block')
  let styleBlock = getComputedStyle(block)
  let blockLeftEdge = positionToInteger(styleBlock.left)
  let blockRightEdge = positionToInteger(styleBlock.left) + 50;
  let blockBottomEdge = positionToInteger(styleBlock.bottom)
  let blockTopEdge = positionToInteger(styleBlock.bottom) + 40


  document.addEventListener('keydown', event => {
    event.preventDefault()
    event.stopPropagation()
    console.log(event.which);
    switch (event.which) {
      case 37:
        console.log(event)
        moveSpriteLeft()
        break;
      case 38:
        console.log(event);
        moveSpriteUp()
        break;
      case 39:
        console.log(event);
        moveSpriteRight()
        break;
      case 40:
        console.log(event);
        moveSpriteDown()
        break;
      default:
        console.log('DEFAULT');
    }
  })


  function moveSpriteLeft() {
    spriteBottomEdge = positionToInteger(sprite.style.bottom)
    spriteLeftEdge = positionToInteger(sprite.style.left)
    let spriteTopEdge = spriteBottomEdge + 100
    let spriteRightEdge = spriteLeftEdge + 50

    function moveLeft(){
      sprite.style.left = `${spriteLeftEdge - speed}px`
    }
    if (gameInterval !== null && spriteLeftEdge > 0) {
      if (checkCollision(spriteTopEdge, spriteRightEdge) !== 'stop') {
        window.requestAnimationFrame(moveLeft)
      }
    }
  }


  function moveSpriteRight() {
    spriteBottomEdge = positionToInteger(sprite.style.bottom)
    spriteLeftEdge = positionToInteger(sprite.style.left)
    let spriteTopEdge = spriteBottomEdge + 100
    let spriteRightEdge = spriteLeftEdge + 50
    function moveRight(){
      sprite.style.left = `${spriteLeftEdge + speed}px`
    }
    if (gameInterval !== null && spriteLeftEdge < 945) {
      // debugger
      // if ((spriteRightEdge < blockLeftEdge && spriteTopEdge < blockBottomEdge) || (spriteRightEdge < blockLeftEdge && spriteBottomEdge > blockTopEdge)) {
      if (checkCollision(spriteTopEdge, spriteRightEdge) !== 'stop'){
        window.requestAnimationFrame(moveRight)
      } else {
        console.log('wtf');
      }
    }
  }

  function moveSpriteUp() {
    spriteBottomEdge = positionToInteger(sprite.style.bottom)
    spriteLeftEdge = positionToInteger(sprite.style.left)
    let spriteTopEdge = spriteBottomEdge + 100
    let spriteRightEdge = spriteLeftEdge + 50

    function moveUp(){
      sprite.style.bottom = `${spriteBottomEdge + speed}px`
      }
    if (gameInterval !== null && spriteBottomEdge < 600) {
      if (checkCollision(spriteTopEdge, spriteRightEdge) !== 'stop'){
        window.requestAnimationFrame(moveUp)
      }
    }
  }

  function moveSpriteDown() {
    spriteBottomEdge = positionToInteger(sprite.style.bottom)
    spriteLeftEdge = positionToInteger(sprite.style.left)
    let spriteTopEdge = spriteBottomEdge + 100
    let spriteRightEdge = spriteLeftEdge + 50

    function moveDown(){
      sprite.style.bottom = `${spriteBottomEdge - speed}px`
      }
    if (gameInterval !== null && spriteBottomEdge > 0) {
      if (checkCollision(spriteTopEdge, spriteRightEdge) !== 'stop') {
        window.requestAnimationFrame(moveDown)
      }
    }
  }

  function positionToInteger(p) {
    return parseInt(p.split('px')[0]) || 0
  }





  // const block = document.getElementById('block')

  let checkCollision = (spriteTopEdge, spriteRightEdge) => {
    if (spriteLeftEdge < blockRightEdge + 10 &&
     spriteRightEdge > blockLeftEdge - 10 &&
     spriteBottomEdge < blockTopEdge + 10 &&
     spriteTopEdge > blockBottomEdge - 10) {
       console.log('stop');
       return 'stop'
     }}


     //
     // let checkCollision = (spriteTopEdge, spriteRightEdge) => {
     //   if Any of sprites is in verticalPixelRange: (500..540) and the SRE = 600 cant move right{

     // spriteTopEdge = verticalPixelRange: (500..540) &&  
     // spriteLeftEdge = verticalPixelRange: (500..540) &&
     // spriteRightEdge = verticalPixelRange: (500..540) &&
     // spriteBottomEdge = verticalPixelRange: (500..540)

     //
     //   if Any of sprites is in verticalPixelRange: (500..540) and the SLE = 650 cant move right{

      // if any of the sprite is in the horizontalPixelRange and the SBE = 540 cant move moveDown

      // // if any of the sprite is in the horizontalPixelRange and the STE = 500 cant move moveUP
     //

     //
     //   if (spriteLeftEdge < blockRightEdge + 10 &&
     //    spriteRightEdge > blockLeftEdge - 10 &&
     //    spriteBottomEdge < blockTopEdge + 10 &&
     //    spriteTopEdge > blockBottomEdge - 10) {
     //      console.log('stop');
     //      return 'stop'
     //    }}
     //
     // let blockPos =  {horizontalPixelRange: (600..650),
     //        verticalPixelRange: (500..540)
     //    }


       // Block 1

//
//     if (dodgerLeftEdge > rockRightEdge || dodgerRightEdge < rockLeftEdge){
//       return 'miss'
//     } else {
//       return 'hit'
//     }
//   }
// }





}) //end of event listener
