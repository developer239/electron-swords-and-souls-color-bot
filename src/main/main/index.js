const { app, globalShortcut } = require('electron')
const windowHelper = require('../_shared/windowHelper')
const messageHelper = require('../_shared/messageHelper')
const constants = require('../../_shared/constants')


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
    width: constants.GAME_WINDOW_WIDTH * 2 + 184,
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
    console.log('SETTINGS_START_RUNNING')
    messageHelper.send(mainWindow)(constants.SETTINGS_START_RUNNING)
  })

  globalShortcut.register('Command+J', () => {
    console.log('SETTINGS_STOP_RUNNING')
    messageHelper.send(mainWindow)(constants.SETTINGS_STOP_RUNNING)
  })
})
