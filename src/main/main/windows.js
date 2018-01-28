const constants = require('../../_shared/constants')
const windowHelper = require('../_shared/windowHelper')


const createMainWindow = (mainWindow) => windowHelper.createWindow(mainWindow)(
  'main',
  {
    x: 0,
    y: 0,
    height: 820,
    width: constants.GAME_WINDOW_WIDTH * 2 + 184,
  },
)

module.exports = {
  createMainWindow,
}
