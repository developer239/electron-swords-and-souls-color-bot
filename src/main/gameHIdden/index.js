const constants = require('../../_shared/constants')
const windowHelper = require('../_shared/windowHelper')
const messageHelper = require('../_shared/messageHelper')


const gameWindow = windowHelper.generateWindowObject()
const hiddenGameWindow = windowHelper.generateWindowObject()

const createMainWindow = () => windowHelper.createWindow(gameWindow)(
  null,
  {
    x: 600,
    y: 0,
    width: constants.GAME_WINDOW_WIDTH,
    height: constants.GAME_WINDOW_HEIGHT,
    frame: false,
  },
  {
    url: 'https://www.youtube.com/watch?v=PjGkVCAo8Fw',
    webPreferencesPlugins: true,
  },
)

const createHiddenGameWindow = () => windowHelper.createWindow(gameWindow)(
  'game',
  {
    x: 600,
    y: 205,
    width: 800,
    height: 600,
    frame: false,
  },
)

messageHelper.listenTo(constants.OPEN_GAME_WINDOW, () => {
  if (!gameWindow.isOpen) {
    createMainWindow()
    createHiddenGameWindow()
  }
})

messageHelper.listenTo(constants.CLOSE_GAME_WINDOW, () => {
  if (gameWindow.isOpen) {
    gameWindow.window.close()
    hiddenGameWindow.window.close()
  }
})
