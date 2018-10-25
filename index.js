
let level
let character
let monster
let sprite
let spriteLeftEdge
let spriteBottomEdge
let spriteTopEdge
let spriteRightEdge
let tID
let blockArray
let blockParent

let projectileArray = []
let monstersArray = []
let lastArrowKey = 'left'
let gameInterval

// if (gameInterval === null) {
//   startGame()
// }

  document.addEventListener("DOMContentLoaded", () => {

    const gameBorder = document.getElementById('gameBorder')
    const gameHeader = document.getElementById('gameHeader')
    const gameStats = document.getElementById('gameStats')
    blockParent = document.querySelector('.block')
    // const sprite = document.getElementById('sprite')
    gameInterval = 1
    let speed = 20
    // const sprite = document.getElementById('sprite')
    // these fetches are for level 1
    fetch('http://localhost:3000/api/v1/levels/1')
    .then(response => response.json())
    .then(parsed => {
      console.log(parsed)
      level = parsed
      gameBorder.style.background = `url("${level.background}")`
    })

    fetch('http://localhost:3000/api/v1/monsters/1')
    .then(response => response.json())
    .then(parsedResponse => {
      console.log(parsedResponse)
      monster = parsedResponse
      renderMonster(parsedResponse)
      return monster
    })

    fetch('http://localhost:3000/api/v1/characters/1')
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson)
      character = responseJson
      displayGameStats(responseJson)
      sprite = document.getElementById('characterSprite')
      spriteLeftEdge = positionToInteger(sprite.style.left)
      spriteBottomEdge = positionToInteger(sprite.style.bottom)
      spriteTopEdge = spriteBottomEdge + positionToInteger(sprite.style.height)
      spriteRightEdge = spriteLeftEdge + positionToInteger(sprite.style.width)
      return character
    })


    // function displayImg() {
      //   let newImg = document.createElement('img')
      //   newImg.id = 'characterSprite'
      //   newImg.src = character.sprite_img
      //   newImg.style.left = '100px'
      //   newImg.style.bottom = '300px'
      //   gameBorder.appendChild(newImg)
      // }

      function displayGameStats(response) {
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

        threeTableBlock = document.createElement('div')
        threeTableBlock.id = 'three-table-block'
        threeTableBlock.style.left = '92px'
        threeTableBlock.style.bottom = '640px'
        threeTableBlock.style.width = '60px'
        threeTableBlock.style.height = '165px'
        threeTableBlock.style.background = 'black'
        threeTableBlock.style.opacity = '0.5'
        threeTableBlock.style.position = 'absolute'
        blockParent.appendChild(threeTableBlock)

        twoTableBlock = document.createElement('div')
        twoTableBlock.id = 'two-table-block'
        twoTableBlock.style.left = '152px'
        twoTableBlock.style.bottom = '280px'
        twoTableBlock.style.width = '60px'
        twoTableBlock.style.height = '108px'
        twoTableBlock.style.background = 'black'
        twoTableBlock.style.opacity = '0.5'
        twoTableBlock.style.position = 'absolute'
        blockParent.appendChild(twoTableBlock)

        chairOneBlock = document.createElement('div')
        chairOneBlock.id = 'chair-one-block'
        chairOneBlock.style.left = '360px'
        chairOneBlock.style.bottom = '395px'
        chairOneBlock.style.width = '150px'
        chairOneBlock.style.height = '30px'
        chairOneBlock.style.background = 'black'
        chairOneBlock.style.opacity = '0.5'
        chairOneBlock.style.position = 'absolute'
        blockParent.appendChild(chairOneBlock)

        chairTwoBlock = document.createElement('div')
        chairTwoBlock.id = 'chair-two-block'
        chairTwoBlock.style.left = '336px'
        chairTwoBlock.style.bottom = '372px'
        chairTwoBlock.style.width = '150px'
        chairTwoBlock.style.height = '30px'
        chairTwoBlock.style.background = 'black'
        chairTwoBlock.style.opacity = '0.5'
        chairTwoBlock.style.position = 'absolute'
        blockParent.appendChild(chairTwoBlock)

        chairThreeBlock = document.createElement('div')
        chairThreeBlock.id = 'chair-three-block'
        chairThreeBlock.style.left = '306px'
        chairThreeBlock.style.bottom = '340px'
        chairThreeBlock.style.width = '150px'
        chairThreeBlock.style.height = '30px'
        chairThreeBlock.style.background = 'black'
        chairThreeBlock.style.opacity = '0.5'
        chairThreeBlock.style.position = 'absolute'
        blockParent.appendChild(chairThreeBlock)

        chairFourBlock = document.createElement('div')
        chairFourBlock.id = 'chair-four-block'
        chairFourBlock.style.left = '276px'
        chairFourBlock.style.bottom = '312px'
        chairFourBlock.style.width = '150px'
        chairFourBlock.style.height = '30px'
        chairFourBlock.style.background = 'black'
        chairFourBlock.style.opacity = '0.5'
        chairFourBlock.style.position = 'absolute'
        blockParent.appendChild(chairFourBlock)

        chairFiveBlock = document.createElement('div')
        chairFiveBlock.id = 'chair-five-block'
        chairFiveBlock.style.left = '246px'
        chairFiveBlock.style.bottom = '284px'
        chairFiveBlock.style.width = '150px'
        chairFiveBlock.style.height = '30px'
        chairFiveBlock.style.background = 'black'
        chairFiveBlock.style.opacity = '0.5'
        chairFiveBlock.style.position = 'absolute'
        blockParent.appendChild(chairFiveBlock)

        barrelBlock = document.createElement('div')
        barrelBlock.id = 'barrel-block'
        barrelBlock.style.left = '60px'
        barrelBlock.style.bottom = '820px'
        barrelBlock.style.width = '30px'
        barrelBlock.style.height = '30px'
        barrelBlock.style.background = 'black'
        barrelBlock.style.opacity = '0.5'
        barrelBlock.style.position = 'absolute'
        blockParent.appendChild(barrelBlock)

        stairBlock = document.createElement('div')
        stairBlock.id = 'stair-block'
        stairBlock.style.left = '770px'
        stairBlock.style.bottom = '700px'
        stairBlock.style.width = '120px'
        stairBlock.style.height = '140px'
        stairBlock.style.background = 'black'
        stairBlock.style.opacity = '0.5'
        stairBlock.style.position = 'absolute'
        blockParent.appendChild(stairBlock)

        fountainBlock = document.createElement('div')
        fountainBlock.id = 'fountain-block'
        fountainBlock.style.left = '755px'
        fountainBlock.style.bottom = '180px'
        fountainBlock.style.width = '120px'
        fountainBlock.style.height = '140px'
        fountainBlock.style.background = 'black'
        fountainBlock.style.opacity = '0.5'
        fountainBlock.style.position = 'absolute'
        blockParent.appendChild(fountainBlock)

        middleBlock = document.createElement('div')
        middleBlock.id = 'middle-block'
        middleBlock.style.left = '0px'
        middleBlock.style.bottom = '520px'
        middleBlock.style.width = '750px'
        middleBlock.style.height = '30px'
        middleBlock.style.background = 'white'
        middleBlock.style.opacity = '0.5'
        middleBlock.style.position = 'absolute'
        blockParent.appendChild(middleBlock)

        lowerBlock = document.createElement('div')
        lowerBlock.id = 'lower-block'
        lowerBlock.style.left = '150px'
        lowerBlock.style.bottom = '130px'
        lowerBlock.style.width = '750px'
        lowerBlock.style.height = '45px'
        lowerBlock.style.background = 'white'
        lowerBlock.style.opacity = '0.5'
        lowerBlock.style.position = 'absolute'
        blockParent.appendChild(lowerBlock)

        startingBlock = document.createElement('div')
        startingBlock.id = 'starting-block'
        startingBlock.style.left = '810px'
        startingBlock.style.bottom = '0px'
        startingBlock.style.width = '90px'
        startingBlock.style.height = '120px'
        startingBlock.style.background = 'white'
        startingBlock.style.opacity = '0.5'
        startingBlock.style.position = 'absolute'
        blockParent.appendChild(startingBlock)

        newImg = document.createElement('img')
        newImg.id = 'characterSprite'
        // newImg.src = character.sprite_img
        newImg.style.background =  `url("${character.sprite_img}") 0px 0px`
        newImg.style.left = '740px'
        newImg.style.bottom = '80px'
        newImg.style.width = '60px'
        newImg.style.height = '38px'
        newImg.style.position = 'absolute'
        newImg.style.backgroundSize = 'auto'
        // newImg.style.clip = 'rect(20px, 200px,200px,0px)'
        gameBorder.appendChild(newImg)
        blockArray = blockParent.children
      }

      function renderMonster(monster) {
        newMonster = document.createElement('img')
        newMonster.id = 'monsterSprite'
        newMonster.style.background = `url("${monster.sprite_img}") 0px 0px`
        newMonster.style.left = '200px'
        newMonster.style.bottom = '650px'
        newMonster.style.width = '100px'
        newMonster.style.height = '90px'
        newMonster.style.position = 'absolute'
        gameBorder.appendChild(newMonster)
      }

      //debugger
      // debugger
      // sprite = document.getElementById('characterSprite')
      // // debugger
      // spriteLeftEdge = positionToInteger(sprite.style.left)
      // spriteBottomEdge = positionToInteger(sprite.style.bottom)
      // spriteTopEdge = spriteBottomEdge + 40
      // spriteRightEdge = spriteLeftEdge + 50
      // let speed = 10
      // let gameInterval = 1
      //debugger
      function animateScript() {
        let position = 60
        const interval = 100
        const diff = 60

        tID = setInterval (() => {
          sprite.style.backgroundPosition =
          `-${position}px 0px`
          if (position < 184) {
            position = position + diff
          } else {
            position = 60
          }
        }, interval)
      }

      function animateMonster() {
        let position = 80
      }

      let canMove = true

      document.addEventListener('keydown', event => {
        event.preventDefault()
        event.stopPropagation()
        console.log(event.which);
        switch (event.which) {
          case 37:
          if (canMove) {
            lastArrowKey = 'left'
            checkBlockCollision(blockArray)
            moveSpriteLeft()
            animateScript()
            break;
          }
          case 38:
          if (canMove) {
            lastArrowKey = 'up'
            checkBlockCollision(blockArray)
            moveSpriteUp()
            animateScript()
            break;
          }
          case 39:
          if (canMove) {
            lastArrowKey = 'right'
            checkBlockCollision(blockArray)
            moveSpriteRight()
            animateScript()
            break;
          }
          case 40:
          if (canMove) {
            lastArrowKey = 'down'
            checkBlockCollision(blockArray)
            moveSpriteDown()
            animateScript()
            break;
          }
          case 32:
          console.log(event);
          fireProjectile()
          break;
          default:
          console.log('DEFAULT');
        }
      }) //end of keydown event listener
      // debugger
      function moveSpriteLeft() {
        // let sprite = document.getElementById('spriteCharacter')
        // let spriteBottomEdge = positionToInteger(sprite.style.bottom)
        // let spriteLeftEdge = positionToInteger(sprite.style.left)
        // let spriteTopEdge = spriteBottomEdge + 100
        // let spriteRightEdge = spriteLeftEdge + 50
        function moveLeft() {
          sprite.style.left = `${spriteLeftEdge - speed}px`
          spriteBottomEdge = positionToInteger(sprite.style.bottom)
          spriteLeftEdge = positionToInteger(sprite.style.left)
          spriteTopEdge = spriteBottomEdge + positionToInteger(sprite.style.height)
          spriteRightEdge = spriteLeftEdge + positionToInteger(sprite.style.width)
        }
        if (gameInterval !== null && spriteLeftEdge > 50) {
          // if (checkCollision(spriteTopEdge, spriteRightEdge) !== 'stop LEFT') {
            // animateScript()
            window.requestAnimationFrame(moveLeft)
            // stopAnimate()
            // }
          }
          canMove = false
        }
        //
        //
        function moveSpriteRight() {
          // let sprite = document.getElementById('spriteCharacter')
          // let spriteBottomEdge = positionToInteger(sprite.style.bottom)
          // let spriteLeftEdge = positionToInteger(sprite.style.left)
          // let spriteTopEdge = spriteBottomEdge + 100
          // let spriteRightEdge = spriteLeftEdge + 50

          function moveRight() {
            sprite.style.left = `${spriteLeftEdge + speed}px`
            spriteBottomEdge = positionToInteger(sprite.style.bottom)
            spriteLeftEdge = positionToInteger(sprite.style.left)
            spriteTopEdge = spriteBottomEdge + positionToInteger(sprite.style.height)
            spriteRightEdge = spriteLeftEdge + positionToInteger(sprite.style.width)
          }
          if (gameInterval !== null && spriteLeftEdge < 790) {
            // debugger
            // if ((spriteRightEdge < blockLeftEdge && spriteTopEdge < blockBottomEdge) || (spriteRightEdge < blockLeftEdge && spriteBottomEdge > blockTopEdge)) {
              // if (checkCollision(spriteTopEdge, spriteRightEdge) !== 'stop RIGHT'){
                // animateScript()
                window.requestAnimationFrame(moveRight)
                // stopAnimate()
                // } else {
                  //   console.log('wtf');
                  // }
                }
                canMove = false
              }

              function moveSpriteUp() {
                // let sprite = document.getElementById('spriteCharacter')
                // let spriteBottomEdge = positionToInteger(sprite.style.bottom)
                // let spriteLeftEdge = positionToInteger(sprite.style.left)
                // let spriteTopEdge = spriteBottomEdge + 100
                // let spriteRightEdge = spriteLeftEdge + 50

                function moveUp() {
                  sprite.style.bottom = `${spriteBottomEdge + speed}px`
                  spriteBottomEdge = positionToInteger(sprite.style.bottom)
                  spriteLeftEdge = positionToInteger(sprite.style.left)
                  spriteTopEdge = spriteBottomEdge + positionToInteger(sprite.style.height)
                  spriteRightEdge = spriteLeftEdge + positionToInteger(sprite.style.width)
                }
                if (gameInterval !== null && spriteBottomEdge < 820) {
                  // if (checkCollision(spriteTopEdge, spriteRightEdge) !== 'stop UP'){
                    // animateScript()
                    window.requestAnimationFrame(moveUp)
                    // stopAnimate()
                    // }
                  }
                  canMove = false
                }
                //
                function moveSpriteDown() {
                  // let sprite = document.getElementById('spriteCharacter')
                  // let spriteBottomEdge = positionToInteger(sprite.style.bottom)
                  // let spriteLeftEdge = positionToInteger(sprite.style.left)
                  // let spriteTopEdge = spriteBottomEdge + 100
                  // let spriteRightEdge = spriteLeftEdge + 50

                  function moveDown(){
                    sprite.style.bottom = `${spriteBottomEdge - speed}px`
                    spriteBottomEdge = positionToInteger(sprite.style.bottom)
                    spriteLeftEdge = positionToInteger(sprite.style.left)
                    spriteTopEdge = spriteBottomEdge + positionToInteger(sprite.style.height)
                    spriteRightEdge = spriteLeftEdge + positionToInteger(sprite.style.width)
                  }
                  if (gameInterval !== null && spriteBottomEdge > 90) {
                    // if (checkCollision(spriteTopEdge, spriteRightEdge) !== 'stop DOWN') {
                      // animateScript()
                      window.requestAnimationFrame(moveDown)
                      // stopAnimate()
                      // }
                    }
                    canMove = false
                  }

                  function positionToInteger(p) {
                    return parseInt(p.split('px')[0]) || 0
                  }
                  //
                  document.addEventListener('keyup', event => {
                    stopAnimate()
                    canMove = true
                  })

                  function stopAnimate() {
                    clearInterval(tID);
                  }



                  // fire projectile

                  fireProjectile = () => {
                    if (projectileArray.length < 1){
                      let projectile = document.createElement('div')
                      let left = positionToInteger(sprite.style.left)
                      let bottom = positionToInteger(sprite.style.bottom)
                      projectile.className = 'projectile'
                      projectile.style.left = `${left + 24}px`
                      projectile.style.bottom = `${bottom + 20}px`
                      gameBorder.appendChild(projectile)
                      // debugger

                      if (lastArrowKey === 'up') {
                        moveProjectile = () => {
                          let currentBottom = parseInt(projectile.style.bottom)
                          // console.log(currentBottom);
                          projectile.style.bottom = `${currentBottom += 30}px`
                          if (checkForBulletHitUpDown(projectile) === 'hit') {
                            return endGame()
                          }
                          if (currentBottom < 890) {
                            window.requestAnimationFrame(moveProjectile)
                          } else {
                            projectile.remove()
                            projectileArray.pop()
                          }
                        }
                      }

                      if (lastArrowKey === 'down') {
                        moveProjectile = () => {
                          let currentBottom = parseInt(projectile.style.bottom)
                          // console.log(currentBottom);
                          projectile.style.bottom = `${currentBottom -= 30}px`
                          if (checkForBulletHitUpDown(projectile) === 'hit') {
                            return endGame()
                          }
                          if (currentBottom > 0) {
                            window.requestAnimationFrame(moveProjectile)
                          } else {
                            projectile.remove()
                            projectileArray.pop()
                          }
                        }
                      }

                      if (lastArrowKey === 'left') {
                        moveProjectile = () => {
                          let currentLeft = parseInt(projectile.style.left)
                          // console.log(currentBottom);
                          projectile.style.left = `${currentLeft -= 30}px`
                          if (checkForBulletHitLeftRight(projectile) === 'hit') {
                            return endGame()
                          }
                          if (currentLeft > 30) {
                            window.requestAnimationFrame(moveProjectile)
                          } else {
                            projectile.remove()
                            projectileArray.pop()
                          }
                        }
                      }
                      if (lastArrowKey === 'right') {
                        moveProjectile = () => {
                          let currentLeft = parseInt(projectile.style.left)
                          // console.log(currentBottom);
                          projectile.style.left = `${currentLeft += 30}px`
                          if (checkForBulletHitLeftRight(projectile) === 'hit') {
                            return endGame()
                          }
                          if (currentLeft < 860) {
                            window.requestAnimationFrame(moveProjectile)
                          } else {
                            projectile.remove()
                            projectileArray.pop()
                          }
                        }
                      }




                      window.requestAnimationFrame(moveProjectile)
                      projectileArray.push(projectile)
                      // return projectile
                    }
                  }

                  checkForBulletHitUpDown = () => {
                    // debugger
                    if (monstersArray.length > 0){
                      monstersArray.forEach(monster => {
                        let monsterStyle = getComputedStyle(monster)
                        let proYaxis = projectileArray[0].style.bottom
                        let proXaxis = projectileArray[0].style.left
                        if (parseInt(proYaxis) < parseInt(monsterStyle.bottom) && parseInt(monsterStyle.bottom) < parseInt(proYaxis) + 50){
                          // debugger
                          if (parseInt(monsterStyle.left)  > parseInt(proXaxis) + 10 || (parseInt(monsterStyle.left) + 50 < parseInt(proXaxis))) {
                            console.log('miss');
                          } else {
                            console.log('hit')
                            projectileArray[0].remove()
                            projectileArray.pop()
                            monster.remove()
                          }
                        }
                      })
                    } // end of if
                  }

                  checkForBulletHitLeftRight = () => {
                    // debugger
                    if (monstersArray.length > 0){
                      monstersArray.forEach(monster => {
                        let monsterStyle = getComputedStyle(monster)
                        let proYaxis = projectileArray[0].style.bottom
                        let proXaxis = projectileArray[0].style.left
                        if (parseInt(proXaxis) < parseInt(monsterStyle.left) && parseInt(monsterStyle.left) < parseInt(proXaxis) + 50){
                          // debugger
                          if (parseInt(monsterStyle.bottom)  > parseInt(proYaxis) + 10 || (parseInt(monsterStyle.bottom) + 50 < parseInt(proYaxis))) {
                            console.log('miss');
                          } else {
                            console.log('hit')
                            projectileArray[0].remove()
                            projectileArray.pop()
                            monster.remove()
                          }
                        }
                      })
                    } // end of if
                  }

                  function checkBlockCollision(blockArray) {
                    // console.log('youre in collision function');
                    let array = Array.from(blockArray)
                    array.forEach(block => {
                      let blockLeftEdge = positionToInteger(block.style.left)
                      let blockBottomEdge = positionToInteger(block.style.bottom)
                      let blockRightEdge = blockLeftEdge + positionToInteger(block.style.width)
                      let blockTopEdge = blockBottomEdge + positionToInteger(block.style.height)
                      if (spriteLeftEdge < blockRightEdge &&
                        spriteRightEdge > blockLeftEdge &&
                        spriteBottomEdge < blockTopEdge &&
                        spriteTopEdge > blockBottomEdge) {
                          gameInterval = null
                          window.alert('You died! Refresh the page.')
                          return 'stop'
                        }
                      })
                    }
                }) //end of event listener
