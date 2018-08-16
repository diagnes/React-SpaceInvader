const EventEmitter = require('events').EventEmitter;

import Dispatcher from './Dispatcher';
import Actions from './Actions';

//Constant
import {gameplay} from '../constant';

let Data = gameplay;

class Execution extends EventEmitter {

    getGameState = () => {
      return Data
    }

    startGame = () => {
      Data.start = true;
      Data.pause = false;
      Data.ended = false;
      Data.state_wl = '';
      Data.timer = setInterval(() => Actions.game_on_execution(), Data.fps);
    }

    resetGame = () => {
      Data.targetInfo = [];
      Data.shootInfo = [];
      Data.playerLife = 2;
      Data.playerSpeed = 15;
      Data.playerPosSizeX = 60;
      Data.playerPosSizeY = 60;
      Data.state_wl = '';
    }

    initTarget = () => {
      for (var i = 0; i < Data.targetNumber; i++){
        let targetByLine = parseInt((Data.width - 30) / 80, 10);
        let poX = ((i % targetByLine) * 80) + 15;
        let poY = ((parseInt(i / targetByLine, 10) - 1) * 80) ;
        Data.targetInfo.push(
          {
            targetinitPosX : poX,
            targetinitPosY : poY,
            targetPosX : poX,
            targetPosY : poY,
            targetDestroy : false,
            targetSizeX : 60,
            targetSizeY : 52,
            targetDirection : 1,
            targetSpeedY : 1,
            targetSpeedX : 10
          }
        )
      }
    }

    reorderTarget = () => {
      Data.targetInfo.map((target, index) => {
        let targetByLine = parseInt((Data.width - 30) / 80, 10);
        let poX = ((index % targetByLine) * 80) + 15;
        let poY = ((parseInt(index / targetByLine, 10) - 1) * 80) ;
        target.targetPosX = poX;
        target.targetPosY = poY;
        target.targetinitPosX = poX;
        target.targetinitPosY = poY;
        return true;
      });
    }

    resizeGame = (width, height) => {
      Data.width = width;
      Data.height = height;
      Data.playerPosX = (width / 2) - (Data.playerPosSizeX / 2);
      Data.playerPosY = height - Data.playerPosSizeY;
      this.reorderTarget();
      Data.timer = clearInterval(Data.timer);
    }

    quitGame = () => {
      Data.start = false;
      Data.pause = false;
      Data.currentLevel = 1;
      Data.targetNumber = 30;
      Data.targetBigNumber = 0;
      Data.targetBossNumber = 0;
      Data.timer = clearInterval(Data.timer);
    }

    surrend = () => {
      Data.state_wl = '';
    }

    youWon = () => {
      Data.start = false;
      Data.pause = false;
      Data.state_wl = 'y';
      Data.timer = clearInterval(Data.timer);
    }

    pauseGame =() => {
      Data.start = false;
      Data.pause = true;
    }

    restartGame =() => {
      Data.start = true;
      Data.pause = false;
      Data.ended = false;
      Data = gameplay;
      Data.timer = clearInterval(Data.timer);
      Data.timer = setInterval(() => Actions.game_on_execution(), Data.fps);
    }

    touchOrNot = (shoot, target) => {
      if (shoot.shooter === 'player'){

        if (target.targetPosX < shoot.shootPosX
        && (target.targetPosX + target.targetSizeX) > shoot.shootPosX
        && (target.targetPosY < shoot.shootPosY)
        && (target.targetPosY + target.targetSizeY) > shoot.shootPosY){
          shoot.shootDestroy = true;
          return true
        }
      }
      return false
    }

    touchMeOrNot = (shoot) => {
      if (shoot.shooter === 'target'){
        if (Data.playerPosX < shoot.shootPosX
        && Data.playerPosX + Data.playerPosSizeX > shoot.shootPosX
        && Data.playerPosY < shoot.shootPosY
        && Data.playerPosY + Data.playerPosSizeY > shoot.shootPosY){
          shoot.shootDestroy = true;
          return true
        }
      }
      return false
    }

    destroyMe = () => {
      Data.state_wl = 'l';
      this.quitGame();
    }

    destroyTarget = (target) => {
      target.targetDestroy = true;
    }

    colision = () => {
      Data.shootInfo.map((shoot, index) => {
        if (!shoot.shootDestroy && this.touchMeOrNot(shoot)){
          if (Data.playerLife)
            Data.playerLife--;
          else
            this.destroyMe();
        }
        return true;
      });
    }

    gameOnExecution = () => {
      if (Data.playerCooldown > 0){
        Data.playerCooldown -= 1;
      }
      if (Data.targetInfo.length){
        let win = true;
        Data.targetInfo.map((target, index) => {
          if (!target.targetDestroy){
            Data.shootInfo.map((shoot, index) => {
              if (!shoot.shootDestroy && this.touchOrNot(shoot, target))
                this.destroyTarget(target);
              return true;
            });

            win = false;
            let moveX = target.targetSpeedX
            target.targetPosY += moveX / (Data.level - (Data.currentLevel - 1)) ;
            if (target.targetPosX > target.targetinitPosX + 10 || target.targetPosX > Data.width - target.targetSizeX){
              target.targetDirection = -1;
            }
            if (target.targetPosX < target.targetinitPosX - 10 || target.targetPosX < 0){
              target.targetDirection = 1;
            }

            target.targetPosX += moveX * target.targetDirection;
            if ((Math.floor((Math.random() * 100) + 1) % 80) === 0 && target.targetPosX >= 10 && target.targetPosY >= 10 ){
              Data.shootInfo.push(
                {
                  shootPosX : target.targetPosX + (target.targetSizeX / 2),
                  shootPosY : target.targetPosY + target.targetSizeY,
                  shootSizePosX : 5,
                  shootSizePosY : 20,
                  shootSizeColor : '#e74c3c',
                  shooter : 'target',
                  shootTouch : false,
                  shootDestroy : false,
                }
              );
            }
          }
          return true;
        })
        if (win){
          this.youWon();
        }
      }

      if (Data.shootInfo.length){
        Data.shootInfo.map((shoot, index) => {
          if (shoot.shooter === 'player')
            shoot.shootPosY -= Data.shootSpeed ;
          else{
            shoot.shootPosY += Data.shootSpeed ;
          }

          if (shoot.shooter === 'player' && shoot.shootPosY <= 0){
            shoot.shootDestroy = true;
          }
          if (shoot.shooter === 'target' && shoot.shootPosY >= Data.height){
            shoot.shootDestroy = true;
          }
          return true;
        })
      }

      this.colision();
    }

    nextLevel = () => {
      Data.currentLevel += 1;
      Data.targetNumber += (Data.currentLevel * 5);
      Data.targetBigNumber += 1;
      Data.targetBossNumber += parseInt(Data.currentLevel / 5, 10);
    }

    playerMove = (dx, dy, shoot) => {
      if (dx !== 0){
        Data.playerPosX += (Data.playerPosX + dx > 0 && Data.playerPosX + dx < Data.width - Data.playerPosSizeX) ? dx : 0;
      }

      if (dy !== 0){
        Data.playerPosY += (Data.playerPosY + dy > 0 && Data.playerPosY + dy < Data.height - Data.playerPosSizeY) ? dy : 0;
      }

      if (shoot !== 0 && Data.playerCooldown == 0){
        Data.playerCooldown = 10;
        Data.shootInfo.push(
          {
            shootPosX : Data.playerPosX + (Data.playerPosSizeX / 2),
            shootPosY : Data.playerPosY - 25,
            shootSizePosX : 5,
            shootSizePosY : 20,
            shootSizeColor : '#27ae60',
            shooter : 'player',
            shootTouch : false,
            shootDestroy : false,
          }
        );
      }
    }

    addChangeListener = (callback) => {
      this.on('change', callback);
    }

    removeChangeListener = (callback) => {
      this.on('change', callback);
    }

    emitChange = () => {
      this.emit('change');
    }
}

let execution = new Execution();

Dispatcher.register(function (action) {

    switch (action.actionType) {
      case 'game-start':
        execution.startGame();
        break;
      case 'next-level':
        execution.nextLevel();
        break;
      case 'game-paused':
        execution.pauseGame();
        break;
      case 'game-resize':
        execution.resizeGame(action.width, action.height);
        break;
      case 'init-target':
        execution.resetGame();
        execution.initTarget();
        break;
      case 'game-quit':
        execution.quitGame();
        break;
      case 'game-restart':
        execution.restartGame();
        break;
      case 'game-on-execution':
        execution.gameOnExecution();
        break;
      case 'player-move':
        execution.playerMove(action.dx, action.dy, action.shoot);
        break;
      case 'surrender':
        execution.surrend();
        execution.quitGame();
        break;
      default:
            // no op
    };
    execution.emitChange();
});

export default execution;
