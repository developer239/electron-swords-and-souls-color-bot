const { app, globalShortcut } = require('electron')
const windowHelper = require('../_shared/windowHelper')
const messageHelper = require('../_shared/messageHelper')
const constants = require('../../_shared/constants')
const gameWindow = require('../game')


// We need to keep reference to this object
const mainWindow = windowHelper.generateWindowObject()

app.commandLine.appendSwitch('ppapi-flash-path', app.getPath('pepperFlashSystemPlugin'))
app.commandLine.appendSwitch('ppapi-flash-version', '28.0.0.137')

const createMainWindow = () => windowHelper.createWindow(mainWindow)(
  'main',
  {
    x: 0,
    y: 0,
    height: 820,
    width: 655,
  },
)

messageHelper.listenTo(constants.SEND_VIDEO_SCREEN, (event, args) => {
  messageHelper.send(mainWindow)(constants.SEND_VIDEO_SCREEN, args.payload)
})

// Create main window when application is ready
app.on('ready', createMainWindow)

// Create main window when application is not active anymore
app.on('activate', () => {
  if (!mainWindow.isOpen) {
    createMainWindow()
  }
})

app.on('ready', () => {
  globalShortcut.register('Command+B', () => {
    if (!gameWindow.hiddenGameWindow.isOpen) {
      gameWindow.createHiddenGameWindow()
      messageHelper.send(mainWindow)(constants.OPEN_GAME_WINDOW)
    }
  })

  globalShortcut.register('Command+J', () => {
    if (gameWindow.hiddenGameWindow.isOpen) {
      gameWindow.hiddenGameWindow.window.close()
      messageHelper.send(mainWindow)(constants.CLOSE_GAME_WINDOW)
    }
  })
})
