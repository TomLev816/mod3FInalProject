
let level
let speed
let character
let monsterObj
let allItems
let sprite
let spriteLeftEdge
let spriteBottomEdge
let spriteTopEdge
let spriteRightEdge
// let tID
// let mID
let blockArray
let blockParent
let itemDiv
let itemArray

let projectileArray = []
let monstersArray = []
let monstersProjectilArray = []
let lastArrowKey = 'left'
let gameInterval

  document.addEventListener("DOMContentLoaded", () => {

    const gameBorder = document.getElementById('gameBorder')
    const gameHeader = document.getElementById('gameHeader')
    const gameStats = document.getElementById('gameStats')
    blockParent = document.querySelector('.block')
    itemDiv = document.querySelector('.item')
    // const sprite = document.getElementById('sprite')
    gameInterval = 1
    speed = 10

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
      monsterObj = parsedResponse
      renderMonster(parsedResponse)
      //animateMonster(parsedResponse)
      return monsterObj
    })

    fetch('http://localhost:3000/api/v1/characters/1')
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson)
      character = responseJson
      restoreHealth()
      displayGameStats(responseJson)
      sprite = document.getElementById('characterSprite')
      spriteLeftEdge = positionToInteger(sprite.style.left)
      spriteBottomEdge = positionToInteger(sprite.style.bottom)
      spriteTopEdge = spriteBottomEdge + positionToInteger(sprite.style.height)
      spriteRightEdge = spriteLeftEdge + positionToInteger(sprite.style.width)
      return character
    })

    fetch('http://localhost:3000/api/v1/items')
    .then(response => response.json())
    .then(parsed => {
      console.log(parsed)
      levelOneItems = parsed.filter(item => {
        return item.level_id === 1
      })
      makeHTMLForItem(levelOneItems)
    })

    function restoreHealth() {
      fetch('http://localhost:3000/api/v1/characters/1', {
        'method': 'PATCH',
        'headers': {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        'body': JSON.stringify({
          'health': 100
        })
      })
      .then(response => response.json())
      .then(json => console.log(json))
    }
    function decreaseMonsterHealth(monsterObj, monster) {
      if (monsterObj.health > 0) {
        fetch('http://localhost:3000/api/v1/monsters/1', {
          'method': 'PATCH',
          'headers': {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          'body': JSON.stringify({
            'health': monsterObj.health -= 10
          })
        })
        .then(response => response.json())
        .then(json => console.log(json))
      } else {
        monster.remove()
        monstersArray.pop()
        window.alert('You defeated the monster and passed Mod 1! Congratulations!')
        window.location.reload(true)
      }
    }

    function decreaseHealth(character) {
      if (character.health > 20) {
        fetch('http://localhost:3000/api/v1/characters/1', {
          'method': 'PATCH',
          'headers': {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          'body': JSON.stringify({
            'health': character.health -= 20
          })
        })
        .then(response => response.json())
        .then(json => {
          console.log(json)
          newHealthH2.innerText = `Health: ${character.health}`
        })
      } else {
        gameInterval = null
        window.alert('You died!')
        window.location.reload(true)
      }
    }

    function decreaseCandyHealth(item) {
      if (item.id === 'Candy') {
        if (character.health > 0) {
          fetch('http://localhost:3000/api/v1/characters/1', {
            'method': 'PATCH',
            'headers': {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            'body': JSON.stringify({
              'health': character.health -= 20
            })
          })
          .then(response => response.json())
          .then(json => {
            console.log(json)
            newHealthH2.innerText = `Health: ${character.health}`
          })
        } else {
          gameInterval = null
          window.alert('You died!')
          window.location.reload(true)
        }
      }
    }

    function increaseHealth(item) {
        if (item.id === 'Coffee') {
          if (character.health < 100) {
            fetch('http://localhost:3000/api/v1/characters/1', {
              'method': 'PATCH',
              'headers': {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              'body': JSON.stringify({
                'health': character.health += 10
              })
            })
            .then(response => response.json())
            .then(json => {
              console.log(json)
              newHealthH2.innerText = `Health: ${character.health}`
            })
          } else {
            window.alert('Your health is already maxed out! You just wasted an item.')
          }
        }
        if (item.id === 'Sleep') {
          if (character.health < 100) {
            fetch('http://localhost:3000/api/v1/characters/1', {
              'method': 'PATCH',
              'headers': {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              'body': JSON.stringify({
                'health': character.health += 10
              })
            })
            .then(response => response.json())
            .then(json => {
              console.log(json)
              newHealthH2.innerText = `Health: ${character.health}`
            })
          } else {
            window.alert('Your health is already maxed out! You just wasted an item.')
          }
        }
        if (item.id === 'Beer') {
          if (character.health < 100) {
            fetch('http://localhost:3000/api/v1/characters/1', {
              'method': 'PATCH',
              'headers': {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              'body': JSON.stringify({
                'health': character.health += 5
              })
            })
            .then(response => response.json())
            .then(json => {
              console.log(json)
              newHealthH2.innerText = `Health: ${character.health}`
            })
          } else {
            window.alert('Your health is already maxed out! You just wasted an item.')
          }
        }
    }

    let biggerProjectile = false

    function increaseProjectileSize(item) {
      if (item.id === 'Walks') {
        biggerProjectile = true
      }
    }

    function makeHTMLForItem(levelOneItems) {
      levelOneItems.forEach(item => {
        if (item.name === "Coffee"){
          coffeeImg = document.createElement('img')
          coffeeImg.src = item.sprite_img
          coffeeImg.id = 'Coffee'
          coffeeImg.style.height = '30px'
          coffeeImg.style.width = '30px'
          coffeeImg.style.left = '100px'
          coffeeImg.style.bottom = '560px'
          coffeeImg.style.position = 'absolute'
          itemDiv.appendChild(coffeeImg)
        }
        if (item.name === "Beer"){
          beerImg = document.createElement('img')
          beerImg.src = item.sprite_img
          beerImg.id = 'Beer'
          beerImg.style.height = '30px'
          beerImg.style.width = '30px'
          beerImg.style.left = '800px'
          beerImg.style.bottom = '350px'
          beerImg.style.position = 'absolute'
          itemDiv.appendChild(beerImg)
        }
        if (item.name === "Candy"){
          candyImg = document.createElement('img')
          candyImg.src = item.sprite_img
          candyImg.id = 'Candy'
          candyImg.style.height = '30px'
          candyImg.style.width = '30px'
          candyImg.style.left = '500px'
          candyImg.style.bottom = '800px'
          candyImg.style.position = 'absolute'
          itemDiv.appendChild(candyImg)
        }
        if (item.name === "Sleep"){
          sleepImg = document.createElement('img')
          sleepImg.src = item.sprite_img
          sleepImg.id = 'Sleep'
          sleepImg.style.height = '30px'
          sleepImg.style.width = '30px'
          sleepImg.style.left = '100px'
          sleepImg.style.bottom = '475px'
          sleepImg.style.position = 'absolute'
          itemDiv.appendChild(sleepImg)
        }
        if (item.name === "Walks"){
          walksImg = document.createElement('img')
          walksImg.src = item.sprite_img
          walksImg.id = 'Walks'
          walksImg.style.height = '30px'
          walksImg.style.width = '30px'
          walksImg.style.left = '800px'
          walksImg.style.bottom = '650px'
          walksImg.style.position = 'absolute'
          itemDiv.appendChild(walksImg)
        }
      })
      itemArray = itemDiv.children
    }

      function displayGameStats(response) {
        setInterval(fireMonsterProjectile, 855)
        newName = document.createElement('div')
        newName.style.minWidth = '333px'
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
        newWeaponH2.innerText = 'Weapon: Projectiles'
        gameStats.appendChild(newWeapon)
        newWeapon.appendChild(newWeaponH2)

        threeTableBlock = document.createElement('div')
        threeTableBlock.id = 'three-table-block'
        threeTableBlock.style.left = '92px'
        threeTableBlock.style.bottom = '640px'
        threeTableBlock.style.width = '60px'
        threeTableBlock.style.height = '165px'
        threeTableBlock.style.background = 'black'
        threeTableBlock.style.opacity = '0'
        threeTableBlock.style.position = 'absolute'
        blockParent.appendChild(threeTableBlock)

        twoTableBlock = document.createElement('div')
        twoTableBlock.id = 'two-table-block'
        twoTableBlock.style.left = '152px'
        twoTableBlock.style.bottom = '280px'
        twoTableBlock.style.width = '60px'
        twoTableBlock.style.height = '108px'
        twoTableBlock.style.background = 'black'
        twoTableBlock.style.opacity = '0'
        twoTableBlock.style.position = 'absolute'
        blockParent.appendChild(twoTableBlock)

        chairOneBlock = document.createElement('div')
        chairOneBlock.id = 'chair-one-block'
        chairOneBlock.style.left = '360px'
        chairOneBlock.style.bottom = '395px'
        chairOneBlock.style.width = '150px'
        chairOneBlock.style.height = '30px'
        chairOneBlock.style.background = 'black'
        chairOneBlock.style.opacity = '0'
        chairOneBlock.style.position = 'absolute'
        blockParent.appendChild(chairOneBlock)

        chairTwoBlock = document.createElement('div')
        chairTwoBlock.id = 'chair-two-block'
        chairTwoBlock.style.left = '336px'
        chairTwoBlock.style.bottom = '372px'
        chairTwoBlock.style.width = '150px'
        chairTwoBlock.style.height = '30px'
        chairTwoBlock.style.background = 'black'
        chairTwoBlock.style.opacity = '0'
        chairTwoBlock.style.position = 'absolute'
        blockParent.appendChild(chairTwoBlock)

        chairThreeBlock = document.createElement('div')
        chairThreeBlock.id = 'chair-three-block'
        chairThreeBlock.style.left = '306px'
        chairThreeBlock.style.bottom = '340px'
        chairThreeBlock.style.width = '150px'
        chairThreeBlock.style.height = '30px'
        chairThreeBlock.style.background = 'black'
        chairThreeBlock.style.opacity = '0'
        chairThreeBlock.style.position = 'absolute'
        blockParent.appendChild(chairThreeBlock)

        chairFourBlock = document.createElement('div')
        chairFourBlock.id = 'chair-four-block'
        chairFourBlock.style.left = '276px'
        chairFourBlock.style.bottom = '312px'
        chairFourBlock.style.width = '150px'
        chairFourBlock.style.height = '30px'
        chairFourBlock.style.background = 'black'
        chairFourBlock.style.opacity = '0'
        chairFourBlock.style.position = 'absolute'
        blockParent.appendChild(chairFourBlock)

        chairFiveBlock = document.createElement('div')
        chairFiveBlock.id = 'chair-five-block'
        chairFiveBlock.style.left = '246px'
        chairFiveBlock.style.bottom = '284px'
        chairFiveBlock.style.width = '150px'
        chairFiveBlock.style.height = '30px'
        chairFiveBlock.style.background = 'black'
        chairFiveBlock.style.opacity = '0'
        chairFiveBlock.style.position = 'absolute'
        blockParent.appendChild(chairFiveBlock)

        barrelBlock = document.createElement('div')
        barrelBlock.id = 'barrel-block'
        barrelBlock.style.left = '60px'
        barrelBlock.style.bottom = '820px'
        barrelBlock.style.width = '30px'
        barrelBlock.style.height = '30px'
        barrelBlock.style.background = 'black'
        barrelBlock.style.opacity = '0'
        barrelBlock.style.position = 'absolute'
        blockParent.appendChild(barrelBlock)

        stairBlock = document.createElement('div')
        stairBlock.id = 'stair-block'
        stairBlock.style.left = '770px'
        stairBlock.style.bottom = '700px'
        stairBlock.style.width = '120px'
        stairBlock.style.height = '140px'
        stairBlock.style.background = 'black'
        stairBlock.style.opacity = '0'
        stairBlock.style.position = 'absolute'
        blockParent.appendChild(stairBlock)

        fountainBlock = document.createElement('div')
        fountainBlock.id = 'fountain-block'
        fountainBlock.style.left = '755px'
        fountainBlock.style.bottom = '180px'
        fountainBlock.style.width = '120px'
        fountainBlock.style.height = '140px'
        fountainBlock.style.background = 'black'
        fountainBlock.style.opacity = '0'
        fountainBlock.style.position = 'absolute'
        blockParent.appendChild(fountainBlock)

        middleBlock = document.createElement('div')
        middleBlock.id = 'middle-block'
        middleBlock.style.left = '0px'
        middleBlock.style.bottom = '520px'
        middleBlock.style.width = '750px'
        middleBlock.style.height = '30px'
        middleBlock.style.background = 'white'
        middleBlock.style.opacity = '0'
        middleBlock.style.position = 'absolute'
        blockParent.appendChild(middleBlock)

        lowerBlock = document.createElement('div')
        lowerBlock.id = 'lower-block'
        lowerBlock.style.left = '150px'
        lowerBlock.style.bottom = '130px'
        lowerBlock.style.width = '750px'
        lowerBlock.style.height = '45px'
        lowerBlock.style.background = 'white'
        lowerBlock.style.opacity = '0'
        lowerBlock.style.position = 'absolute'
        blockParent.appendChild(lowerBlock)

        startingBlock = document.createElement('div')
        startingBlock.id = 'starting-block'
        startingBlock.style.left = '810px'
        startingBlock.style.bottom = '0px'
        startingBlock.style.width = '90px'
        startingBlock.style.height = '120px'
        startingBlock.style.background = 'white'
        startingBlock.style.opacity = '0'
        startingBlock.style.position = 'absolute'
        blockParent.appendChild(startingBlock)

        newImg = document.createElement('img')
        newImg.id = 'characterSprite'
        newImg.src = character.sprite_img
        newImg.style.border = 'none !important'
        newImg.style.left = '740px'
        newImg.style.bottom = '80px'
        newImg.style.width = '60px'
        newImg.style.height = '38px'
        newImg.style.position = 'absolute'
        newImg.style.backgroundSize = 'auto'
        gameBorder.appendChild(newImg)
        blockArray = blockParent.children
      }

      function renderMonster(monsterObj) {
        newMonster = document.createElement('img')
        newMonster.id = 'monsterSprite'
        newMonster.src = monsterObj.sprite_img
        newMonster.style.left = '200px'
        newMonster.style.bottom = '650px'
        newMonster.style.width = '80px'
        newMonster.style.height = '80px'
        newMonster.style.position = 'absolute'
        gameBorder.appendChild(newMonster)
        monstersArray.push(newMonster)
        // animateMonster(newMonster)
      }

      // function animateScript() {
      //   let position = 60
      //   const interval = 100
      //   const diff = 60
      //
      //   tID = setInterval (() => {
      //     sprite.style.backgroundPosition =
      //     `-${position}px 0px`
      //     if (position < 184) {
      //       position = position + diff
      //     } else {
      //       position = 60
      //     }
      //   }, interval)
      // }


      // function animateMonster(monster) {
      //   let position = 80
      //   const interval = 150
      //   const diff = 80
      //
      //   mID = setInterval(() => {
      //     monster.style.backgroundPosition =
      //     `-${position}px 0px`
      //     if (position < 794) {
      //       position = position + diff
      //     } else {
      //       position = 80
      //     }
      //   }, interval)
      // }

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
            checkItemCollision(itemArray, levelOneItems, speed)
            moveSpriteLeft()
            // animateScript()
            break;
          }
          case 38:
          if (canMove) {
            lastArrowKey = 'up'
            checkBlockCollision(blockArray)
            checkItemCollision(itemArray, levelOneItems, speed)
            moveSpriteUp()
            // animateScript()
            break;
          }
          case 39:
          if (canMove) {
            lastArrowKey = 'right'
            checkBlockCollision(blockArray)
            checkItemCollision(itemArray, levelOneItems, speed)
            moveSpriteRight()
            // animateScript()
            break;
          }
          case 40:
          if (canMove) {
            lastArrowKey = 'down'
            checkBlockCollision(blockArray)
            checkItemCollision(itemArray, levelOneItems, speed)
            moveSpriteDown()
            // animateScript()
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

      fireMonsterProjectile = () => {
        if (monstersArray.length > 0) {
          let monsterDiv = monstersArray[0]
          let projectileMonster = document.createElement('div')
          let left = positionToInteger(monsterDiv.style.left)
          let bottom = positionToInteger(monsterDiv.style.bottom)
          left = left +  Math.floor(Math.random() * 60)
          bottom = bottom +  Math.floor(Math.random() * 60)
          projectileMonster.className = 'projectile'
          projectileMonster.style.left = `${left + 24}px`
          projectileMonster.style.bottom = `${bottom + 20}px`
          projectileMonster.style.background = '#00ff00'
          projectileMonster.style.height = '20px'
          projectileMonster.style.width = '20px'
          gameBorder.appendChild(projectileMonster)
          monstersProjectilArray.push(projectileMonster)
          let direction = Math.floor(Math.random() * 3)
          // let direction = 0
          if (direction === 0){
            moveMonsterProjectile = () => {
              let currentBottom = parseInt(projectileMonster.style.bottom)
              projectileMonster.style.bottom = `${currentBottom -= 45}px`
              if (checkMonsterBulletHitUpDown(projectileMonster) === 'hit') {
                return endGame()
              }
              if (currentBottom > 65) {
                window.requestAnimationFrame(moveMonsterProjectile)
              } else {
                projectileMonster.remove()
                monstersProjectilArray.pop()
              }
            }
            window.requestAnimationFrame(moveMonsterProjectile)
            // debugger
          }
          if (direction === 1){
            moveMonsterProjectile = () => {
              let currentLeft = parseInt(projectileMonster.style.left)
              projectileMonster.style.left = `${currentLeft += 45}px`
              if (checkMonsterBulletHitLeftRight(projectileMonster) === 'hit') {
                return endGame()
              }
              if (currentLeft < 860) {
                window.requestAnimationFrame(moveMonsterProjectile)
              } else {
                projectileMonster.remove()
                monstersProjectilArray.pop()
              }
            }
            window.requestAnimationFrame(moveMonsterProjectile)
          }
          if (direction === 2){
            moveMonsterProjectile = () => {
              let currentLeft = parseInt(projectileMonster.style.left)
              //debugger
              let currentBottom = parseInt(projectileMonster.style.bottom)
              projectileMonster.style.left = `${currentLeft += 45}px`
              projectileMonster.style.bottom = `${currentBottom -= 45}px`
              if (checkMonsterBulletHitUpDown(projectileMonster) === 'hit') {
                return endGame()
              }
              if (currentLeft < 860) {
                window.requestAnimationFrame(moveMonsterProjectile)
              } else {
                projectileMonster.remove()
                monstersProjectilArray.pop()
              }
            }
            window.requestAnimationFrame(moveMonsterProjectile)
          }
        }
      }

      checkMonsterBulletHitUpDown = (projectileMonster) => {
          let proYaxis = monstersProjectilArray[0].style.bottom
          let proXaxis = monstersProjectilArray[0].style.left
          if (parseInt(proYaxis) < parseInt(sprite.style.bottom) + 30 && parseInt(sprite.style.bottom) < parseInt(proYaxis)) {
            if (parseInt(sprite.style.left) > parseInt(proXaxis) + 10 || parseInt(sprite.style.left) + 30 < parseInt(proXaxis)) {
              console.log('miss');
            } else {
              console.log('hit')
              monstersProjectilArray[0].remove()
              monstersProjectilArray.pop()
              decreaseHealth(character)
            }
          }
        }

        checkMonsterBulletHitLeftRight = () => {
            let proYaxis = monstersProjectilArray[0].style.bottom
            let proXaxis = monstersProjectilArray[0].style.left
            if  (parseInt(proXaxis) < parseInt(sprite.style.left) + 40 && parseInt(sprite.style.left) < parseInt(proXaxis) + 50)
            {
              if (parseInt(sprite.style.bottom) > parseInt(proYaxis) + 10 || parseInt(sprite.style.bottom) + 30 < parseInt(proYaxis))
              {
                console.log('miss');
              } else {
                console.log('hit')
                monstersProjectilArray[0].remove()
                monstersProjectilArray.pop()
                decreaseHealth(character)
              }
            }
          }

      function moveSpriteLeft() {

        function moveLeft() {
          sprite.style.left = `${spriteLeftEdge - speed}px`
          console.log(speed)
          spriteBottomEdge = positionToInteger(sprite.style.bottom)
          spriteLeftEdge = positionToInteger(sprite.style.left)
          spriteTopEdge = spriteBottomEdge + positionToInteger(sprite.style.height)
          spriteRightEdge = spriteLeftEdge + positionToInteger(sprite.style.width)
        }
        if (gameInterval !== null && spriteLeftEdge > 50) {
            window.requestAnimationFrame(moveLeft)
          }
          // canMove = false
        }
        //
        //
        function moveSpriteRight() {

          function moveRight() {
            sprite.style.left = `${spriteLeftEdge + speed}px`
            spriteBottomEdge = positionToInteger(sprite.style.bottom)
            spriteLeftEdge = positionToInteger(sprite.style.left)
            spriteTopEdge = spriteBottomEdge + positionToInteger(sprite.style.height)
            spriteRightEdge = spriteLeftEdge + positionToInteger(sprite.style.width)
          }
          if (gameInterval !== null && spriteLeftEdge < 790) {

                window.requestAnimationFrame(moveRight)

                }
                // canMove = false
              }

              function moveSpriteUp() {

                function moveUp() {
                  sprite.style.bottom = `${spriteBottomEdge + speed}px`
                  spriteBottomEdge = positionToInteger(sprite.style.bottom)
                  spriteLeftEdge = positionToInteger(sprite.style.left)
                  spriteTopEdge = spriteBottomEdge + positionToInteger(sprite.style.height)
                  spriteRightEdge = spriteLeftEdge + positionToInteger(sprite.style.width)
                }
                if (gameInterval !== null && spriteBottomEdge < 820) {
                    window.requestAnimationFrame(moveUp)
                  }
                  // canMove = false
                }
                //
                function moveSpriteDown() {

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
                    // canMove = false
                  }

                  function positionToInteger(p) {
                    return parseInt(p.split('px')[0]) || 0
                  }
                  //
                  // document.addEventListener('keyup', event => {
                  //   stopAnimate()
                  //   canMove = true
                  // })
                  //
                  // function stopAnimate() {
                  //   clearInterval(tID);
                  // }



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
                      // let projectileStyle = getComputedStyle(projectile)
                      if (biggerProjectile) {
                        projectile.style.width = '25px'
                        projectile.style.height = '25px'
                        }
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

                  checkForBulletHitUpDown = (projectile) => {
                    // debugger
                    if (monstersArray.length > 0){
                      monstersArray.forEach(monsterEl => {
                        let monsterStyle = getComputedStyle(monsterEl)
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
                            decreaseMonsterHealth(monsterObj, monsterEl)
                          }
                        }
                      })
                    } // end of if
                  }

                  checkForBulletHitLeftRight = () => {
                    // debugger
                    if (monstersArray.length > 0){
                      monstersArray.forEach(monsterEl => {
                        let monsterStyle = getComputedStyle(monsterEl)
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
                            decreaseMonsterHealth(monsterObj, monsterEl)
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
                          window.alert('You died!')
                          window.location.reload(true)
                        }
                      })
                    }

                    function checkItemCollision(itemArray, levelOneItems, speed) {
                      let array = Array.from(itemArray)
                      array.forEach(item => {
                        let itemLeftEdge = positionToInteger(item.style.left)
                        let itemBottomEdge = positionToInteger(item.style.bottom)
                        let itemRightEdge = itemLeftEdge + positionToInteger(item.style.width)
                        let itemTopEdge = itemBottomEdge + positionToInteger(item.style.height)
                        if (spriteLeftEdge < itemRightEdge &&
                          spriteRightEdge > itemLeftEdge &&
                          spriteBottomEdge < itemTopEdge &&
                          spriteTopEdge > itemBottomEdge) {
                            console.log('hit');
                            selectedItem = levelOneItems.find(itemObj => itemObj.name === item.id)
                            item.remove()
                            window.alert(`${selectedItem.ability}`)
                            decreaseCandyHealth(item)
                            increaseHealth(item)
                            increaseProjectileSize(item)
                          }
                        })
                    }
                }) //end of event listener
