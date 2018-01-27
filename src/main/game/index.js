const constants = require('../../_shared/constants')
const windowHelper = require('../_shared/windowHelper')
const messageHelper = require('../_shared/messageHelper')


const gameWindow = windowHelper.generateWindowObject()
const hiddenGameWindow = windowHelper.generateWindowObject()

const createGameWindow = () => windowHelper.createWindow(gameWindow)(
  null,
  {
    x: constants.GAME_WINDOW_WIDTH * 2,
    y: 0,
    width: constants.GAME_WINDOW_WIDTH,
    height: constants.GAME_WINDOW_HEIGHT,
    frame: false,
    webPreferences: {
      plugins: true,
    }
  },

  {
    url: 'http://www.webgames.cz/swords-and-soul/6053-0',
  },
)

const createHiddenGameWindow = () => windowHelper.createWindow(hiddenGameWindow)(
  'game',
  {
    x: constants.GAME_WINDOW_WIDTH * 2,
    y: constants.GAME_WINDOW_HEIGHT + 25,
    width: 500,
    height: 550,
    frame: false,
  },
)

messageHelper.listenTo(constants.OPEN_GAME_WINDOW, () => {
  if (!hiddenGameWindow.isOpen) {
    createGameWindow()
    createHiddenGameWindow()
  }
})

messageHelper.listenTo(constants.CLOSE_GAME_WINDOW, () => {
  if (hiddenGameWindow.isOpen) {
    gameWindow.window.close()
    hiddenGameWindow.window.close()
  }
})

messageHelper.listenTo(constants.SEND_SETTINGS, (event, args) => {
  messageHelper.send(hiddenGameWindow)(constants.SEND_SETTINGS, args.payload)
})

module.exports = {
  hiddenGameWindow,
  createHiddenGameWindow,
  gameWindow,
  createGameWindow,
}
