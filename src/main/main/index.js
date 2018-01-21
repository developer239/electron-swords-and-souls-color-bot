const app = require('electron').app
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
    height: 620,
    width: 600,
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
