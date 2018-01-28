const constants = require('../../_shared/constants')
const windowHelper = require('../_shared/windowHelper')


const createGameWindow = (gameWindow) => windowHelper.createWindow(gameWindow)(
  null,
  {
    x: constants.GAME_WINDOW_WIDTH * 2 + 184,
    y: 0,
    width: constants.GAME_WINDOW_WIDTH,
    height: constants.GAME_WINDOW_HEIGHT,
    frame: false,
    webPreferences: {
      plugins: true,
    },
  },

  {
    url: 'http://www.webgames.cz/swords-and-soul/6053-0',
  },
)

const createHiddenGameWindow = (hiddenGameWindow) => windowHelper.createWindow(hiddenGameWindow)(
  'game',
  {
    x: constants.GAME_WINDOW_WIDTH * 2 + 184,
    y: constants.GAME_WINDOW_HEIGHT + 25,
    width: 500,
    height: 550,
    frame: false,
  },
)

module.exports = {
  createGameWindow,
  createHiddenGameWindow,
}
