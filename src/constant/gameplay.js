const gameplay = {
  /* Gameplay */
  start : false,
  pause : false,
  ended : false,
  currentLevel : 1,
  level : 30,
  maxLevel : 10,
  timer : 0,
  width : 0,
  height : 0,
  fps : 50,
  /* Player */
  playerLife : 2,
  playerCooldown : 0,
  playerSpeed : 15,
  playerPosSizeX : 60,
  playerPosSizeY : 60,
  playerPosX : 0,
  playerPosY : 0,
  playerShootRepeat : 1,
  /* Shoot */
  shootInfo : [],
  shootSpeed : 10,
  /* Target */
  targetNumber : 30,
  targetBigNumber : 0,
  targetBossNumber : 0,
  targetInfo : [],
  targetSpeed : 1,
  /* Win or Lose */
  state_wl : '',
}

export default gameplay
