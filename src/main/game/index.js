const constants = require('../../_shared/constants')
const windowHelper = require('../_shared/windowHelper')
const messageHelper = require('../_shared/messageHelper')


const gameWindow = windowHelper.generateWindowObject()

const createMainWindow = () => windowHelper.createWindow(gameWindow)(
  null,
  {
    x: 450,
    y: 0,
    width: 800,
    height: 600,
    frame: false,
  },
  {
    url: 'http://www.superhry.cz/hra/9837-swords-and-souls',
    webPreferencesPlugins: true,
  },
)

messageHelper.listenTo(constants.OPEN_GAME_WINDOW, () => {
  if (!gameWindow.isOpen) {
    createMainWindow()
  }
})

messageHelper.listenTo(constants.CLOSE_GAME_WINDOW, () => {
  if (gameWindow.isOpen) {
    gameWindow.window.close()
  }
})
