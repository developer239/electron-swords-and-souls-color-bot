const constants = require('../../_shared/constants')
const windowHelper = require('../_shared/windowHelper')
const messageHelper = require('../_shared/messageHelper')


const hiddenGameWindow = windowHelper.generateWindowObject()

const createHiddenGameWindow = () => windowHelper.createWindow(hiddenGameWindow)(
  'game',
  {
    x: 600,
    y: 205,
    width: 500,
    height: 550,
    frame: false,
  },
)

messageHelper.listenTo(constants.OPEN_GAME_WINDOW, () => {
  if (!hiddenGameWindow.isOpen) {
    createHiddenGameWindow()
  }
})

messageHelper.listenTo(constants.CLOSE_GAME_WINDOW, () => {
  if (hiddenGameWindow.isOpen) {
    hiddenGameWindow.window.close()
  }
})

module.exports = {
  hiddenGameWindow,
  createHiddenGameWindow,
}
