import robot from 'robotjs'

robot.setMouseDelay(1)
robot.setKeyboardDelay(1)

export const bot = {
  moveMouse: robot.moveMouse,
  moveMouseSmooth: robot.moveMouseSmooth,
  mouseToggle: robot.mouseToggle,
  mouseClick: robot.mouseClick,
  keyTap: robot.keyTap,
}
