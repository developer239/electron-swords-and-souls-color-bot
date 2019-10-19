import { app, globalShortcut } from 'electron'
import { generateWindowObject, createWindow } from '../helpers/window'
import { send } from '../helpers/message'

const mainWindowReference = generateWindowObject()

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+P', () => {
    send(mainWindowReference)('play-pause')
  })

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
