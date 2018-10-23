

// const moveSprite = (event) => {
//   debugger
// }

let character // local character

// character.weapons = ['Coffee', 'Sleep']
let gameBorder = document.getElementById('gameBorder')
let gameHeader = document.getElementById('gameHeader')
let gameStats = document.getElementById('gameStats')

  displayGameStats = (response) => {
    character = response
    newName = document.createElement('div')
    newName.style.minWidth = '333px'
    newName.style.marginLeft = '75px'
    newNameH2 = document.createElement('h2')
    newNameH2.innerText = `Name: ${character.name}`
    gameStats.appendChild(newName)
    newName.appendChild(newNameH2)

    newHealth = document.createElement('div')
    newHealth.style.minWidth = '333px'
    newHealthH2 = document.createElement('h2')
    newHealthH2.innerText = `Health: ${character.health}`
    gameStats.appendChild(newHealth)
    newHealth.appendChild(newHealthH2)

    newWeapon = document.createElement('div')
    newWeapon.style.minWidth = '333px'
    newWeaponH2 = document.createElement('h2')
    newWeaponH2.innerText = 'weapons array'
    gameStats.appendChild(newWeapon)
    newWeapon.appendChild(newWeaponH2)
    displayImg()
  }

  displayImg = () => {
    let newImg = document.createElement('img')
    newImg.id = 'characterSprite'
    newImg.src = character.sprite_img
    gameBorder.appendChild(newImg)
  }


document.addEventListener("DOMContentLoaded", () => {


  fetch('http://localhost:3000/api/v1/characters/1')
    .then(response => response.json())
    .then(responseJson => displayGameStats(responseJson))



// Last line is DOMContentLoaded












  // const sprite = document.getElementById('sprite')
  //
  // let spriteLeftEdge = positionToInteger(sprite.style.left)
  // let spriteBottomEdge = positionToInteger(sprite.style.bottom)
  // let spriteTopEdge = spriteBottomEdge + 40
  // let spriteRightEdge = spriteLeftEdge + 50
  // let speed = 10
  // let gameInterval = 1
  //
  // // Block 1
  // const block = document.getElementById('block')
  // let styleBlock = getComputedStyle(block)
  // let blockLeftEdge = positionToInteger(styleBlock.left)
  // let blockRightEdge = positionToInteger(styleBlock.left) + 50;
  // let blockBottomEdge = positionToInteger(styleBlock.bottom)
  // let blockTopEdge = positionToInteger(styleBlock.bottom) + 40
  //
  //
  document.addEventListener('keydown', event => {
    event.preventDefault()
    event.stopPropagation()
    console.log(event.which);
    switch (event.which) {
      case 37:
        if (checkCollision() !== "stop LEFT") {
          console.log(spriteLeftEdge)
          console.log(spriteTopEdge, "Y");
          moveSpriteLeft()
        }
        break;
      case 38:
        if (checkCollision() !== "stop UP") {
          console.log(spriteLeftEdge)
          console.log(spriteTopEdge, "Y");
          moveSpriteUp()
        }
        break;
      case 39:
        if (checkCollision() !== "stop RIGHT") {
          console.log(spriteLeftEdge)
          console.log(spriteTopEdge, "Y");
          moveSpriteRight()
        }
        break;
      case 40:
        if (checkCollision() !== "stop DOWN") {
          console.log(spriteLeftEdge)
          console.log(spriteTopEdge, "Y");
          moveSpriteDown()
        }
        break;
      default:
        console.log('DEFAULT');
    }
}) end of keydown event listener

switch (event.which) {
  case ():
    moveRight()


//   function moveSpriteLeft() {
//     // spriteBottomEdge = positionToInteger(sprite.style.bottom)
//     // spriteLeftEdge = positionToInteger(sprite.style.left)
//     // let spriteTopEdge = spriteBottomEdge + 100
//     // let spriteRightEdge = spriteLeftEdge + 50
//
//     function moveLeft(){
//       sprite.style.left = `${spriteLeftEdge - speed}px`
//       spriteBottomEdge = positionToInteger(sprite.style.bottom)
//       spriteLeftEdge = positionToInteger(sprite.style.left)
//       spriteTopEdge = spriteBottomEdge + 40
//       spriteRightEdge = spriteLeftEdge + 50
//     }
//     if (gameInterval !== null && spriteLeftEdge > 0) {
//       // if (checkCollision(spriteTopEdge, spriteRightEdge) !== 'stop LEFT') {
//         window.requestAnimationFrame(moveLeft)
//       // }
//     }
//   }
//
//
//   function moveSpriteRight() {
//     // spriteBottomEdge = positionToInteger(sprite.style.bottom)
//     // spriteLeftEdge = positionToInteger(sprite.style.left)
//     // let spriteTopEdge = spriteBottomEdge + 100
//     // let spriteRightEdge = spriteLeftEdge + 50
//     function moveRight(){
//       sprite.style.left = `${spriteLeftEdge + speed}px`
//       spriteBottomEdge = positionToInteger(sprite.style.bottom)
//       spriteLeftEdge = positionToInteger(sprite.style.left)
//       spriteTopEdge = spriteBottomEdge + 40
//       spriteRightEdge = spriteLeftEdge + 50
//     }
//     if (gameInterval !== null && spriteLeftEdge < 945) {
//       // debugger
//       // if ((spriteRightEdge < blockLeftEdge && spriteTopEdge < blockBottomEdge) || (spriteRightEdge < blockLeftEdge && spriteBottomEdge > blockTopEdge)) {
//       // if (checkCollision(spriteTopEdge, spriteRightEdge) !== 'stop RIGHT'){
//         window.requestAnimationFrame(moveRight)
//       // } else {
//       //   console.log('wtf');
//       // }
//     }
//   }
//
//   function moveSpriteUp() {
//     // spriteBottomEdge = positionToInteger(sprite.style.bottom)
//     // spriteLeftEdge = positionToInteger(sprite.style.left)
//     // let spriteTopEdge = spriteBottomEdge + 100
//     // let spriteRightEdge = spriteLeftEdge + 50
//
//     function moveUp(){
//       sprite.style.bottom = `${spriteBottomEdge + speed}px`
//       spriteBottomEdge = positionToInteger(sprite.style.bottom)
//       spriteLeftEdge = positionToInteger(sprite.style.left)
//       spriteTopEdge = spriteBottomEdge + 40
//       spriteRightEdge = spriteLeftEdge + 50
//       }
//     if (gameInterval !== null && spriteBottomEdge < 600) {
//       // if (checkCollision(spriteTopEdge, spriteRightEdge) !== 'stop UP'){
//         window.requestAnimationFrame(moveUp)
//       // }
//     }
//   }
// //
//   function moveSpriteDown() {
//     // spriteBottomEdge = positionToInteger(sprite.style.bottom)
//     // spriteLeftEdge = positionToInteger(sprite.style.left)
//     // let spriteTopEdge = spriteBottomEdge + 100
//     // let spriteRightEdge = spriteLeftEdge + 50
//
//     function moveDown(){
//       sprite.style.bottom = `${spriteBottomEdge - speed}px`
//       spriteBottomEdge = positionToInteger(sprite.style.bottom)
//       spriteLeftEdge = positionToInteger(sprite.style.left)
//       spriteTopEdge = spriteBottomEdge + 40
//       spriteRightEdge = spriteLeftEdge + 50
//       }
//     if (gameInterval !== null && spriteBottomEdge > 0) {
//       // if (checkCollision(spriteTopEdge, spriteRightEdge) !== 'stop DOWN') {
//         window.requestAnimationFrame(moveDown)
//       // }
//     }
//   }
//
//   function positionToInteger(p) {
//     return parseInt(p.split('px')[0]) || 0
//   }
//

  // const block = document.getElementById('block')

  // let checkCollision = () => {
  //   if((spriteTopEdge - 50 >= 500 && spriteTopEdge - 50 <= 540) && ((spriteLeftEdge >= 480 && spriteLeftEdge <= 530)||(spriteRightEdge >= 480 && spriteRightEdge <= 530))){
  //     console.log('STOP IT');
  //     return 'stop DOWN'
  //   }
  //   //if this number is between 500 & 540
  //   // stop moving
  //

    // if ((spriteTopEdge >= blockBottomEdge && spriteBottomEdge <= blockTopEdge) && (blockLeftEdge <= spriteRightEdge && spriteLeftEdge <= blockRightEdge)) {
    //   console.log('stop RIGHT');
    //   return 'stop RIGHT'
    // }
    // if ((spriteTopEdge >= blockBottomEdge && spriteBottomEdge <= blockTopEdge) && (blockRightEdge >= spriteLeftEdge && spriteRightEdge >= blockLeftEdge)) {
    //   console.log('stop LEFT');
    //   return 'stop LEFT'
    // }
    // if ((spriteRightEdge >= blockLeftEdge && spriteLeftEdge <= blockBottomEdge) && (blockBottomEdge <= spriteTopEdge && spriteBottomEdge <= blockTopEdge)) {
    //   console.log('stop UP');
    //   return 'stop UP'
    // }
    // if ((spriteRightEdge >= blockLeftEdge && spriteLeftEdge <= blockBottomEdge) && (blockTopEdge >= spriteBottomEdge && spriteTopEdge >= blockBottomEdge)) {
    //   console.log('stop DOWN');
    //   return 'stop DOWN'
    // }
    /*if (spriteLeftEdge < blockRightEdge + 0 &&
     spriteRightEdge > blockLeftEdge - 10 &&
     spriteBottomEdge < blockTopEdge + 10 &&
     spriteTopEdge > blockBottomEdge - 10) {
       console.log('stop');
       return 'stop'
     }*/


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
