const OPEN_GAME_WINDOW = 'open-game-window'
const CLOSE_GAME_WINDOW = 'close-game-window'
const GAME_WINDOW_OPENED = 'game-window-opened'

const GAME_WINDOW_WIDTH = 600
const GAME_WINDOW_HEIGHT = 450

const GAME_WINDOW_NAME = 'Swords and Souls – online hra zdarma – Webgames.cz'

const SEND_VIDEO_SCREEN = 'send-video-screen'


const TYPES = ['apple', 'star']
const LOWER_COLORS = { apple: { b: 10, g: 10, r: 130 }, star: { b: 0, g: 100, r: 210 } }
const UPPER_COLORS = { apple: { b: 200, g: 65, r: 255 }, star: { b: 130, g: 255, r: 255 } }
const BLUR = { apple: 3, star: 2 }

module.exports = {
  OPEN_GAME_WINDOW,
  CLOSE_GAME_WINDOW,
  GAME_WINDOW_OPENED,
  GAME_WINDOW_NAME,
  GAME_WINDOW_WIDTH,
  GAME_WINDOW_HEIGHT,
  SEND_VIDEO_SCREEN,
  TYPES,
  LOWER_COLORS,
  UPPER_COLORS,
  BLUR,
}
