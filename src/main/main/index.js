const { app, globalShortcut } = require('electron')
const windowHelper = require('../_shared/windowHelper')
const messageHelper = require('../_shared/messageHelper')
const constants = require('../../_shared/constants')
const windows = require('./windows')


const mainWindow = windowHelper.generateWindowObject()

messageHelper.listenTo(constants.IPC_SEND_VIDEO_SCREEN, (event, args) => {
  messageHelper.send(mainWindow)(constants.IPC_SEND_VIDEO_SCREEN, args.payload)
})

app.commandLine.appendSwitch('ppapi-flash-path', app.getPath('pepperFlashSystemPlugin'))
app.commandLine.appendSwitch('ppapi-flash-version', '28.0.0.137')

app.on('ready', () => {
  windows.createMainWindow(mainWindow)
  globalShortcut.register('Command+B', () => {
    messageHelper.send(mainWindow)(constants.IPC_SEND_IS_RUNNING)
  })
})

app.on('activate', () => {
  if (!mainWindow.isOpen) {
    windows.createMainWindow(mainWindow)
  }
})
