const { app } = require('electron')
const constants = require('../../_shared/constants')
const windowHelper = require('../_shared/windowHelper')
const messageHelper = require('../_shared/messageHelper')
const windows = require('./windows')


const gameWindow = windowHelper.generateWindowObject()
const hiddenGameWindow = windowHelper.generateWindowObject()

messageHelper.listenTo(constants.IPC_SEND_SETTINGS, (event, args) => {
  messageHelper.send(hiddenGameWindow)(constants.IPC_SEND_SETTINGS, args.payload)
})

app.on('ready', () => {
  windows.createGameWindow(gameWindow)
  windows.createHiddenGameWindow(hiddenGameWindow)
})

app.on('activate', () => {
  if (!gameWindow.isOpen) {
    windows.createGameWindow(gameWindow)
  }
  if (!hiddenGameWindow.isOpen) {
    windows.createHiddenGameWindow(hiddenGameWindow)
  }
})

module.exports = {
  hiddenGameWindow,
  gameWindow,
}
