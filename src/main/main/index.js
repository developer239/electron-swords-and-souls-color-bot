const app = require('electron').app
const windowHelper = require('../_shared/windowHelper')


// We need to keep reference to this object
const mainWindow = windowHelper.generateWindowObject()


const createMainWindow = () => windowHelper.createWindow(mainWindow)(
  'main',
  {
    x: 0,
    y: 0,
    height: 620,
    width: 450,
  },
)

// Create main window when application is ready
app.on('ready', createMainWindow)

// Create main window when application is not active anymore
app.on('activate', () => {
  if (!mainWindow.isOpen) {
    createMainWindow()
  }
})
