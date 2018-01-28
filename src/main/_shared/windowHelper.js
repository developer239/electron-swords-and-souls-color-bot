const BrowserWindow = require('electron').BrowserWindow


const property = (obj, key) => obj && obj.hasOwnProperty(key) ? obj[key] : undefined

const generateWindowObject = () => ({
  isOpen: false,
  window: null,
})

const createWindow = windowReference => (name, options, special) => {
  const newWindow = new BrowserWindow({
    show: false,
    width: property(options, 'width') || 600,
    height: property(options, 'height') || 600,
    x: property(options, 'x'),
    y: property(options, 'y'),
    frame: property(options, 'frame'),
    webPreferences: property(options, 'webPreferences'),
  })

  newWindow.setResizable(false)
  newWindow.loadURL(name ? `file://${__dirname}/../../renderer/${name}/index.html` : special.url)
  if (options && (options.show === undefined || options.show)) {
    newWindow.once('ready-to-show', newWindow.show)
  }

  // Handle close window
  newWindow.on('closed', () => {
    windowReference.isOpen = false
    windowReference.window = null
  })

  // Handle open window
  windowReference.isOpen = true
  windowReference.window = newWindow
}

module.exports = {
  generateWindowObject,
  createWindow,
}
