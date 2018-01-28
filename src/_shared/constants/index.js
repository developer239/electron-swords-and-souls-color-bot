const OPEN_GAME_WINDOW = 'open-game-window'
const CLOSE_GAME_WINDOW = 'close-game-window'
const GAME_WINDOW_OPENED = 'game-window-opened'

const GAME_WINDOW_WIDTH = 350
const GAME_WINDOW_HEIGHT = 275
const MODIFIER = 2

const GAME_WINDOW_NAME = 'Swords and Souls – online hra zdarma – Webgames.cz'

const SEND_VIDEO_SCREEN = 'send-video-screen'

const TYPES = ['apple', 'star', 'range']
const LOWER_COLORS = {
  apple: { b: 10, g: 10, r: 130 },
  star: { b: 0, g: 100, r: 210 },
  range: { b: 230, g: 230, r: 230 },
}
const UPPER_COLORS = {
  apple: { b: 200, g: 65, r: 255 },
  star: { b: 130, g: 255, r: 255 },
  range: { b: 255, g: 255, r: 255 },
}
const BLUR = { apple: 2, star: 2, range: 2 }

const ACTIONS = [
  {
    label: 'Attack',
    name: 'attack',
    find: ['apple', 'star'],
  },
  {
    label: 'Defence',
    name: 'defence',
    find: ['apple'],
  },
  {
    label: 'Range',
    name: 'range',
    find: ['range'],
  },
]
const SEND_SETTINGS = ' send-settings'
const SETTINGS_START_RUNNING = ' settings-start-running'
const SETTINGS_STOP_RUNNING = ' settings-stop-running'

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
  ACTIONS,
  MODIFIER,
  SEND_SETTINGS,
  SETTINGS_START_RUNNING,
  SETTINGS_STOP_RUNNING,
}
