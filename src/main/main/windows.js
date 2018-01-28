const constants = require('../../_shared/constants')
const windowHelper = require('../_shared/windowHelper')


const createMainWindow = (mainWindow) => windowHelper.createWindow(mainWindow)(
  'main',
  {
    x: 0,
    y: 0,
    height: constants.MAIN_WINDOW_HEIGHT,
    width: constants.MAIN_WINDOW_WIDTH,
  },
)

module.exports = {
  createMainWindow,
}
