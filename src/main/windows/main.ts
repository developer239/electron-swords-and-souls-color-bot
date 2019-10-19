import { app } from 'electron'
import { generateWindowObject, createWindow } from '../helpers/window'

const mainWindowReference = generateWindowObject()

app.on('ready', () => {
  createWindow(mainWindowReference)(
    'main',
    {
      x: 0,
      y: 0,
      height: 800,
      width: 1000,
      resizable: true,
    },
    {
      port: 2005,
      fileName: 'main-window.html',
    }
  )
})
