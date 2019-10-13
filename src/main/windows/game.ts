import { app } from 'electron'
import { generateWindowObject, createWindow } from '../helpers/window'

const mainWindowReference = generateWindowObject()

app.on('ready', () => {
  createWindow(mainWindowReference)(
    'game',
    {
      x: 0,
      y: 0,
      height: 600,
      width: 600,
    },
    {
      port: 2004,
      fileName: 'game-window.html',
    }
  )
})
