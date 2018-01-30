const constants = require('../../_shared/constants')
const windowHelper = require('../_shared/windowHelper')


const createGameWindow = (gameWindow) => windowHelper.createWindow(gameWindow)(
  null,
  {
    x: constants.MAIN_WINDOW_WIDTH,
    y: 0,
    width: constants.GAME_WINDOW_WIDTH,
    height: constants.GAME_WINDOW_HEIGHT,
    frame: false,
    webPreferences: {
      plugins: true,
    },
  },
  {
    url: constants.GAME_WINDOW_URL,
  },
)

const createHiddenGameWindow = (hiddenGameWindow) => windowHelper.createWindow(hiddenGameWindow)(
  'game',
  {
    x: constants.MAIN_WINDOW_WIDTH,
    y: constants.GAME_WINDOW_HEIGHT + constants.TOP_OFFSET,
    width: 500,
    height: 550,
    frame: false,
    show: false,
  },
)

module.exports = {
  createGameWindow,
  createHiddenGameWindow,
}
