import { Bullet } from './bullets.js';
import { EnemyOne, EnemyTwo } from './enemies.js';


window.addEventListener('DOMContentLoaded', () => {
  
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
let canvasWidth = 1000;
let canvasHeight = 600;
let playerHeight = 600;
let playerWidth = 600;
const backLayer0 = document.getElementById('layer0');
const backLayer1 = document.getElementById('layer1');
const backLayer2 = document.getElementById('layer2');
const backLayer3 = document.getElementById('layer3');
const backLayer4 = document.getElementById('layer4');
const backLayer5 = document.getElementById('layer5');
const backLayer6 = document.getElementById('layer6');
const playerImage = document.getElementById('playerImage');
const enemyForStageOne = new Image();
enemyForStageOne.src = "assets/raven.png";
const boom = new Image();
boom.src = "assets/boom.png";
const enemyForPhaseTwo = document.getElementById('enemyForStageTwo');
const enemyForStageOneWidth = 271;
const enemyForStageOneHeight = 194;
const birdHeight = 100;
const birdWidth = 200;
const enemyTwoWidth = 100;
const enemyTwoHeight = 50;
const enemyTwoSpriteWidth = 218;
const enemyTwoSpriteHeight = 177;
let enemies = [];
let enemiesForPhaseTwo = [];
let backgroundPosX = 0;
let backgroundPosY = 0;
let playerPositionX = 10;
let playerPositionY = 10;
let bullets = [];
let spriteWidthForBoom = 100;
let spriteHeightForBoom = 90;
let spriteCoordXForBoom = 0;
let characterBulletSpeed = 20;
let characterBulletHeight = 10;
let characterBulletWidth = 20;
let imCoorX = canvasWidth - birdWidth + 150;
let boomAnimationDelay = 0;
const boomSound = document.getElementById('boomSound');



  

    document.addEventListener('keydown', (e) => {
      
       if(e.key === 's' || e.key === 'ArrowDown') {
        if (playerPositionY <  285) {
            playerPositionY = playerPositionY + 20;
        }
       }
       if(e.key === 'w' || e.key === 'ArrowUp') {
        if (playerPositionY > -245) {
            playerPositionY = playerPositionY - 20;
        }
        
       } 
       if(e.key === 'd' || e.key === 'ArrowRight') {
        if (playerPositionX < 620) {
            playerPositionX = playerPositionX + 20;
        }
       }
       if(e.key === 'a' || e.key === 'ArrowLeft') {
        if (playerPositionX > -220) {
            playerPositionX = playerPositionX - 20;
        }
       }
       console.log(playerPositionX, playerPositionY);
       
    });
    document.addEventListener('keyup', (e) => {
      if (e.key === ' ') {
        bullets.push(new Bullet(playerPositionX, playerPositionY, playerWidth, playerHeight, characterBulletHeight));
        console.log(bullets);
        
       }
    })


    function animate() {
    ctx.drawImage(backLayer5, 0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backLayer0, 0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backLayer1, backgroundPosX, backgroundPosY, canvasWidth, canvasHeight);
    ctx.drawImage(backLayer3, 0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backLayer4, 0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backLayer6, 0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backLayer2, backgroundPosX, backgroundPosY, canvasWidth, canvasHeight);
    
    ctx.drawImage(playerImage ,playerPositionX, playerPositionY, playerWidth, playerHeight);
      // update the bullets that ve been drew
      for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].update(characterBulletSpeed);
        bullets[i].draw('orange', characterBulletWidth, ctx, characterBulletHeight);

        for (let j = enemies.length - 1; j >= 0; j--) {
            if (
                bullets[i].x < enemies[j].imageCoorX + birdWidth &&
                bullets[i].x + characterBulletWidth > enemies[j].imageCoorX &&
                bullets[i].y < enemies[j].imageCoorY + birdHeight &&
                bullets[i].y + characterBulletHeight > enemies[j].imageCoorY
            ) {
                // Collision detected
                while (spriteCoordXForBoom < 5) {
                    ctx.drawImage(
                        boom,
                        spriteCoordXForBoom * spriteWidthForBoom,
                        0,
                        spriteWidthForBoom,
                        spriteHeightForBoom,
                        enemies[j].imageCoorX,
                        enemies[j].imageCoorY,
                        200,
                        190
                    );
                    while (boomAnimationDelay < 2000000) {
                        boomAnimationDelay++;
                    }

                    boomAnimationDelay = 0;
                    spriteCoordXForBoom++;
                }
                spriteCoordXForBoom = 0;
                boomSound.play();

                bullets.splice(i, 1);
                enemies.splice(j, 1);
                break; // Stop checking other enemies for this bullet
            }
          // check if bullet off screen
        if (bullets[i].x > canvasWidth) {
          bullets.splice(i, 1);
        }
      }
        }

        
    moveCloud();
    for (let i = enemies.length - 1; i >= 0; i--) {
      enemies[i].update();
      enemies[i].draw(ctx);
      
      if (enemies[i].imageCoorX < -canvasWidth) {
        enemies.splice(i, 1);
    }
    }
    for(let i = enemiesForPhaseTwo.length - 1; i >= 0; i--) {
      enemiesForPhaseTwo[i].update();
      enemiesForPhaseTwo[i].draw(ctx);
    }

  requestAnimationFrame(animate);
    }
    boom.onload = () => {
      // This code will execute once the 'boom' image is loaded
      animate(); // Start your animation loop here, as you now know the image is loaded
    };

  function moveCloud() {
    if (backgroundPosX == -1020) {
    backgroundPosX = canvasWidth ;
    backgroundPosY = 0;
    ctx.drawImage(backLayer1, backgroundPosX, backgroundPosY, canvasWidth / 3, canvasHeight / 3);
    ctx.drawImage(backLayer2, backgroundPosX, backgroundPosY, canvasWidth / 3, canvasHeight / 3);
    } else if (backgroundPosX > -1020) {
        backgroundPosX = backgroundPosX - 10;
    }
  }
  console.log(backgroundPosY);

  let isVisible = true;

  // Handle page visibility change
  document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
  });

  function addNewBird () {

    if (isVisible) {
      let imCoorY = Math.random() * canvasHeight;
      if (imCoorY >= 285) {
        imCoorY = imCoorY - birdHeight;
      } else if (imCoorY <= -245) {
        imCoorY = imCoorY + birdHeight;
        imCoorX = canvasWidth + birdWidth;
      }
      enemies.push(
        new EnemyOne(
          enemyForStageOne,
          birdWidth,
          birdHeight,
          enemyForStageOneWidth,
          enemyForStageOneHeight,
          imCoorX,
          imCoorY
        )
      );
      console.log(
        enemies,
        enemyForStageOne,
        birdWidth,
        birdHeight,
        enemyForStageOneWidth,
        enemyForStageOneHeight,
        imCoorX,
        imCoorY
      );
    }
  }
  function addNewEnemyForPhaseTwo () {
    let enemyForPhaseTwoPosX = 1000;
    let enemyForPhaseTwoPosY = 10;
    enemiesForPhaseTwo.push(new EnemyTwo(enemyForPhaseTwo, enemyTwoWidth, enemyTwoWidth, enemyTwoSpriteWidth, enemyTwoSpriteHeight, enemyForPhaseTwoPosX, enemyForPhaseTwoPosY));
  }
  
  setInterval(addNewEnemyForPhaseTwo, 200);
  setInterval(addNewBird, 4000);

  
})

  
