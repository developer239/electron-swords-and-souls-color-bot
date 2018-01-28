//
// Windows
//

// GAME WINDOW is window with swords and souls game
const GAME_WINDOW_WIDTH = 350
const GAME_WINDOW_HEIGHT = 275

const GAME_WINDOW_URL = 'http://www.webgames.cz/swords-and-soul/6053-0'
const GAME_WINDOW_NAME = 'Swords and Souls – online hra zdarma – Webgames.cz' // necessary for finding the correct window

// Display sizes for canvas that renders GAME WINDOW video
const GAME_WINDOW_DISPLAY_MODIFIER = 2
const GAME_WINDOW_DISPLAY_WIDTH = GAME_WINDOW_WIDTH * GAME_WINDOW_DISPLAY_MODIFIER
const GAME_WINDOW_DISPLAY_HEIGHT = GAME_WINDOW_HEIGHT * GAME_WINDOW_DISPLAY_MODIFIER

// MAIN WINDOW width / height
const WIDTH_EXPANDED_BY = 184
const MAIN_WINDOW_WIDTH = GAME_WINDOW_WIDTH * GAME_WINDOW_DISPLAY_MODIFIER + WIDTH_EXPANDED_BY
const MAIN_WINDOW_HEIGHT = 820

// GENERAL OS OFFSETS
const TOP_OFFSET = 25

//
// IPC
//

// Constants for IPC communication
const IPC_SEND_VIDEO_SCREEN = 'send-video-screen'
const IPC_SEND_SETTINGS = ' send-settings'
const IPC_SEND_IS_RUNNING = ' settings-start-running'

//
// BOT
//

const TYPES = ['apple', 'star', 'range'] // objects to detect

const TYPES_LOWER_COLORS = {
  apple: { b: 10, g: 10, r: 130 },
  star: { b: 0, g: 100, r: 210 },
  range: { b: 230, g: 230, r: 230 },
}
const TYPES_UPPER_COLORS = {
  apple: { b: 200, g: 65, r: 255 },
  star: { b: 130, g: 255, r: 255 },
  range: { b: 255, g: 255, r: 255 },
}
const TYPES_BLUR = { apple: 2, star: 2, range: 2 }

// Actions to execute
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

module.exports = {
  GAME_WINDOW_WIDTH,
  GAME_WINDOW_HEIGHT,
  GAME_WINDOW_URL,
  GAME_WINDOW_NAME,
  GAME_WINDOW_DISPLAY_WIDTH,
  GAME_WINDOW_DISPLAY_HEIGHT,
  MAIN_WINDOW_WIDTH,
  MAIN_WINDOW_HEIGHT,
  TOP_OFFSET,
  IPC_SEND_VIDEO_SCREEN,
  IPC_SEND_SETTINGS,
  IPC_SEND_IS_RUNNING,
  TYPES,
  TYPES_LOWER_COLORS,
  TYPES_UPPER_COLORS,
  TYPES_BLUR,
  ACTIONS,
}
